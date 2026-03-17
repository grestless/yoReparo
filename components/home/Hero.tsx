"use client";

import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/servicios?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/servicios');
        }
    };

    return (
        <section className="relative bg-brand text-brand-foreground py-20 lg:py-32 overflow-hidden min-h-[600px] flex items-center justify-center -mt-16 pt-32">
            {/* Center Background Image behind text */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08] mix-blend-luminosity pointer-events-none overflow-hidden">
                <Image
                    src="/hero-center.png"
                    alt="Fondo reparación"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <span className="text-sm font-medium tracking-wide text-white">#1 en Servicio Técnico Zonal</span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-brand-accent p-1.5 rounded-sm">
                                <Star className="w-3.5 h-3.5 fill-brand text-brand" />
                            </div>
                        ))}
                    </div>
                    <span className="text-sm font-medium tracking-wide text-white/90">Garantía y Matrícula</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-white"
                >
                    Tu hogar y empresa <br />
                    en manos expertas.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-brand-foreground/80 max-w-2xl mx-auto mb-10 font-light"
                >
                    Centralizamos todos los oficios técnicos en una sola plataforma. Desde una instalación eléctrica hasta reparar tu heladera. Con garantía y matrícula.
                </motion.p>

                <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-xl mx-auto flex flex-col md:flex-row items-center bg-white/10 p-2 border border-white/20 backdrop-blur-md mb-8 shadow-2xl shadow-black/20 rounded-full"
                >
                     <div className="pl-5 pr-2 flex items-center justify-center hidden md:flex">
                         <Search className="w-5 h-5 text-white/70" />
                     </div>
                     <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="¿Qué servicio estás buscando?" 
                         className="flex-1 bg-transparent border-none outline-none text-white px-4 md:px-2 py-3 placeholder:text-white/60 w-full text-base font-light text-center md:text-left"
                     />
                     <button type="submit" className="w-full md:w-auto bg-brand-accent text-brand hover:bg-[#8ade63] px-8 py-3 rounded-full font-semibold transition-colors duration-200 mt-2 md:mt-0">
                         Buscar
                     </button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center mb-16"
                >
                     <Link href="/servicios" className="inline-flex items-center gap-2 bg-white text-brand hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                         Pedir un servicio
                     </Link>
                </motion.div>

            </div>
        </section>
    );
}

