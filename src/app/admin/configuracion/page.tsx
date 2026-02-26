"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Settings, Briefcase, Clock, Plus, Pencil, Trash2, Check, X, Palette, ImageIcon } from "lucide-react";
import { CONFIG_KEY, type Config, type HorarioDia } from "@/lib/config-store";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

type Servicio = { id: string; nombre: string; precio: string };

const defaultConfig: Config = {
  nombre: "Zenith Studio",
  direccion: "Av. del Libertador 1230, Piso 5",
  servicios: [
    { id: "1", nombre: "Yoga Inicial (60m)", precio: "8500" },
    { id: "2", nombre: "Pilates Reformer (45m)", precio: "12000" },
    { id: "3", nombre: "Meditación Guiada", precio: "5000" },
  ],
  horarios: DIAS.map((dia) => ({
    dia,
    abierto: dia !== "Domingo",
    desde: "08:00",
    hasta: dia === "Sábado" ? "14:00" : "21:00",
  })),
  logoUrl: undefined,
  colorPrimario: "#10b981",
  colorAcento: "#0d9488",
};

function loadConfig(): Config {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const s = localStorage.getItem(CONFIG_KEY);
    if (!s) return defaultConfig;
    const parsed = JSON.parse(s) as Config;
    return {
      ...defaultConfig,
      ...parsed,
      servicios: Array.isArray(parsed.servicios) ? parsed.servicios : defaultConfig.servicios,
      horarios: Array.isArray(parsed.horarios) ? parsed.horarios : defaultConfig.horarios,
      logoUrl: typeof parsed.logoUrl === "string" ? parsed.logoUrl : defaultConfig.logoUrl,
      colorPrimario: typeof parsed.colorPrimario === "string" ? parsed.colorPrimario : defaultConfig.colorPrimario,
      colorAcento: typeof parsed.colorAcento === "string" ? parsed.colorAcento : defaultConfig.colorAcento,
    };
  } catch {
    return defaultConfig;
  }
}

