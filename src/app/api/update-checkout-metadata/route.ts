import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type Payload = {
  sessionId: string;
  cliente?: {
    email?: string;
    nombre?: string;
    direccion?: string;
    poblacion?: string;
    provincia?: string;
    cp?: string;
    whatsapp?: string;
    notas?: string;
  };
};

function str(v: unknown, max = 200): string {
  return (typeof v === "string" ? v : "").slice(0, max).trim();
}

// Atualiza o metadata da Checkout Session enquanto o cliente preenche o form
// no step 3. Quando o pagamento for confirmado pelo webhook, o metadata
// estará atualizado com os dados mais recentes do destinatário.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    if (!body?.sessionId || !body.sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "sessionId inválido." }, { status: 400 });
    }
    const cliente = body.cliente ?? {};

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe no configurado." }, { status: 500 });
    }
    const stripe = new Stripe(key);

    // Stripe só aceita update se a session ainda estiver "open" (não paga).
    // Se já paga, só retorna 200 sem alterar.
    const current = await stripe.checkout.sessions.retrieve(body.sessionId);
    if (current.status !== "open") {
      return NextResponse.json({ ok: true, skipped: true, reason: current.status });
    }

    // Preserva o metadata original de envio (não sobrescreve).
    const orig = current.metadata ?? {};
    const newMeta: Record<string, string> = {
      ...orig,
      cliente_nombre: str(cliente.nombre, 200),
      cliente_direccion: str(cliente.direccion, 200),
      cliente_poblacion: str(cliente.poblacion, 100),
      cliente_provincia: str(cliente.provincia, 100),
      cliente_cp: str(cliente.cp, 20),
      cliente_whatsapp: str(cliente.whatsapp, 40),
      cliente_notas: str(cliente.notas ?? "", 480),
    };
    if (cliente.email && typeof cliente.email === "string") {
      newMeta.cliente_email = str(cliente.email, 120);
    }

    await stripe.checkout.sessions.update(body.sessionId, { metadata: newMeta });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[update-checkout-metadata]", e?.message ?? e);
    return NextResponse.json(
      { error: e?.message ?? "Error al actualizar." },
      { status: 500 }
    );
  }
}
