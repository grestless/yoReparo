"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award } from "lucide-react";

const benefits = [
    {
        title: "Garantia de Trabajo",
        description: "Todos los servicios cuentan con garantia por escrito. Tu tranquilidad y la correcta resolucion del problema son nuestra prioridad.",
        icon: ShieldCheck,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Respuesta Rapida",
        description: "Entendemos la urgencia cuando algo falla. Nos comprometemos a brindarte un diagnostico y solucion en el menor tiempo posible.",
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        title: "Experiencia Comprobada",
        description: "Anos de experiencia tecnica en el rubro, en constante capacitacion para ofrecerte el mejor servicio garantizado.",
        icon: Award,
        color: "text-brand",
        bg: "bg-brand/10"
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand mb-4"
                    >
                        Por que elegirnos?
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="skeuo-card skeuo-card-hover p-8 rounded-3xl flex flex-col items-center text-center"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${benefit.bg}`}
                                     style={{
                                         boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(255,255,255,0.8)'
                                     }}>
                                    <Icon className={`w-7 h-7 ${benefit.color}`} />
                                </div>
                                <h3 className="font-semibold text-slate-900 text-lg mb-3">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
