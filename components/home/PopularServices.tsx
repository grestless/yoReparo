"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
    {
        id: "climatizacion",
        title: "Aire Acondicionado",
        price: "$60.000 (aprox)",
        tags: ["Instalación", "Service", "Mantenimiento"],
        image: "/climatizacion.jpg"
    },
    {
        id: "electro",
        title: "Electrodomésticos",
        price: "$25.000",
        tags: ["Heladeras", "Lavarropas", "Microondas"],
        image: "/electrodomesticos.jpg"
    },
    {
        id: "instalaciones",
        title: "Instalaciones",
        price: "Consultar",
        tags: ["Electricidad", "Gas", "Plomería"],
        image: "/electricidad.jpg"
    },

];

export function PopularServices() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4"
                    >
                        Lo que más nos piden
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 max-w-2xl mx-auto text-lg"
                    >
                        Nuestras soluciones más solicitadas, respaldadas por clientes satisfechos en toda la zona.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="w-full h-[460px] relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg shadow-black/5"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute top-5 left-5">
                                <span className="bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                                    Desde <span className="font-bold">{service.price}</span>
                                </span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">
                                    {service.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
