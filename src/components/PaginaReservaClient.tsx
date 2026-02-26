"use client";

import { useEffect, useState } from "react";
import { HorariosAtencion } from "@/components/HorariosAtencion";
import { PanelReserva } from "@/components/PanelReserva";
import { ThemeFromConfig } from "@/components/ThemeFromConfig";
import { MapPin } from "lucide-react";
import { loadConfigFromStorage } from "@/lib/config-store";

export function PaginaReservaClient() {
  const [nombre, setNombre] = useState("Zenith Studio");
  const [direccion, setDireccion] = useState("Av. del Libertador 1230, Piso 5");
  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  useEffect(() => {
    const c = loadConfigFromStorage();
    if (c) {
      setNombre(c.nombre || "Zenith Studio");
      setDireccion(c.direccion || "");
      setLogoUrl(c.logoUrl);
    }
  }, []);

  return (
    <>
      <ThemeFromConfig />
      <div className="min-h-screen relative overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" style={{ opacity: 0.8 }} />

        <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                <span className="flex w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                Aceptando reservas
              </div>
              <div className="flex items-center gap-4">
                {logoUrl ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-border bg-secondary/50 flex-shrink-0 shadow-lg">
                    <img src={logoUrl} alt={nombre} className="w-full h-full object-cover" />
                  </div>
                ) : null}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground/90">
                    {nombre}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md mt-1">
                    Reserva tu turno de forma rápida y sencilla.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-border/50">
              {direccion ? (
                <div className="flex items-start gap-4 text-muted-foreground group">
                  <div className="bg-secondary/50 p-3 rounded-2xl group-hover:bg-secondary transition-colors">
                    <MapPin className="w-5 h-5 text-foreground/80" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Ubicación</h3>
                    <p className="text-sm whitespace-pre-line">{direccion}</p>
                  </div>
                </div>
              ) : null}
              <HorariosAtencion />
            </div>
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-150 relative">
            <PanelReserva logoUrl={logoUrl} />
            <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" style={{ opacity: 0.5 }} />
          </section>
        </main>
      </div>
    </>
  );
}
