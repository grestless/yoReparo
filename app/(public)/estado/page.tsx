"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function StatusSearchPage() {
    const [requestId, setRequestId] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (requestId.trim()) {
            router.push(`/estado/${requestId.trim()}`);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50/80 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle texture */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10 px-4"
            >
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand mb-6 transition-colors text-sm font-medium"
                    >
                        <Home className="w-4 h-4" /> Volver al Inicio
                    </Link>
                    <h1 className="font-serif text-2xl sm:text-3xl text-brand mb-2">Estado de Reparacion</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Ingresa el numero de tu solicitud para ver el estado en tiempo real.</p>
                </div>

                <div className="skeuo-card rounded-2xl md:rounded-3xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="requestId" className="text-sm font-semibold text-slate-700 ml-1">
                                Numero de Solicitud
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="requestId"
                                    type="number"
                                    value={requestId}
                                    onChange={(e) => setRequestId(e.target.value)}
                                    placeholder="Ej: 1234"
                                    className="skeuo-input w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 placeholder-slate-400 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!requestId}
                            className="skeuo-button w-full text-brand font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Ver Estado <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400">
                        No encontras tu numero? Revisa el mensaje de WhatsApp que te enviamos.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
