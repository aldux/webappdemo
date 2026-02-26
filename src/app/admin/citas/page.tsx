"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { getReservas, updateReservaEstado, type Reserva } from "@/lib/reservas-store";

function formatFecha(f: string): string {
  const [y, m, d] = f.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });
}

export default function AdminCitasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const list = getReservas();
    list.sort((a, b) => {
      if (a.fecha !== b.fecha) return a.fecha.localeCompare(b.fecha);
      return a.slot.localeCompare(b.slot);
    });
    setReservas(list);
  }, []);

  const cancelar = (id: string) => {
    updateReservaEstado(id, "cancelado");
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: "cancelado" as const } : r))
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
        <p className="text-muted-foreground mt-1">Todas las reservas realizadas por los clientes.</p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-500" />
            Listado de reservas
          </CardTitle>
          <CardDescription>
            {reservas.length === 0
              ? "Aún no hay reservas."
              : `${reservas.length} reserva${reservas.length === 1 ? "" : "s"} en total.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reservas.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Las reservas que hagan los clientes desde el sitio público aparecerán aquí.</p>
          ) : (
            <div className="rounded-md border border-border/50 overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary/20">
                  <TableRow>
                    <TableHead className="w-[100px]">Fecha</TableHead>
                    <TableHead className="w-[80px]">Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservas.map((r) => (
                    <TableRow key={r.id} className={r.estado === "cancelado" ? "opacity-60 bg-secondary/10" : ""}>
                      <TableCell className="font-medium">{formatFecha(r.fecha)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          {r.slot}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{r.nombre}</p>
                          <p className="text-xs text-muted-foreground">{r.telefono || r.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {r.servicioNombre}
                        <span className="text-muted-foreground text-xs ml-1">(${r.precio})</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            r.estado === "confirmado"
                              ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                              : "border-red-500/30 text-red-500 bg-red-500/10"
                          }
                        >
                          {r.estado === "confirmado" ? "Confirmado" : "Cancelado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {r.estado === "confirmado" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => cancelar(r.id)}
                          >
                            Cancelar
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
