import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Singleton — evita criar nova conexão a cada request em serverless.
let _checkoutLimiter: Ratelimit | null = null;
let _metadataLimiter: Ratelimit | null = null;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function getCheckoutLimiter(): Ratelimit | null {
  if (_checkoutLimiter) return _checkoutLimiter;
  const redis = getRedis();
  if (!redis) return null;
  // 5 sessions Stripe / minuto / IP. Sliding window evita burst no fim do janelo.
  _checkoutLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    prefix: "rl:checkout",
    analytics: true,
  });
  return _checkoutLimiter;
}

export function getMetadataLimiter(): Ratelimit | null {
  if (_metadataLimiter) return _metadataLimiter;
  const redis = getRedis();
  if (!redis) return null;
  // Update de metadata roda em debounce de 800ms — 30/min cobre uso real
  // (cliente digitando o form) sem permitir abuse.
  _metadataLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    prefix: "rl:metadata",
    analytics: true,
  });
  return _metadataLimiter;
}

// Pega IP do cliente respeitando proxies do Vercel.
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// Aplica rate limit. Retorna {ok:true} se passou ou se Upstash estiver fora
// (fail-open — preferimos deixar passar que derrubar checkout legítimo).
// Se Upstash respondeu e estourou cota, retorna {ok:false, retryAfter}.
export async function checkLimit(
  limiter: Ratelimit | null,
  ip: string
): Promise<{ ok: true } | { ok: false; retryAfter: number }> {
  if (!limiter) return { ok: true };
  try {
    const r = await limiter.limit(ip);
    if (r.success) return { ok: true };
    const retryAfter = Math.max(1, Math.ceil((r.reset - Date.now()) / 1000));
    return { ok: false, retryAfter };
  } catch (e: any) {
    console.warn("[ratelimit] Upstash error, failing open:", e?.message);
    return { ok: true };
  }
}
