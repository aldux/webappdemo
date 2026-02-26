import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export default function AdminConfiguracionPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Ajustes del negocio y preferencias del sistema.</p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-500" />
            Datos del negocio
          </CardTitle>
          <CardDescription>
            Nombre, horarios y datos que ven los clientes al reservar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del negocio</Label>
            <Input id="nombre" defaultValue="Zenith Studio" className="max-w-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" defaultValue="Av. del Libertador 1230, Piso 5" className="max-w-md" />
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600">Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
}
