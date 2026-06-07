import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CAJAS, ESTADOS_USA, cotizar, type Caja, type Modo } from "@/lib/rates";

export const runtime = "nodejs";

type Payload = {
  envio: {
    estadoUsaKey: string;
    origen: string;
    destino: string;
    modo: string;
    caja: string;
    pesoLb?: number | "";
  };
  cliente: {
    email: string;
    nombre: string;
    direccion: string;
    poblacion: string;
    provincia: string;
    cp: string;
    whatsapp: string;
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
    const cliente = body?.cliente;

    if (!envio || !cliente) {
      return NextResponse.json({ error: "Datos incompletos." }, { status: 400 });
    }
    if (!isEmail(cliente.email)) {
      return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
    }
    if (!isModo(envio.modo)) {
      return NextResponse.json({ error: "Modo de envío inválido." }, { status: 400 });
    }
    if (!isCaja(envio.caja)) {
      return NextResponse.json({ error: "Caja inválida." }, { status: 400 });
    }
    if (!envio.estadoUsaKey || !ESTADOS_USA[envio.estadoUsaKey]) {
      return NextResponse.json({ error: "Estado de origen inválido." }, { status: 400 });
    }

    const pesoLbNum = typeof envio.pesoLb === "number" ? envio.pesoLb : 0;
    if (envio.modo === "aereo") {
      const maxPeso = CAJAS[envio.caja].maxPesoAereoLb;
      if (pesoLbNum < 0 || pesoLbNum > maxPeso) {
        return NextResponse.json(
          { error: `Peso fuera del rango permitido (0–${maxPeso} lb).` },
          { status: 400 }
        );
      }
    }

    // ⚠️ FONTE ÚNICA DE VERDADE: o servidor recalcula. Cliente não envia preço.
    const cot = cotizar({
      estadoKey: envio.estadoUsaKey,
      caja: envio.caja,
      modo: envio.modo,
      pesoLb: pesoLbNum,
    });

    if (!cot.total || cot.total <= 0) {
      return NextResponse.json({ error: "Total calculado inválido." }, { status: 400 });
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe no está configurado en el servidor." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(key);
    const origin = req.headers.get("origin") ?? "https://miacompra.vercel.app";
    const amountCents = Math.round(cot.total * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Sem `payment_method_types` → Stripe libera automaticamente todos os
      // métodos habilitados na conta (cartão, Apple Pay, Google Pay, Amazon
      // Pay, Link, Klarna, Cash App, etc.) conforme o navegador suportar.
      customer_email: cliente.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: `Envío ${str(envio.origen, 120)} → ${str(envio.destino, 120)}`,
              description: `${envio.modo === "maritimo" ? "Marítimo" : "Aéreo"} · Caja ${envio.caja}${pesoLbNum ? ` · ${pesoLbNum} lb` : ""} · Seguro $500 incluido`,
            },
          },
        },
      ],
      metadata: {
        estado_usa_key: envio.estadoUsaKey,
        origen: str(envio.origen, 200),
        destino: str(envio.destino, 200),
        modo: envio.modo,
        caja: envio.caja,
        peso_lb: String(pesoLbNum || ""),
        detalle: str(cot.detalle, 200),
        cliente_nombre: str(cliente.nombre, 200),
        cliente_direccion: str(cliente.direccion, 200),
        cliente_poblacion: str(cliente.poblacion, 100),
        cliente_provincia: str(cliente.provincia, 100),
        cliente_cp: str(cliente.cp, 20),
        cliente_whatsapp: str(cliente.whatsapp, 40),
        cliente_notas: str(cliente.notas ?? "", 480),
      },
      success_url: `${origin}/cotizador/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cotizador`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("[create-checkout-session]", e?.message ?? e);
    return NextResponse.json(
      { error: e?.message ?? "Error al iniciar el pago." },
      { status: 500 }
    );
  }
}
