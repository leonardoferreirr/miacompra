// Envío de WhatsApp vía Z-API (API no oficial, sesión por QR).
// Credenciales por variables de entorno — nunca en el código:
//   ZAPI_INSTANCE_ID   = id de la instancia Z-API
//   ZAPI_TOKEN         = token de la instancia
//   ZAPI_CLIENT_TOKEN  = "Client-Token" (token de seguridad de la cuenta)
//
// Si falta cualquiera, la función NO envía: solo registra en log y retorna.
// Así el webhook de Stripe nunca se rompe por una config ausente.

type SendResult = { ok: boolean; skipped?: boolean; error?: string };

/** Deja solo dígitos (Z-API espera código de país + número, sin "+" ni espacios). */
export function normalizePhone(raw: string | undefined | null): string {
  return (raw ?? "").replace(/\D+/g, "");
}

export async function sendWhatsappText(phoneRaw: string, message: string): Promise<SendResult> {
  const instance = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;
  const clientToken = process.env.ZAPI_CLIENT_TOKEN;

  if (!instance || !token || !clientToken) {
    console.warn("[zapi] Envío omitido: faltan ZAPI_INSTANCE_ID / ZAPI_TOKEN / ZAPI_CLIENT_TOKEN.");
    return { ok: false, skipped: true };
  }

  const phone = normalizePhone(phoneRaw);
  if (phone.length < 8) {
    console.warn("[zapi] Envío omitido: teléfono inválido.", { phone });
    return { ok: false, skipped: true, error: "invalid_phone" };
  }

  const url = `https://api.z-api.io/instances/${instance}/token/${token}/send-text`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Token": clientToken,
      },
      body: JSON.stringify({ phone, message }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[zapi] Falló el envío.", { status: res.status, body: body.slice(0, 300) });
      return { ok: false, error: `status_${res.status}` };
    }

    console.log("[zapi] Mensaje enviado.", { phone });
    return { ok: true };
  } catch (e: any) {
    console.error("[zapi] Error de red al enviar.", { error: e?.message });
    return { ok: false, error: e?.message ?? "network_error" };
  }
}

/** Mensaje estándar post-compra (gracias + paso a paso, alineado con la thank you page). */
export function buildPostPurchaseMessage(args: {
  nombre?: string;
  origen?: string;
  destino?: string;
  modo?: string;
  caja?: string;
  peso_lb?: string;
}): string {
  const nombre = (args.nombre ?? "").trim();
  const saludo = nombre ? `¡Hola ${nombre}!` : "¡Hola!";

  // Resumen compacto del envío (solo si hay datos).
  const partes = [args.caja, args.modo, args.origen && args.destino ? `${args.origen} → ${args.destino}` : ""]
    .map((p) => (p ?? "").trim())
    .filter(Boolean);
  const peso = (args.peso_lb ?? "").trim();
  if (peso) partes.push(`${peso} lb`);
  const resumen = partes.length ? `\n\n📦 Tu envío: ${partes.join(" · ")}` : "";

  return (
    `${saludo} 🎉 Recibimos tu pago en Mia Compra, tu envío ya está confirmado.${resumen}\n\n` +
    `Esto es lo que sigue:\n` +
    `1️⃣ *Preparamos tu etiqueta FedEx* — nuestro equipo la genera y te la envía por aquí y por correo en las próximas horas.\n` +
    `2️⃣ *Imprime y pega la etiqueta* en la caja y déjala en cualquier oficina FedEx en EE.UU.\n` +
    `3️⃣ *Tu caja llega a Miami* — la recibimos, auditamos y preparamos para el despacho.\n` +
    `4️⃣ *Despachamos y haces seguimiento* — sale por vía aérea o marítima y te avisamos en cada paso hasta la puerta de tu familia.\n\n` +
    `En breve te enviamos tu etiqueta. Cualquier duda, escríbenos por aquí. 💛`
  );
}
