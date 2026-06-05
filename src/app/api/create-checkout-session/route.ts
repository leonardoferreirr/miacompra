import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type Payload = {
  total: number;
  detalle?: string;
  envio: {
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body?.total || body.total <= 0) {
      return NextResponse.json({ error: "Total inválido." }, { status: 400 });
    }
    if (!body?.cliente?.email) {
      return NextResponse.json({ error: "Falta el correo electrónico." }, { status: 400 });
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

    const amountCents = Math.round(body.total * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Liberar todos os métodos habilitados na conta Stripe (Apple Pay,
      // Google Pay, Amazon Pay, Link, Klarna, Cash App, cartão, etc.)
      automatic_payment_methods: { enabled: true },
      customer_email: body.cliente.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: `Envío ${body.envio.origen} → ${body.envio.destino}`,
              description: `${body.envio.modo === "maritimo" ? "Marítimo" : "Aéreo"} · Caja ${body.envio.caja}${body.envio.pesoLb ? ` · ${body.envio.pesoLb} lb` : ""} · Seguro $500 incluido`,
            },
          },
        },
      ],
      metadata: {
        origen: body.envio.origen,
        destino: body.envio.destino,
        modo: body.envio.modo,
        caja: body.envio.caja,
        peso_lb: String(body.envio.pesoLb ?? ""),
        cliente_nombre: body.cliente.nombre,
        cliente_direccion: body.cliente.direccion,
        cliente_poblacion: body.cliente.poblacion,
        cliente_provincia: body.cliente.provincia,
        cliente_cp: body.cliente.cp,
        cliente_whatsapp: body.cliente.whatsapp,
        cliente_notas: (body.cliente.notas ?? "").slice(0, 480),
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
