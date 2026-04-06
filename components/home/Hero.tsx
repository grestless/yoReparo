"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight, Shield, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroServices = [
    {
        id: "climatizacion",
        name: "Climatizacion",
        image: "/climatizacion.jpg",
        href: "/servicios?category=Climatización",
    },
    {
        id: "electrodomesticos",
        name: "Electrodomesticos",
        image: "/electrodomesticos.jpg",
        href: "/servicios?category=Electrodomésticos",
    },
    {
        id: "instalaciones",
        name: "Instalaciones",
        image: "/electricidad.jpg",
        href: "/servicios?category=Instalaciones",
    },
    {
        id: "automotor",
        name: "Automotor",
        image: "/automotor.jpg",
        href: "/servicios?category=Automotor",
    },
];

export function Hero() {
    return (
        <section className="relative bg-brand text-brand-foreground min-h-[90vh] flex items-center -mt-16 pt-24 pb-16 overflow-hidden">
            {/* Subtle texture overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                    
                    {/* Left Content - Text */}
                    <div className="w-full lg:w-[38%] flex flex-col justify-center pt-4">
                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap gap-3 mb-8"
                        >
                            <div className="skeuo-dark-card px-4 py-2 rounded-full flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-brand-accent text-brand-accent" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-white/80">Servicio Verificado</span>
                            </div>
                            <div className="skeuo-dark-card px-4 py-2 rounded-full">
                                <span className="text-xs font-medium text-brand-accent">Garantia Escrita</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] text-balance"
                        >
                            Soluciones tecnicas para tu hogar{" "}
                            <span className="text-brand-accent">y empresa.</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-white/70 mb-8 leading-relaxed max-w-md"
                        >
                            Tecnicos matriculados. Presupuesto sin cargo. Atencion inmediata en San Miguel de Tucuman.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mb-10"
                        >
                            <Link href="/servicios">
                                <button className="skeuo-button text-brand font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto transition-all">
                                    Ver Servicios
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <Link href="https://wa.me/5493816694147?text=Hola,%20necesito%20un%20servicio%20técnico" target="_blank">
                                <button className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-8 py-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto transition-all backdrop-blur-sm">
                                    Contactar Ahora
                                </button>
                            </Link>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-6 text-white/60 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-brand-accent" />
                                <span>Tecnicos Matriculados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-brand-accent" />
                                <span>Respuesta en 24hs</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Bento Grid of Services */}
                    <div className="w-full lg:w-[62%]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex gap-4 h-[500px] md:h-[550px]"
                        >
                            {/* Big Image - Climatizacion */}
                            <Link 
                                href={heroServices[0].href}
                                className="relative w-[45%] h-full rounded-3xl overflow-hidden group cursor-pointer skeuo-image"
                            >
                                <Image
                                    src={heroServices[0].image}
                                    alt={heroServices[0].name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <span className="skeuo-dark-card text-white text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-2 backdrop-blur-sm">
                                        {heroServices[0].name}
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </span>
                                </div>
                            </Link>

                            {/* Right Column - 3 Smaller Images */}
                            <div className="flex flex-col gap-4 w-[55%]">
                                {heroServices.slice(1).map((service, index) => (
                                    <Link
                                        key={service.id}
                                        href={service.href}
                                        className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer skeuo-image"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                            className="w-full h-full"
                                        >
                                            <Image
                                                src={service.image}
                                                alt={service.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <span className="skeuo-dark-card text-white text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-2 backdrop-blur-sm">
                                                    {service.name}
                                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
