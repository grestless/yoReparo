import { Wrench, Lock } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-brand text-white py-10 relative overflow-hidden">
            {/* Subtle top border effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="skeuo-badge p-2 rounded-full">
                            <Wrench className="w-4 h-4 text-brand-accent" />
                        </div>
                        <span className="font-serif text-xl text-white">
                            YoReparo
                        </span>
                    </Link>
                    
                    {/* Links and Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/60">
                        <Link
                            href="/estado"
                            className="hover:text-white transition-colors"
                        >
                            Estado de Reparacion
                        </Link>
                        <span className="hidden md:inline text-white/30">|</span>
                        <span>@ {new Date().getFullYear()} YoReparo. Todos los derechos reservados.</span>
                        <Link
                            href="/admin"
                            className="flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors"
                            title="Acceso Administrativo"
                        >
                            <Lock className="w-3 h-3" />
                            <span className="sr-only">Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
