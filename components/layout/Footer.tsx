import { Wrench, Lock } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-xl text-white">
                        <Wrench className="w-6 h-6" />
                        <span>YoReparo</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
                        <Link
                            href="/estado"
                            className="text-slate-500 hover:text-white transition-colors"
                        >
                            Estado de Reparación
                        </Link>
                        <span>© {new Date().getFullYear()} YoReparo. Todos los derechos reservados.</span>
                        <Link
                            href="/admin"
                            className="flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
                            title="Acceso Administrativo"
                        >
                            <Lock className="w-3 h-3" />
                            <span className="sr-only">Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer >
    );
}
