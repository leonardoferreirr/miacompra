// Idempotência via Upstash Redis (reaproveita as mesmas credenciais do rate limit).
// Usado pelo webhook do Stripe pra garantir UMA mensagem por compra, mesmo que
// o Stripe re-entregue o evento (at-least-once delivery) ou que `completed` e
// `async_payment_succeeded` cheguem os dois pra mesma sessão.

import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!_redis) _redis = new Redis({ url, token });
  return _redis;
}

/**
 * Reclama uma chave única de forma atômica.
 *  - `true`  = ganhou a reclamação (deve processar).
 *  - `false` = a chave já existia (já foi processado, pula).
 * Se o Upstash não estiver configurado ou cair, retorna `true` (fail-open:
 * preferimos entregar a mensagem a travar uma compra legítima).
 */
export async function claimOnce(key: string, ttlSec: number): Promise<boolean> {
  const r = redis();
  if (!r) return true;
  try {
    const res = await r.set(key, "1", { nx: true, ex: ttlSec });
    return res === "OK";
  } catch (e: any) {
    console.warn("[idempotency] Upstash error, fail-open:", e?.message);
    return true;
  }
}

/** Libera uma reclamação (usado quando o envio falhou e queremos permitir re-tentativa). */
export async function releaseClaim(key: string): Promise<void> {
  const r = redis();
  if (!r) return;
  try {
    await r.del(key);
  } catch {
    /* noop — não é crítico se a liberação falhar */
  }
}
