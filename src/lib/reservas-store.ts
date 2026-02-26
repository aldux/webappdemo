export const RESERVAS_KEY = "webapp-reservas";

export type EstadoReserva = "confirmado" | "cancelado";

export type Reserva = {
  id: string;
  fecha: string; // YYYY-MM-DD
  slot: string; // "09:00"
  servicioId: string;
  servicioNombre: string;
  precio: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: EstadoReserva;
  createdAt: string; // ISO
};

function loadReservas(): Reserva[] {
  if (typeof window === "undefined") return [];
  try {
    const s = localStorage.getItem(RESERVAS_KEY);
    if (!s) return [];
    const parsed = JSON.parse(s);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReservas(reservas: Reserva[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
}

export function getReservas(): Reserva[] {
  return loadReservas();
}

export function getReservasPorFecha(fecha: string): Reserva[] {
  return loadReservas().filter((r) => r.fecha === fecha && r.estado !== "cancelado");
}

export function getReservasHoy(): Reserva[] {
  const hoy = new Date().toISOString().slice(0, 10);
  return getReservasPorFecha(hoy);
}

export function addReserva(
  data: Omit<Reserva, "id" | "estado" | "createdAt">
): Reserva {
  const reservas = loadReservas();
  const id = `res-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const nueva: Reserva = {
    ...data,
    id,
    estado: "confirmado",
    createdAt: new Date().toISOString(),
  };
  reservas.push(nueva);
  saveReservas(reservas);
  return nueva;
}

export function updateReservaEstado(id: string, estado: EstadoReserva): void {
  const reservas = loadReservas();
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return;
  reservas[idx] = { ...reservas[idx], estado };
  saveReservas(reservas);
}
