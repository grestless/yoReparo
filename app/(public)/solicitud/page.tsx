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
    { id: 0, title: "Ubicación", icon: MapPin },
    { id: 1, title: "Servicio", icon: Home },
    { id: 2, title: "Disponibilidad", icon: Calendar },
    { id: 3, title: "Detalles", icon: AlertTriangle },
    { id: 4, title: "Contacto", icon: User },
];

export default function RequestPage() {
    const { selectedServices, clearServices } = useService();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for back, 1 for next
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
                toast.error("Debés seleccionar al menos un servicio.");
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
            toast.success("¡Solicitud enviada con éxito!");

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
            toast.error("Hubo un error al enviar la solicitud. Intentá nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation Variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
        }),
    };

    if (successData) {
        return <SuccessScreen id={successData.id} />;
    }

    return (
        <FormProvider {...methods}>
            <main className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10" />
                                <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />

                                {STEPS.map((step, index) => {
                                    const isActive = index <= currentStep;
                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-110"
                                                    : "bg-white border-slate-300 text-slate-400"
                                                    }`}
                                            >
                                                <step.icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${isActive ? "text-blue-700" : "text-slate-400"}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Wizard Card */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">

                            {/* Header */}
                            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    {STEPS[currentStep].title}
                                </h2>
                                <div className="text-sm text-slate-400">
                                    Paso {currentStep + 1} de {STEPS.length}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex-grow flex flex-col relative overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentStep}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 0
                                        ? "opacity-0 pointer-events-none"
                                        : "text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Volver
                                </button>

                                {currentStep === STEPS.length - 1 ? (
                                    <button
                                        type="submit"
                                        form="wizard-form"
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Enviando..." : "Confirmar Solicitud"}
                                        {!isSubmitting && <Send className="w-5 h-5" />}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Siguiente
                                        <ArrowRight className="w-5 h-5" />
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