function saveConfig(config: Config) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export default function AdminConfiguracionPage() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [horarios, setHorarios] = useState<HorarioDia[]>([]);
  const [nuevoServicioNombre, setNuevoServicioNombre] = useState("");
  const [nuevoServicioPrecio, setNuevoServicioPrecio] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [colorPrimario, setColorPrimario] = useState("#10b981");
  const [colorAcento, setColorAcento] = useState("#0d9488");

  useEffect(() => {
    const c = loadConfig();
    setConfig(c);
    setNombre(c.nombre);
    setDireccion(c.direccion);
    setServicios(c.servicios);
    setHorarios(c.horarios.length ? c.horarios : defaultConfig.horarios);
    setLogoUrl(c.logoUrl ?? "");
    setColorPrimario(c.colorPrimario ?? "#10b981");
    setColorAcento(c.colorAcento ?? "#0d9488");
  }, []);

  const guardarDatosNegocio = () => {
    const next = { ...config, nombre, direccion };
    setConfig(next);
    saveConfig(next);
  };

  const actualizarHorario = (index: number, upd: Partial<HorarioDia>) => {
    const next = horarios.map((h, i) => (i === index ? { ...h, ...upd } : h));
    setHorarios(next);
    saveConfig({ ...config, horarios: next });
  };

  const añadirServicio = () => {
    if (!nuevoServicioNombre.trim()) return;
    const id = String(Date.now());
    const next = [...servicios, { id, nombre: nuevoServicioNombre.trim(), precio: nuevoServicioPrecio.trim() || "0" }];
    setServicios(next);
    setNuevoServicioNombre("");
    setNuevoServicioPrecio("");
    const nextConfig = { ...config, servicios: next };
    setConfig(nextConfig);
    saveConfig(nextConfig);
  };

  const eliminarServicio = (id: string) => {
    const next = servicios.filter((s) => s.id !== id);
    setServicios(next);
    const nextConfig = { ...config, servicios: next };
    setConfig(nextConfig);
    saveConfig(nextConfig);
    if (editandoId === id) setEditandoId(null);
  };

  const iniciarEdicion = (s: Servicio) => {
    setEditandoId(s.id);
    setEditNombre(s.nombre);
    setEditPrecio(s.precio);
  };

  const guardarEdicion = () => {
    if (editandoId == null) return;
    const next = servicios.map((s) =>
      s.id === editandoId ? { ...s, nombre: editNombre.trim(), precio: editPrecio.trim() } : s
    );
    setServicios(next);
    setEditandoId(null);
    const nextConfig = { ...config, servicios: next };
    setConfig(nextConfig);
    saveConfig(nextConfig);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
  };

  const guardarApariencia = () => {
    const next = { ...config, logoUrl: logoUrl || undefined, colorPrimario, colorAcento };
    setConfig(next);
    saveConfig(next);
  };

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setLogoUrl(dataUrl);
      const next = { ...config, logoUrl: dataUrl };
      setConfig(next);
      saveConfig(next);
    };
    reader.readAsDataURL(file);
  };

  const quitarLogo = () => {
    setLogoUrl("");
    const next = { ...config, logoUrl: undefined };
    setConfig(next);
    saveConfig(next);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-1">Ajustes del negocio y preferencias del sistema.</p>
      </div>

      {/* Datos del negocio */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-500" />
            Datos del negocio
          </CardTitle>
          <CardDescription>
            Nombre y dirección que ven los clientes al reservar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del negocio</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="max-w-md"
              placeholder="Ej: Zenith Studio"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="max-w-md"
              placeholder="Ej: Av. del Libertador 1230"
            />
          </div>
          <Button onClick={guardarDatosNegocio} className="bg-emerald-500 hover:bg-emerald-600">
            Guardar cambios
          </Button>
        </CardContent>
      </Card>

      {/* Servicios */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-500" />
            Servicios
          </CardTitle>
          <CardDescription>
            Servicios que ofreces: nombre y precio. Los clientes verán esta lista al reservar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Nombre del servicio"
              value={nuevoServicioNombre}
              onChange={(e) => setNuevoServicioNombre(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="Precio (ej: 8500)"
              value={nuevoServicioPrecio}
              onChange={(e) => setNuevoServicioPrecio(e.target.value)}
              className="w-28"
            />
            <Button onClick={añadirServicio} className="gap-2 bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4" />
              Añadir servicio
            </Button>
          </div>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="w-[120px]">Precio</TableHead>
                  <TableHead className="w-[140px] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicios.map((s) => (
                  <TableRow key={s.id}>
                    {editandoId === s.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={editNombre}
                            onChange={(e) => setEditNombre(e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editPrecio}
                            onChange={(e) => setEditPrecio(e.target.value)}
                            className="h-8 w-24"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-500" onClick={guardarEdicion}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={cancelarEdicion}>
                            <X className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium">{s.nombre}</TableCell>
                        <TableCell>${s.precio}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => iniciarEdicion(s)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => eliminarServicio(s.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {servicios.length === 0 && (
            <p className="text-sm text-muted-foreground">Aún no hay servicios. Añade el primero arriba.</p>
          )}
        </CardContent>
      </Card>

      {/* Apariencia: logo y colores */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-emerald-500" />
            Apariencia
          </CardTitle>
          <CardDescription>
            Logo de la empresa y colores del sitio de reservas. El logo se muestra en círculo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Logo de la empresa</Label>
            <div className="flex flex-wrap items-center gap-4">
              {logoUrl ? (
                <>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-secondary/50 flex items-center justify-center">
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2">
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <Button type="button" variant="secondary" asChild>
                        <span>Cambiar logo</span>
                      </Button>
                    </Label>
                    <Input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                    <Button type="button" variant="ghost" className="text-destructive hover:text-destructive" onClick={quitarLogo}>
                      Quitar logo
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-border bg-secondary/20 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" asChild>
                      <span>Subir logo</span>
                    </Button>
                  </Label>
                  <Input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                </>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="color-primario">Color primario</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="color-primario"
                  type="color"
                  value={colorPrimario}
                  onChange={(e) => setColorPrimario(e.target.value)}
                  className="w-14 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={colorPrimario}
                  onChange={(e) => setColorPrimario(e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#10b981"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color-acento">Color de acento</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="color-acento"
                  type="color"
                  value={colorAcento}
                  onChange={(e) => setColorAcento(e.target.value)}
                  className="w-14 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={colorAcento}
                  onChange={(e) => setColorAcento(e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#0d9488"
                />
              </div>
            </div>
          </div>
          <Button onClick={guardarApariencia} className="bg-emerald-500 hover:bg-emerald-600">
            Guardar apariencia
          </Button>
        </CardContent>
      </Card>

      {/* Horarios y días de atención */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-500" />
            Horarios y días de atención
          </CardTitle>
          <CardDescription>
            Define en qué días y franjas horarias está abierto el comercio. Los clientes verán esta información.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow>
                  <TableHead className="w-[140px]">Día</TableHead>
                  <TableHead className="w-[100px]">Abierto</TableHead>
                  <TableHead>Desde</TableHead>
                  <TableHead>Hasta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horarios.map((h, index) => (
                  <TableRow key={h.dia}>
                    <TableCell className="font-medium">{h.dia}</TableCell>
                    <TableCell>
                      <Switch
                        checked={h.abierto}
                        onCheckedChange={(checked) => actualizarHorario(index, { abierto: checked })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={h.desde}
                        onChange={(e) => actualizarHorario(index, { desde: e.target.value })}
                        disabled={!h.abierto}
                        className="h-9 w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={h.hasta}
                        onChange={(e) => actualizarHorario(index, { hasta: e.target.value })}
                        disabled={!h.abierto}
                        className="h-9 w-32"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
