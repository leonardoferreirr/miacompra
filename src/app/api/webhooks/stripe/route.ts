import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendWhatsappText, buildPostPurchaseMessage } from "@/lib/zapi";
import { isBotHandoffEnabled, notifyPurchaseBot } from "@/lib/bot-handoff";

// Webhook precisa do raw body (não pode parsear).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  // Trata os eventos que importam pra Mia Compra.
  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      const m = s.metadata ?? {};
      console.log("[webhook] checkout.session.completed", {
        session_id: s.id,
        amount_total: s.amount_total,
        currency: s.currency,
        payment_status: s.payment_status,
        customer_email: s.customer_details?.email ?? s.customer_email,
        envio: {
          origen: m.origen,
          destino: m.destino,
          modo: m.modo,
          caja: m.caja,
          peso_lb: m.peso_lb,
          detalle: m.detalle,
        },
        cliente: {
          nombre: m.cliente_nombre,
          direccion: m.cliente_direccion,
          poblacion: m.cliente_poblacion,
          provincia: m.cliente_provincia,
          cp: m.cliente_cp,
          whatsapp: m.cliente_whatsapp,
          notas: m.cliente_notas,
        },
      });

      // Aviso de compra. Dos modos, nunca rompe el webhook:
      //  1) Handoff al "Agente IA" (si BOT_PURCHASE_WEBHOOK_URL está seteada):
      //     el bot envía el WhatsApp y guarda el contexto del cliente.
      //  2) Fallback: el sitio envía directo por Z-API (gracias + paso a paso).
      if (m.cliente_whatsapp) {
        if (isBotHandoffEnabled()) {
          await notifyPurchaseBot({
            event: "purchase.completed",
            phone: m.cliente_whatsapp,
            nombre: m.cliente_nombre ?? "",
            envio: {
              origen: m.origen ?? "",
              destino: m.destino ?? "",
              modo: m.modo ?? "",
              caja: m.caja ?? "",
              peso_lb: m.peso_lb ?? "",
              detalle: m.detalle ?? "",
            },
            pago: {
              session_id: s.id,
              amount_total: s.amount_total,
              currency: s.currency,
            },
          }).catch((e) => console.error("[webhook] Falló el handoff al bot.", e?.message));
        } else {
          const msg = buildPostPurchaseMessage({
            nombre: m.cliente_nombre,
            origen: m.origen,
            destino: m.destino,
            modo: m.modo,
            caja: m.caja,
            peso_lb: m.peso_lb,
          });
          await sendWhatsappText(m.cliente_whatsapp, msg).catch((e) =>
            console.error("[webhook] Falló el disparo de WhatsApp.", e?.message),
          );
        }
      }
      break;
    }
    case "checkout.session.async_payment_succeeded":
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
