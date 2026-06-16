// Helper client-side pra disparar eventos do Meta Pixel com segurança.
// fbq é definido pela base do pixel no layout; se ainda não carregou, no-op.

export const FB_PIXEL_ID = "3860924050839203";

type FbqParams = Record<string, unknown>;
type FbqOptions = { eventID?: string };

export function fbTrack(event: string, params?: FbqParams, options?: FbqOptions): void {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;
  if (params && options) fbq("track", event, params, options);
  else if (params) fbq("track", event, params);
  else fbq("track", event);
}
