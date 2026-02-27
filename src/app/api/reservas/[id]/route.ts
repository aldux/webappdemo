import { NextRequest, NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import type { EstadoReserva } from "@/lib/reservas-store";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { estado } = body as { estado: EstadoReserva };
    if (!estado || !["pendiente", "confirmado", "cancelado"].includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }
    await initDb();
    const db = getDb();
    const r = await db.execute({
      sql: "UPDATE reservas SET estado = ? WHERE id = ?",
      args: [estado, id],
    });
    if (r.rowsAffected === 0) {
      return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH /api/reservas/[id]", e);
    return NextResponse.json({ error: "Error al actualizar reserva" }, { status: 500 });
  }
}
