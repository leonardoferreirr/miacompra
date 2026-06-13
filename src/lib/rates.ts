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

// ESTADOS_USA é gerado a partir da planilha (fonte única) por
// scripts/generate-rates.mjs e mantido em sync pelo Action sync-rates.
// Importa (binding local p/ cotizar/ESTADOS_LIST) E re-exporta.
import { ESTADOS_USA } from "./rates-data";
export { ESTADOS_USA };

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
