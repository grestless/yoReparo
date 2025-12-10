"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "¿Ofrecen garantía?",
        answer: "Sí, todas nuestras reparaciones cuentan con 3 meses de garantía y las instalaciones nuevas con 6 meses.",
    },
    {
        question: "¿Hacen factura A?",
        answer: "Sí, realizamos Factura A y B según la necesidad del cliente.",
    },
    {
        question: "¿Cubren urgencias?",
        answer: "Tenemos un equipo de guardia para urgencias eléctricas y de refrigeración comercial 24/7.",
    },
];

export function FAQ() {
    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Preguntas Frecuentes
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
                        >
                            <div className="flex items-start gap-4">
                                <HelpCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                                    <p className="text-slate-400">{faq.answer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
