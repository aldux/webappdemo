import { NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";
import type { Config } from "@/lib/config-store";

export async function GET() {
  try {
    await initDb();
    const db = getDb();
    const r = await db.execute({
      sql: "SELECT nombre, direccion, servicios_json, horarios_json, logo_url, color_primario, color_acento FROM config WHERE id = 1",
    });
    if (r.rows.length === 0) {
      return NextResponse.json({
        nombre: "Zenith Studio",
        direccion: "",
        servicios: [],
        horarios: [],
      } satisfies Config);
    }
    const row = r.rows[0];
    const config: Config = {
      nombre: String(row.nombre ?? "Zenith Studio"),
      direccion: String(row.direccion ?? ""),
      servicios: JSON.parse(String(row.servicios_json ?? "[]")),
      horarios: JSON.parse(String(row.horarios_json ?? "[]")),
      logoUrl: row.logo_url != null ? String(row.logo_url) : undefined,
      colorPrimario: row.color_primario != null ? String(row.color_primario) : undefined,
      colorAcento: row.color_acento != null ? String(row.color_acento) : undefined,
    };
    return NextResponse.json(config);
  } catch (e) {
    console.error("GET /api/config", e);
    return NextResponse.json({ error: "Error al leer config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Config;
    await initDb();
    const db = getDb();
    await db.execute({
      sql: `UPDATE config SET
        nombre = ?,
        direccion = ?,
        servicios_json = ?,
        horarios_json = ?,
        logo_url = ?,
        color_primario = ?,
        color_acento = ?,
        updated_at = datetime('now')
      WHERE id = 1`,
      args: [
        body.nombre ?? "Zenith Studio",
        body.direccion ?? "",
        JSON.stringify(body.servicios ?? []),
        JSON.stringify(body.horarios ?? []),
        body.logoUrl ?? null,
        body.colorPrimario ?? null,
        body.colorAcento ?? null,
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PUT /api/config", e);
    return NextResponse.json({ error: "Error al guardar config" }, { status: 500 });
  }
}
