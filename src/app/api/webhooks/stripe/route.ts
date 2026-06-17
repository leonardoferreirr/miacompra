import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendWhatsappText, buildPostPurchaseMessage } from "@/lib/zapi";
import { isBotHandoffEnabled, notifyPurchaseBot } from "@/lib/bot-handoff";
import { claimOnce, releaseClaim } from "@/lib/idempotency";

// Webhook precisa do raw body (não pode parsear).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Últimos 4 dígitos do telefone pra log (evita PII completa nos logs do provedor). */
function phoneTail(raw?: string): string {
  const d = (raw ?? "").replace(/\D+/g, "");
  return d ? `…${d.slice(-4)}` : "";
}

/**
 * Dispara o aviso de compra (handoff pro bot OU Z-API direto). Roda só uma vez
 * por sessão (claim idempotente), então `completed` (pago) e `async_payment_succeeded`
 * nunca mandam duas mensagens pra mesma compra. Nunca rompe o webhook.
 */
async function dispatchPurchase(s: Stripe.Checkout.Session): Promise<void> {
  const m = s.metadata ?? {};
  if (!m.cliente_whatsapp) return;

  // Uma mensagem por sessão. Se já reclamamos, outro evento da mesma compra pula.
  const claimKey = `mia:sent:${s.id}`;
  const won = await claimOnce(claimKey, 60 * 60 * 24);
  if (!won) {
    console.log("[webhook] Aviso de compra já disparado, pulando.", { session_id: s.id });
    return;
  }

  const envio = {
    origen: m.origen ?? "",
    destino: m.destino ?? "",
    resumen: m.cart_resumen ?? "",
    cajas: m.cart_count ?? "",
    total_usd: m.cart_total_usd ?? "",
  };

  try {
    let ok = false;
    if (isBotHandoffEnabled()) {
      const r = await notifyPurchaseBot({
        event: "purchase.completed",
        phone: m.cliente_whatsapp,
        nombre: m.cliente_nombre ?? "",
        envio,
        pago: { session_id: s.id, amount_total: s.amount_total, currency: s.currency },
      });
      ok = r.ok;
      if (!ok) console.error("[webhook] Handoff ao bot falhou.", { error: r.error });
    } else {
      const msg = buildPostPurchaseMessage({
        nombre: m.cliente_nombre,
        origen: m.origen,
        destino: m.destino,
        resumen: m.cart_resumen,
        cajas: m.cart_count,
        total_usd: m.cart_total_usd,
      });
      const r = await sendWhatsappText(m.cliente_whatsapp, msg);
      ok = r.ok;
      if (!ok) console.error("[webhook] Envio Z-API falhou.", { error: r.error });
    }
    // Se falhou, libera o claim pra permitir re-tentativa (ex.: via async_payment_succeeded).
    if (!ok) await releaseClaim(claimKey);
  } catch (e: any) {
    console.error("[webhook] Erro ao disparar aviso de compra.", { error: e?.message });
    await releaseClaim(claimKey);
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }
  if (!secret || !key) {
    console.error("[webhook] Missing STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY env.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const stripe = new Stripe(key);
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (e: any) {
    console.warn("[webhook] Invalid signature:", e?.message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Idempotência de evento: o Stripe entrega at-least-once. Se já vimos este
  // event.id, devolve 200 sem reprocessar.
  const fresh = await claimOnce(`mia:evt:${event.id}`, 60 * 60 * 24);
  if (!fresh) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    // Pagamentos síncronos (card/link): chega já pago.
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      console.log("[webhook] checkout.session.completed", {
        session_id: s.id,
        amount_total: s.amount_total,
        currency: s.currency,
        payment_status: s.payment_status,
        cart_count: s.metadata?.cart_count,
        whatsapp: phoneTail(s.metadata?.cliente_whatsapp),
      });
      // Só dispara o "recibimos tu pago" quando o pagamento realmente entrou.
      // Klarna/Amazon Pay são assíncronos: aqui podem vir `unpaid` e o aviso
      // sai depois, no async_payment_succeeded.
      if (s.payment_status === "paid") {
        await dispatchPurchase(s);
      }
      break;
    }
    // Pagamentos assíncronos (Klarna/Amazon Pay) que confirmaram depois.
    case "checkout.session.async_payment_succeeded": {
      const s = event.data.object as Stripe.Checkout.Session;
      console.log("[webhook] async_payment_succeeded", {
        session_id: s.id,
        amount_total: s.amount_total,
        currency: s.currency,
        whatsapp: phoneTail(s.metadata?.cliente_whatsapp),
      });
      await dispatchPurchase(s);
      break;
    }
    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed": {
      const obj = event.data.object as any;
      console.log(`[webhook] ${event.type}`, {
        id: obj?.id,
        amount: obj?.amount_total ?? obj?.amount,
        status: obj?.payment_status ?? obj?.status,
      });
      break;
    }
    default:
      // Não loga eventos não-tratados pra não inflar logs.
      break;
  }

  return NextResponse.json({ received: true });
}
