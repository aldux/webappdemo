import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HorariosAtencion } from "@/components/HorariosAtencion";
import { ChevronRight, MapPin, CalendarDays } from "lucide-react";

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
          {/* Glassmorphism Card */}
          <Card className="backdrop-blur-xl bg-background/60 border-border/50 shadow-2xl shadow-black/20 relative z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" />
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-medium flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-400" />
                Reserva tu turno
              </CardTitle>
              <CardDescription>Selecciona la fecha para ver disponibilidad</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Calendar */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">1. Fecha</Label>
                <div className="p-3 border border-border/40 rounded-3xl bg-secondary/10 flex justify-center">
                  <Calendar
                    mode="single"
                    className="rounded-2xl"
                    classNames={{
                      day_selected: "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-600",
                      day_today: "bg-secondary text-foreground",
                    }}
                  />
                </div>
              </div>

              {/* Step 2: Time Slots (Simulated) */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground flex justify-between">
                  <span>2. Horario disponible</span>
                  <span className="text-emerald-400 animate-pulse font-medium">3 libres</span>
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    09:00
                  </Button>
                  <Button variant="outline" className="border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                    14:30
                  </Button>
                  <Button variant="outline" className="border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all opacity-50 cursor-not-allowed">
                    17:00
                  </Button>
                </div>
              </div>

              {/* Step 3: Quick Info */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">3. Tus datos</Label>
                <div className="space-y-2">
                  <Input type="text" placeholder="Nombre completo" className="bg-secondary/20 border-border/40 h-11 transition-all focus-visible:ring-emerald-500" />
                  <Input type="email" placeholder="Correo electrónico" className="bg-secondary/20 border-border/40 h-11 transition-all focus-visible:ring-emerald-500" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-2 pb-6">
              <Button className="w-full h-12 text-md font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 group transition-all">
                Confirmar Reserva
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>

          {/* Decorative element behind card */}
          <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-500/0 rounded-full blur-3xl" />
        </section>
      </main>
    </div>
  );
}
