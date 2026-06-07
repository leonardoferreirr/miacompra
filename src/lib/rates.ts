// Fonte: planilha "Detalle Base" da Mia Compra (extraída via Composio)
// Estrutura: estado -> ciudades -> caja -> { ft3 (marítimo $/ft³), lb (aéreo $/lb) }
// Cidade ausente cai em fallbackCiudad (a cidade mais cara do estado).

export type Caja = "Small" | "Medium" | "Large";
export type Modo = "maritimo" | "aereo";

export type BoxSpec = {
  label: string;
  dim: string;
  ft3: number;
  pesoVolumenLb: number;
  maxPesoAereoLb: number;
};

export const CAJAS: Record<Caja, BoxSpec> = {
  Small:  { label: "17 × 11 × 11 in", dim: "17×11×11 in", ft3: 1.19, pesoVolumenLb: 12.39, maxPesoAereoLb: 40 },
  Medium: { label: "21 × 16 × 15 in", dim: "21×16×15 in", ft3: 2.92, pesoVolumenLb: 30.36, maxPesoAereoLb: 50 },
  Large:  { label: "27 × 16 × 15 in", dim: "27×16×15 in", ft3: 3.75, pesoVolumenLb: 39.04, maxPesoAereoLb: 50 },
};

export type TarifaCaja = { ft3: number; lb: number };
export type CiudadTarifa = { Small: TarifaCaja; Medium: TarifaCaja; Large: TarifaCaja };
export type EstadoRate = {
  nombre: string;
  fallbackCiudad: string;
  ciudades: Record<string, CiudadTarifa>;
};

