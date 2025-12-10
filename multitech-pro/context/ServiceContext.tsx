"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ServiceItem = {
    id: string;
    title: string;
    category: string;
};

type ServiceContextType = {
    selectedServices: ServiceItem[];
    addService: (service: ServiceItem) => void;
    removeService: (id: string) => void;
    clearServices: () => void;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("selectedServices");
        if (saved) {
            setSelectedServices(JSON.parse(saved));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    }, [selectedServices]);

    const addService = (service: ServiceItem) => {
        if (!selectedServices.find((s) => s.id === service.id)) {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const removeService = (id: string) => {
        setSelectedServices(selectedServices.filter((s) => s.id !== id));
    };

    const clearServices = () => {
        setSelectedServices([]);
    };

    return (
        <ServiceContext.Provider
            value={{ selectedServices, addService, removeService, clearServices }}
        >
            {children}
        </ServiceContext.Provider>
    );
}

export function useService() {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error("useService must be used within a ServiceProvider");
    }
    return context;
}
