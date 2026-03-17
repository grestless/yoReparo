"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Sparkles,
    Wrench,
    Truck,
    UserPlus,
    Calendar,
    TreePine,
    ArrowRight,
    MessageCircle
} from "lucide-react";

// Mock Data
const categories = [
    {
        id: "climatizacion",
        name: "Climatización",
        icon: Sparkles,
        description: "Expertos en instalación, limpieza profunda y service de Aire Acondicionado para hogares y empresas.",
        image: "/climatizacion.jpg",
        tags: ["Instalación de Split", "Aire Acondicionado", "Mantenimiento AA", "Carga de Gas", "Revisión de Fugas", "Y más!"]
    },
    {
        id: "electro",
        name: "Electrodomésticos",
        icon: Wrench,
        description: "Reparación y servicio técnico de electrodomésticos multimarca del hogar.",
        image: "/electrodomesticos2.jpg",
        tags: ["Heladeras No Frost", "Heladeras Cíclicas", "Lavarropas Automáticos", "Secarropas", "Microondas", "Y más!"]
    },
    {
        id: "instalaciones",
        name: "Instalaciones",
        icon: Truck,
        description: "Soluciones de electricidad, plomería y gas, siempre con profesionales matriculados.",
        image: "/electricidad.jpg",
        tags: ["Electricidad Domiciliaria", "Gasista Matriculado", "Plomería y Agua", "Cañerías", "Termotanques", "Y más!"]
    },
    {
        id: "automotor",
        name: "Automotor",
        icon: UserPlus,
        description: "Aire acondicionado vehicular y más asistencias afines.",
        image: "/automotor.jpg",
        tags: ["Aire Acondicionado Automotor", "Carga de Gas", "Compresores Motor"]
    }
];

export function ServiceCategories() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);

    const activeData = categories.find(c => c.id === activeCategory) || categories[0];

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-semibold tracking-tight text-brand mb-4"
                        >
                            Todas las Áreas de Especialidad
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 max-w-2xl text-lg"
                        >
                            Encuentra al profesional técnico adecuado para cada necesidad puntual.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden sm:block"
                    >
                        <Link
                            href="/servicios"
                            className="inline-block bg-brand-accent text-brand hover:bg-[#8ade63] px-6 py-3 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap shadow-sm shadow-brand-accent/20"
                        >
                            Ver Todas
                        </Link>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 mb-8 pb-2">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex flex-col items-center min-w-[140px] px-4 py-3 pb-4 relative transition-colors ${isActive ? "text-brand" : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                <Icon className={`w-6 h-6 mb-3 ${isActive ? "text-brand" : ""}`} />
                                <span className="text-sm font-semibold tracking-wide whitespace-nowrap">{category.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-brand"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Active Panel Content */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
                >
                    {/* Image Box */}
                    <div className="w-full lg:w-[55%]">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-black/5">
                            <Image
                                src={activeData.image}
                                alt={activeData.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="w-full lg:w-[45%] lg:py-4 flex flex-col h-full justify-between">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-semibold text-brand mb-4 tracking-tight">
                                {activeData.name}
                            </h3>
                            <p className="text-slate-600 text-lg mb-8 font-light">
                                {activeData.description}
                            </p>

                            <div className="flex flex-wrap gap-x-4 gap-y-4">
                                {activeData.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="border border-slate-200 text-slate-700 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors px-5 py-2.5 rounded-full text-sm font-medium shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-14 flex flex-col xl:flex-row items-start xl:items-center gap-6 justify-between border-t border-slate-100 pt-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-brand/10 p-3 rounded-full shrink-0">
                                    <MessageCircle className="w-6 h-6 text-brand" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">¿Tienes dudas o consultas?</p>
                                    <p className="text-sm text-slate-500">Contacta directamente con nuestro experto</p>
                                </div>
                            </div>
                            <Link 
                                href="https://wa.me/5493816694147?text=Hola,%20me%20gustaría%20consultar%20por%20un%20servicio%20de%20YoReparo" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-6 py-3.5 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center group"
                            >
                                Contactar Especialista
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
