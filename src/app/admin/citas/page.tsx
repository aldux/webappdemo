import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";

export default function AdminCitasPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Citas</h1>
        <p className="text-muted-foreground mt-1">Consulta y gestiona todas las citas y disponibilidad.</p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-500" />
            Calendario de citas
          </CardTitle>
          <CardDescription>
            Aquí podrás ver el calendario completo y crear nuevas citas manualmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
            <Plus className="w-4 h-4" />
            Nueva cita
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Vista de calendario y listado de citas próximamente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
