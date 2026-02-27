"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { fetchConfig } from "@/lib/api";

function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  if (partes.length >= 2) {
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase().slice(0, 2);
  }
  return nombre.slice(0, 2).toUpperCase() || "NA";
}

export function AdminSidebarUser() {
  const [nombre, setNombre] = useState("Zenith Studio");
  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  useEffect(() => {
    fetchConfig().then((config) => {
      if (config?.nombre) setNombre(config.nombre);
      if (config?.logoUrl) setLogoUrl(config.logoUrl);
    });
  }, []);

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <Avatar className="h-9 w-9 border border-border/50">
        {logoUrl ? (
          <AvatarImage src={logoUrl} alt={nombre} />
        ) : null}
        <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
          {iniciales(nombre)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{nombre}</p>
        <p className="text-xs text-muted-foreground truncate">Panel admin</p>
      </div>
      <button className="text-muted-foreground hover:text-destructive transition-colors" type="button" aria-label="Cerrar sesión">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
