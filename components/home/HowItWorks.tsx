"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Elige el Servicio",
        description: "Navega nuestro catálogo y selecciona lo que necesitas arreglar o instalar.",
    },
    {
        number: "02",
        title: "Agenda un turno",
        description: "Envía tu solicitud sin cargo.",
    },
    {
        number: "03",
        title: "Coordinamos",
        description: "Te contactamos para darte un estimado y coordinar fecha y hora.",
    },
    {
        number: "04",
        title: "Solucionado",
        description: "El técnico realiza el trabajo. Pagas al finalizar y recibes tu garantía.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 relative overflow-hidden bg-slate-50">
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center">

                    {/* Contenido Izquierdo: Pasos */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-center lg:text-left mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                ¿Cómo funciona?
                            </h2>
                            <p className="text-slate-600">
                                Tu solución técnica en 4 simples pasos
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 relative flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="text-5xl font-bold text-slate-50 absolute top-4 right-4 select-none z-0">
                                        {step.number}
                                    </div>
                                    <div className="w-12 h-12 shrink-0 bg-brand text-brand-accent rounded-full flex items-center justify-center font-bold mb-4 xl:mb-0 xl:mr-4 relative z-10 text-lg shadow-md shadow-brand/10">
                                        {step.number}
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Contenido Derecho: Imagen */}
                    <div className="w-full lg:w-1/2 hidden lg:flex relative min-h-[500px] h-full items-center justify-center">
                        <div className="relative w-full h-[600px]">
                            <Image
                                src="/hero-derecha.png"
                                alt="Imagen de cómo funciona"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
