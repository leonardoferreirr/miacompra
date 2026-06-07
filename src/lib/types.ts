import type { Caja, Modo } from "./rates";

export type CartItem = {
  id: string;
  modo: Modo;
  caja: Caja;
  pesoLb: number;
  total: number;
  detalle: string;
};

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
  whatsapp2: string;
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
  whatsapp2: "",
  notas: "",
};
