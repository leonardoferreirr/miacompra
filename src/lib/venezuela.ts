// Estados e ciudades principais de Venezuela. Não influencia preço — só metadata
// pra cobrança e despacho, mas inclui-se a lista mesmo assim porque a página de
// envío precisa pedir o destino do destinatário.

export const ESTADOS_VE: Record<string, string[]> = {
  Amazonas: ["Puerto Ayacucho"],
  Anzoátegui: ["Anaco", "Barcelona", "El Tigre", "Lechería", "Puerto La Cruz"],
  Apure: ["Biruaca", "Guasdualito", "San Fernando de Apure"],
  Aragua: ["Cagua", "La Victoria", "Maracay", "Turmero", "Villa de Cura"],
  Barinas: ["Barinas", "Barinitas", "Sabaneta", "Socopó"],
  Bolívar: ["Ciudad Bolívar", "Ciudad Guayana (San Félix · Puerto Ordaz)", "Tumeremo", "Upata"],
  Carabobo: ["Guacara", "Mariara", "Puerto Cabello", "San Joaquín", "Valencia"],
  Cojedes: ["San Carlos", "Tinaco", "Tinaquillo"],
  "Delta Amacuro": ["Tucupita"],
  Distrito_Capital: ["Caracas"],
  Falcón: ["Coro", "Punto Fijo", "Tucacas"],
  Guárico: ["Calabozo", "San Juan de los Morros", "Valle de la Pascua", "Zaraza"],
  La_Guaira: ["La Guaira", "Macuto", "Maiquetía"],
  Lara: ["Barquisimeto", "Cabudare", "Carora", "El Tocuyo"],
  Mérida: ["Ejido", "El Vigía", "Mérida", "Tovar"],
  Miranda: ["Charallave", "Guarenas", "Guatire", "Los Teques", "Petare", "Santa Teresa del Tuy"],
  Monagas: ["Caripito", "Maturín", "Punta de Mata", "Temblador"],
  "Nueva Esparta": ["La Asunción", "Pampatar", "Porlamar", "Punta de Piedras"],
  Portuguesa: ["Acarigua", "Araure", "Guanare", "Píritu", "Villa Bruzual"],
  Sucre: ["Carúpano", "Cumaná", "Güiria"],
  Táchira: ["La Fría", "Rubio", "San Antonio del Táchira", "San Cristóbal", "Táriba"],
  Trujillo: ["Boconó", "Trujillo", "Valera"],
  Yaracuy: ["Chivacoa", "Nirgua", "San Felipe", "Yaritagua"],
  Zulia: ["Cabimas", "Ciudad Ojeda", "Machiques", "Maracaibo", "San Francisco", "Santa Bárbara del Zulia"],
};

export const ESTADOS_VE_LIST = Object.entries(ESTADOS_VE)
  .map(([key, ciudades]) => ({ key: key.replace(/_/g, " "), ciudades }))
  .sort((a, b) => a.key.localeCompare(b.key));
