"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Calendar, MapPin, User, AlertTriangle,
    ArrowRight, ArrowLeft, Send
} from "lucide-react";
import { useService } from "@/context/ServiceContext";
import { supabase } from "@/lib/supabase";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Imports from local files
import { requestSchema, RequestFormData } from "./schemas";
import LocationStep from "./steps/LocationStep";
import ServiceStep from "./steps/ServiceStep";
import AvailabilityStep from "./steps/AvailabilityStep";
import DetailsStep from "./steps/DetailsStep";
import ContactStep from "./steps/ContactStep";
import SuccessScreen from "./steps/SuccessScreen";

// Steps definition
const STEPS = [
    { id: 0, title: "Ubicacion", icon: MapPin },
    { id: 1, title: "Servicio", icon: Home },
    { id: 2, title: "Disponibilidad", icon: Calendar },
    { id: 3, title: "Detalles", icon: AlertTriangle },
    { id: 4, title: "Contacto", icon: User },
];

export default function RequestPage() {
    const { selectedServices, clearServices } = useService();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successData, setSuccessData] = useState<{ id: number } | null>(null);
    const router = useRouter();

    // React Hook Form
    const methods = useForm<RequestFormData>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            urgency: "normal",
            issueType: "",
            message: "",
            name: "",
            phone: "",
            address: "",
        },
        mode: "onChange",
    });

    const { trigger, handleSubmit, watch, reset } = methods;

    // --- Persistence Logic ---
    useEffect(() => {
        const savedData = localStorage.getItem("request_form_backup");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                reset(parsed);
                toast.info("Hemos restaurado tu progreso anterior.");
            } catch (e) {
                console.error("Error restoring form data", e);
            }
        }
    }, [reset]);

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("request_form_backup", JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // --- Navigation Logic ---
    const handleNext = async () => {
        let isValid = false;

        if (currentStep === 0) {
            isValid = await trigger("locationType");
        } else if (currentStep === 1) {
            if (selectedServices.length === 0) {
                toast.error("Debes seleccionar al menos un servicio.");
                return;
            }
            isValid = await trigger("urgency");
        } else if (currentStep === 2) {
            isValid = await trigger(["scheduledDate", "timeSlot"]);
        } else if (currentStep === 3) {
            isValid = await trigger("message");
        } else {
            isValid = true;
        }

        if (isValid) {
            if (currentStep < STEPS.length - 1) {
                setDirection(1);
                setCurrentStep((prev) => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
        }
    };

    const onSubmit = async (data: RequestFormData) => {
        if (selectedServices.length === 0) {
            toast.error("No hay servicios seleccionados.");
            return;
        }

        setIsSubmitting(true);

        const requestData = {
            client_name: data.name,
            phone: data.phone,
            address: data.address,
            location_type: data.locationType,
            urgency: data.urgency,
            services: selectedServices.map((s) => s.title).join(", "),
            issue_type: data.issueType,
            message: data.message,
            scheduled_date: data.scheduledDate,
            time_slot: data.timeSlot,
            status: "pendiente",
            created_at: new Date().toISOString(),
        };

        try {
            const { data: result, error } = await supabase
                .from("requests")
                .insert([requestData])
                .select()
                .single();

            if (error) throw error;

            setSuccessData({ id: result.id });
            toast.success("Solicitud enviada con exito!");

            // Send WhatsApp Notification (Fire and forget)
            fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            }).catch(err => console.error("Failed to send notification:", err));

            // Clear persistence and services
            localStorage.removeItem("request_form_backup");
            clearServices();

        } catch (error) {
            console.error("Error submitting request:", error);
            toast.error("Hubo un error al enviar la solicitud. Intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation Variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 30 : -30,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -30 : 30,
            opacity: 0,
        }),
    };

    if (successData) {
        return <SuccessScreen id={successData.id} />;
    }

    return (
        <FormProvider {...methods}>
            <main className="min-h-screen bg-slate-50/80 pt-20 md:pt-28 pb-12 md:pb-20 relative">
                {/* Subtle texture */}
                <div 
                    className="fixed inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">

                        {/* Progress Bar - Mobile optimized */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex justify-between items-center relative px-2 sm:px-4">
                                <div className="absolute left-0 top-[18px] md:top-5 w-full px-[32px] md:px-[44px] -z-10">
                                    <div className="relative w-full h-[3px] bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute left-0 top-0 h-full bg-brand"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>

                                {STEPS.map((step, index) => {
                                    const isActive = index <= currentStep;
                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-1.5 md:gap-2 bg-slate-50 px-2 md:px-3 relative z-10">
                                            <div
                                                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                                    ? "bg-brand border-brand text-white shadow-lg"
                                                    : "bg-white border-slate-300 text-slate-400"
                                                    }`}
                                                style={isActive ? { boxShadow: '0 4px 12px rgba(20, 49, 32, 0.25)' } : {}}
                                            >
                                                <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <span className={`text-[9px] sm:text-[10px] md:text-xs font-medium transition-colors text-center ${isActive ? "text-brand" : "text-slate-400"}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Wizard Card */}
                        <div className="skeuo-card rounded-2xl md:rounded-3xl overflow-hidden min-h-[450px] md:min-h-[500px] flex flex-col relative">

                            {/* Header */}
                            <div className="bg-brand text-white p-4 md:p-6 flex justify-between items-center relative overflow-hidden">
                                {/* Texture */}
                                <div 
                                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                    }}
                                />
                                <h2 className="font-serif text-lg md:text-xl flex items-center gap-2 relative z-10">
                                    {STEPS[currentStep].title}
                                </h2>
                                <div className="text-xs md:text-sm text-white/60 relative z-10">
                                    Paso {currentStep + 1} de {STEPS.length}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col relative overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentStep}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex-grow flex flex-col"
                                    >
                                        {currentStep === 0 && <LocationStep onNext={handleNext} />}
                                        {currentStep === 1 && <ServiceStep />}
                                        {currentStep === 2 && <AvailabilityStep />}
                                        {currentStep === 3 && <DetailsStep />}
                                        {currentStep === 4 && <ContactStep onSubmit={handleSubmit(onSubmit)} />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer / Navigation */}
                            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/80 flex justify-between items-center"
                                 style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }}>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${currentStep === 0
                                        ? "opacity-0 pointer-events-none"
                                        : "text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="hidden sm:inline">Volver</span>
                                </button>

                                {currentStep === STEPS.length - 1 ? (
                                    <button
                                        type="submit"
                                        form="wizard-form"
                                        disabled={isSubmitting}
                                        className="skeuo-button flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-brand disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                                    >
                                        {isSubmitting ? "Enviando..." : "Confirmar"}
                                        {!isSubmitting && <Send className="w-4 h-4 md:w-5 md:h-5" />}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="skeuo-button flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold text-brand disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                                    >
                                        Siguiente
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </FormProvider>
    );
}
