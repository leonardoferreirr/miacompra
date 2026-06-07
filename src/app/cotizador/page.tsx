"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import "./cotizador.css";
import { CAJAS, cotizar, ESTADOS_LIST, ESTADOS_USA, type Caja, type Modo } from "@/lib/rates";
import { ESTADOS_VE_LIST } from "@/lib/venezuela";
import { INITIAL_STATE, type CotizacionState } from "@/lib/types";

// Stripe.js carrega uma vez, fora do componente, e fica em cache.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const WA_NUMBER = "17865502727"; // +1 786 550-2727 — Mia Compra suporte
const WA_MSG = "Hola Mia Compra, tengo una duda sobre mi cotización.";

export default function CotizadorPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s, setS] = useState<CotizacionState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Persistência local: restaura form se cliente recarregar a página ou
  // voltar depois. localStorage > cookie/IP — funciona offline, sem backend,
  // e só fica no device do próprio cliente (privacidade ok).
  const LS_KEY = "mia-cotizador-v1";
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.s) setS({ ...INITIAL_STATE, ...saved.s });
        if (saved?.step && [1, 2, 3].includes(saved.step)) setStep(saved.step);
        if (typeof saved?.acceptedTerms === "boolean") setAcceptedTerms(saved.acceptedTerms);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ s, step, acceptedTerms }));
    } catch {}
  }, [s, step, acceptedTerms, hydrated]);

  function update<K extends keyof CotizacionState>(k: K, v: CotizacionState[K]) {
    setS((prev) => ({ ...prev, [k]: v }));
  }

  const estadoUsa = s.estadoUsaKey ? ESTADOS_USA[s.estadoUsaKey] : null;
  const ciudadesUsa = estadoUsa?.ciudades ?? [];
  const ciudadesVe = useMemo(() => {
    const e = ESTADOS_VE_LIST.find((x) => x.key === s.estadoVeKey);
    return e?.ciudades ?? [];
  }, [s.estadoVeKey]);

  const cotizacion = useMemo(() => {
    if (!s.estadoUsaKey || !s.caja || !s.modo) return null;
    return cotizar({
      estadoKey: s.estadoUsaKey,
      caja: s.caja as Caja,
      modo: s.modo as Modo,
      pesoLb: typeof s.pesoLb === "number" ? s.pesoLb : 0,
    });
  }, [s.estadoUsaKey, s.caja, s.modo, s.pesoLb]);

  const step1Ok = !!(s.estadoUsaKey && s.ciudadUsa && s.estadoVeKey && s.ciudadVe);
  const step2Ok = useMemo(() => {
    if (!s.modo || !s.caja) return false;
    if (s.modo === "aereo") {
      const peso = typeof s.pesoLb === "number" ? s.pesoLb : 0;
      const max = CAJAS[s.caja as Caja].maxPesoAereoLb;
      return peso > 0 && peso <= max;
    }
    return true;
  }, [s.modo, s.caja, s.pesoLb]);
  // step3Ok ainda é exportado para futura validação opcional, mas a UI
  // não bloqueia mais o pagamento — o cliente pode pagar antes de
  // preencher os dados do destinatário (Leonardo confirma por WhatsApp).
  const step3Ok = !!(s.nombre && s.apellidos && s.direccion && s.poblacion && s.cp && s.whatsapp);

  // 1) Cria a session do Stripe assim que o cliente entra no step 3 com
  // cotização válida. Regenera SOMENTE se o valor mudar (caja/peso/modo/
  // estado). Email e dados do destinatário entram via update separado.
  const valueFingerprintRef = useRef<string>("");
  useEffect(() => {
    if (step !== 3 || !cotizacion) return;
    const fp = JSON.stringify({
      e: s.estadoUsaKey, cu: s.ciudadUsa, ev: s.estadoVeKey, cv: s.ciudadVe,
      m: s.modo, c: s.caja, p: s.pesoLb, t: cotizacion.total,
    });
    if (fp === valueFingerprintRef.current && clientSecret) return;
    const t = setTimeout(() => {
      valueFingerprintRef.current = fp;
      setClientSecret(null);
      setSessionId(null);
      handleCheckout();
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, cotizacion?.total, s.estadoUsaKey, s.ciudadUsa, s.estadoVeKey, s.ciudadVe, s.modo, s.caja, s.pesoLb]);

  // 2) Sincroniza metadata da session com os campos do destinatário
  // conforme o cliente preenche. Debounce 800ms — não regenera session,
  // só dá update do metadata (cheap, não invalida o embed).
  useEffect(() => {
    if (!sessionId) return;
    const t = setTimeout(() => {
      fetch("/api/update-checkout-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          cliente: {
            email: s.email,
            nombre: `${s.nombre} ${s.apellidos}`.trim(),
            direccion: `${s.direccion} ${s.apartamento}`.trim(),
            poblacion: s.poblacion,
            provincia: s.provincia,
            cp: s.cp,
            whatsapp: s.whatsapp,
            notas: s.notas,
          },
        }),
      }).catch(() => {});
    }, 800);
    return () => clearTimeout(t);
  }, [sessionId, s.email, s.nombre, s.apellidos, s.direccion, s.apartamento, s.poblacion, s.provincia, s.cp, s.whatsapp, s.notas]);

  async function handleCheckout() {
    if (!cotizacion) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          envio: {
            estadoUsaKey: s.estadoUsaKey,
            origen: `${s.ciudadUsa}, ${estadoUsa?.nombre}`,
            destino: `${s.ciudadVe}, ${s.estadoVeKey}`,
            modo: s.modo,
            caja: s.caja,
            pesoLb: s.pesoLb,
          },
          cliente: {
            email: s.email,
            nombre: `${s.nombre} ${s.apellidos}`,
            direccion: `${s.direccion} ${s.apartamento}`.trim(),
            poblacion: s.poblacion,
            provincia: s.provincia,
            cp: s.cp,
            whatsapp: s.whatsapp,
            notas: s.notas,
          },
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        if (data.sessionId) setSessionId(data.sessionId);
      } else {
        setErr(data.error || "No fue posible iniciar el pago.");
      }
    } catch (e: any) {
      setErr(e?.message || "Error de red.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="cot-page">
      <div className="cot-wrap">
        <header className="cot-header">
          <Link href="/" className="brand">
            <img src="/assets/logo-full.png" alt="Mia Compra · Tu felicidad, nuestro compromiso" />
          </Link>
          <Link href="/" className="back-link">← Volver al inicio</Link>
        </header>

        <Stepper step={step} />

        {step === 1 && (
          <div className="cot-card">
            <h2>¿De dónde sale y a dónde llega?</h2>
            <p className="sub">El precio depende del estado de origen en Estados Unidos.</p>

            <div className="row-2">
              <div className="field">
                <label>Estado de origen (EE.UU.)</label>
                <select value={s.estadoUsaKey} onChange={(e) => { update("estadoUsaKey", e.target.value); update("ciudadUsa", ""); }}>
                  <option value="">Selecciona el estado…</option>
                  {ESTADOS_LIST.map((e) => (
                    <option key={e.key} value={e.key}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Ciudad de origen</label>
                <select value={s.ciudadUsa} onChange={(e) => update("ciudadUsa", e.target.value)} disabled={!s.estadoUsaKey}>
                  <option value="">{s.estadoUsaKey ? "Selecciona la ciudad…" : "Elige primero el estado"}</option>
                  {ciudadesUsa.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {s.estadoUsaKey && (
                  <div className="hint">¿Tu ciudad no aparece? Elige la más cercana — atendemos toda el área metropolitana.</div>
                )}
              </div>
            </div>

            <div className="row-2" style={{ marginTop: "1.5rem" }}>
              <div className="field">
                <label>Estado de destino (Venezuela)</label>
                <select value={s.estadoVeKey} onChange={(e) => { update("estadoVeKey", e.target.value); update("ciudadVe", ""); }}>
                  <option value="">Selecciona el estado…</option>
                  {ESTADOS_VE_LIST.map((e) => (
                    <option key={e.key} value={e.key}>{e.key}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Ciudad de destino</label>
                <select value={s.ciudadVe} onChange={(e) => update("ciudadVe", e.target.value)} disabled={!s.estadoVeKey}>
                  <option value="">{s.estadoVeKey ? "Selecciona la ciudad…" : "Elige primero el estado"}</option>
                  {ciudadesVe.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cot-actions">
              <span />
              <button className="btn-next" disabled={!step1Ok} onClick={() => setStep(2)}>
                Siguiente
                <Arrow />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cot-card">
            <h2>¿Cómo es tu paquete?</h2>
            <p className="sub">Elige el tipo de envío y el tamaño de la caja.</p>

            <span className="field-label-top">Tipo de envío</span>
            <div className="radio-grid">
              <ModoCard
                value="maritimo"
                selected={s.modo === "maritimo"}
                onClick={() => update("modo", "maritimo")}
                icon={<IconShip />}
                title="Marítimo"
                desc="Más económico · llegada en 3 a 5 semanas"
              />
              <ModoCard
                value="aereo"
                selected={s.modo === "aereo"}
                onClick={() => update("modo", "aereo")}
                icon={<IconPlane />}
                title="Aéreo"
                desc="Más rápido · llegada en 5 a 7 días hábiles"
              />
            </div>

            <span className="field-label-top">Tamaño de la caja</span>
            <div className="radio-grid caja-grid">
              {(Object.entries(CAJAS) as [Caja, typeof CAJAS["Small"]][]).map(([key, c]) => (
                <CajaCard
                  key={key}
                  value={key}
                  selected={s.caja === key}
                  onClick={() => update("caja", key)}
                  title={c.label}
                  desc={
                    s.modo === "aereo"
                      ? `Hasta ${c.maxPesoAereoLb} lb · ${c.ft3} ft³`
                      : `${c.ft3} ft³ · peso volumen ${c.pesoVolumenLb} lb`
                  }
                />
              ))}
            </div>

            {s.modo === "aereo" && s.caja && (
              <div className="field" style={{ marginTop: "1rem" }}>
                <label>Peso del paquete (libras)</label>
                <input
                  type="number"
                  min={1}
                  max={CAJAS[s.caja as Caja].maxPesoAereoLb}
                  step="0.1"
                  placeholder={`Máximo ${CAJAS[s.caja as Caja].maxPesoAereoLb} lb`}
                  value={s.pesoLb === "" ? "" : s.pesoLb}
                  onChange={(e) => {
                    const v = e.target.value;
                    update("pesoLb", v === "" ? "" : Number(v));
                  }}
                />
                <div className="hint">
                  Cobramos el mayor entre peso real y peso volumen ({CAJAS[s.caja as Caja].pesoVolumenLb} lb).
                </div>
              </div>
            )}

            {cotizacion && step2Ok && (
              <div className="resumen">
                <div className="label">Precio cerrado del envío</div>
                <div className="total">${cotizacion.total.toFixed(2)} <small>USD</small></div>
                <div className="detalle">{cotizacion.detalle}</div>
                <span className="badge"><IconCheck /> Seguro de $500 incluido · impuestos de aduana incluidos</span>
              </div>
            )}

            <div className="cot-actions">
              <button className="btn-prev" onClick={() => setStep(1)}>← Atrás</button>
              <button className="btn-next" disabled={!step2Ok} onClick={() => setStep(3)}>
                Continuar al pago
                <Arrow />
              </button>
            </div>
          </div>
        )}

        {step === 3 && cotizacion && (
          <div className="cot-grid-3">
            <div className="cot-card">
              <h2>Paga ${cotizacion.total.toFixed(2)} USD</h2>
              <p className="sub">Pago 100% seguro vía Stripe. Aceptamos tarjeta, Apple Pay, Google Pay, Link, Amazon Pay y Klarna.</p>

              <div className={`cot-pay-area cot-pay-area--top${acceptedTerms ? "" : " cot-pay-area--locked"}`}>
                {submitting && !clientSecret && (
                  <div className="cot-pay-hint">Cargando opciones de pago…</div>
                )}
                {!submitting && !clientSecret && (
                  <div className="cot-pay-hint">Preparando el pago…</div>
                )}
                {clientSecret && (
                  <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                )}
                {!acceptedTerms && (
                  <div className="cot-pay-overlay">
                    <div className="cot-pay-overlay-card">
                      <div className="cot-pay-overlay-title">Acepta los términos para pagar</div>
                      <div className="cot-pay-overlay-sub">Marca la casilla al final del formulario para habilitar el pago.</div>
                    </div>
                  </div>
                )}
              </div>

              {err && (
                <div style={{ background: "rgba(255,107,71,.12)", border: "1px solid rgba(255,107,71,.35)", color: "#ffa78e", borderRadius: 10, padding: "0.75rem 1rem", marginTop: "1rem", fontSize: ".88rem" }}>
                  {err}
                </div>
              )}

              <SectionTitle>Datos del destinatario en Venezuela</SectionTitle>
              <p className="sub" style={{ marginTop: "-.4rem", marginBottom: "1rem" }}>
                Para entregar la caja necesitamos estos datos. Si prefieres, puedes pagar primero y enviárnoslos por WhatsApp.
              </p>
              <div className="row-2">
                <div className="field">
                  <label>Nombre</label>
                  <input value={s.nombre} onChange={(e) => update("nombre", e.target.value)} placeholder="Nombre del destinatario" />
                </div>
                <div className="field">
                  <label>Apellidos</label>
                  <input value={s.apellidos} onChange={(e) => update("apellidos", e.target.value)} placeholder="Apellidos del destinatario" />
                </div>
              </div>
              <div className="field">
                <label>Dirección de la calle</label>
                <input value={s.direccion} onChange={(e) => update("direccion", e.target.value)} placeholder="Nombre de la calle y número de la casa" />
              </div>
              <div className="field">
                <label>Apartamento, habitación, etc. (opcional)</label>
                <input value={s.apartamento} onChange={(e) => update("apartamento", e.target.value)} />
              </div>
              <div className="row-2">
                <div className="field">
                  <label>Ciudad</label>
                  <input value={s.poblacion} onChange={(e) => update("poblacion", e.target.value)} />
                </div>
                <div className="field">
                  <label>Estado</label>
                  <input value={s.provincia || s.estadoVeKey} onChange={(e) => update("provincia", e.target.value)} />
                </div>
              </div>
              <div className="row-2">
                <div className="field">
                  <label>Código postal</label>
                  <input value={s.cp} onChange={(e) => update("cp", e.target.value)} />
                </div>
                <div className="field">
                  <label>WhatsApp del destinatario</label>
                  <input value={s.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+58 ..." />
                </div>
              </div>
              <div className="field">
                <label>Notas del pedido (opcional)</label>
                <textarea value={s.notas} onChange={(e) => update("notas", e.target.value)} placeholder="Notas para la entrega o el contenido de la caja…" />
              </div>

              <label className="cot-terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span>
                  He leído y estoy de acuerdo con los{" "}
                  <a href="/terminos" target="_blank" rel="noopener noreferrer" className="cot-terms-link">
                    Términos y condiciones
                  </a>{" "}
                  <span className="cot-terms-req">*</span>
                </span>
              </label>

              <div className="cot-actions" style={{ justifyContent: "flex-start", marginTop: "1.5rem" }}>
                <button className="btn-prev" onClick={() => setStep(2)}>← Atrás</button>
              </div>
            </div>

            <aside className="tu-pedido">
              <h3>Tu pedido</h3>
              <div className="row"><span className="k">Origen</span><span className="v">{s.ciudadUsa}, {estadoUsa?.nombre}</span></div>
              <div className="row"><span className="k">Destino</span><span className="v">{s.ciudadVe}, {s.estadoVeKey}</span></div>
              <div className="row"><span className="k">Tipo de envío</span><span className="v">{s.modo === "maritimo" ? <><IconShip /> Marítimo</> : <><IconPlane /> Aéreo</>}</span></div>
              <div className="row"><span className="k">Tamaño de la caja</span><span className="v"><IconBox /> {s.caja}</span></div>
              {s.modo === "aereo" && (
                <div className="row"><span className="k">Peso</span><span className="v">{s.pesoLb} lb</span></div>
              )}
              <div className="row total-row"><span className="k">Total</span><span className="v">${cotizacion.total.toFixed(2)}</span></div>
              <div className="badges">
                <span className="b"><IconCheck /> Seguro de $500 incluido</span>
                <span className="b"><IconCheck /> Impuestos de aduana incluidos</span>
                <span className="b"><IconCheck /> Entrega puerta a puerta</span>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* WhatsApp support bubble — só visível nos steps 2 e 3 */}
      {step >= 2 && (
        <a
          className="wa-bubble"
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Soporte por WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.95 7.95 0 0 0-6.94 11.92L4 20l4.2-1.1a7.94 7.94 0 0 0 3.85.98h.01a7.94 7.94 0 0 0 5.54-13.56zm-5.55 12.21h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.49.65.66-2.43-.15-.25a6.61 6.61 0 0 1 10.27-8.16 6.55 6.55 0 0 1 1.93 4.66 6.62 6.62 0 0 1-6.61 6.59zm3.62-4.94c-.2-.1-1.18-.58-1.36-.64-.18-.07-.32-.1-.45.1-.13.2-.51.64-.62.77-.12.13-.23.15-.43.05a5.43 5.43 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.38c-.12-.2-.01-.3.09-.4l.3-.36c.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35l-.61-1.48c-.16-.4-.33-.34-.45-.34l-.39-.01c-.13 0-.35.05-.53.25a2.13 2.13 0 0 0-.67 1.59c0 .94.68 1.84.78 1.98.1.13 1.34 2.04 3.25 2.86.45.2.81.31 1.09.4.46.15.87.13 1.2.08.37-.06 1.13-.46 1.29-.91.16-.45.16-.83.11-.91-.05-.08-.18-.13-.38-.23z" />
          </svg>
          <span className="lbl">¿Necesitas ayuda?</span>
        </a>
      )}
    </main>
  );
}

function Stepper({ step }: { step: number }) {
  const items = ["Origen y destino", "Paquete", "Pago"];
  return (
    <div className="stepper">
      {items.map((label, i) => {
        const num = i + 1;
        const status = step === num ? "active" : step > num ? "done" : "";
        return (
          <div key={i} style={{ display: "contents" }}>
            <div className={`step-item ${status}`}>
              <span className={`step-num ${status}`}>{step > num ? "✓" : num}</span>
              <span className="step-label">{label}</span>
            </div>
            {i < items.length - 1 && <span className={`step-bar ${step > num ? "done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

function ModoCard({ value, selected, onClick, icon, title, desc }: { value: string; selected: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <label className={`radio-card ${selected ? "selected" : ""}`}>
      <input type="radio" name="modo" value={value} checked={selected} onChange={onClick} />
      <span className="ic">{icon}</span>
      <div className="body">
        <div className="ttl">{title}</div>
        <div className="desc">{desc}</div>
      </div>
    </label>
  );
}

function CajaCard({ value, selected, onClick, title, desc }: { value: string; selected: boolean; onClick: () => void; title: string; desc: string }) {
  return (
    <label className={`radio-card ${selected ? "selected" : ""}`}>
      <input type="radio" name="caja" value={value} checked={selected} onChange={onClick} />
      <span className="ic"><IconBox /></span>
      <div className="body">
        <div className="ttl">{title}</div>
        <div className="desc">{desc}</div>
      </div>
    </label>
  );
}

// Flat icons (stroke 1.5, linecap round). Cor herda do .ic via currentColor.
function IconShip() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21l1.6 5a2 2 0 0 0 1.9 1.4h17a2 2 0 0 0 1.9-1.4L28 21" />
      <path d="M6 21V13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M11 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
      <path d="M16 5V2" />
      <path d="M16 11v10" />
    </svg>
  );
}

function IconPlane() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 17.5L18.5 16l-3 9.5-2.5-1L13 18 5.5 16 4 14l24-7-2 7 1.5 2L28 17.5z" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M27 10L16 5 5 10v12l11 5 11-5z" />
      <path d="M5 10l11 5 11-5" />
      <path d="M16 15v12" />
      <path d="M10.5 7.5l11 5" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: "0.85rem",
      fontWeight: 500,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--yellow)",
      margin: "1.8rem 0 0.8rem",
    }}>{children}</h3>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
