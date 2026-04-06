"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Elige el Servicio",
        description: "Navega nuestro catalogo y selecciona lo que necesitas arreglar o instalar.",
    },
    {
        number: "02",
        title: "Agenda un turno",
        description: "Envia tu solicitud sin cargo.",
    },
    {
        number: "03",
        title: "Coordinamos",
        description: "Te contactamos para darte un estimado y coordinar fecha y hora.",
    },
    {
        number: "04",
        title: "Solucionado",
        description: "El tecnico realiza el trabajo. Pagas al finalizar y recibes tu garantia.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-50/80">
            {/* Subtle texture */}
            <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center">

                    {/* Left Content: Steps */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-center lg:text-left mb-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-serif text-3xl md:text-4xl text-slate-900 mb-4"
                            >
                                Como funciona?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-600 text-lg"
                            >
                                Tu solucion tecnica en 4 simples pasos
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="skeuo-card skeuo-card-hover p-6 rounded-2xl relative flex flex-col xl:flex-row items-center xl:items-start text-center xl:text-left"
                                >
                                    {/* Background number */}
                                    <div className="absolute top-3 right-4 text-5xl font-bold text-slate-100 select-none z-0 font-serif">
                                        {step.number}
                                    </div>
                                    
                                    {/* Badge number */}
                                    <div className="skeuo-badge w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-semibold mb-4 xl:mb-0 xl:mr-4 relative z-10 text-sm text-brand-accent">
                                        {step.number}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <h3 className="text-base font-semibold text-slate-900 mb-2">
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

                    {/* Right Content: Image */}
                    <div className="w-full lg:w-1/2 hidden lg:flex relative min-h-[500px] h-full items-center justify-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-[550px]"
                        >
                            <Image
                                src="/hero-derecha.png"
                                alt="Tecnico profesional"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
