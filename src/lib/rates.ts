// Fonte: LatinShip - Análisis de tarifas USA hacia Venezuela
// Estrutura: estado -> { rate, ciudades }
// rate.ft3 = tarifa sugerida $/pie cúbico (marítimo)
// rate.lb  = tarifa sugerida $/libra (aéreo)
// Ciudades são as ÂNCORAS — subúrbios da região metropolitana caem na cidade-âncora.

export type Caja = "Small" | "Medium" | "Large";
export type Modo = "maritimo" | "aereo";

export type BoxSpec = {
  label: string;
  /** Dimensões físicas externas em polegadas (LxWxH) */
  dim: string;
  ft3: number;
  pesoVolumenLb: number;
  /** Peso máximo permitido por caja, aplicado em qualquer modo (aéreo ou marítimo). */
  maxPesoAereoLb: number;
};

export const CAJAS: Record<Caja, BoxSpec> = {
  Small: { label: "17 × 11 × 11 pol", dim: "17×11×11 pol", ft3: 1.19, pesoVolumenLb: 12.39, maxPesoAereoLb: 40 },
  Medium: { label: "21 × 16 × 15 pol", dim: "21×16×15 pol", ft3: 2.92, pesoVolumenLb: 30.36, maxPesoAereoLb: 50 },
  Large: { label: "27 × 16 × 15 pol", dim: "27×16×15 pol", ft3: 3.75, pesoVolumenLb: 39.04, maxPesoAereoLb: 50 },
};

export type EstadoRate = {
  nombre: string;
  ft3: number;
  lb: number;
  clasif: "Alta" | "Media" | "Baja";
  ciudades: string[];
};

