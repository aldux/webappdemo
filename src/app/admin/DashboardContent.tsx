"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Users, Clock4, Calendar as CalendarIcon } from "lucide-react";
import { AgendaReservas, useKPIsReservas } from "./AgendaReservas";
import { loadConfigFromStorage } from "@/lib/config-store";

export function DashboardContent() {
  const { turnosHoy, ingresosHoy, refresh } = useKPIsReservas();
  const [nombreNegocio, setNombreNegocio] = useState("Zenith Studio");

  useEffect(() => {
    const config = loadConfigFromStorage();
    if (config?.nombre) setNombreNegocio(config.nombre);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hola, {nombreNegocio} 👋</h1>
        <p className="text-muted-foreground mt-1">Este es el resumen de tu comercio para hoy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Turnos Hoy</CardTitle>
            <CalendarIcon className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{turnosHoy}</div>
            <p className="text-xs text-muted-foreground mt-1">Reservas confirmadas para hoy</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos (Est.)</CardTitle>
            <span className="text-emerald-500 text-sm font-bold">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${ingresosHoy.toLocaleString("es-AR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">En base a reservas actuales</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
            <Users className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">Esta semana</p>
          </CardContent>
        </Card>
        <Card className="bg-card relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 h-full w-2 bg-emerald-500"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Estado Local</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mt-1">
              <Switch id="local-status" defaultChecked />
              <Label htmlFor="local-status" className="font-semibold text-emerald-500 text-sm">Abierto</Label>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wide">Pausar reservas en 1-click</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proximos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="proximos">Próximos Turnos</TabsTrigger>
          <TabsTrigger value="disponibilidad">Gestión Rápida</TabsTrigger>
        </TabsList>
        <TabsContent value="proximos" className="mt-6">
          <AgendaReservas onRefresh={refresh} />
        </TabsContent>
        <TabsContent value="disponibilidad" className="mt-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Ajustes Rápidos de Disponibilidad</CardTitle>
              <CardDescription>Cierra temporalmente un bloque horario de hoy si tuviste un imprevisto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 p-4 border border-border/50 rounded-lg bg-secondary/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
                    <Clock4 className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Pausar Próximas 2 Horas</h4>
                    <p className="text-sm text-muted-foreground">Bloquea turnos desde ahora hasta las 18:30</p>
                  </div>
                </div>
                <Button variant="secondary" className="hover:bg-red-500/90 hover:text-white transition-colors">Cerrar Bloque</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
