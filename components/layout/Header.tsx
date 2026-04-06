"use client";

import Link from "next/link";
import { ShoppingCart, Wrench, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useService } from "@/context/ServiceContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const { selectedServices } = useService();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const headerIsDark = scrolled || !isHomePage;

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
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300",
                    headerIsDark ? "pt-2" : "pt-5"
                )}
            >
                <nav
                    className={cn(
                        "flex items-center justify-between px-6 py-3 transition-all duration-300",
                        "w-full max-w-5xl rounded-full",
                        headerIsDark
                            ? "py-2.5 skeuo-dark-card border border-white/5"
                            : "bg-white/8 backdrop-blur-md border border-white/10"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="skeuo-badge p-2 rounded-full group-hover:scale-105 transition-transform">
                            <Wrench className="w-4 h-4 text-brand-accent" />
                        </div>
                        <span className="font-serif text-xl text-white group-hover:text-brand-accent transition-colors">
                            YoReparo
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all rounded-full",
                                    pathname === link.href
                                        ? "text-brand-accent bg-white/10"
                                        : "text-white/75 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/solicitud">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={cn(
                                    "px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all",
                                    "bg-white/10 hover:bg-white/15 border border-white/15 text-white backdrop-blur-sm",
                                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                )}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden sm:inline">Mi Solicitud</span>
                                {selectedServices.length > 0 && (
                                    <span className="skeuo-badge text-brand-accent text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {selectedServices.length}
                                    </span>
                                )}
                            </motion.button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
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
                        className="fixed inset-x-0 top-20 z-40 mx-4 p-4 rounded-2xl skeuo-card md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "p-4 font-medium rounded-xl transition-all flex items-center justify-between group",
                                        pathname === link.href
                                            ? "bg-brand/5 text-brand"
                                            : "text-slate-700 hover:bg-slate-50"
                                    )}
                                >
                                    {link.name}
                                    <span className="text-slate-300 group-hover:text-brand transition-colors">{">"}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