export const ESTADOS_USA: Record<string, EstadoRate> = {
  ALABAMA:        { nombre: "Alabama",        ft3: 48,  lb: 6.25, clasif: "Baja",  ciudades: ["Birmingham", "Huntsville", "Mobile", "Montgomery", "Tuscaloosa"] },
  ALASKA:         { nombre: "Alaska",         ft3: 110, lb: 12.25,clasif: "Alta",  ciudades: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Wasilla"] },
  ARIZONA:        { nombre: "Arizona",        ft3: 61,  lb: 7.75, clasif: "Alta",  ciudades: ["Chandler", "Glendale", "Kingman", "Mesa", "Phoenix", "Tucson", "Yuma"] },
  ARKANSAS:       { nombre: "Arkansas",       ft3: 50,  lb: 6.5,  clasif: "Baja",  ciudades: ["Fayetteville", "Fort Smith", "Jonesboro", "Little Rock", "Springdale"] },
  CALIFORNIA:     { nombre: "California",     ft3: 60,  lb: 7.5,  clasif: "Alta",  ciudades: ["Los Angeles", "Sacramento", "San Diego", "San Francisco", "San José"] },
  COLORADO:       { nombre: "Colorado",       ft3: 59,  lb: 7.5,  clasif: "Alta",  ciudades: ["Aurora", "Colorado Springs", "Denver", "Lakewood", "Pueblo"] },
  CONNECTICUT:    { nombre: "Connecticut",    ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Bridgeport", "Hartford", "New Haven", "Norwalk", "Stamford"] },
  DELAWARE:       { nombre: "Delaware",       ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Dover", "Georgetown", "Middletown", "Newark", "Seaford"] },
  FLORIDA:        { nombre: "Florida",        ft3: 47,  lb: 6.25, clasif: "Baja",  ciudades: ["Cape Coral", "Fort Lauderdale", "Hialeah", "Jacksonville", "Miami", "Orlando", "Port St. Lucie", "St. Petersburg", "Tallahassee", "Tampa"] },
  GEORGIA:        { nombre: "Georgia",        ft3: 53,  lb: 6.75, clasif: "Media", ciudades: ["Athens", "Atlanta", "Columbus", "Gainesville", "Marietta", "Norcross", "Savannah"] },
  HAWAII:         { nombre: "Hawaii",         ft3: 105, lb: 12,   clasif: "Alta",  ciudades: ["Honolulu"] },
  IDAHO:          { nombre: "Idaho",          ft3: 55,  lb: 7,    clasif: "Alta",  ciudades: ["Boise", "Caldwell", "Meridian", "Nampa", "Pocatello"] },
  ILLINOIS:       { nombre: "Illinois",       ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Aurora", "Chicago", "Cicero", "Joliet", "Springfield"] },
  INDIANA:        { nombre: "Indiana",        ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Carmel", "Evansville", "Fort Wayne", "Indianapolis", "South Bend"] },
  IOWA:           { nombre: "Iowa",           ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Cedar Rapids", "Davenport", "Des Moines", "Iowa City", "Waterloo"] },
  KANSAS:         { nombre: "Kansas",         ft3: 51,  lb: 6.75, clasif: "Media", ciudades: ["Kansas City", "Lawrence", "Overland Park", "Topeka", "Wichita"] },
  KENTUCKY:       { nombre: "Kentucky",       ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Bowling Green", "Florence", "Lexington", "Louisville", "Richmond"] },
  LOUISIANA:      { nombre: "Louisiana",      ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Baton Rouge", "Lafayette", "Lake Charles", "New Orleans", "Shreveport"] },
  MAINE:          { nombre: "Maine",          ft3: 52,  lb: 6.75, clasif: "Media", ciudades: ["Auburn", "Augusta", "Bangor", "Lewiston", "Portland", "South Portland"] },
  MARYLAND:       { nombre: "Maryland",       ft3: 48,  lb: 6.5,  clasif: "Baja",  ciudades: ["Annapolis", "Baltimore", "Frederick", "Gaithersburg", "Rockville"] },
  MASSACHUSETTS:  { nombre: "Massachusetts",  ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Boston", "Brockton", "Cambridge", "New Bedford", "Worcester"] },
  MICHIGAN:       { nombre: "Michigan",       ft3: 51,  lb: 6.5,  clasif: "Baja",  ciudades: ["Ann Arbor", "Detroit", "Grand Rapids", "Lansing", "Sterling Heights", "Warren"] },
  MINNESOTA:      { nombre: "Minnesota",      ft3: 53,  lb: 6.75, clasif: "Media", ciudades: ["Bloomington", "Duluth", "Minneapolis", "Rochester", "Saint Paul"] },
  MISSISSIPPI:    { nombre: "Mississippi",    ft3: 48,  lb: 6.5,  clasif: "Baja",  ciudades: ["Biloxi", "Gulfport", "Jackson", "Olive Branch", "Southaven"] },
  MISSOURI:       { nombre: "Missouri",       ft3: 51,  lb: 6.5,  clasif: "Baja",  ciudades: ["Columbia", "Independence", "Jefferson City", "Kansas City", "St. Louis"] },
  MONTANA:        { nombre: "Montana",        ft3: 54,  lb: 7,    clasif: "Alta",  ciudades: ["Billings", "Great Falls", "Helena", "Kalispell", "Missoula"] },
  NEBRASKA:       { nombre: "Nebraska",       ft3: 51,  lb: 6.75, clasif: "Media", ciudades: ["Bellevue", "Fremont", "Grand Island", "Lincoln", "Omaha"] },
  NEVADA:         { nombre: "Nevada",         ft3: 55,  lb: 7,    clasif: "Alta",  ciudades: ["Carson City", "Henderson", "Las Vegas", "North Las Vegas", "Reno"] },
  NEW_HAMPSHIRE:  { nombre: "New Hampshire",  ft3: 51,  lb: 6.5,  clasif: "Baja",  ciudades: ["Concord", "Derry", "Manchester", "Nashua", "Rochester"] },
  NEW_JERSEY:     { nombre: "New Jersey",     ft3: 57,  lb: 7.25, clasif: "Alta",  ciudades: ["Elizabeth", "Jersey City", "Newark", "Paterson", "Trenton", "Union City"] },
  NEW_MEXICO:     { nombre: "New Mexico",     ft3: 53,  lb: 6.75, clasif: "Alta",  ciudades: ["Albuquerque", "Las Cruces", "Rio Rancho", "Roswell", "Santa Fe"] },
  NEW_YORK:       { nombre: "New York",       ft3: 58,  lb: 7.25, clasif: "Alta",  ciudades: ["Albany", "Bronx", "New York City", "Queens", "Yonkers"] },
  NORTH_CAROLINA: { nombre: "North Carolina", ft3: 48,  lb: 6.5,  clasif: "Baja",  ciudades: ["Charlotte", "Durham", "Greensboro", "Raleigh", "Winston-Salem"] },
  NORTH_DAKOTA:   { nombre: "North Dakota",   ft3: 55,  lb: 7,    clasif: "Alta",  ciudades: ["Bismarck", "Fargo", "Grand Forks", "Minot", "West Fargo"] },
  OHIO:           { nombre: "Ohio",           ft3: 50,  lb: 6.5,  clasif: "Baja",  ciudades: ["Akron", "Cincinnati", "Cleveland", "Columbus", "Dayton"] },
  OKLAHOMA:       { nombre: "Oklahoma",       ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Broken Arrow", "Lawton", "Norman", "Oklahoma City", "Tulsa"] },
  OREGON:         { nombre: "Oregon",         ft3: 54,  lb: 7,    clasif: "Alta",  ciudades: ["Beaverton", "Eugene", "Gresham", "Portland", "Salem"] },
  PENNSYLVANIA:   { nombre: "Pennsylvania",   ft3: 48,  lb: 6.5,  clasif: "Baja",  ciudades: ["Allentown", "Erie", "Harrisburg", "Philadelphia", "Pittsburgh", "Reading"] },
  RHODE_ISLAND:   { nombre: "Rhode Island",   ft3: 51,  lb: 6.5,  clasif: "Media", ciudades: ["Cranston", "East Providence", "Pawtucket", "Providence", "Warwick"] },
  SOUTH_CAROLINA: { nombre: "South Carolina", ft3: 48,  lb: 6.25, clasif: "Baja",  ciudades: ["Charleston", "Columbia", "Greenville", "North Charleston", "Spartanburg"] },
  SOUTH_DAKOTA:   { nombre: "South Dakota",   ft3: 53,  lb: 6.75, clasif: "Media", ciudades: ["Aberdeen", "Deadwood", "Pierre", "Rapid City", "Sioux Falls"] },
  TENNESSEE:      { nombre: "Tennessee",      ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Chattanooga", "Knoxville", "Memphis", "Murfreesboro", "Nashville"] },
  TEXAS:          { nombre: "Texas",          ft3: 51,  lb: 6.75, clasif: "Media", ciudades: ["Austin", "Dallas", "El Paso", "Houston", "San Antonio"] },
  UTAH:           { nombre: "Utah",           ft3: 55,  lb: 7,    clasif: "Alta",  ciudades: ["Ogden", "Orem", "Salt Lake City", "West Jordan", "West Valley City"] },
  VERMONT:        { nombre: "Vermont",        ft3: 51,  lb: 6.5,  clasif: "Baja",  ciudades: ["Barre", "Burlington", "Montpelier", "Rutland", "St. Albans"] },
  VIRGINIA:       { nombre: "Virginia",       ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Chesapeake", "Newport News", "Norfolk", "Richmond", "Virginia Beach"] },
  WASHINGTON:     { nombre: "Washington",     ft3: 52,  lb: 7,    clasif: "Alta",  ciudades: ["Kent", "Olympia", "Seattle", "Spokane", "Tacoma", "Vancouver"] },
  WEST_VIRGINIA:  { nombre: "West Virginia",  ft3: 49,  lb: 6.5,  clasif: "Baja",  ciudades: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"] },
  WISCONSIN:      { nombre: "Wisconsin",      ft3: 51,  lb: 6.75, clasif: "Media", ciudades: ["Green Bay", "Kenosha", "Madison", "Milwaukee", "Racine"] },
  WYOMING:        { nombre: "Wyoming",        ft3: 54,  lb: 7,    clasif: "Alta",  ciudades: ["Casper", "Cheyenne", "Laramie", "Sheridan"] },
};

// Cálculo do preço — fonte única de verdade
export function cotizar(opts: {
  estadoKey: string;
  caja: Caja;
  modo: Modo;
  pesoLb: number;
}): { total: number; detalle: string } {
  const e = ESTADOS_USA[opts.estadoKey];
  const c = CAJAS[opts.caja];
  if (!e || !c) return { total: 0, detalle: "Datos incompletos" };

  if (opts.modo === "maritimo") {
    const total = e.ft3 * c.ft3;
    return {
      total,
      detalle: `${c.ft3} ft³ × $${e.ft3.toFixed(2)}/ft³`,
    };
  }
  // aéreo: max(peso real, peso volumen)
  const pesoFinal = Math.max(opts.pesoLb, c.pesoVolumenLb);
  const total = e.lb * pesoFinal;
  return {
    total,
    detalle: `${pesoFinal.toFixed(2)} lb × $${e.lb.toFixed(2)}/lb`,
  };
}

// Lista plana de estados ordenada alfabeticamente
export const ESTADOS_LIST = Object.entries(ESTADOS_USA)
  .map(([key, e]) => ({ key, ...e }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre));
