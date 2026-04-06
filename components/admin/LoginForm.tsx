"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres"),
});

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Validation
        const validation = loginSchema.safeParse({ username, password });
        if (!validation.success) {
            setError(validation.error.issues[0].message);
            setLoading(false);
            return;
        }

        try {
            // Append domain to username to create email
            const email = `${username}@multitech.pro`;

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Credenciales invalidas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100/80 p-4 relative">
            {/* Subtle texture */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            
            <form onSubmit={handleLogin} className="skeuo-card p-6 sm:p-8 rounded-2xl md:rounded-3xl w-full max-w-md relative z-10">
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="font-serif text-xl sm:text-2xl text-brand">Acceso Administrativo</h1>
                    <p className="text-slate-500 mt-2 text-sm md:text-base">Ingresa tus credenciales para continuar</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-5 md:mb-6 border border-red-100"
                         style={{ boxShadow: 'inset 0 1px 2px rgba(239, 68, 68, 0.1)' }}>
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="skeuo-input w-full pl-11 pr-4 py-3.5 md:py-3 rounded-xl"
                            placeholder="Usuario"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="skeuo-input w-full pl-11 pr-4 py-3.5 md:py-3 rounded-xl"
                            placeholder="Contrasena"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="skeuo-button w-full text-brand font-semibold py-3.5 md:py-3 rounded-xl mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Ingresando...
                        </>
                    ) : (
                        "Ingresar"
                    )}
                </button>
            </form>

            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-slate-500 hover:text-brand transition-colors font-medium text-sm md:text-base"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Volver al inicio</span>
                </Link>
            </div>
        </div>
    );
}
