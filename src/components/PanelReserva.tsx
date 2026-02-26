"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loadConfigFromStorage,
  getSlotsForDay,
  getDayNameFromDate,
  type Config,
  type HorarioDia,
} from "@/lib/config-store";
import { addReserva } from "@/lib/reservas-store";
import { CalendarDays, ChevronRight, CheckCircle2 } from "lucide-react";

const SERVICIOS_DEFAULT = [
  { id: "1", nombre: "Yoga Inicial (60m)", precio: "8500" },
  { id: "2", nombre: "Pilates Reformer (45m)", precio: "12000" },
  { id: "3", nombre: "Meditación Guiada", precio: "5000" },
];

const HORARIOS_DEFAULT: HorarioDia[] = [
  { dia: "Lunes", abierto: true, desde: "08:00", hasta: "21:00" },
  { dia: "Martes", abierto: true, desde: "08:00", hasta: "21:00" },
  { dia: "Miércoles", abierto: true, desde: "08:00", hasta: "21:00" },
  { dia: "Jueves", abierto: true, desde: "08:00", hasta: "21:00" },
  { dia: "Viernes", abierto: true, desde: "08:00", hasta: "21:00" },
  { dia: "Sábado", abierto: true, desde: "09:00", hasta: "14:00" },
  { dia: "Domingo", abierto: false, desde: "09:00", hasta: "14:00" },
];

export function PanelReserva() {
  const [config, setConfig] = useState<Config | null>(null);
  const [servicios, setServicios] = useState(SERVICIOS_DEFAULT);
  const [horarios, setHorarios] = useState<Config["horarios"]>([]);
  const [servicioId, setServicioId] = useState<string | null>(null);
  const [fecha, setFecha] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [reservaExitosa, setReservaExitosa] = useState(false);

  useEffect(() => {
    const c = loadConfigFromStorage();
    if (c) {
      setConfig(c);
      setServicios(c.servicios.length ? c.servicios : SERVICIOS_DEFAULT);
      setHorarios(c.horarios.length ? c.horarios : HORARIOS_DEFAULT);
    } else {
      setHorarios(HORARIOS_DEFAULT);
    }
  }, []);

  const slotsDisponibles = fecha && horarios.length
    ? getSlotsForDay(horarios, getDayNameFromDate(fecha))
    : [];

  const servicioSeleccionado = servicios.find((s) => s.id === servicioId);

  const handleConfirmar = () => {
    if (!servicioId || !fecha || !slot || !servicioSeleccionado) return;
    const fechaStr = fecha.toISOString().slice(0, 10);
    addReserva({
      fecha: fechaStr,
      slot,
      servicioId,
      servicioNombre: servicioSeleccionado.nombre,
      precio: servicioSeleccionado.precio,
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
    });
    setReservaExitosa(true);
  };

  const hacerOtraReserva = () => {
    setReservaExitosa(false);
    setServicioId(null);
    setFecha(undefined);
    setSlot(null);
    setNombre("");
    setEmail("");
    setTelefono("");
  };

  if (reservaExitosa) {
    return (
      <Card className="backdrop-blur-xl bg-background/60 border-border/50 shadow-2xl shadow-black/20 relative z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Reserva exitosa</h3>
              <p className="text-muted-foreground mt-1">
                Tu turno quedó registrado. Te esperamos.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
              onClick={hacerOtraReserva}
            >
              Hacer otra reserva
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-background/60 border-border/50 shadow-2xl shadow-black/20 relative z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-medium flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-emerald-400" />
          Reserva tu turno
        </CardTitle>
        <CardDescription>Elige servicio, fecha y horario según la disponibilidad del comercio.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 1. Servicio */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">1. Servicio</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servicios.map((s) => (
              <Button
                key={s.id}
                type="button"
                variant={servicioId === s.id ? "default" : "outline"}
                className={
                  servicioId === s.id
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 justify-start h-auto py-3 px-4"
                    : "border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 justify-start h-auto py-3 px-4 text-left"
                }
                onClick={() => setServicioId(s.id)}
              >
                <span className="flex flex-col items-start gap-0.5 w-full">
                  <span className="font-medium">{s.nombre}</span>
                  <span className="text-xs opacity-90">${s.precio}</span>
                </span>
              </Button>
            ))}
          </div>
          {servicios.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay servicios cargados. El dueño puede configurarlos en el panel de administración.</p>
          )}
        </div>

        {/* 2. Fecha */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">2. Fecha</Label>
          <div className="p-3 border border-border/40 rounded-3xl bg-secondary/10 flex justify-center">
            <Calendar
              mode="single"
              selected={fecha}
              onSelect={setFecha}
              className="rounded-2xl"
              classNames={{
                day_selected: "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-600",
                day_today: "bg-secondary text-foreground",
              }}
            />
          </div>
        </div>

        {/* 3. Horario disponible */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground flex justify-between">
            <span>3. Horario disponible</span>
            {fecha && (
              <span className="text-emerald-400 font-medium">
                {slotsDisponibles.length} {slotsDisponibles.length === 1 ? "turno" : "turnos"}
              </span>
            )}
          </Label>
          {!fecha ? (
            <p className="text-sm text-muted-foreground">Elige una fecha para ver los horarios.</p>
          ) : slotsDisponibles.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ese día el comercio está cerrado.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slotsDisponibles.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={slot === s ? "default" : "outline"}
                  className={
                    slot === s
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
                  }
                  onClick={() => setSlot(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Datos */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">4. Tus datos</Label>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-secondary/20 border-border/40 h-11 transition-all focus-visible:ring-emerald-500"
            />
            <Input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="bg-secondary/20 border-border/40 h-11 transition-all focus-visible:ring-emerald-500"
            />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary/20 border-border/40 h-11 transition-all focus-visible:ring-emerald-500"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          className="w-full h-12 text-md font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 group transition-all"
          disabled={!servicioId || !fecha || !slot}
          onClick={handleConfirmar}
        >
          Confirmar Reserva
          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
