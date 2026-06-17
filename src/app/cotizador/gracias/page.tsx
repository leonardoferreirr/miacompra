import Link from "next/link";
import Stripe from "stripe";
import PurchasePixel from "./PurchasePixel";

export const dynamic = "force-dynamic";

type Step = {
  n: number;
  title: string;
  desc: string;
  state: "done" | "next" | "todo";
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Pago confirmado",
    desc: "Recibimos tu pago y registramos los datos de tu envío.",
    state: "done",
  },
  {
    n: 2,
    title: "Preparamos tu etiqueta FedEx",
    desc: "Nuestro equipo genera tu etiqueta y te la envía por WhatsApp y correo en las próximas horas.",
    state: "next",
  },
  {
    n: 3,
    title: "Imprime y pega la etiqueta",
    desc: "La pegas en la caja y la dejas en cualquier oficina FedEx en Estados Unidos.",
    state: "todo",
  },
  {
    n: 4,
    title: "Tu caja llega a Miami",
    desc: "La recibimos en nuestro almacén, la auditamos y la preparamos para el despacho internacional.",
    state: "todo",
  },
  {
    n: 5,
    title: "Despachamos y haces seguimiento",
    desc: "Sale por vía aérea o marítima y acompañas tu caja por WhatsApp hasta la puerta de tu familia.",
    state: "todo",
  },
];

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  // Purchase do Meta Pixel só dispara com pagamento confirmado (payment_status=paid),
  // com o valor real da sessão Stripe. Falha ao recuperar não quebra a página.
  let purchase: { value: number; currency: string; eventId: string } | null = null;
  let paid = false;
  const sessionId = searchParams?.session_id;
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        paid = true;
        if (session.amount_total != null) {
          purchase = {
            value: session.amount_total / 100,
            currency: (session.currency ?? "usd").toUpperCase(),
            eventId: session.id,
          };
        }
      }
    } catch {
      // Recuperação falhou: trata como não confirmado.
    }
  }

  // CTA de WhatsApp: o CLIENTE inicia a conversa (abre a janela e libera a
  // entrega do passo a passo pelo bot). Mensagem pré-preenchida + ref do pedido.
  const waNumber = "17865502727";
  const waMsg =
    "¡Hola! Acabo de pagar mi envío en Mia Compra y quiero recibir mi información y los próximos pasos, por favor. 📦" +
    (sessionId ? ` (Pedido: ${sessionId})` : "");
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

  // Sin pago confirmado (sesión ausente, no pagada, o pago async pendiente):
  // estado neutro en vez de la pantalla de éxito. Evita mostrar "pago confirmado"
  // a quien abandonó el checkout o cuyo pago todavía se está procesando.
  if (!paid) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #FFFCF3 0%, #FAF4DE 100%)",
          color: "#0A1F5C",
          display: "grid",
          placeItems: "center",
          padding: "3rem 1.4rem",
          fontFamily: "var(--ff)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 540,
            background: "#ffffff",
            border: "1px solid rgba(10,31,92,0.10)",
            borderRadius: 26,
            padding: "3rem 2.4rem",
            boxShadow: "0 18px 50px -18px rgba(10,31,92,0.18)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto 1.4rem",
              background: "rgba(10,31,92,0.07)",
              color: "#0A1F5C",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 400, color: "#04123D", letterSpacing: "-.02em", marginBottom: ".7rem" }}>
            Estamos confirmando tu pago
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(10,31,92,0.66)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
            Si acabas de pagar, puede tardar unos minutos. Escríbenos por WhatsApp y lo verificamos enseguida, junto con los próximos pasos de tu envío.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: ".6rem",
                background: "#1FA855",
                color: "#ffffff",
                padding: "1.05rem 2rem",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 14px 34px -14px rgba(31,168,85,0.6)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.8 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.2.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2" />
              </svg>
              Escribir por WhatsApp
            </a>
            <Link href="/cotizador" style={{ color: "rgba(10,31,92,0.55)", fontSize: "0.9rem", textDecoration: "none" }}>
              Volver al cotizador
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFFCF3 0%, #FAF4DE 100%)",
        color: "#0A1F5C",
        display: "grid",
        placeItems: "center",
        padding: "3rem 1.4rem",
        fontFamily: "var(--ff)",
      }}
    >
      {purchase && (
        <PurchasePixel value={purchase.value} currency={purchase.currency} eventId={purchase.eventId} />
      )}
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#ffffff",
          border: "1px solid rgba(10,31,92,0.10)",
          borderRadius: 26,
          padding: "3rem 2.4rem",
          boxShadow: "0 18px 50px -18px rgba(10,31,92,0.18)",
        }}
      >
        {/* Confirmación */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              margin: "0 auto 1.4rem",
              background: "rgba(31,157,85,0.14)",
              color: "#14693c",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 400, color: "#04123D", letterSpacing: "-.02em", marginBottom: ".7rem" }}>
            ¡Listo! Recibimos tu pago.
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(10,31,92,0.66)", lineHeight: 1.6, marginBottom: "0.4rem" }}>
            Tu envío está confirmado. Esto es lo que sigue paso a paso:
          </p>
        </div>

        {/* Paso a paso */}
        <ol
          style={{
            listStyle: "none",
            margin: "2rem 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {STEPS.map((step, i) => {
            const done = step.state === "done";
            const next = step.state === "next";
            return (
              <li
                key={step.n}
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: 16,
                  background: next ? "rgba(255,196,0,0.10)" : "transparent",
                  border: next ? "1px solid rgba(255,196,0,0.45)" : "1px solid transparent",
                }}
              >
                {/* Conector vertical */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "calc(1rem + 21px)",
                      top: "calc(1rem + 44px)",
                      bottom: "-0.4rem",
                      width: 2,
                      background: "rgba(10,31,92,0.10)",
                    }}
                  />
                )}

                {/* Badge do passo */}
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    flexShrink: 0,
                    background: done
                      ? "rgba(31,157,85,0.14)"
                      : next
                        ? "var(--yellow)"
                        : "rgba(10,31,92,0.06)",
                    color: done ? "#14693c" : next ? "#04123D" : "rgba(10,31,92,0.5)",
                    border: done ? "none" : next ? "none" : "1px solid rgba(10,31,92,0.10)",
                  }}
                >
                  {done ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    step.n
                  )}
                </span>

                {/* Texto */}
                <div style={{ paddingTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: "1.02rem", color: "#04123D" }}>{step.title}</span>
                    {next && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".04em",
                          color: "#7a5b00",
                          background: "rgba(255,196,0,0.30)",
                          padding: "0.15rem 0.55rem",
                          borderRadius: 100,
                        }}
                      >
                        En proceso
                      </span>
                    )}
                  </div>
                  <p style={{ margin: ".3rem 0 0", fontSize: "0.92rem", color: "rgba(10,31,92,0.62)", lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Cierre */}
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(10,31,92,0.66)",
            lineHeight: 1.6,
            textAlign: "center",
            margin: "1.8rem 0 1.4rem",
          }}
        >
          Para recibir tu información y los próximos pasos, escríbenos por WhatsApp. Te respondemos enseguida.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".6rem",
              background: "#1FA855",
              color: "#ffffff",
              padding: "1.05rem 2rem",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 14px 34px -14px rgba(31,168,85,0.6)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.8 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.2.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2" />
            </svg>
            Recibir mi información por WhatsApp
          </a>
          <Link
            href="/"
            style={{
              color: "rgba(10,31,92,0.55)",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
