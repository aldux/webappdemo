import { HorariosAtencion } from "@/components/HorariosAtencion";
import { PanelReserva } from "@/components/PanelReserva";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background subtleties */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column - Business Info */}
        <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="flex w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Aceptando reservas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground/90">
              Zenith Studio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md">
              Centro de bienestar integral. Reserva tu próxima sesión de Yoga, Pilates o Meditación de forma rápida y sencilla.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-border/50">
            <div className="flex items-start gap-4 text-muted-foreground group">
              <div className="bg-secondary/50 p-3 rounded-2xl group-hover:bg-secondary transition-colors">
                <MapPin className="w-5 h-5 text-foreground/80" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Ubicación</h3>
                <p className="text-sm">Av. del Libertador 1230, Piso 5<br />Ciudad de Buenos Aires</p>
              </div>
            </div>
            <HorariosAtencion />
          </div>
        </section>

        {/* Right Column - Booking Interface */}
        <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-150 relative">
          <PanelReserva />
          {/* Decorative element behind card */}
          <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/0 rounded-full blur-3xl" />
        </section>
      </main>
    </div>
  );
}
