import Link from "next/link";

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

export default function GraciasPage() {
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
            fontSize: "0.9rem",
            color: "rgba(10,31,92,0.55)",
            lineHeight: 1.6,
            textAlign: "center",
            margin: "1.8rem 0 1.6rem",
          }}
        >
          Cualquier duda, te escribimos por WhatsApp y estamos disponibles para ayudarte.
        </p>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".55rem",
              background: "var(--yellow)",
              color: "#04123D",
              padding: "1rem 1.8rem",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            Volver al inicio →
          </Link>
        </div>
      </div>
    </main>
  );
}
