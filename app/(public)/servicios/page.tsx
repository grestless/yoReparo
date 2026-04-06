"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { services, Service } from "@/lib/services";
import { Check, Snowflake, Zap, Home, Car, Wrench, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    { id: "Todos", label: "Todos", icon: null },
    { id: "Climatización", label: "Climatizacion", icon: Snowflake },
    { id: "Electrodomésticos", label: "Electrodomesticos", icon: Wrench },
    { id: "Instalaciones", label: "Instalaciones", icon: Home },
    { id: "Automotor", label: "Automotor", icon: Car },
];

function ServicesContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "Todos";
    const initialSearch = searchParams.get("q") || "";

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const { addService, removeService, selectedServices } = useService();

    useEffect(() => {
        if (searchParams.get("category")) {
            setActiveCategory(searchParams.get("category") || "Todos");
        }
        if (searchParams.get("q")) {
            setSearchQuery(searchParams.get("q") || "");
        }
    }, [searchParams]);

    const filteredServices = services.filter((s) => {
        const matchesCategory = activeCategory === "Todos" || s.category === activeCategory;
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

    const toggleService = (service: Service) => {
        if (isSelected(service.id)) {
            removeService(service.id);
        } else {
            addService({
                id: service.id,
                title: service.title,
                category: service.category,
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/80 pt-24 md:pt-28 pb-16 md:pb-20">
            {/* Subtle texture */}
            <div 
                className="fixed inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand mb-3 md:mb-4">
                        Nuestros Servicios
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8 px-4">
                        Selecciona todos los servicios que necesites para armar tu presupuesto.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar servicios..."
                            className="skeuo-input w-full pl-11 pr-4 py-3.5 md:py-3 rounded-full text-sm md:text-base"
                        />
                    </div>
                </div>

                {/* Filters - Horizontal scroll on mobile */}
                <div className="mb-8 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 hide-scrollbar">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all whitespace-nowrap text-sm md:text-base shrink-0",
                                        activeCategory === category.id
                                            ? "skeuo-button text-brand"
                                            : "skeuo-card text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => {
                                const selected = isSelected(service.id);
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        key={service.id}
                                        className={cn(
                                            "skeuo-card p-5 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-300 relative overflow-hidden group",
                                            selected
                                                ? "ring-2 ring-green-500 ring-offset-2"
                                                : "skeuo-card-hover"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div
                                                className={cn(
                                                    "w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                                                    service.color
                                                )}
                                                style={{
                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(255,255,255,0.8)'
                                                }}
                                            >
                                                <service.icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                A COTIZAR
                                            </span>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-6 md:mb-8 min-h-[40px] leading-relaxed">
                                            {service.description}
                                        </p>

                                        <button
                                            onClick={() => toggleService(service)}
                                            className={cn(
                                                "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm md:text-base",
                                                selected
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "skeuo-button text-brand"
                                            )}
                                        >
                                            {selected ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    Seleccionado
                                                </>
                                            ) : (
                                                "Agregar a Solicitud"
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500 skeuo-card rounded-2xl">
                                No se encontraron servicios que coincidan con tu busqueda.
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand border-t-transparent"></div>
            </div>
        }>
            <ServicesContent />
        </Suspense>
    );
}
