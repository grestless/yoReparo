"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, Menu, X, LogOut } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { signOut } = useAuth();
    const router = useRouter();

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await signOut();
        router.push("/admin/login");
    };

    const navItems = [
        { href: "/admin", label: "Tablero", icon: LayoutDashboard },
        { href: "/admin/tecnicos", label: "Técnicos", icon: Users },
        { href: "#", label: "Configuración", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col p-6 transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="text-2xl font-bold mb-10 text-blue-400 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">

                    </div>
                    YoReparo
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl w-full transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                    <div className="text-xs text-slate-600 text-center mt-4">
                        v1.0.0 • Admin Panel
                    </div>
                </div>
            </aside>
        </>
    );
}
