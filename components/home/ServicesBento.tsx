"use client";

import { motion } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { services } from "@/lib/services";

export function ServicesBento() {
    const { addService, removeService, selectedServices } = useService();

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
        <section id="servicios" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
                    {services
                        .filter(s => [
                            "aire-acondicionado-instalacion",
                            "heladeras",
                            "electricidad-domiciliaria",
                            "instalacion-gas"
                        ].includes(s.id))
                        .map((service, index) => {
                            const selected = isSelected(service.id);
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => toggleService(service)}
                                    className={`
                                    group relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-300
                                    border hover:shadow-lg
                                    ${selected
                                            ? 'bg-white border-blue-500 ring-1 ring-blue-500 shadow-md'
                                            : 'bg-white border-slate-100 hover:border-blue-500'
                                        }
                                `}
                                >
                                    <div className="flex flex-col h-full items-center text-center justify-between relative z-10">
                                        <div className="flex flex-col items-center mb-6 w-full">
                                            <div className="flex justify-center w-full relative">
                                                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-6`}>
                                                    <service.icon className="w-8 h-8" />
                                                </div>
                                                {selected && (
                                                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        ✓
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
