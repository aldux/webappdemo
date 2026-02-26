import { CalendarDays, Settings, Users, LayoutDashboard, ExternalLink } from "lucide-react";
import Link from "next/link";
import { AdminSidebarUser } from "./AdminSidebarUser";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-border/40 bg-card">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-emerald-500 tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-emerald-500" />
                        </span>
                        TurnosApp
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary/50 text-foreground font-medium transition-colors">
                        <LayoutDashboard className="w-5 h-5 text-emerald-500" />
                        Panel Control
                    </Link>
                    <Link href="/admin/citas" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
                        <CalendarDays className="w-5 h-5" />
                        Gestión de Citas
                    </Link>
                    <Link href="/admin/clientes" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
                        <Users className="w-5 h-5" />
                        Clientes
                    </Link>
                    <Link href="/admin/configuracion" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
                        <Settings className="w-5 h-5" />
                        Configuración
                    </Link>
                    <div className="pt-4 mt-4 border-t border-border/40">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary/30 hover:text-foreground transition-colors">
                            <ExternalLink className="w-5 h-5" />
                            Ver sitio público
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-border/40">
                    <AdminSidebarUser />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="md:hidden border-b border-border/40 p-4 flex items-center justify-between bg-card">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-emerald-500">
                        <CalendarDays className="w-5 h-5" />
                        TurnosApp
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Ver sitio</Link>
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-500/20 text-emerald-500">ZS</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <div className="p-6 md:p-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
