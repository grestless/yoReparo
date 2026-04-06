"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Ofrecen garantia?",
        answer: "Si, todas nuestras reparaciones cuentan con 3 meses de garantia y las instalaciones nuevas con 6 meses.",
    },
    {
        question: "Hacen factura A?",
        answer: "Si, realizamos Factura A y B segun la necesidad del cliente.",
    },
    {
        question: "Cubren urgencias?",
        answer: "Tenemos un equipo de guardia para urgencias electricas y de refrigeracion comercial 24/7.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-brand relative overflow-hidden">
            {/* Subtle texture */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-14">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-4xl text-white mb-4"
                    >
                        Preguntas Frecuentes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/70 text-lg"
                    >
                        Resolvemos tus dudas mas comunes
                    </motion.p>
                </div>

                <div className="max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="skeuo-card rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="skeuo-badge w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                            <HelpCircle className="w-5 h-5 text-brand-accent" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-brand">{faq.question}</h3>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                <motion.div
                                    initial={false}
                                    animate={{ height: isOpen ? 'auto' : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 pl-20">
                                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
