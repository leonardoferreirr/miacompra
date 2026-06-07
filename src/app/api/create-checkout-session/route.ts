import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CAJAS, ESTADOS_USA, cotizar, type Caja, type Modo } from "@/lib/rates";

export const runtime = "nodejs";

type Payload = {
  envio: {
    estadoUsaKey: string;
    origen: string;
    destino: string;
  };
  // Carrinho: uma ou mais caixas. Cada item tem modo+caja+peso próprios
  // e vira um line_item separado no Stripe Checkout.
  items: Array<{
    modo: string;
    caja: string;
    pesoLb?: number | "";
  }>;
  // Cliente é opcional na CRIAÇÃO (step 3 do cotizador mostra o Stripe
  // antes de preencher dados de destinatário). Os campos vão sendo
  // atualizados via /api/update-checkout-metadata conforme o user digita.
  cliente?: {
    email?: string;
    nombre?: string;
    direccion?: string;
    poblacion?: string;
    provincia?: string;
    cp?: string;
    whatsapp?: string;
    whatsapp2?: string;
    notas?: string;
  };
};

function isModo(v: unknown): v is Modo {
  return v === "maritimo" || v === "aereo";
}
function isCaja(v: unknown): v is Caja {
  return v === "Small" || v === "Medium" || v === "Large";
}
function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function str(v: unknown, max = 200): string {
  return (typeof v === "string" ? v : "").slice(0, max).trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    const envio = body?.envio;
    const items = body?.items;
    const cliente = body?.cliente ?? {};

    if (!envio) {
      return NextResponse.json({ error: "Datos de envío incompletos." }, { status: 400 });
    }
    if (!envio.estadoUsaKey || !ESTADOS_USA[envio.estadoUsaKey]) {
      return NextResponse.json({ error: "Estado de origen inválido." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío." }, { status: 400 });
    }

    // Valida cada item e recalcula o valor server-side (fonte única de verdade).
    type ResolvedItem = {
      modo: Modo;
      caja: Caja;
      pesoLb: number;
      total: number;
      detalle: string;
    };
    const resolved: ResolvedItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!isModo(it.modo)) {
        return NextResponse.json({ error: `Caja ${i + 1}: modo inválido.` }, { status: 400 });
      }
      if (!isCaja(it.caja)) {
        return NextResponse.json({ error: `Caja ${i + 1}: tamaño inválido.` }, { status: 400 });
      }
      const pesoLbNum = typeof it.pesoLb === "number" ? it.pesoLb : 0;
      // Peso é obrigatório e respeitar o limite — válido para aéreo e marítimo.
      const maxPeso = CAJAS[it.caja].maxPesoAereoLb;
      if (pesoLbNum <= 0 || pesoLbNum > maxPeso) {
        return NextResponse.json(
          { error: `Caja ${i + 1}: peso fuera del rango (1–${maxPeso} lb).` },
          { status: 400 }
        );
      }
      const cot = cotizar({
        estadoKey: envio.estadoUsaKey,
        caja: it.caja,
        modo: it.modo,
        pesoLb: pesoLbNum,
      });
      if (!cot.total || cot.total <= 0) {
        return NextResponse.json({ error: `Caja ${i + 1}: total inválido.` }, { status: 400 });
      }
      resolved.push({
        modo: it.modo,
        caja: it.caja,
        pesoLb: pesoLbNum,
        total: cot.total,
        detalle: cot.detalle,
      });
    }

    const totalGeral = resolved.reduce((acc, r) => acc + r.total, 0);

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe no está configurado en el servidor." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(key);
    const origin = req.headers.get("origin") ?? "https://miacompra.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // EMBEDDED checkout: o Stripe injeta o componente no site (step 3 do
      // cotizador). Apple Pay precisa do domínio verificado em Settings
      // → Payment method domains pra aparecer no embed (no hosted era auto).
      ui_mode: "embedded",
      // Listamos explicitamente os métodos. Apple Pay e Google Pay são
      // wrappers do "card" — aparecem automaticamente em Safari (Apple Pay)
      // ou Chrome com Google Pay configurado. Os demais (Amazon Pay, Klarna)
      // precisam ser declarados aqui — sem isso, o Stripe omitia mesmo
      // com a conta ativa pra eles.
      payment_method_types: [
        "card",
        "link",
        "amazon_pay",
        "klarna",
      ],
      // Klarna e Amazon Pay são geo-filtrados — Stripe esconde se não
      // souber o billing country. Coletar billing destrava esses métodos
      // quando o cliente é dos EUA (público real do Mia Compra).
      billing_address_collection: "required",
      // customer_email só vai se já foi preenchido. Caso contrário, Stripe
      // coleta o email dentro do embed (campo "Contact information").
      ...(isEmail(cliente.email) ? { customer_email: cliente.email } : {}),
      line_items: resolved.map((r, idx) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(r.total * 100),
          product_data: {
            name: `Caja ${idx + 1} · ${r.modo === "maritimo" ? "Marítimo" : "Aéreo"} · ${CAJAS[r.caja].dim}`,
            description: `Envío ${str(envio.origen, 80)} → ${str(envio.destino, 80)} · ${r.pesoLb} lb · Seguro $500 incluido`,
          },
        },
      })),
      metadata: {
        estado_usa_key: envio.estadoUsaKey,
        origen: str(envio.origen, 200),
        destino: str(envio.destino, 200),
        // Resumo do carrinho (até 500 chars no metadata por chave do Stripe).
        cart_items: str(
          resolved.map((r, i) => `${i + 1}:${r.modo}/${r.caja}${r.pesoLb ? `/${r.pesoLb}lb` : ""}/$${r.total.toFixed(2)}`).join(" | "),
          480
        ),
        cart_total_usd: totalGeral.toFixed(2),
        cart_count: String(resolved.length),
        cliente_nombre: str(cliente.nombre, 200),
        cliente_direccion: str(cliente.direccion, 200),
        cliente_poblacion: str(cliente.poblacion, 100),
        cliente_provincia: str(cliente.provincia, 100),
        cliente_cp: str(cliente.cp, 20),
        cliente_whatsapp: str(cliente.whatsapp, 40),
        cliente_whatsapp2: str(cliente.whatsapp2 ?? "", 40),
        cliente_notas: str(cliente.notas ?? "", 480),
      },
      // Em embedded mode usa-se return_url (pra onde o cliente vai DEPOIS
      // de pagar) em vez de success_url/cancel_url.
      return_url: `${origin}/cotizador/gracias?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (e: any) {
    console.error("[create-checkout-session]", e?.message ?? e);
    return NextResponse.json(
      { error: e?.message ?? "Error al iniciar el pago." },
      { status: 500 }
    );
  }
}
