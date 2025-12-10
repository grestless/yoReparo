"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle, Clock, User, MapPin, Calendar, Star, MessageCircle, ArrowRight, AlertTriangle, Home } from "lucide-react";
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
            alert("¡Gracias por tu opinión!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Solicitud no encontrada</h1>
                <p className="text-slate-500 mb-8">Verificá que el enlace sea correcto.</p>
                <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Volver al Inicio
                </Link>
            </div>
        );
    }

    const STATUS_STEPS = [
        { id: "pendiente", label: "Recibido", icon: MessageCircle },
        { id: "asignado", label: "Técnico Asignado", icon: User },
        { id: "en_proceso", label: "En Proceso", icon: Clock },
        { id: "finalizado", label: "Finalizado", icon: CheckCircle },
    ];

    const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === request.status);
    // Handle edge case where status might not match exactly or if we want "en_proceso" to cover "asignado" visually if needed, but linear is fine.
    // Actually, "asignado" comes before "en_proceso".

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-10 pb-24 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container mx-auto max-w-2xl relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                        <Home className="w-4 h-4" /> Volver al Inicio
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Hola, {request.client_name.split(' ')[0]}</h1>
                    <p className="text-slate-400">Estado de tu solicitud #{request.id}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 max-w-2xl">
                {/* Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6"
                >
                    {/* Timeline */}
                    <div className="flex justify-between items-center relative mb-10">
                        {/* Progress Line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10" />
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 transition-all duration-1000 -z-10"
                            style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                        />

                        {STATUS_STEPS.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isCompleted
                                        ? "bg-green-500 border-green-500 text-white shadow-lg scale-110"
                                        : "bg-white border-slate-200 text-slate-300"
                                        }`}>
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors ${isCompleted ? "text-green-600" : "text-slate-300"
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Current Status Message */}
                    <div className="text-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-2">
                            {request.status === 'pendiente' && "Recibimos tu solicitud"}
                            {request.status === 'asignado' && "¡Ya tenés técnico asignado!"}
                            {request.status === 'en_proceso' && "Estamos trabajando en ello"}
                            {request.status === 'finalizado' && "¡Trabajo completado!"}
                        </h2>
                        <p className="text-slate-500">
                            {request.status === 'pendiente' && "Un operador está revisando tu caso para asignarte al mejor técnico."}
                            {request.status === 'asignado' && "El técnico se pondrá en contacto pronto para confirmar la visita."}
                            {request.status === 'en_proceso' && "El técnico está en camino o trabajando en tu domicilio."}
                            {request.status === 'finalizado' && "Esperamos que hayas quedado conforme con el servicio."}
                        </p>
                    </div>
                </motion.div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Schedule Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Visita Programada</h3>
                                <p className="text-xs text-slate-500">Fecha y Hora estimada</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-500 text-sm">Fecha</span>
                                <span className="font-bold text-slate-800">
                                    {request.scheduled_date ? new Date(request.scheduled_date).toLocaleDateString() : "A confirmar"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-500 text-sm">Horario</span>
                                <span className="font-bold text-slate-800 capitalize">
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
                        className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Tu Técnico</h3>
                                <p className="text-xs text-slate-500">Profesional asignado</p>
                            </div>
                        </div>
                        {request.technicians ? (
                            <div className="text-center pt-2">
                                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                                    👨‍🔧
                                </div>
                                <p className="font-bold text-lg text-slate-800">{request.technicians.name}</p>
                                <p className="text-blue-600 text-sm font-medium">{request.technicians.role}</p>
                            </div>
                        ) : (
                            <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                                <User className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-sm">Aún no asignado</p>
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
                        className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white text-center mb-10"
                    >
                        <h3 className="text-2xl font-bold mb-2">¿Cómo estuvo el servicio?</h3>
                        <p className="text-blue-100 mb-6">Tu opinión nos ayuda a mejorar.</p>

                        {!feedbackSubmitted ? (
                            <div className="space-y-6">
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`transition-all hover:scale-110 ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-blue-300"
                                                }`}
                                        >
                                            <Star className="w-10 h-10 fill-current" />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Dejanos un comentario (opcional)..."
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                                    rows={3}
                                />
                                <button
                                    onClick={submitFeedback}
                                    disabled={rating === 0}
                                    className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    Enviar Calificación
                                </button>
                            </div>
                        ) : (
                            <div className="py-8">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-xl font-bold">¡Gracias por tu feedback!</h4>
                                <p className="text-blue-100">Nos alegra haberte ayudado.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </main>
    );
}
