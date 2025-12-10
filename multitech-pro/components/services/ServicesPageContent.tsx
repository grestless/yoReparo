"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { services } from "@/lib/services";
import { Check } from "lucide-react";

const categories = [
    { id: "all", label: "Todos" },
    { id: "Climatización", label: "Climatización" },
    { id: "Electricidad", label: "Electricidad" },
    { id: "Línea Blanca", label: "Línea Blanca" },
    { id: "Gasista", label: "Gasista" },
    { id: "Instalaciones", label: "Instalaciones" },
    { id: "Automotor", label: "Automotor" },
];

export function ServicesPageContent() {
    const { addService, removeService, selectedServices } = useService();
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredServices = activeCategory === "all"
        ? services
        : services.filter(service => service.title === activeCategory); // Using title as category based on current data structure

    const isSelected = (id: string) => selectedServices.some((s) => s.id === id);

    const toggleService = (service: typeof services[0]) => {
        if (isSelected(service.id)) {
            removeService(service.id);
        } else {
            addService({
                id: service.id,
                title: service.title,
                category: service.title,
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    Nuestros Servicios
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Selecciona todos los servicios que necesites para armar tu presupuesto.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`
                            px-6 py-2 rounded-full font-medium transition-all duration-300
                            ${activeCategory === category.id
                                ? "bg-blue-600 text-white shadow-lg scale-105"
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                            }
                        `}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((service) => {
                        const selected = isSelected(service.id);
                        return (
                            <motion.div
                                layout
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={`
                                    bg-white rounded-3xl p-6 border transition-all duration-300 cursor-pointer group
                                    ${selected
                                        ? "border-blue-500 ring-2 ring-blue-500 shadow-lg"
                                        : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                                    }
                                `}
                                onClick={() => toggleService(service)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    {selected && (
                                        <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    {service.description}
                                </p>

                                <button
                                    className={`
                                        w-full py-3 rounded-xl font-bold text-sm transition-colors
                                        ${selected
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-900 text-white group-hover:bg-blue-600"
                                        }
                                    `}
                                >
                                    {selected ? "Seleccionado" : "Agregar a Solicitud"}
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredServices.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500">No se encontraron servicios en esta categoría.</p>
                </div>
            )}
        </div>
    );
}
