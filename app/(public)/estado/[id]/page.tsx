"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle, Clock, User, Calendar, Star, MessageCircle, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function StatusPage() {
    const { id } = useParams();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    useEffect(() => {
        if (id) fetchRequest();
    }, [id]);

    const fetchRequest = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('requests')
            .select(`
                *,
                technicians ( name, role, phone )
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching request:", error);
        } else {
            setRequest(data);
            if (data.client_rating) {
                setRating(data.client_rating);
                setFeedback(data.client_feedback || "");
                setFeedbackSubmitted(true);
            }
        }
        setLoading(false);
    };

    const submitFeedback = async () => {
        if (!rating) return;

        const { error } = await supabase
            .from('requests')
            .update({
                client_rating: rating,
                client_feedback: feedback
            })
            .eq('id', id);

        if (!error) {
            setFeedbackSubmitted(true);
            alert("Gracias por tu opinion!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand border-t-transparent"></div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="skeuo-card p-8 rounded-2xl text-center max-w-sm">
                    <AlertTriangle className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
                    <h1 className="font-serif text-xl sm:text-2xl text-brand mb-2">Solicitud no encontrada</h1>
                    <p className="text-slate-500 mb-6 text-sm">Verifica que el enlace sea correcto.</p>
                    <Link href="/" className="skeuo-button px-6 py-3 rounded-xl font-semibold text-brand inline-block">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    const STATUS_STEPS = [
        { id: "pendiente", label: "Recibido", icon: MessageCircle },
        { id: "asignado", label: "Asignado", icon: User },
        { id: "en_proceso", label: "En Proceso", icon: Clock },
        { id: "finalizado", label: "Finalizado", icon: CheckCircle },
    ];

    const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === request.status);

    return (
        <main className="min-h-screen bg-slate-50/80 pb-16 md:pb-20">
            {/* Header */}
            <div className="bg-brand text-white pt-8 md:pt-10 pb-20 md:pb-24 px-4 rounded-b-[2rem] md:rounded-b-[3rem] relative overflow-hidden">
                {/* Subtle texture */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
                <div className="container mx-auto max-w-2xl relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 md:mb-6 transition-colors text-sm">
                        <Home className="w-4 h-4" /> Volver al Inicio
                    </Link>
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2">Hola, {request.client_name.split(' ')[0]}</h1>
                    <p className="text-white/60 text-sm sm:text-base">Estado de tu solicitud #{request.id}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 md:-mt-16 max-w-2xl">
                {/* Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="skeuo-card rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 mb-4 md:mb-6"
                >
                    {/* Timeline */}
                    <div className="flex justify-between items-center relative mb-8 md:mb-10 px-2">
                        {/* Progress Line */}
                        <div className="absolute left-0 top-5 w-full h-1 bg-slate-100 -z-10 rounded-full" />
                        <div
                            className="absolute left-0 top-5 h-1 bg-green-500 transition-all duration-1000 -z-10 rounded-full"
                            style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                        />

                        {STATUS_STEPS.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2">
                                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isCompleted
                                        ? "bg-green-500 border-green-500 text-white shadow-lg"
                                        : "bg-white border-slate-200 text-slate-300"
                                        }`}
                                        style={isCompleted ? { boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)' } : {}}
                                    >
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors text-center ${isCompleted ? "text-green-600" : "text-slate-300"
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Current Status Message */}
                    <div className="text-center bg-slate-50 rounded-xl md:rounded-2xl p-5 md:p-6 border border-slate-100"
                         style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)' }}>
                        <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
                            {request.status === 'pendiente' && "Recibimos tu solicitud"}
                            {request.status === 'asignado' && "Ya tenes tecnico asignado!"}
                            {request.status === 'en_proceso' && "Estamos trabajando en ello"}
                            {request.status === 'finalizado' && "Trabajo completado!"}
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base">
                            {request.status === 'pendiente' && "Un operador esta revisando tu caso para asignarte al mejor tecnico."}
                            {request.status === 'asignado' && "El tecnico se pondra en contacto pronto para confirmar la visita."}
                            {request.status === 'en_proceso' && "El tecnico esta en camino o trabajando en tu domicilio."}
                            {request.status === 'finalizado' && "Esperamos que hayas quedado conforme con el servicio."}
                        </p>
                    </div>
                </motion.div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    {/* Schedule Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="skeuo-card rounded-2xl md:rounded-3xl p-5 md:p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="skeuo-badge w-10 h-10 rounded-full flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm md:text-base">Visita Programada</h3>
                                <p className="text-xs text-slate-500">Fecha y Hora estimada</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
                                 style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)' }}>
                                <span className="text-slate-500 text-sm">Fecha</span>
                                <span className="font-semibold text-slate-800 text-sm">
                                    {request.scheduled_date ? new Date(request.scheduled_date).toLocaleDateString() : "A confirmar"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
                                 style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)' }}>
                                <span className="text-slate-500 text-sm">Horario</span>
                                <span className="font-semibold text-slate-800 text-sm capitalize">
                                    {request.time_slot || "A confirmar"}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Technician Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="skeuo-card rounded-2xl md:rounded-3xl p-5 md:p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="skeuo-badge w-10 h-10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm md:text-base">Tu Tecnico</h3>
                                <p className="text-xs text-slate-500">Profesional asignado</p>
                            </div>
                        </div>
                        {request.technicians ? (
                            <div className="text-center pt-2">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center text-xl md:text-2xl"
                                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
                                    <User className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
                                </div>
                                <p className="font-semibold text-base md:text-lg text-slate-800">{request.technicians.name}</p>
                                <p className="text-brand text-sm font-medium">{request.technicians.role}</p>
                            </div>
                        ) : (
                            <div className="h-28 md:h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                                <User className="w-7 h-7 md:w-8 md:h-8 mb-2 opacity-50" />
                                <p className="text-sm">Aun no asignado</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Feedback Section (Only if finished) */}
                {request.status === 'finalizado' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-brand rounded-2xl md:rounded-3xl p-6 md:p-8 text-white text-center mb-6 md:mb-10 relative overflow-hidden"
                    >
                        {/* Texture */}
                        <div 
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />
                        <div className="relative z-10">
                            <h3 className="font-serif text-xl md:text-2xl mb-2">Como estuvo el servicio?</h3>
                            <p className="text-white/70 mb-6 text-sm md:text-base">Tu opinion nos ayuda a mejorar.</p>

                            {!feedbackSubmitted ? (
                                <div className="space-y-5 md:space-y-6">
                                    <div className="flex justify-center gap-1.5 md:gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`transition-all hover:scale-110 ${rating >= star ? "text-yellow-400" : "text-white/30"
                                                    }`}
                                            >
                                                <Star className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Dejanos un comentario (opcional)..."
                                        className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none text-sm md:text-base"
                                        rows={3}
                                    />
                                    <button
                                        onClick={submitFeedback}
                                        disabled={rating === 0}
                                        className="skeuo-button px-6 md:px-8 py-3 rounded-xl font-semibold text-brand disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Enviar Calificacion
                                    </button>
                                </div>
                            ) : (
                                <div className="py-6 md:py-8">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                    </div>
                                    <h4 className="text-lg md:text-xl font-semibold">Gracias por tu feedback!</h4>
                                    <p className="text-white/70 text-sm md:text-base">Nos alegra haberte ayudado.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
