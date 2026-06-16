"use client";

import { useEffect } from "react";
import { fbTrack } from "@/lib/fbpixel";

// Dispara o Purchase do Meta Pixel uma vez, com o valor real pago.
// Dedup por sessão no próprio navegador: refresh da /gracias não reconta.
export default function PurchasePixel({
  value,
  currency,
  eventId,
}: {
  value: number;
  currency: string;
  eventId: string;
}) {
  useEffect(() => {
    const key = `mia-purchase-fired-${eventId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage indisponível: segue e dispara mesmo assim.
    }
    fbTrack("Purchase", { value, currency }, { eventID: eventId });
  }, [value, currency, eventId]);

  return null;
}
