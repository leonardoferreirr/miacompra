// Origin allowlist pras rotas POST do checkout. Stripe não chama essas rotas
// (server-side faz stripe.checkout.sessions.create); só o front do Mia Compra
// precisa acessar. Tudo o que vem de fora é bloqueado.

const ALLOWED_ORIGINS = new Set([
  "https://www.miacompra.com",
  "https://miacompra.com",
  "https://miacompra.vercel.app",
]);

export function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  // Same-origin POSTs do Next podem vir sem Origin header em alguns browsers.
  // Aceitamos quando não veio (request same-origin sem Origin é o comportamento
  // padrão); o que queremos bloquear é Origin explícito de outro domínio.
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Dev: localhost em qualquer porta.
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) return true;
  // Previews do Vercel (miacompra-*.vercel.app).
  if (/^https:\/\/miacompra-[a-z0-9-]+\.vercel\.app$/.test(origin)) return true;
  return false;
}
