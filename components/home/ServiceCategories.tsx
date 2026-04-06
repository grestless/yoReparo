"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Snowflake,
    Wrench,
    Zap,
    Car,
    ArrowRight,
    MessageCircle
} from "lucide-react";

const categories = [
    {
        id: "climatizacion",
        name: "Climatizacion",
        icon: Snowflake,
        description: "Expertos en instalacion, limpieza profunda y service de Aire Acondicionado para hogares y empresas.",
        image: "/climatizacion.jpg",
        tags: ["Instalacion de Split", "Aire Acondicionado", "Mantenimiento AA", "Carga de Gas", "Revision de Fugas", "Y mas"]
    },
    {
        id: "electro",
        name: "Electrodomesticos",
        icon: Wrench,
        description: "Reparacion y servicio tecnico de electrodomesticos multimarca del hogar.",
        image: "/electrodomesticos2.jpg",
        tags: ["Heladeras No Frost", "Heladeras Ciclicas", "Lavarropas Automaticos", "Secarropas", "Microondas", "Y mas"]
    },
    {
        id: "instalaciones",
        name: "Instalaciones",
        icon: Zap,
        description: "Soluciones de electricidad, plomeria y gas, siempre con profesionales matriculados.",
        image: "/electricidad.jpg",
        tags: ["Electricidad Domiciliaria", "Gasista Matriculado", "Plomeria y Agua", "Canerias", "Termotanques", "Y mas"]
    },
    {
        id: "automotor",
        name: "Automotor",
        icon: Car,
        description: "Aire acondicionado vehicular y mas asistencias afines.",
        image: "/automotor.jpg",
        tags: ["Aire Acondicionado Automotor", "Carga de Gas", "Compresores Motor"]
    }
];

export function ServiceCategories() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);

    const activeData = categories.find(c => c.id === activeCategory) || categories[0];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand mb-4"
                        >
                            Areas de Especialidad
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 max-w-xl text-lg"
                        >
                            Encuentra al profesional tecnico adecuado para cada necesidad.
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
                            className="skeuo-button text-brand hover:scale-[1.02] px-6 py-3 rounded-full font-semibold transition-all inline-block"
                        >
                            Ver Todos los Servicios
                        </Link>
                    </motion.div>
                </div>

                {/* Tabs - Skeuomorphic Style */}
                <div className="skeuo-card rounded-2xl p-1.5 mb-10 inline-flex w-full overflow-x-auto hide-scrollbar">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 min-w-fit px-5 py-3 rounded-xl transition-all ${
                                    isActive 
                                        ? "skeuo-tab-active text-brand font-semibold" 
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-brand" : ""}`} />
                                <span className="text-sm whitespace-nowrap">{category.name}</span>
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
                    className="skeuo-card rounded-3xl p-6 md:p-8"
                >
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        {/* Image Box */}
                        <div className="w-full lg:w-[55%]">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden skeuo-image">
                                <Image
                                    src={activeData.image}
                                    alt={activeData.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Content Box */}
                        <div className="w-full lg:w-[45%] flex flex-col h-full justify-between">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl text-brand mb-4">
                                    {activeData.name}
                                </h3>
                                <p className="text-slate-600 text-base mb-8 leading-relaxed">
                                    {activeData.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {activeData.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="skeuo-tab bg-white text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col xl:flex-row items-start xl:items-center gap-5 justify-between border-t border-slate-100 pt-8">
                                <div className="flex items-center gap-4">
                                    <div className="skeuo-badge p-3 rounded-full">
                                        <MessageCircle className="w-5 h-5 text-brand-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Tienes dudas o consultas?</p>
                                        <p className="text-sm text-slate-500">Contacta directamente con nuestro experto</p>
                                    </div>
                                </div>
                                <Link 
                                    href="https://wa.me/5493816694147?text=Hola,%20me%20gustaría%20consultar%20por%20un%20servicio%20de%20YoReparo" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="skeuo-card skeuo-card-hover text-slate-800 px-5 py-3 rounded-full font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center group"
                                >
                                    Contactar Especialista
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
