import { createClient, type Client } from "@libsql/client";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const dbUrl = process.env.TURSO_DATABASE_URL;
const dbToken = process.env.TURSO_AUTH_TOKEN;

function getClient(): Client {
  if (dbUrl && dbToken) {
    return createClient({ url: dbUrl, authToken: dbToken });
  }
  const dir = join(process.cwd(), ".data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return createClient({ url: "file:.data/turnos.db" });
}

let client: Client | null = null;

export function getDb(): Client {
  if (!client) client = getClient();
  return client;
}

const INIT_SQL = `
CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  nombre TEXT NOT NULL DEFAULT 'Zenith Studio',
  direccion TEXT NOT NULL DEFAULT '',
  servicios_json TEXT NOT NULL DEFAULT '[]',
  horarios_json TEXT NOT NULL DEFAULT '[]',
  logo_url TEXT,
  color_primario TEXT,
  color_acento TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reservas (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  slot TEXT NOT NULL,
  servicio_id TEXT NOT NULL,
  servicio_nombre TEXT NOT NULL,
  precio TEXT NOT NULL,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','confirmado','cancelado')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO config (id, nombre, direccion, servicios_json, horarios_json) VALUES (
  1,
  'Zenith Studio',
  'Av. del Libertador 1230, Piso 5',
  '[{"id":"1","nombre":"Yoga Inicial (60m)","precio":"8500"},{"id":"2","nombre":"Pilates Reformer (45m)","precio":"12000"},{"id":"3","nombre":"Meditación Guiada","precio":"5000"}]',
  '[{"dia":"Lunes","abierto":true,"desde":"08:00","hasta":"21:00"},{"dia":"Martes","abierto":true,"desde":"08:00","hasta":"21:00"},{"dia":"Miércoles","abierto":true,"desde":"08:00","hasta":"21:00"},{"dia":"Jueves","abierto":true,"desde":"08:00","hasta":"21:00"},{"dia":"Viernes","abierto":true,"desde":"08:00","hasta":"21:00"},{"dia":"Sábado","abierto":true,"desde":"09:00","hasta":"14:00"},{"dia":"Domingo","abierto":false,"desde":"09:00","hasta":"14:00"}]'
);
`;

export async function initDb(): Promise<void> {
  const db = getDb();
  await db.executeMultiple(INIT_SQL);
}
