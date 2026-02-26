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
