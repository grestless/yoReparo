"use client";

import Link from "next/link";
import { ShoppingCart, Wrench, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
    const { selectedServices } = useService();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Servicios", href: "/servicios" },
        { name: "Estado", href: "/estado" },
        { name: "Nosotros", href: "/#nosotros" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300",
                    scrolled ? "pt-2" : "pt-6"
                )}
            >
                <nav
                    className={cn(
                        "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
                        "bg-white/80 backdrop-blur-md border border-white/20 shadow-lg",
                        "w-full max-w-5xl",
                        scrolled ? "py-2 bg-white/90 shadow-xl" : ""
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                            <Wrench className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800 group-hover:text-primary transition-colors">
                            YoReparo
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-full hover:bg-slate-100/50"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/solicitud">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg transition-all"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden sm:inline">Mi Solicitud</span>
                                {selectedServices.length > 0 && (
                                    <span className="bg-white text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {selectedServices.length}
                                    </span>
                                )}
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-24 z-40 mx-4 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-3 text-slate-700 font-medium hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <span className="text-slate-300 group-hover:text-primary transition-colors">→</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
