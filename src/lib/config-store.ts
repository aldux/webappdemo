export const CONFIG_KEY = "webapp-config";

export type HorarioDia = { dia: string; abierto: boolean; desde: string; hasta: string };

export type Config = {
  nombre: string;
  direccion: string;
  servicios: { id: string; nombre: string; precio: string }[];
  horarios: HorarioDia[];
};

const DIAS_ORDER = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const defaultHorarios: HorarioDia[] = DIAS_ORDER.map((dia) => ({
  dia,
  abierto: dia !== "Domingo",
  desde: "08:00",
  hasta: dia === "Sábado" ? "14:00" : "21:00",
}));

export function loadConfigFromStorage(): Config | null {
  if (typeof window === "undefined") return null;
  try {
    const s = localStorage.getItem(CONFIG_KEY);
    if (!s) return null;
    const parsed = JSON.parse(s) as Config;
    return {
      nombre: parsed.nombre ?? "Zenith Studio",
      direccion: parsed.direccion ?? "",
      servicios: Array.isArray(parsed.servicios) ? parsed.servicios : [],
      horarios: Array.isArray(parsed.horarios) && parsed.horarios.length ? parsed.horarios : defaultHorarios,
    };
  } catch {
    return null;
  }
}

/** Agrupa horarios consecutivos iguales para mostrar texto corto (ej. "Lunes a Viernes: 08:00 - 21:00") */
/** Día de la semana en español según índice JS getDay() (0=Dom, 1=Lun, ...) */
const DIAS_BY_GETDAY = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/** Genera franjas horarias (ej. cada 30 min) entre desde y hasta para un día. */
export function getSlotsForDay(
  horarios: HorarioDia[],
  dayName: string,
  intervalMinutes: number = 30
): string[] {
  const h = horarios.find((x) => x.dia === dayName);
  if (!h?.abierto) return [];
  const [desdeH, desdeM] = h.desde.split(":").map(Number);
  const [hastaH, hastaM] = h.hasta.split(":").map(Number);
  const start = desdeH * 60 + desdeM;
  const end = hastaH * 60 + hastaM;
  const slots: string[] = [];
  for (let min = start; min < end; min += intervalMinutes) {
    const hh = Math.floor(min / 60);
    const mm = min % 60;
    slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

/** Dado un Date, devuelve el nombre del día en español (Lunes, Martes, ...). */
export function getDayNameFromDate(date: Date): string {
  return DIAS_BY_GETDAY[date.getDay()];
}

export function formatHorariosParaCliente(horarios: HorarioDia[]): string[] {
  const order = [...horarios].sort(
    (a, b) => DIAS_ORDER.indexOf(a.dia) - DIAS_ORDER.indexOf(b.dia)
  );
  const lines: string[] = [];
  let i = 0;
  while (i < order.length) {
    const h = order[i];
    if (!h.abierto) {
      lines.push(`${h.dia}: Cerrado`);
      i++;
      continue;
    }
    let j = i;
    while (
      j + 1 < order.length &&
      order[j + 1].abierto &&
      order[j + 1].desde === h.desde &&
      order[j + 1].hasta === h.hasta
    ) {
      j++;
    }
    const desde = h.desde.slice(0, 5);
    const hasta = h.hasta.slice(0, 5);
    if (j === i) {
      lines.push(`${h.dia}: ${desde} - ${hasta}`);
    } else {
      lines.push(`${h.dia} a ${order[j].dia}: ${desde} - ${hasta}`);
    }
    i = j + 1;
  }
  return lines;
}
