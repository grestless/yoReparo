import { Snowflake, Zap, Wrench, Flame, Droplets, Thermometer, Car, Home, Tv, WashingMachine, Refrigerator } from "lucide-react";

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    category: "Climatización" | "Electricidad" | "Gas" | "Electrodomésticos" | "Automotor" | "Instalaciones";
}

export const services: Service[] = [
    // Climatización
    {
        id: "aire-acondicionado-instalacion",
        title: "Instalación Aire Acondicionado",
        description: "Instalación completa split o ventana con bomba de vacío.",
        icon: Snowflake,
        color: "bg-blue-50 text-blue-600",
        category: "Climatización",
    },
    {
        id: "aire-acondicionado-service",
        title: "Service y Mantenimiento AA",
        description: "Limpieza profunda, carga de gas y revisión de fugas.",
        icon: Snowflake,
        color: "bg-blue-50 text-blue-600",
        category: "Climatización",
    },
    {
        id: "calefaccion-central",
        title: "Calefacción Central",
        description: "Reparación y mantenimiento de calderas y radiadores.",
        icon: Thermometer,
        color: "bg-orange-50 text-orange-600",
        category: "Climatización",
    },
    {
        id: "refrigeracion-comercial",
        title: "Refrigeración Comercial",
        description: "Cámaras frigoríficas y heladeras exhibidoras.",
        icon: Snowflake,
        color: "bg-cyan-50 text-cyan-600",
        category: "Climatización",
    },

    // Electrodomésticos
    {
        id: "heladeras",
        title: "Reparación de Heladeras",
        description: "Todas las marcas. No frost y cíclicas.",
        icon: Wrench, // Refrigerator icon not in standard lucide set used previously, using Wrench or generic
        color: "bg-green-50 text-green-600",
        category: "Electrodomésticos",
    },
    {
        id: "lavarropas",
        title: "Lavarropas y Secarropas",
        description: "Cambio de rodamientos, bombas y plaquetas.",
        icon: Wrench,
        color: "bg-green-50 text-green-600",
        category: "Electrodomésticos",
    },
    {
        id: "microondas",
        title: "Microondas",
        description: "Reparación de magnetrón, placa y teclado.",
        icon: Zap,
        color: "bg-green-50 text-green-600",
        category: "Electrodomésticos",
    },
    {
        id: "calefones-termotanques",
        title: "Calefones y Termotanques",
        description: "Reparación e instalación. Gas y eléctricos.",
        icon: Flame,
        color: "bg-red-50 text-red-600",
        category: "Electrodomésticos",
    },

    // Instalaciones (Agua, Gas, Electricidad)
    {
        id: "electricidad-domiciliaria",
        title: "Electricidad Domiciliaria",
        description: "Cableado, tableros, cortocircuitos, tomas y luminarias.",
        icon: Zap,
        color: "bg-amber-50 text-amber-600",
        category: "Instalaciones",
    },
    {
        id: "instalacion-gas",
        title: "Gasista Matriculado",
        description: "Instalaciones nuevas, fugas y trámites.",
        icon: Flame,
        color: "bg-red-50 text-red-600",
        category: "Instalaciones",
    },
    {
        id: "plomeria-agua",
        title: "Plomería y Agua",
        description: "Cañerias, destapes, tanques de agua, griferia",
        icon: Droplets,
        color: "bg-cyan-50 text-cyan-600",
        category: "Instalaciones",
    },

    // Automotor
    {
        id: "aire-vehiculo",
        title: "Aire Acondicionado Vehicular",
        description: "Carga de gas y reparación de compresores.",
        icon: Car,
        color: "bg-slate-50 text-slate-600",
        category: "Automotor",
    },
];
