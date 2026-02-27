"use client";

import { useEffect } from "react";
import { fetchConfig } from "@/lib/api";

/** Aplica en el documento los colores de la config (primario y acento). */
export function ThemeFromConfig() {
  useEffect(() => {
    fetchConfig().then((config) => {
      const root = document.documentElement;
      const primary = config?.colorPrimario ?? "#10b981";
      const accent = config?.colorAcento ?? "#0d9488";
      root.style.setProperty("--primary", primary);
      root.style.setProperty("--primary-foreground", "#ffffff");
      root.style.setProperty("--chart-1", accent);
    });
    return () => {
      const root = document.documentElement;
      root.style.removeProperty("--primary");
      root.style.removeProperty("--primary-foreground");
      root.style.removeProperty("--chart-1");
    };
  }, []);
  return null;
}
