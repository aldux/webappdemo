import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import type { Reserva, EstadoReserva } from "@/lib/reservas-store";

function rowToReserva(row: Record<string, unknown>): Reserva {
  return {
    id: String(row.id),
    fecha: String(row.fecha),
    slot: String(row.slot),
    servicioId: String(row.servicio_id),
    servicioNombre: String(row.servicio_nombre),
    precio: String(row.precio),
    nombre: String(row.nombre),
    email: String(row.email),
    telefono: String(row.telefono),
    estado: row.estado as EstadoReserva,
    createdAt: String(row.created_at),
  };
}

export async function GET(request: NextRequest) {
  try {
    await initDb();
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get("fecha");
    let sql = "SELECT id, fecha, slot, servicio_id, servicio_nombre, precio, nombre, email, telefono, estado, created_at FROM reservas WHERE estado != 'cancelado'";
    const args: (string | number)[] = [];
    if (fecha) {
      sql += " AND fecha = ?";
      args.push(fecha);
    }
    sql += " ORDER BY fecha, slot";
    const r = await db.execute({ sql, args: args.length ? args : undefined });
    const reservas = r.rows.map((row) => rowToReserva(row as Record<string, unknown>));
    return NextResponse.json(reservas);
  } catch (e) {
    console.error("GET /api/reservas", e);
    return NextResponse.json({ error: "Error al listar reservas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fecha,
      slot,
      servicioId,
      servicioNombre,
      precio,
      nombre,
      email,
      telefono,
    } = body as Omit<Reserva, "id" | "estado" | "createdAt">;
    if (!fecha || !slot || !servicioId || !servicioNombre || !nombre) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }
    await initDb();
    const db = getDb();
    const id = `res-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const createdAt = new Date().toISOString();
    await db.execute({
      sql: `INSERT INTO reservas (id, fecha, slot, servicio_id, servicio_nombre, precio, nombre, email, telefono, estado, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pendiente', ?)`,
      args: [id, fecha, slot, servicioId, servicioNombre, precio ?? "0", nombre, email ?? "", telefono ?? "", createdAt],
    });
    const reserva: Reserva = {
      id,
      fecha,
      slot,
      servicioId,
      servicioNombre,
      precio: precio ?? "0",
      nombre,
      email: email ?? "",
      telefono: telefono ?? "",
      estado: "pendiente",
      createdAt,
    };
    return NextResponse.json(reserva);
  } catch (e) {
    console.error("POST /api/reservas", e);
    return NextResponse.json({ error: "Error al crear reserva" }, { status: 500 });
  }
}
