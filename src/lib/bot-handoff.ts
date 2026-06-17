// Handoff de la compra hacia el "Agente IA" (el cerebro del bot).
// El sitio NO envía el WhatsApp: avisa al bot, y el bot envía + guarda contexto.
//
// Variables de entorno:
//   BOT_PURCHASE_WEBHOOK_URL     = endpoint del bot que recibe el evento de compra
//   BOT_PURCHASE_WEBHOOK_SECRET  = secreto compartido (el bot valida que viene del sitio)
//
// Si falta la URL, esta función no hace nada (retorna skipped) — así el webhook
// de Stripe puede caer al modo de envío directo por Z-API o simplemente loguear.

export type PurchasePayload = {
  event: "purchase.completed";
  phone: string; // solo dígitos, con código de país
  nombre: string;
  envio: {
    origen: string;
    destino: string;
    resumen: string; // ej: "Medium aérea 30 lb + Large marítima 45 lb"
    cajas: string; // cantidad de cajas
    total_usd: string;
  };
  pago: {
    session_id: string;
    amount_total: number | null;
    currency: string | null;
  };
};

type NotifyResult = { ok: boolean; skipped?: boolean; error?: string };

export function isBotHandoffEnabled(): boolean {
  return Boolean(process.env.BOT_PURCHASE_WEBHOOK_URL);
}

export async function notifyPurchaseBot(payload: PurchasePayload): Promise<NotifyResult> {
  const url = process.env.BOT_PURCHASE_WEBHOOK_URL;
  const secret = process.env.BOT_PURCHASE_WEBHOOK_SECRET;

  if (!url) {
    return { ok: false, skipped: true };
  }

  // Nunca dispara sem autenticação: se a URL existe mas o segredo não, é erro
  // de config — falha em vez de mandar um POST que o bot vai (ou deveria) rejeitar.
  if (!secret) {
    console.error("[bot-handoff] BOT_PURCHASE_WEBHOOK_URL setada sem BOT_PURCHASE_WEBHOOK_SECRET. Abortando.");
    return { ok: false, error: "missing_secret" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Mia-Secret": secret,
      },
      body: JSON.stringify(payload),
      // Timeout: o webhook do Stripe não pode ficar pendurado esperando o bot.
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[bot-handoff] El bot rechazó el evento.", { status: res.status, body: body.slice(0, 300) });
      return { ok: false, error: `status_${res.status}` };
    }

    console.log("[bot-handoff] Evento de compra entregado al bot.", { phone: payload.phone });
    return { ok: true };
  } catch (e: any) {
    console.error("[bot-handoff] Error de red al avisar al bot.", { error: e?.message });
    return { ok: false, error: e?.message ?? "network_error" };
  }
}
