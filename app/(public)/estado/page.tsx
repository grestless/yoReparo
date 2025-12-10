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
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 transition-colors text-sm font-medium"
                    >
                        <Home className="w-4 h-4" /> Volver al Inicio
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Estado de Reparación</h1>
                    <p className="text-slate-500">Ingresá el número de tu solicitud para ver el estado en tiempo real.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="requestId" className="text-sm font-bold text-slate-700 ml-1">
                                Número de Solicitud
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="requestId"
                                    type="number"
                                    value={requestId}
                                    onChange={(e) => setRequestId(e.target.value)}
                                    placeholder="Ej: 1234"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!requestId}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            Ver Estado <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400">
                        ¿No encontrás tu número? Revisá el mensaje de WhatsApp que te enviamos.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
