"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award } from "lucide-react";

const benefits = [
    {
        title: "Garantía de Trabajo",
        description: "Todos mis servicios cuentan con garantía por escrito. Tu tranquilidad y la correcta resolución del problema son mi prioridad absoluta.",
        icon: ShieldCheck,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Respuesta Rápida",
        description: "Entiendo la urgencia cuando algo falla. Me comprometo a brindarte un diagnóstico y solución en el menor tiempo posible.",
        icon: Clock,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Experiencia Comprobada",
        description: "Años de experiencia técnica en el rubro, en constante capacitación para ofrecerte el mejor servicio garantizado.",
        icon: Award,
        color: "text-brand",
        bg: "bg-brand/10"
    },
];

export function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold tracking-tight text-brand mb-4"
                    >
                        ¿Por qué elegir mis servicios?
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        Compromiso, seriedad y resultados garantizados en cada trabajo.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-3xl flex flex-col items-center text-center border border-slate-100 shadow-xl shadow-slate-200/20 hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${benefit.bg}`}>
                                    <Icon className={`w-8 h-8 ${benefit.color}`} />
                                </div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-4">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