export const ESTADOS_USA: Record<string, EstadoRate> = {
  ALABAMA: {
    nombre: "Alabama",
    fallbackCiudad: "Birmingham",
    ciudades: {
      "Birmingham": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Huntsville": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Mobile": { Small: { ft3: 50.9416, lb: 6.5354 }, Medium: { ft3: 44.9377, lb: 5.9586 }, Large: { ft3: 43.7293, lb: 5.8425 } },
      "Montgomery": { Small: { ft3: 50.9416, lb: 6.5354 }, Medium: { ft3: 44.9377, lb: 5.9586 }, Large: { ft3: 43.7293, lb: 5.8425 } },
      "Tuscaloosa": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 44.9377, lb: 5.9586 }, Large: { ft3: 43.7293, lb: 5.8425 } },
    },
  },
  ALASKA: {
    nombre: "Alaska",
    fallbackCiudad: "Anchorage",
    ciudades: {
      "Anchorage": { Small: { ft3: 157.8138, lb: 16.802 }, Medium: { ft3: 96.1846, lb: 10.8816 }, Large: { ft3: 83.588, lb: 9.6715 } },
      "Fairbanks": { Small: { ft3: 157.8138, lb: 16.802 }, Medium: { ft3: 96.1846, lb: 10.8816 }, Large: { ft3: 83.588, lb: 9.6715 } },
      "Juneau": { Small: { ft3: 157.8138, lb: 16.802 }, Medium: { ft3: 96.1846, lb: 10.8816 }, Large: { ft3: 83.588, lb: 9.6715 } },
      "Sitka": { Small: { ft3: 157.8138, lb: 16.802 }, Medium: { ft3: 96.1846, lb: 10.8816 }, Large: { ft3: 83.588, lb: 9.6715 } },
      "Wasilla": { Small: { ft3: 157.8138, lb: 16.802 }, Medium: { ft3: 96.1846, lb: 10.8816 }, Large: { ft3: 83.588, lb: 9.6715 } },
    },
  },
  ARIZONA: {
    nombre: "Arizona",
    fallbackCiudad: "Winslow-pueblo",
    ciudades: {
      "Glendale": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "Mesa": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "Phoenix": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "Tucson": { Small: { ft3: 62.1984, lb: 7.6167 }, Medium: { ft3: 48.764, lb: 6.3262 }, Large: { ft3: 47.9907, lb: 6.2519 } },
      "Winslow-pueblo": { Small: { ft3: 88.173, lb: 10.112 }, Medium: { ft3: 61.0589, lb: 7.5073 }, Large: { ft3: 56.268, lb: 7.047 } },
      "Yuma": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
    },
  },
  ARKANSAS: {
    nombre: "Arkansas",
    fallbackCiudad: "Fayeteville",
    ciudades: {
      "Fayeteville": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Forth Smith": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Jonesboro": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Little Rock": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Springdale": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
    },
  },
  CALIFORNIA: {
    nombre: "California",
    fallbackCiudad: "Los Angeles",
    ciudades: {
      "Los Angeles": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "Sacramento": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "San Diego": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "San Francisco": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "San José": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
      "Susanville-pueblo": { Small: { ft3: 75.1521, lb: 8.8611 }, Medium: { ft3: 55.7446, lb: 6.9968 }, Large: { ft3: 52.1347, lb: 6.65 } },
    },
  },
  COLORADO: {
    nombre: "Colorado",
    fallbackCiudad: "Aurora",
    ciudades: {
      "Aurora": { Small: { ft3: 72.0607, lb: 8.5642 }, Medium: { ft3: 54.6234, lb: 6.8891 }, Large: { ft3: 51.2627, lb: 6.5662 } },
      "Colorado Springs": { Small: { ft3: 72.0607, lb: 8.5642 }, Medium: { ft3: 54.6234, lb: 6.8891 }, Large: { ft3: 51.2627, lb: 6.5662 } },
      "Denver": { Small: { ft3: 72.0607, lb: 8.5642 }, Medium: { ft3: 54.6234, lb: 6.8891 }, Large: { ft3: 51.2627, lb: 6.5662 } },
      "Lakewood": { Small: { ft3: 72.0607, lb: 8.5642 }, Medium: { ft3: 54.6234, lb: 6.8891 }, Large: { ft3: 51.2627, lb: 6.5662 } },
      "Pueblo": { Small: { ft3: 72.0607, lb: 8.5642 }, Medium: { ft3: 54.6234, lb: 6.8891 }, Large: { ft3: 51.2627, lb: 6.5662 } },
    },
  },
  CONNECTICUT: {
    nombre: "Connecticut",
    fallbackCiudad: "Bridgeport",
    ciudades: {
      "Bridgeport": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Hartford": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "New Heaven": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Norwalk": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Stamford": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  DELAWARE: {
    nombre: "Delaware",
    fallbackCiudad: "Dover",
    ciudades: {
      "Dover": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Georgetown": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Middeltown": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Newark": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Seaford": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
    },
  },
  FLORIDA: {
    nombre: "Florida",
    fallbackCiudad: "Jacksonville",
    ciudades: {
      "Cape Coral": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "Fort Lauderdale": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "Hialeah": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "Jacksonville": { Small: { ft3: 50.9416, lb: 6.5354 }, Medium: { ft3: 44.9377, lb: 5.9586 }, Large: { ft3: 43.7293, lb: 5.8425 } },
      "Miami": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "Orlando": { Small: { ft3: 50.6644, lb: 6.5087 }, Medium: { ft3: 44.0566, lb: 5.874 }, Large: { ft3: 43.044, lb: 5.7767 } },
      "Port St.lucie": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "St.petesburg": { Small: { ft3: 50.9332, lb: 6.5346 }, Medium: { ft3: 44.1663, lb: 5.8845 }, Large: { ft3: 43.1293, lb: 5.7849 } },
      "Tallahessee": { Small: { ft3: 50.6728, lb: 6.5095 }, Medium: { ft3: 44.8143, lb: 5.9467 }, Large: { ft3: 43.6333, lb: 5.8333 } },
      "Tampa": { Small: { ft3: 49.8495, lb: 6.4305 }, Medium: { ft3: 44.0531, lb: 5.8736 }, Large: { ft3: 42.916, lb: 5.7644 } },
    },
  },
  GEORGIA: {
    nombre: "Georgia",
    fallbackCiudad: "Gainsville",
    ciudades: {
      "Atlanta": { Small: { ft3: 63.3325, lb: 7.7257 }, Medium: { ft3: 49.9949, lb: 6.4444 }, Large: { ft3: 47.6627, lb: 6.2204 } },
      "Gainsville": { Small: { ft3: 65.5502, lb: 7.9387 }, Medium: { ft3: 51.1571, lb: 6.5561 }, Large: { ft3: 48.5667, lb: 6.3072 } },
      "Marietta": { Small: { ft3: 71.733, lb: 8.5327 }, Medium: { ft3: 49.9949, lb: 6.4444 }, Large: { ft3: 47.6627, lb: 6.2204 } },
      "Norcross": { Small: { ft3: 63.3325, lb: 7.7257 }, Medium: { ft3: 49.9949, lb: 6.4444 }, Large: { ft3: 47.6627, lb: 6.2204 } },
    },
  },
  HAWAII: {
    nombre: "Hawaii",
    fallbackCiudad: "Honolulu",
    ciudades: {
      "Honolulu": { Small: { ft3: 145.8682, lb: 15.6545 }, Medium: { ft3: 90.4589, lb: 10.3316 }, Large: { ft3: 79.1347, lb: 9.2437 } },
    },
  },
  IDAHO: {
    nombre: "Idaho",
    fallbackCiudad: "Boise",
    ciudades: {
      "Boise": { Small: { ft3: 62.7612, lb: 7.6708 }, Medium: { ft3: 51.9526, lb: 6.6325 }, Large: { ft3: 49.2653, lb: 6.3743 } },
      "Caldwell": { Small: { ft3: 62.7612, lb: 7.6708 }, Medium: { ft3: 51.9526, lb: 6.6325 }, Large: { ft3: 49.2653, lb: 6.3743 } },
      "Meridian": { Small: { ft3: 62.7612, lb: 7.6708 }, Medium: { ft3: 51.9526, lb: 6.6325 }, Large: { ft3: 49.2653, lb: 6.3743 } },
      "Nampa": { Small: { ft3: 62.7612, lb: 7.6708 }, Medium: { ft3: 51.9526, lb: 6.6325 }, Large: { ft3: 49.2653, lb: 6.3743 } },
      "Pocatello": { Small: { ft3: 62.7612, lb: 7.6708 }, Medium: { ft3: 51.9526, lb: 6.6325 }, Large: { ft3: 49.2653, lb: 6.3743 } },
    },
  },
  ILLINOIS: {
    nombre: "Illinois",
    fallbackCiudad: "Aurora",
    ciudades: {
      "Aurora": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Chicago": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Cicero": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Joliet": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Springfield": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
    },
  },
  INDIANA: {
    nombre: "Indiana",
    fallbackCiudad: "Carmel",
    ciudades: {
      "Carmel": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Evansville": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Fort Wayne": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Indianapolis": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "South Bend": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
    },
  },
  IOWA: {
    nombre: "Iowa",
    fallbackCiudad: "Cedar Rapids",
    ciudades: {
      "Cedar Rapids": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Davenport": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Des Moines": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Iowa City": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Waterloo": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
    },
  },
  KANSAS: {
    nombre: "Kansas",
    fallbackCiudad: "Kansas City",
    ciudades: {
      "Kansas City": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Lawrence": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Overland Park": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Topeka": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
      "Wichita": { Small: { ft3: 56.612, lb: 7.0801 }, Medium: { ft3: 47.8143, lb: 6.2349 }, Large: { ft3: 45.9667, lb: 6.0574 } },
    },
  },
  KENTUCKY: {
    nombre: "Kentucky",
    fallbackCiudad: "Bowling Green",
    ciudades: {
      "Bowling Green": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Florence": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Lexington": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Louisville": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Richmond": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
    },
  },
  LOUISIANA: {
    nombre: "Louisiana",
    fallbackCiudad: "Baton Rouge",
    ciudades: {
      "Baton Rouge": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Lafayette": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Lake Charles": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "New Orleans": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
      "Shreveport": { Small: { ft3: 53.1593, lb: 6.7484 }, Medium: { ft3: 46.1, lb: 6.0703 }, Large: { ft3: 44.6333, lb: 5.9294 } },
    },
  },
  MAINE: {
    nombre: "Maine",
    fallbackCiudad: "Auburn",
    ciudades: {
      "Auburn": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Bangor": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Lewiston": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Portland": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "South Portland": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
    },
  },
  MARYLAND: {
    nombre: "Maryland",
    fallbackCiudad: "Annapolis",
    ciudades: {
      "Annapolis": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Baltimmore": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Fredrick": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Gaithersburg": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Rockville": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  MASSACHUSETTS: {
    nombre: "Massachusetts",
    fallbackCiudad: "Boston",
    ciudades: {
      "Boston": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Brockton": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Cambridge": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "New Bedford": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Worcester": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  MICHIGAN: {
    nombre: "Michigan",
    fallbackCiudad: "Ann Arbor",
    ciudades: {
      "Ann Arbor": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Detroit": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Grand Rapids": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Sterling Heights": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Warren": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  MINNESOTA: {
    nombre: "Minnesota",
    fallbackCiudad: "Bloomington",
    ciudades: {
      "Bloomington": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Duluth": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Minneapolis": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Rochester": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Saint Paul": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
    },
  },
  MISSISSIPPI: {
    nombre: "Mississippi",
    fallbackCiudad: "Biloxi",
    ciudades: {
      "Biloxi": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Gulfport": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Jackson": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Olive Branch": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Southaven": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  MISSOURI: {
    nombre: "Missouri",
    fallbackCiudad: "Columbia",
    ciudades: {
      "Columbia": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Independence": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Jefferson City": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Kansas City": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "St.louis": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  MONTANA: {
    nombre: "Montana",
    fallbackCiudad: "Billings",
    ciudades: {
      "Billings": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Great Falls": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Helena": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Kalispell": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Missoula": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
  NEBRASKA: {
    nombre: "Nebraska",
    fallbackCiudad: "Grand Island",
    ciudades: {
      "Bellevue": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Fremont": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Grand Island": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Lincoln": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Omaha": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  NEVADA: {
    nombre: "Nevada",
    fallbackCiudad: "Carson City",
    ciudades: {
      "Carson City": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Henderson": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Las Vegas": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "North Las Vegas": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Reno": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
  NEW_HAMPSHIRE: {
    nombre: "New Hampshire",
    fallbackCiudad: "Concord",
    ciudades: {
      "Concord": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Derry": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Manchester": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Nashua": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Rochester": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  NEW_JERSEY: {
    nombre: "New Jersey",
    fallbackCiudad: "Elizabeth",
    ciudades: {
      "Elizabeth": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Jersey City": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Newark": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Paterson": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Union City": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
    },
  },
  NEW_MEXICO: {
    nombre: "New Mexico",
    fallbackCiudad: "Albuquerque",
    ciudades: {
      "Albuquerque": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Las Cruces": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Rio Rancho": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Roswell": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Santa Fe": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
    },
  },
  NEW_YORK: {
    nombre: "New York",
    fallbackCiudad: "Bronx",
    ciudades: {
      "Bronx": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "New York City": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Queens": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
      "Yonkers": { Small: { ft3: 69.0028, lb: 8.2704 }, Medium: { ft3: 52.8714, lb: 6.7208 }, Large: { ft3: 49.9, lb: 6.4353 } },
    },
  },
  NORTH_CAROLINA: {
    nombre: "North Carolina",
    fallbackCiudad: "Charlotte",
    ciudades: {
      "Charlotte": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Durham": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Greensboro": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Raleigh": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Winston-salem": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  NORTH_DAKOTA: {
    nombre: "North Dakota",
    fallbackCiudad: "Bismarck",
    ciudades: {
      "Bismarck": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Fargo": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Grand Forks": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Minot": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "West Fargo": { Small: { ft3: 66.8775, lb: 8.0662 }, Medium: { ft3: 48.9834, lb: 6.3473 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
  OHIO: {
    nombre: "Ohio",
    fallbackCiudad: "Cleveland",
    ciudades: {
      "Cincinnati": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Cleveland": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  OKLAHOMA: {
    nombre: "Oklahoma",
    fallbackCiudad: "Lawton",
    ciudades: {
      "Lawton": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Norman": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  OREGON: {
    nombre: "Oregon",
    fallbackCiudad: "Beaverton",
    ciudades: {
      "Beaverton": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Eugene": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Gresham": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Portland": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Salem": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
  PENNSYLVANIA: {
    nombre: "Pennsylvania",
    fallbackCiudad: "Allentown",
    ciudades: {
      "Allentown": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Erie": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Philadelphia": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Pittsburg": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Reading": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  RHODE_ISLAND: {
    nombre: "Rhode Island",
    fallbackCiudad: "Cranston",
    ciudades: {
      "Cranston": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "East Providence": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Pawtucket": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Providence": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Warwick": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  SOUTH_CAROLINA: {
    nombre: "South Carolina",
    fallbackCiudad: "Greenville",
    ciudades: {
      "Charleston": { Small: { ft3: 50.9248, lb: 6.5337 }, Medium: { ft3: 44.9343, lb: 5.9583 }, Large: { ft3: 43.7267, lb: 5.8423 } },
      "Columbia": { Small: { ft3: 50.9248, lb: 6.5337 }, Medium: { ft3: 44.9343, lb: 5.9583 }, Large: { ft3: 43.7267, lb: 5.8423 } },
      "Greenville": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "North Charleston": { Small: { ft3: 50.9248, lb: 6.5337 }, Medium: { ft3: 44.9343, lb: 5.9583 }, Large: { ft3: 43.7267, lb: 5.8423 } },
      "Spartanburg": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  SOUTH_DAKOTA: {
    nombre: "South Dakota",
    fallbackCiudad: "Aberdeen",
    ciudades: {
      "Aberdeen": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Deadwood": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Pierre": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Rapid City": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Sioux Falls": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
    },
  },
  TENNESSEE: {
    nombre: "Tennessee",
    fallbackCiudad: "Chatanooga",
    ciudades: {
      "Chatanooga": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Knoxville": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Memphis": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Murfreesboro": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Nashville": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  TEXAS: {
    nombre: "Texas",
    fallbackCiudad: "Alpine-pueblo",
    ciudades: {
      "Alpine-pueblo": { Small: { ft3: 59.2078, lb: 7.3294 }, Medium: { ft3: 49.3331, lb: 6.3808 }, Large: { ft3: 47.148, lb: 6.1709 } },
      "Austin": { Small: { ft3: 56.2172, lb: 7.0422 }, Medium: { ft3: 47.6223, lb: 6.2165 }, Large: { ft3: 45.8173, lb: 6.0431 } },
      "Dallas": { Small: { ft3: 56.2172, lb: 7.0422 }, Medium: { ft3: 47.6223, lb: 6.2165 }, Large: { ft3: 45.8173, lb: 6.0431 } },
      "El Paso": { Small: { ft3: 59.2078, lb: 7.3294 }, Medium: { ft3: 49.3331, lb: 6.3808 }, Large: { ft3: 47.148, lb: 6.1709 } },
      "Houston": { Small: { ft3: 52.8485, lb: 6.7186 }, Medium: { ft3: 45.9457, lb: 6.0554 }, Large: { ft3: 44.5133, lb: 5.9178 } },
      "San Antonio": { Small: { ft3: 56.2172, lb: 7.0422 }, Medium: { ft3: 47.6223, lb: 6.2165 }, Large: { ft3: 45.8173, lb: 6.0431 } },
    },
  },
  UTAH: {
    nombre: "Utah",
    fallbackCiudad: "Ogden",
    ciudades: {
      "Ogden": { Small: { ft3: 62.2236, lb: 7.6192 }, Medium: { ft3: 50.2554, lb: 6.4694 }, Large: { ft3: 49.5987, lb: 6.4064 } },
      "Orem": { Small: { ft3: 62.2236, lb: 7.6192 }, Medium: { ft3: 50.2554, lb: 6.4694 }, Large: { ft3: 49.5987, lb: 6.4064 } },
      "Salt Lake City": { Small: { ft3: 62.2236, lb: 7.6192 }, Medium: { ft3: 50.4269, lb: 6.4859 }, Large: { ft3: 47.9987, lb: 6.2526 } },
      "West Jordan": { Small: { ft3: 62.2236, lb: 7.6192 }, Medium: { ft3: 50.2554, lb: 6.4694 }, Large: { ft3: 49.5987, lb: 6.4064 } },
      "West Valley City": { Small: { ft3: 62.2236, lb: 7.6192 }, Medium: { ft3: 50.2554, lb: 6.4694 }, Large: { ft3: 49.5987, lb: 6.4064 } },
    },
  },
  VERMONT: {
    nombre: "Vermont",
    fallbackCiudad: "Montpelier",
    ciudades: {
      "Montpelier": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Burlington": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Rutland": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Barre": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "St. Albans": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  VIRGINIA: {
    nombre: "Virginia",
    fallbackCiudad: "Richmond",
    ciudades: {
      "Richmond": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Virginia Beach": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Norfolk": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Chesapeake": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Newport News": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  WASHINGTON: {
    nombre: "Washington",
    fallbackCiudad: "Seattle",
    ciudades: {
      "Seattle": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Spokane": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Tacoma": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Vancouver": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Kent": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
  WEST_VIRGINIA: {
    nombre: "West Virginia",
    fallbackCiudad: "Charleston",
    ciudades: {
      "Charleston": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Huntington": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Morgantown": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Parkersburg": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
      "Wheeling": { Small: { ft3: 53.1425, lb: 6.7468 }, Medium: { ft3: 46.0931, lb: 6.0696 }, Large: { ft3: 44.628, lb: 5.9288 } },
    },
  },
  WISCONSIN: {
    nombre: "Wisconsin",
    fallbackCiudad: "Milwaukee",
    ciudades: {
      "Milwaukee": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Madison": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Green Bay": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Kenosha": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
      "Racine": { Small: { ft3: 56.5952, lb: 7.0785 }, Medium: { ft3: 47.8074, lb: 6.2343 }, Large: { ft3: 45.9613, lb: 6.0569 } },
    },
  },
  WYOMING: {
    nombre: "Wyoming",
    fallbackCiudad: "Casper",
    ciudades: {
      "Casper": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Laramie": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Sheridan": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
      "Cheyenne": { Small: { ft3: 59.653, lb: 7.3722 }, Medium: { ft3: 49.556, lb: 6.4023 }, Large: { ft3: 47.3213, lb: 6.1876 } },
      "Rockspring-pueblo": { Small: { ft3: 62.736, lb: 7.6684 }, Medium: { ft3: 50.6737, lb: 6.5096 }, Large: { ft3: 48.1907, lb: 6.2711 } },
    },
  },
};

/** Cidades adicionais por estado (do arquivo USPS). Sem tarifa própria —
 *  caem no fallbackCiudad do estado correspondente ao calcular o preço. */
export const CIUDADES_EXTRA: Record<string, string[]> = {
  ALABAMA: ["Anniston", "Brewton", "Center Point", "Chickasaw", "Childersburg", "Fort Rucker", "Gadsden", "Hoover", "Hueytown", "Irondale", "Oxford", "Siluria", "Tallassee", "Vestavia", "Vestavia Hills"],
  ALASKA: ["Anderson", "Clear", "Douglas", "Dutch Harbor", "Eielson Afb", "Fort Wainwright", "Jber", "North Pole"],
  ARIZONA: ["Carefree", "Fort Huachuca", "Fort Mohave", "Luke Air Force Base", "Mohave Valley", "Prescott Valley", "Rio Rico", "Sedona", "Sun City West", "Surprise", "Vail"],
  ARKANSAS: ["Barling", "Bella Vista", "Camden", "Holiday Island", "Hot Springs National Park", "Hot Springs Village", "Hoxie", "Jacksonville", "Maumelle", "Monticello", "Sherwood", "White Hall"],
  CALIFORNIA: ["Albany", "Altaville", "American Canyon", "Arleta", "Auburn", "Baldwin Park", "Bay Point", "Beale Afb", "Calabasas", "California City", "Calpella", "Camp Pendleton", "Canyon Country", "Capistrano Beach", "Cardiff By The Sea", "Carson", "Castro Valley", "Cedarpines Park", "Cerritos", "City Of Industry", "Coronado", "Coyote", "Cudahy", "Diamond Bar", "Dublin", "East Palo Alto", "El Dorado Hills", "El Segundo", "El Sobrante", "Emeryville", "Encino", "Eureka", "Fort Irwin", "Foster City", "Fountain Valley", "Fresno", "Goleta", "Granada Hills", "Granite Bay", "Green Valley Lake", "Hacienda Heights", "Hayward", "Hercules", "Hermosa Beach", "Jurupa Valley", "Kentfield", "Kings Canyon National Pk", "La Crescenta", "La Puente", "Laguna Beach", "Laguna Hills", "Lakeshore", "Landers", "Lemoore", "Los Osos", "March Air Reserve Base", "Marina Del Rey", "Martinez", "Maywood", "Mcclellan", "Mckinleyville", "Menifee", "Menlo Park", "Midway City", "Mountain View", "Newbury Park", "Newhall", "North Hills", "Oakland", "Oceanside", "Olympic Valley", "Pala", "Palos Verdes Estates", "Panorama City", "Penn Valley", "Playa Del Rey", "Pleasant Hill", "Rancho Cucamonga", "Rancho Santa Margarita", "Richmond", "Rohnert Park", "Rowland Heights", "Salinas", "San Fernando", "San Marino", "San Pablo", "San Ysidro", "Santa Barbara", "Santa Clarita", "Santa Maria", "Scotts Valley", "Shasta Lake", "Sherman Oaks", "South El Monte", "Standard", "Stanford", "Stevenson Ranch", "Studio City", "Sugarloaf", "Sylmar", "Tahoma", "Toluca Lake", "Travis Afb", "Twentynine Palms", "Valencia", "Valley Village", "Ventura", "Vernon", "Victorville", "West Hills", "West Hollywood", "West Sacramento", "Whittier", "Winnetka", "Woodside"],
  COLORADO: ["Centennial", "Commerce City", "Grand Junction", "Greenwood Village", "Highlands Ranch", "Littleton", "Northglenn", "Silverthorne", "Snowmass Village", "Thornton"],
  CONNECTICUT: ["Berlin", "Bolton", "Burlington", "East Hartford", "East Haven", "Easton", "Hamden", "Harwinton", "Ledyard", "Marlborough", "New Fairfield", "Newington", "Pawcatuck", "Prospect", "Stratford", "Trumbull", "West Hartford", "West Haven", "West Mystic", "Weston", "Wethersfield", "Windsor Locks", "Wolcott"],
  DELAWARE: ["Dover Afb", "New Castle", "Wilmington"],
  FLORIDA: ["Atlantic Beach", "Beverly Hills", "Big Pine Key", "Boca Raton", "Boynton Beach", "Bradenton", "Brandon", "Brooksville", "Clearwater", "Clermont", "Coconut Creek", "Coral Gables", "Coral Springs", "Davie", "Daytona Beach", "Delray Beach", "Doral", "Fern Park", "Fleming Island", "Fort Myers", "Gainesville", "Greenacres", "Hallandale Beach", "Holiday", "Hollywood", "Homestead", "Hudson", "Indialantic", "Jacksonville Beach", "Jensen Beach", "Jupiter", "Key Biscayne", "Key Colony Beach", "Key West", "Kissimmee", "Lakeland", "Lantana", "Lauderhill", "Leesburg", "Lighthouse Point", "Longwood", "Madeira Beach", "Marathon", "Margate", "Melbourne", "Melbourne Beach", "Miami Beach", "Miami Gardens", "Miramar", "Miramar Beach", "Naples", "Navarre", "North Fort Myers", "North Miami", "North Miami Beach", "North Palm Beach", "North Port", "Oakland Park", "Ocala", "Palm Bay", "Palm Beach Gardens", "Palm Coast", "Panama City", "Panama City Beach", "Patrick Air Force Base", "Pembroke Pines", "Pensacola", "Plantation", "Port Charlotte", "Port Orange", "Port Richey", "Riviera Beach", "Royal Palm Beach", "Saint Augustine", "Saint Johns", "Sarasota", "Satellite Beach", "Sebring", "Seminole", "South Daytona", "South Miami", "Spring Hill", "St. Pete Beach", "Sun City Center", "Sunny Isles Beach", "Surfside", "Tallahassee", "Tamarac", "Temple Terrace", "Vero Beach", "West Palm Beach", "West Park", "Weston", "Winter Park", "Winter Springs"],
  GEORGIA: ["Acworth", "Augusta", "Chestnut Mountain", "Duluth", "Fort Benning", "Fort Gordon", "Fort Oglethorpe", "Fort Stewart", "Jekyll Island", "Lawrenceville", "Macon", "Peachtree City", "Saint Simons Island", "Sandy Springs", "Savannah", "Snellville"],
  HAWAII: ["Honokaa", "Kahului", "Kapolei", "Makawao", "Mcbh Kaneohe Bay", "Mililani", "Ocean View", "Princeville", "Waikoloa"],
  IDAHO: ["Mountain Home Afb"],
  ILLINOIS: ["Bartonville", "Bridgeview", "Broadview", "Country Club Hills", "East Peoria", "East Saint Louis", "Elk Grove Village", "Elmwood Park", "Evergreen Park", "Glendale Heights", "Granite City", "Great Lakes", "Harwood Heights", "Hillside", "Hinsdale", "Hodgkins", "Hoffman Estates", "La Grange", "La Grange Park", "Lemont", "Lockport", "Loves Park", "Markham", "Mooseheart", "Niles", "North Riverside", "Northfield", "Northlake", "Oak Brook", "Orland Park", "River Forest", "Riverdale", "Riverside", "Roselle", "Rosemont", "Sauk Village", "Schiller Park", "Scott Air Force Base", "Streamwood", "Vernon Hills", "Washington", "Westchester", "Woodridge"],
  INDIANA: ["Anderson", "Bloomington", "Clarksville", "Crane", "Greenwood", "Highland", "Lake Station", "Merrillville", "Terre Haute", "West Lafayette"],
  IOWA: ["Coralville", "Durango", "Elkport", "West Des Moines"],
  KANSAS: ["Edwardsville", "Fort Leavenworth", "Fort Riley", "Frontenac", "Lansing", "Lenexa", "Mission", "Prairie Village", "Shawnee"],
  KENTUCKY: ["Bellevue", "Covington", "Erlanger", "Fort Thomas", "Hebron", "Highland Heights", "Lakeside Park", "Ludlow", "Somerset"],
  LOUISIANA: ["Barksdale Afb", "Fort Polk", "Westwego"],
  MAINE: ["Peaks Island", "South Windham"],
  MARYLAND: ["Baltimore", "Berlin", "Bethesda", "Bowie", "Brooklyn", "Catonsville", "Chevy Chase", "Cumberland", "Derwood", "District Heights", "Dundalk", "Elkridge", "Ellicott City", "Essex", "Gunpowder", "Gwynn Oak", "Halethorpe", "Hyattsville", "Jb Andrews", "Laurel", "Luke", "Middle River", "Nottingham", "Oakland", "Oxon Hill", "Parkville", "Pasadena", "Pikesville", "Potomac", "Rosedale", "Salisbury", "Silver Spring", "Suitland", "Takoma Park", "Towson", "Windsor Mill"],
  MASSACHUSETTS: ["Acushnet", "Arlington", "Auburndale", "Belmont", "Braintree", "Brookline", "Chelsea", "Chestnut Hill", "Dudley", "East Falmouth", "East Taunton", "East Weymouth", "Everett", "Fayville", "Georgetown", "Groveland", "Hanscom Afb", "Hingham", "Indian Orchard", "Kingston", "Lakeville", "Lexington", "Longmeadow", "Malden", "Medford", "Melrose", "Methuen", "Milton", "Nahant", "Needham", "Needham Heights", "Newton", "Newton Center", "Newton Highlands", "Newton Lower Falls", "Newton Upper Falls", "Newtonville", "North Andover", "North Dartmouth", "North Weymouth", "Plainville", "Quincy", "Revere", "Salisbury", "Saugus", "Scituate", "Siasconset", "Somerset", "Somerville", "South Dartmouth", "South Weymouth", "Stoneham", "Swampscott", "Teaticket", "Waban", "Waltham", "Watertown", "Wellesley", "Wellesley Hills", "West Newton", "West Warren", "West Yarmouth", "Weston", "Weymouth", "Winthrop", "Woods Hole"],
  MICHIGAN: ["Algonac", "Auburn Hills", "Benton Harbor", "Berkley", "Bloomfield Hills", "Burton", "Canton", "Clinton Township", "Erie", "Essexville", "Farmington", "Ferndale", "Flint", "Fort Gratiot", "Franklin", "Grosse Pointe Farms", "Hamtramck", "Harbor Springs", "Highland Park", "Kalamazoo", "Kincheloe", "Kingsford", "La Salle", "Lathrup Village", "Laurium", "Luna Pier", "Madison Heights", "Maybee", "Melvindale", "Muskegon", "Newport", "Oak Park", "Orchard Lake", "Redford", "River Rouge", "Riverview", "Rochester Hills", "Saginaw", "Selfridge Angb", "Shelby Township", "Southgate", "Traverse City", "West Bloomfield", "Westland", "Wyoming"],
  MINNESOTA: ["Burnsville", "Eagan", "Eden Prairie", "Inver Grove Heights", "Maple Grove", "Mendota", "Minnetonka", "North Mankato", "Sauk Rapids", "South International Falls", "Waite Park"],
  MISSISSIPPI: ["Brandon", "Byram", "Diamondhead", "Diberville", "Flowood", "Moss Point", "Pearl", "Richland", "Vancleave"],
  MISSOURI: ["Bridgeton", "Chesterfield", "Desloge", "Manchester", "Maryland Heights", "Parkville", "Raytown", "Riverside", "Saint Louis", "Whiteman Air Force Base"],
  MONTANA: ["Black Eagle"],
  NEBRASKA: ["La Vista", "Offutt Afb", "Papillion"],
  NEVADA: ["Incline Village", "Jarbidge", "Nellis Afb", "Spring Creek", "Stateline", "Sun Valley"],
  NEW_HAMPSHIRE: ["Bedford", "Hooksett"],
  NEW_JERSEY: ["Audubon", "Bay Head", "Belleville", "Bellmawr", "Belmar", "Blackwood", "Bogota", "Branchburg", "Brick", "Caldwell", "Cape May", "Carlstadt", "Cinnaminson", "Clark", "Clementon", "Collingswood", "Colonia", "Convent Station", "Delanco", "Delran", "Deptford", "East Rutherford", "Englewood Cliffs", "Ewing", "Fair Haven", "Fairfield", "Fords", "Glen Rock", "Green Brook", "Haledon", "Harvey Cedars", "Hasbrouck Heights", "Hawthorne", "Highland Park", "Hillside", "Irvington", "Jamesburg", "Joint Base Mdl", "Lawrence Township", "Leonia", "Little Egg Harbor Twp", "Long Beach Township", "Longport", "Lyndhurst", "Lyons", "Margate City", "Maywood", "Merchantville", "Middletown", "Montague", "Mountainside", "Neptune", "North Arlington", "North Brunswick", "North Plainfield", "Nutley", "Oaklyn", "Ocean", "Pennsauken", "Point Pleasant Boro", "River Vale", "Roselle", "Roselle Park", "Saddle Brook", "Ship Bottom", "Shrewsbury", "South Amboy", "South Hackensack", "Totowa", "Township Of Washington", "Trenton", "Ventnor City", "Verona", "Wallington", "Warren", "Watchung", "Weehawken", "West New York", "West Orange", "Whiting", "Wood Ridge", "Woodcliff Lake", "Woodland Park"],
  NEW_MEXICO: ["Angel Fire", "Milan", "White Sands Missile Range"],
  NEW_YORK: ["Albany", "Bath", "Bronxville", "Buffalo", "Croton On Hudson", "Eastchester", "Elmira", "Elmont", "Farmingdale", "Farmington", "Fort Drum", "Glen Oaks", "Great Neck", "Halfmoon", "Hastings On Hudson", "Hauppauge", "Huntington", "Inwood", "Jamaica", "Lansing", "Latham", "Liverpool", "Loudonville", "Manhasset", "Massapequa", "Melville", "Middletown", "Nanuet", "New Hyde Park", "New Windsor", "North Babylon", "North Bellmore", "Oceanside", "Old Bethpage", "Old Westbury", "Pelham", "Piseco", "Plainview", "Port Jefferson", "Poughkeepsie", "Queensbury", "Rochester", "Rome", "Ronkonkoma", "Scarsdale", "Schenectady", "Setauket", "Sleepy Hollow", "Syracuse", "Troy", "Tuckahoe", "West Babylon", "Wyandanch"],
  NORTH_CAROLINA: ["Archdale", "Burlington", "Camp Lejeune", "Cary", "Fort Bragg", "Holly Ridge", "Mcas New River", "New Bern", "Ocean Isle Beach", "Tarawa Terrace"],
  NORTH_DAKOTA: ["Grand Forks Afb", "Minot Afb"],
  OHIO: ["Bay Village", "Beachwood", "Bedford", "Broadview Heights", "Canton", "Cleveland Heights", "Columbus", "Copley", "Cridersville", "Dayton", "East Canton", "East Liverpool", "Elida", "Euclid", "Fairfield", "Fairlawn", "Fairport Harbor", "Farmersville", "Hamilton", "Heath", "Hockingport", "Independence", "Lakewood", "Lexington", "North Canton", "North Ridgeville", "North Royalton", "Norton", "Olmsted Falls", "Oregon", "Rocky River", "Rossford", "Steubenville", "Stow", "Streetsboro", "Strongsville", "Westlake", "Willowick", "Worthington", "Youngstown"],
  OKLAHOMA: ["Altus Afb", "Fort Sill", "Moore", "Oklahoma City", "Tinker Afb"],
  OREGON: ["Bend", "Central Point", "Keizer", "White City"],
  PENNSYLVANIA: ["Abington", "Ambler", "Aston", "Audubon", "Avoca", "Beaver Falls", "Belle Vernon", "Bethlehem", "Bridgeport", "Brookhaven", "Camp Hill", "Canonsburg", "Carlisle", "Clairton", "Cleona", "Conshohocken", "Coraopolis", "Cranberry Township", "Croydon", "Crum Lynne", "Darby", "Dover", "Doylestown", "Drexel Hill", "Dunmore", "Duryea", "Easton", "Fairview Village", "Feasterville Trevose", "Grove City", "Harrisburg", "Havertown", "Hermitage", "Homestead", "Jenkintown", "King Of Prussia", "Kingston", "Lancaster", "Lansdowne", "Luzerne", "Malvern", "Marcus Hook", "Mckeesport", "Media", "Millvale", "Monroeville", "Mont Clare", "Montour", "Mountain Top", "Natrona Heights", "New Castle", "New Kensington", "Newtown", "Norristown", "Penndel", "Pitcairn", "Pittsburgh", "Plains", "Pleasant Gap", "Pottstown", "Richboro", "Roseto", "Royersford", "Schwenksville", "Secane", "Sharon Hill", "Shavertown", "Spring House", "Springfield", "Steelton", "Taylor", "Thorndale", "Upper Chichester", "Wallingford", "Warrendale", "Wayne", "West Mifflin", "West Pittston", "Williamsport", "Willow Grove", "Wyoming", "Yardley", "York"],
  RHODE_ISLAND: ["Central Falls", "Cumberland", "Johnston", "Kingston", "Lincoln", "Middletown", "Narragansett", "North Providence", "Riverside", "Rumford", "Smithfield", "Wakefield"],
  SOUTH_CAROLINA: ["Beaufort", "Boiling Springs", "Florence", "Myrtle Beach", "Parris Island", "Shaw Afb", "Surfside Beach"],
  TENNESSEE: ["Chattanooga", "Cleveland", "Cookeville", "Johnson City", "Kingsport", "Millington", "Pigeon Forge"],
  TEXAS: ["Balch Springs", "Benbrook", "Canyon Lake", "Dyess Afb", "Early", "Flower Mound", "Fort Hood", "Fort Worth", "Goodfellow Afb", "Granbury", "Haltom City", "Harker Heights", "Horseshoe Bay", "Humble", "Jbsa Fort Sam Houston", "Jbsa Lackland", "Jbsa Randolph", "Kingwood", "Lago Vista", "Lewisville", "Lumberton", "Naval Air Station Jrb", "North Richland Hills", "Port Bolivar", "Richland Hills", "River Oaks", "Saginaw", "Sheppard Afb", "South Padre Island", "Southlake", "Spring", "The Colony", "Waco", "Watauga"],
  UTAH: ["Hill Air Force Base", "Logan", "North Salt Lake", "Park City", "South Jordan", "South Salt Lake", "Taylorsville"],
  VERMONT: ["South Burlington", "Winooski"],
  VIRGINIA: ["Alexandria", "Arlington", "Broadlands", "Burke", "Centreville", "Chantilly", "Dunn Loring", "Fairfax Station", "Falls Church", "Fort Lee", "Fredericksburg", "Henrico", "Herndon", "Manassas Park", "Mc Lean", "North Chesterfield", "Oakton", "Poquoson", "Reston", "Roanoke", "Springfield", "Sterling", "Wallops Island", "Warrenton", "Woodbridge", "Yorktown"],
  WASHINGTON: ["Bonney Lake", "Bremerton", "Covington", "Joint Base Lewis Mcchord", "Kenmore", "Lacey", "Lakewood", "Mill Creek", "Oak Harbor", "Puyallup", "Spanaway", "Spokane Valley", "Steilacoom", "Tumwater", "Union Gap", "Vashon"],
  WEST_VIRGINIA: ["South Charleston", "Vienna"],
  WISCONSIN: ["Franklin", "Glendale", "Middleton", "Monona", "New Berlin", "Verona"],
  WYOMING: ["Fe Warren Afb"],
};

// Lista plana p/ os selects do cotizador. Junta as ciudades-âncora (com tarifa
// própria) com as ciudades extras do USPS (caem no fallback) — todas ordenadas.
export const ESTADOS_LIST = Object.entries(ESTADOS_USA)
  .map(([key, e]) => {
    const anchor = Object.keys(e.ciudades);
    const extra = (CIUDADES_EXTRA[key] ?? []).filter(c => !anchor.includes(c));
    return { key, nombre: e.nombre, ciudades: [...anchor, ...extra].sort((a, b) => a.localeCompare(b)) };
  })
  .sort((a, b) => a.nombre.localeCompare(b.nombre));

/** Arredonda pra cima até 2 casas decimais — cliente nunca paga menos do que a tarifa real. */
function roundUp2(n: number): number {
  return Math.ceil(n * 100) / 100;
}

export function cotizar(opts: {
  estadoKey: string;
  ciudad?: string;
  caja: Caja;
  modo: Modo;
  pesoLb: number;
}): { total: number; detalle: string } {
  const e = ESTADOS_USA[opts.estadoKey];
  const c = CAJAS[opts.caja];
  if (!e || !c) return { total: 0, detalle: "Datos incompletos" };
  const ciudadKey = (opts.ciudad && e.ciudades[opts.ciudad]) ? opts.ciudad : e.fallbackCiudad;
  const tarifa = e.ciudades[ciudadKey][opts.caja];
  if (opts.modo === "maritimo") {
    const total = roundUp2(tarifa.ft3 * c.ft3);
    return { total, detalle: `${c.ft3} ft³ × $${tarifa.ft3.toFixed(2)}/ft³ (${ciudadKey})` };
  }
  const pesoFinal = Math.max(opts.pesoLb, c.pesoVolumenLb);
  const total = roundUp2(tarifa.lb * pesoFinal);
  return { total, detalle: `${pesoFinal.toFixed(2)} lb × $${tarifa.lb.toFixed(2)}/lb (${ciudadKey})` };
}
