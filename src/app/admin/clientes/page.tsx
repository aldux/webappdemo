import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";

export default function AdminClientesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground mt-1">Listado y datos de los clientes que han reservado.</p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Listado de clientes
          </CardTitle>
          <CardDescription>
            Busca clientes por nombre, email o teléfono.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar clientes..." className="pl-9" />
          </div>
          <p className="text-sm text-muted-foreground">
            Los clientes que reserven desde el sitio público aparecerán aquí.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
