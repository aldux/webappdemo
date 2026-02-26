"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { getReservasHoy, updateReservaEstado, type Reserva } from "@/lib/reservas-store";

export function AgendaReservas({ onRefresh }: { onRefresh?: () => void }) {
  const [reservasHoy, setReservasHoy] = useState<Reserva[]>([]);

  const refresh = () => {
    const next = getReservasHoy().sort((a, b) => a.slot.localeCompare(b.slot));
    setReservasHoy(next);
    onRefresh?.();
  };

  useEffect(() => {
    refresh();
  }, []);

  const cancelar = (id: string) => {
    updateReservaEstado(id, "cancelado");
    refresh();
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Agenda de hoy</CardTitle>
        <CardDescription>
          {reservasHoy.length === 0
            ? "No hay turnos reservados para hoy."
            : `Tienes ${reservasHoy.length} turno${reservasHoy.length === 1 ? "" : "s"} programado${reservasHoy.length === 1 ? "" : "s"} para hoy.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reservasHoy.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">Las reservas que hagan los clientes aparecerán aquí.</p>
        ) : (
          <div className="rounded-md border border-border/50 overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow>
                  <TableHead className="w-[100px]">Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservasHoy.map((r) => (
                  <TableRow key={r.id} className={r.estado === "cancelado" ? "opacity-60 bg-secondary/10" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
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
  );
}

export function useKPIsReservas(refreshDeps: unknown[] = []) {
  const [turnosHoy, setTurnosHoy] = useState(0);
  const [ingresosHoy, setIngresosHoy] = useState(0);

  const refresh = () => {
    const hoy = getReservasHoy();
    setTurnosHoy(hoy.length);
    setIngresosHoy(hoy.reduce((sum, r) => sum + (Number(r.precio) || 0), 0));
  };

  useEffect(() => {
    refresh();
  }, refreshDeps);

  return { turnosHoy, ingresosHoy, refresh };
}
