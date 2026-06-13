// scripts/generate-rates.mjs
//
// Regenera src/lib/rates-data.ts a partir da planilha "Detalle Base" do Google
// (aba `detalle base`), que é a FONTE ÚNICA de tarifas da Mia Compra.
//
// Lê as colunas:
//   Estado, Ciudad, Tipo Caja, Tarifa Pie Cubico (G = $/ft³ marítimo),
//   Tarifa Libra (H = $/lb aéreo).
// Ignora Pie Cubico Caja / Peso Volumen / Costo FedEx — o volume e o peso
// volumétrico de cada caja são CONSTANTES (ver CAJAS em rates.ts), iguais aos
// que o bot (orquestrador pricing.py) usa, pra os dois canais baterem ao centavo.
//
// fallbackCiudad = cidade mais cara do estado (maior tarifa Small ft³). Quando
// alguém escolhe uma cidade sem tarifa própria, cai nessa — nunca paga menos.
//
// Roda no GitHub Action (cron). Se o arquivo gerado mudar, o workflow commita e
// o Vercel redeploya sozinho. Sem precisão cheia perdida: emitimos o float exato.
//
// Uso: node scripts/generate-rates.mjs   (escreve src/lib/rates-data.ts)
//      node scripts/generate-rates.mjs --check   (não escreve; sai 1 se mudou)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SHEET_ID = "1AAwjK74paAnNGTV5A_9lePyvNKDHGdjcRIoKAnqZjb0";
const SHEET_TAB = "detalle base";
const CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}` +
  `/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_TAB)}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/lib/rates-data.ts");

const CAJA_MAP = { SMALL: "Small", MEDIUM: "Medium", LARGE: "Large" };

// --- CSV parser mínimo (campos entre aspas, vírgula separadora) ----------
function parseCSV(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* ignora */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// "44,63333333" -> 44.63333333  (decimal vírgula → ponto)
function num(s) {
  const t = String(s).trim().replace(/\./g, "").replace(",", ".");
  // obs: tarifas não têm separador de milhar; o replace de "." é defensivo.
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function titleCase(s) {
  return s
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function stateKey(estado) {
  return estado.trim().toUpperCase().replace(/\s+/g, "_");
}

async function main() {
  const check = process.argv.includes("--check");

  const res = await fetch(CSV_URL, { redirect: "follow" });
  if (!res.ok) throw new Error(`Planilha respondeu ${res.status}`);
  const csv = await res.text();
  const rows = parseCSV(csv);

  const header = rows.shift().map((h) => h.trim());
  const idx = (name) => header.indexOf(name);
  const iEstado = idx("Estado");
  const iCiudad = idx("Ciudad");
  const iCaja = idx("Tipo Caja");
  const iG = idx("Tarifa Pie Cubico");
  const iH = idx("Tarifa Libra");
  if ([iEstado, iCiudad, iCaja, iG, iH].some((i) => i < 0)) {
    throw new Error("Colunas esperadas não encontradas no header da planilha.");
  }

  // estados[KEY] = { nombre, ciudades: { Ciudad: { Small:{ft3,lb}, ... } } }
  const estados = {};
  for (const r of rows) {
    if (!r[iEstado]) continue;
    const key = stateKey(r[iEstado]);
    const nombre = titleCase(r[iEstado]);
    const ciudad = titleCase(r[iCiudad]);
    const caja = CAJA_MAP[(r[iCaja] || "").trim().toUpperCase()];
    if (!caja) continue;
    const g = num(r[iG]);
    const h = num(r[iH]);
    if (g === null || h === null || g <= 0 || h <= 0) continue;

    estados[key] ??= { nombre, ciudades: {} };
    estados[key].ciudades[ciudad] ??= {};
    estados[key].ciudades[ciudad][caja] = { ft3: g, lb: h };
  }

  // Validação + fallbackCiudad (cidade com maior tarifa Small ft³).
  const out = {};
  const problemas = [];
  for (const [key, e] of Object.entries(estados)) {
    const ciudades = {};
    let fallback = null;
    let fallbackG = -1;
    for (const [ciudad, cajas] of Object.entries(e.ciudades)) {
      if (!cajas.Small || !cajas.Medium || !cajas.Large) {
        problemas.push(`${key}/${ciudad}: faltam tarifas de alguma caja (descartada)`);
        continue;
      }
      ciudades[ciudad] = {
        Small: cajas.Small,
        Medium: cajas.Medium,
        Large: cajas.Large,
      };
      if (cajas.Small.ft3 > fallbackG) { fallbackG = cajas.Small.ft3; fallback = ciudad; }
    }
    if (!fallback) { problemas.push(`${key}: sem nenhuma cidade válida (estado descartado)`); continue; }
    out[key] = { nombre: e.nombre, fallbackCiudad: fallback, ciudades };
  }

  const nEstados = Object.keys(out).length;
  const nCiudades = Object.values(out).reduce((a, e) => a + Object.keys(e.ciudades).length, 0);
  if (nEstados < 40) throw new Error(`Só ${nEstados} estados válidos — planilha suspeita, abortando.`);

  const generated = renderFile(out);

  if (check) {
    let current = "";
    try { current = readFileSync(OUT_PATH, "utf8"); } catch {}
    const changed = current.trim() !== generated.trim();
    console.log(`[check] estados=${nEstados} ciudades=${nCiudades} changed=${changed}`);
    if (problemas.length) console.log("avisos:\n  " + problemas.join("\n  "));
    process.exit(changed ? 1 : 0);
  }

  writeFileSync(OUT_PATH, generated);
  console.log(`Gerado ${OUT_PATH}: ${nEstados} estados, ${nCiudades} cidades.`);
  if (problemas.length) console.log("avisos:\n  " + problemas.join("\n  "));
}

function renderFile(out) {
  const keys = Object.keys(out).sort();
  let body = "";
  for (const key of keys) {
    const e = out[key];
    body += `  ${key}: {\n`;
    body += `    nombre: ${JSON.stringify(e.nombre)},\n`;
    body += `    fallbackCiudad: ${JSON.stringify(e.fallbackCiudad)},\n`;
    body += `    ciudades: {\n`;
    for (const ciudad of Object.keys(e.ciudades).sort()) {
      const c = e.ciudades[ciudad];
      const f = (t) => `{ ft3: ${t.ft3}, lb: ${t.lb} }`;
      body += `      ${JSON.stringify(ciudad)}: { Small: ${f(c.Small)}, Medium: ${f(c.Medium)}, Large: ${f(c.Large)} },\n`;
    }
    body += `    },\n  },\n`;
  }
  return (
`// ⚠️  ARQUIVO GERADO — NÃO EDITE À MÃO.
// Fonte: planilha "Detalle Base" da Mia Compra (aba detalle base).
// Regenere com: node scripts/generate-rates.mjs
// O GitHub Action sync-rates roda isto periodicamente e, se algo mudar,
// commita e o Vercel redeploya. Editar aqui à mão será sobrescrito.

import type { EstadoRate } from "./rates";

export const ESTADOS_USA: Record<string, EstadoRate> = {
${body}};
`
  );
}

main().catch((e) => { console.error("ERRO:", e.message); process.exit(2); });
