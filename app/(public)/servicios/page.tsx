"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { services, Service } from "@/lib/services";
import { Check, Plus, Snowflake, Zap, Home, Car, Wrench, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    { id: "Todos", label: "Todos", icon: null },
    { id: "Climatización", label: "Climatización", icon: Snowflake },
    { id: "Electrodomésticos", label: "Electrodomésticos", icon: Wrench },
    { id: "Instalaciones", label: "Instalaciones", icon: Home },
    { id: "Automotor", label: "Automotor", icon: Car },
];

function ServicesContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("q") || "";

    const [activeCategory, setActiveCategory] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const { addService, removeService, selectedServices } = useService();

    useEffect(() => {
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
        <div className="min-h-screen bg-slate-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Nuestros Servicios
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
                        Selecciona todos los servicios que necesites para armar tu presupuesto.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar servicios..."
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent sm:text-sm transition-shadow"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2",
                                    activeCategory === category.id
                                        ? "bg-primary text-white shadow-lg shadow-brand/25 scale-105"
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                )}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => {
                                const selected = isSelected(service.id);
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        key={service.id}
                                        className={cn(
                                            "bg-white rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden group",
                                            selected
                                                ? "border-green-500 shadow-lg ring-1 ring-green-500"
                                                : "border-slate-100 hover:shadow-xl hover:border-slate-200"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                                                    service.color
                                                )}
                                            >
                                                <service.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                A COTIZAR
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-8 min-h-[40px]">
                                            {service.description}
                                        </p>

                                        <button
                                            onClick={() => toggleService(service)}
                                            className={cn(
                                                "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                                                selected
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-brand text-white hover:bg-transparent hover:text-brand hover:border hover:border-brand"
                                            )}
                                        >
                                            {selected ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    Seleccionado
                                                </>
                                            ) : (
                                                <>
                                                    Agregar a Solicitud
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                No se encontraron servicios que coincidan con tu búsqueda.
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
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Cargando servicios...</div>}>
            <ServicesContent />
        </Suspense>
    );
}
