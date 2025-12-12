"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative py-12 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
                >
                    <ShieldCheck className="w-4 h-4" />
                    #1 en Servicio Técnico Zonal
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
                >
                    Tu hogar y empresa <br />
                    <span className="text-primary">en manos expertas.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
                >
                    Centralizamos todos los oficios técnicos en una sola plataforma. Desde una
                    instalación eléctrica hasta reparar tu heladera. Con garantía y matrícula.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/servicios"
                        className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25"
                    >
                        Solicitar Servicio
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#garantias"
                        className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                    </Link>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2" />
        </section>
    );
}
