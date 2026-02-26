import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, TrendingUp, Users, CheckCircle2, Clock4, Calendar as CalendarIcon } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hola, Zenith Studio 👋</h1>
                <p className="text-muted-foreground mt-1">Este es el resumen de tu comercio para hoy.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Turnos Hoy</CardTitle>
                        <CalendarIcon className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3" /> +2 respecto a ayer
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos (Est.)</CardTitle>
                        <span className="text-emerald-500 text-sm font-bold">$</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$145,000</div>
                        <p className="text-xs text-muted-foreground mt-1">En base a reservas actuales</p>
                    </CardContent>
                </Card>
                <Card className="bg-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Nuevos Clientes</CardTitle>
                        <Users className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground mt-1">Esta semana</p>
                    </CardContent>
                </Card>
                <Card className="bg-card relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute right-0 top-0 h-full w-2 bg-emerald-500"></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">Estado Local</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2 mt-1">
                            <Switch id="local-status" defaultChecked />
                            <Label htmlFor="local-status" className="font-semibold text-emerald-500 text-sm">Abierto</Label>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wide">Pausar reservas en 1-click</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Areas */}
            <Tabs defaultValue="proximos" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="proximos">Próximos Turnos</TabsTrigger>
                    <TabsTrigger value="disponibilidad">Gestión Rápida</TabsTrigger>
                </TabsList>
                <TabsContent value="proximos" className="mt-6">
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle>Agenda de hoy</CardTitle>
                            <CardDescription>
                                Tienes 5 turnos programados para las próximas horas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border border-border/50 overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-secondary/20">
                                        <TableRow>
                                            <TableHead className="w-[100px]">Hora</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Servicio</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acción</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    09:00
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-foreground">María García</p>
                                                    <p className="text-xs text-muted-foreground">11-5555-0192</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>Yoga Inicial (60m)</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10">Confirmado</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 gap-1">
                                                    <CheckCircle2 className="w-4 h-4" /> Check-in
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    10:30
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-foreground">Juan Pablo L.</p>
                                                    <p className="text-xs text-muted-foreground">11-2244-5566</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>Pilates Reformer (45m)</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10">Confirmado</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 gap-1">
                                                    <CheckCircle2 className="w-4 h-4" /> Check-in
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="bg-secondary/10 opacity-70">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                                    14:00
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-muted-foreground">Sofia Reinoso</p>
                                                    <p className="text-xs text-muted-foreground/50">11-3344-9988</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">Meditación Guiada</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/10">Cancelado</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">Ver detalle</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="disponibilidad" className="mt-6">
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle>Ajustes Rápidos de Disponibilidad</CardTitle>
                            <CardDescription>Cierra temporalmente un bloque horario de hoy si tuviste un imprevisto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between flex-wrap gap-4 p-4 border border-border/50 rounded-lg bg-secondary/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
                                        <Clock4 className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground">Pausar Próximas 2 Horas</h4>
                                        <p className="text-sm text-muted-foreground">Bloquea turnos desde ahora hasta las 18:30</p>
                                    </div>
                                </div>
                                <Button variant="secondary" className="hover:bg-red-500/90 hover:text-white transition-colors">Cerrar Bloque</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
