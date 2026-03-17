"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/services";

export function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<typeof services>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const filtered = services.filter(s =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/servicios?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/servicios');
        }
    };

    return (
        <section className="relative bg-brand text-brand-foreground py-20 lg:py-32 overflow-hidden min-h-[700px] flex items-center justify-center -mt-16 pt-32">
            {/* Center Background Image behind text */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] mix-blend-luminosity pointer-events-none overflow-hidden scale-110">
                <Image
                    src="/hero-center.png"
                    alt="Fondo reparación"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand/50 to-brand pointer-events-none z-1" />

            <div className="container mx-auto px-4 text-center relative z-10 w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <span className="text-xs font-bold tracking-[0.1em] text-white uppercase">#1 en Servicio Técnico Zonal</span>
                    </div>
                    <div className="flex gap-1 bg-white/10 p-1 rounded-lg border border-white/10">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                        ))}
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-md">
                        <span className="text-xs font-bold tracking-[0.1em] text-brand-accent uppercase">Garantía y Matrícula</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.95] text-white"
                >
                    Tu hogar y empresa <br />
                    en manos <span className="text-brand-accent">expertas.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Centralizamos todos los oficios técnicos en una sola plataforma. Con garantía oficial y técnicos matriculados.
                </motion.p>

                <div className="max-w-2xl mx-auto relative group" ref={searchRef}>
                    <motion.form
                        onSubmit={handleSearch}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`flex flex-col md:flex-row items-center bg-white p-1 border-4 transition-all duration-300 shadow-2xl ${isFocused ? 'border-brand-accent ring-8 ring-brand-accent/10 scale-[1.02]' : 'border-white/10 hover:border-white/20'} rounded-3xl md:rounded-full overflow-hidden`}
                    >
                        <div className="pl-6 pr-2 items-center justify-center hidden md:flex">
                            <Search className={`w-6 h-6 transition-colors ${isFocused ? 'text-brand' : 'text-slate-400'}`} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onFocus={() => setIsFocused(true)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="¿Qué servicio estás buscando hoy?"
                            className="flex-1 bg-transparent border-none outline-none text-slate-800 px-6 md:px-2 py-5 md:py-4 placeholder:text-slate-400 w-full text-lg font-medium text-center md:text-left"
                        />
                        <button type="submit" className="w-full md:w-auto bg-brand text-white hover:bg-brand/90 px-10 py-5 md:py-4 rounded-2xl md:rounded-full font-bold transition-all duration-300 text-lg shadow-lg active:scale-95">
                            Buscar
                        </button>
                    </motion.form>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {isFocused && (searchQuery.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[32px] overflow-hidden shadow-2xl z-50 border border-slate-100"
                            >
                                <div className="p-2">
                                    {suggestions.length > 0 ? (
                                        suggestions.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => {
                                                    router.push(`/servicios?q=${encodeURIComponent(s.title)}`);
                                                    setIsFocused(false);
                                                }}
                                                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-2xl group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                                                        <s.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 leading-tight">{s.title}</p>
                                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{s.category}</p>
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-transform group-hover:translate-x-1" />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-6 py-8 text-center">
                                            <p className="text-slate-400 font-medium">No encontramos ese servicio exacto...</p>
                                        </div>
                                    )}

                                    {/* Contact Specialty Option */}
                                    <div className="border-t border-slate-50 mt-2 p-2 focus-within:ring-0">
                                        <Link
                                            href="https://wa.me/5493816694147?text=Hola,%20busco%20un%20servicio%20que%20no%20encuentro:%20"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center gap-4 p-4 bg-brand/5 hover:bg-brand/10 transition-all rounded-2xl border-2 border-dashed border-brand/10 hover:border-brand/20 group"
                                        >
                                            <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <MessageCircle className="w-6 h-6 text-brand-accent" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-brand leading-tight">¿No lo encuentras?</p>
                                                <p className="text-sm text-slate-600">Contactar un especialista directamente</p>
                                            </div>
                                            <div className="ml-auto w-8 h-8 rounded-full border border-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex justify-center items-center gap-8"
                >


                </motion.div>
            </div>
        </section>
    );
}

