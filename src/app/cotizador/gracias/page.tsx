import Link from "next/link";

export default function GraciasPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--deep-2)",
        color: "var(--on-dark)",
        display: "grid",
        placeItems: "center",
        padding: "3rem 1.4rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 26,
          padding: "3rem 2.4rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            margin: "0 auto 1.4rem",
            background: "rgba(31,157,85,.18)",
            color: "#3fcd7a",
            display: "grid",
            placeItems: "center",
            fontSize: 28,
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#fff", letterSpacing: "-.02em", marginBottom: ".7rem" }}>
          ¡Listo! Recibimos tu pago.
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--on-dark-soft)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
          En las próximas horas te escribimos por WhatsApp con las instrucciones para enviar tu paquete a nuestro casillero en Estados Unidos. Cualquier duda nos hablas como un pana.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".55rem",
            background: "var(--yellow)",
            color: "var(--deep-2)",
            padding: "1rem 1.8rem",
            borderRadius: 100,
            fontWeight: 500,
            fontSize: "0.95rem",
            textDecoration: "none",
          }}
        >
          Volver al inicio →
        </Link>
      </div>
    </main>
  );
}
