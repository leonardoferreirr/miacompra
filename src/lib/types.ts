import type { Caja, Modo } from "./rates";

export type CotizacionState = {
  // step 1
  estadoUsaKey: string | "";
  ciudadUsa: string | "";
  estadoVeKey: string | "";
  ciudadVe: string | "";
  // step 2
  modo: Modo | "";
  caja: Caja | "";
  pesoLb: number | "";
  // step 3
  email: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  apartamento: string;
  poblacion: string;
  provincia: string;
  cp: string;
  whatsapp: string;
  notas: string;
};

export const INITIAL_STATE: CotizacionState = {
  estadoUsaKey: "",
  ciudadUsa: "",
  estadoVeKey: "",
  ciudadVe: "",
  modo: "",
  caja: "",
  pesoLb: "",
  email: "",
  nombre: "",
  apellidos: "",
  direccion: "",
  apartamento: "",
  poblacion: "",
  provincia: "",
  cp: "",
  whatsapp: "",
  notas: "",
};
