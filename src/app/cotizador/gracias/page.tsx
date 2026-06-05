import Link from "next/link";

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
          maxWidth: 560,
          background: "#ffffff",
          border: "1px solid rgba(10,31,92,0.10)",
          borderRadius: 26,
          padding: "3rem 2.4rem",
          textAlign: "center",
          boxShadow: "0 18px 50px -18px rgba(10,31,92,0.18)",
        }}
      >
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
        <p style={{ fontSize: "1rem", color: "rgba(10,31,92,0.66)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
          En las próximas horas te escribimos por WhatsApp con las instrucciones para enviar tu paquete a nuestro almacén en Miami. Cualquier duda, estamos disponibles.
        </p>
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
    </main>
  );
}
