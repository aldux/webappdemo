"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { fetchConfig } from "@/lib/api";
import { formatHorariosParaCliente } from "@/lib/config-store";

const horariosPorDefecto = [
  "Lunes a Viernes: 08:00 - 21:00",
  "Sábados: 09:00 - 14:00",
  "Domingo: Cerrado",
];

export function HorariosAtencion() {
  const [lineas, setLineas] = useState<string[]>(horariosPorDefecto);

  useEffect(() => {
    fetchConfig().then((config) => {
      if (config?.horarios?.length) {
        setLineas(formatHorariosParaCliente(config.horarios));
      }
    });
  }, []);

  return (
    <div className="flex items-start gap-4 text-muted-foreground group">
      <div className="bg-secondary/50 p-3 rounded-2xl group-hover:bg-secondary transition-colors">
        <Clock className="w-5 h-5 text-foreground/80" />
      </div>
      <div>
        <h3 className="font-medium text-foreground">Horarios de atención</h3>
        <p className="text-sm">
          {lineas.map((linea, i) => (
            <span key={i}>
              {linea}
              {i < lineas.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
