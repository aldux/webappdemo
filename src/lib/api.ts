import type { Config } from "@/lib/config-store";
import type { Reserva, EstadoReserva } from "@/lib/reservas-store";

const BASE = "";

export async function fetchConfig(): Promise<Config | null> {
  try {
    const res = await fetch(`${BASE}/api/config`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function saveConfig(config: Config): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/config`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchReservas(fecha?: string): Promise<Reserva[]> {
  try {
    const url = fecha ? `${BASE}/api/reservas?fecha=${encodeURIComponent(fecha)}` : `${BASE}/api/reservas`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createReserva(
  data: Omit<Reserva, "id" | "estado" | "createdAt">
): Promise<Reserva | null> {
  try {
    const res = await fetch(`${BASE}/api/reservas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function updateReservaEstado(
  id: string,
  estado: EstadoReserva
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/reservas/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
