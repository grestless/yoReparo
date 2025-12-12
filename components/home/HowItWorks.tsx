"use client";

import { motion } from "framer-motion";

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
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-slate-600">
                        Tu solución técnica en 4 simples pasos
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 relative flex flex-col items-center text-center"
                        >
                            <div className="text-5xl font-bold text-slate-100 absolute top-4 right-4 select-none">
                                {step.number}
                            </div>
                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-6 relative z-10 text-lg shadow-lg shadow-blue-500/20">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 text-sm relative z-10 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
