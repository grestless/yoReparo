"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Maria Gonzalez",
        type: "Hogar",
        text: "Excelente servicio. Instalaron dos aires en mi departamento y quedaron perfectos. Muy prolijos.",
        stars: 5,
    },
    {
        name: "Carlos Ruiz",
        type: "Local Comercial",
        text: "Me salvaron con la heladera del negocio un domingo. Respuesta rápida y profesional.",
        stars: 5,
    },
    {
        name: "Tech Solutions S.A.",
        type: "Empresa",
        text: "Contratamos el mantenimiento mensual de aires y electricidad. 100% recomendados.",
        stars: 5,
    },
];

export function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-6 md:p-8 rounded-3xl flex flex-col items-center text-center"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-slate-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                            <div>
                                <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                                <div className="text-sm text-primary font-medium">
                                    {testimonial.type}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
