"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Clock, AlertTriangle, User, MapPin, CheckCircle, Calendar, X, Phone, ChevronDown, MessageCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/utils/whatsapp";

import { toast } from "sonner";
import { ServiceRequest, Technician } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [techs, setTechs] = useState<Technician[]>([]);
    const [selectedTechId, setSelectedTechId] = useState<string>("");

    // Month Filter State
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 7); // "YYYY-MM"
    });

    useEffect(() => {
        fetchRequests();
        fetchTechs();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('requests')
            .select(`
                *,
                technicians ( name )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching requests:", error);
            toast.error("Error al cargar solicitudes");
        } else {
            setRequests(data as any || []);
        }
        setLoading(false);
    };

    const fetchTechs = async () => {
        const { data, error } = await supabase.from('technicians').select('*').eq('status', 'active');
        if (error) {
            toast.error("Error al cargar técnicos");
        } else {
            setTechs(data as any || []);
        }
    };

    const updateStatus = async (id: number, newStatus: string, techId?: string) => {
        const previousRequests = [...requests];

        // Optimistic update
        const updatedRequests = requests.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    status: newStatus as any,
                    technician_id: techId ? parseInt(techId) : r.technician_id,
                    technicians: techId ? { name: techs.find(t => t.id === parseInt(techId))?.name || '' } : r.technicians
                };
            }
            return r;
        });
        setRequests(updatedRequests);

        if (selectedRequest && selectedRequest.id === id) {
            setSelectedRequest(updatedRequests.find(r => r.id === id) || null);
        }

        const updateData: any = { status: newStatus };
        if (techId) updateData.technician_id = parseInt(techId);

        const { error } = await supabase
            .from('requests')
            .update(updateData)
            .eq('id', id);

        if (error) {
            console.error("Error updating status:", error);
            toast.error("Error al actualizar estado");
            setRequests(previousRequests); // Revert
        } else {
            toast.success("Estado actualizado correctamente");
        }
    };

    // Filter requests based on selected month
    const filteredRequests = requests.filter(req => {
        if (!req.created_at) return false;
        return req.created_at.startsWith(selectedMonth);
    });

    useEffect(() => {
        fetchRequests();
        fetchTechs();
    }, []);

    return (
        <div className="p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Tablero de Control</h1>
                    <p className="text-slate-500">Gestioná las solicitudes en tiempo real.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        />
                    </div>
                    <button onClick={fetchRequests} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 shadow-sm">
                        <Search className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-2xl" />
                    ))
                ) : (
                    [
                        { label: "Pendientes", value: filteredRequests.filter(r => r.status === "pendiente").length, color: "text-yellow-600", bg: "bg-yellow-50" },
                        { label: "En Proceso", value: filteredRequests.filter(r => r.status === "en_proceso" || r.status === "asignado").length, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Finalizados", value: filteredRequests.filter(r => r.status === "finalizado").length, color: "text-green-600", bg: "bg-green-50" },
                        { label: "Urgencias", value: filteredRequests.filter(r => r.urgency === "urgente").length, color: "text-red-600", bg: "bg-red-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                    ))
                )}
            </div>

            {/* Kanban Board */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-40 rounded-xl" />
                            <Skeleton className="h-40 rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column: Pendientes */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Pendientes
                        </h3>
                        {filteredRequests.filter(r => r.status === "pendiente").map(req => (
                            <RequestCard
                                key={req.id}
                                req={req}
                                onClick={() => setSelectedRequest(req)}
                            />
                        ))}
                        {filteredRequests.filter(r => r.status === "pendiente").length === 0 && (
                            <div className="text-center py-8 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                No hay pendientes
                            </div>
                        )}
                    </div>

                    {/* Column: En Proceso */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" /> En Proceso
                        </h3>
                        {filteredRequests.filter(r => r.status === "asignado" || r.status === "en_proceso").map(req => (
                            <RequestCard
                                key={req.id}
                                req={req}
                                onClick={() => setSelectedRequest(req)}
                            />
                        ))}
                    </div>

                    {/* Column: Finalizados */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Finalizados
                        </h3>
                        {filteredRequests.filter(r => r.status === "finalizado").map(req => (
                            <RequestCard
                                key={req.id}
                                req={req}
                                onClick={() => setSelectedRequest(req)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Request Details Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedRequest(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedRequest.client_name}</h2>
                                    <p className="text-sm text-slate-500">ID: #{selectedRequest.id}</p>
                                </div>
                                <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Status & Urgency */}
                                <div className="flex gap-4">
                                    <div className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${selectedRequest.status === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                        selectedRequest.status === 'finalizado' ? 'bg-green-100 text-green-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {selectedRequest.status.replace('_', ' ')}
                                    </div>
                                    {selectedRequest.urgency === 'urgente' && (
                                        <div className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700 flex items-center gap-1">
                                            <AlertTriangle className="w-4 h-4" /> Urgente
                                        </div>
                                    )}
                                </div>

                                {/* Service Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Servicio</label>
                                        <p className="font-medium text-slate-800">{selectedRequest.services}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Problema</label>
                                        <p className="font-medium text-slate-800">{selectedRequest.issue_type}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Preferencia de Turno</label>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium">
                                                {selectedRequest.scheduled_date ? new Date(selectedRequest.scheduled_date).toLocaleDateString() : 'Sin fecha'}
                                            </span>
                                            <span className="text-slate-400">|</span>
                                            <span className="capitalize">{selectedRequest.time_slot || 'Sin hora'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Descripción del Cliente</label>
                                    <p className="text-slate-700 italic">"{selectedRequest.message || 'Sin descripción adicional'}"</p>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Phone className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">{selectedRequest.phone}</span>
                                        <button
                                            onClick={() => openWhatsApp(`Hola ${selectedRequest.client_name}, te escribo por tu solicitud de servicio.`, selectedRequest.phone)}
                                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                                        >
                                            WhatsApp
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <MapPin className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">{selectedRequest.address} ({selectedRequest.location_type})</span>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRequest.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                        >
                                            Ver Mapa
                                        </a>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => openWhatsApp(`Hola ${selectedRequest.client_name}, te confirmamos tu visita para el ${selectedRequest.scheduled_date ? new Date(selectedRequest.scheduled_date).toLocaleDateString() : ''} por la ${selectedRequest.time_slot}.`, selectedRequest.phone)}
                                        disabled={!selectedRequest.scheduled_date}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold hover:bg-green-100 transition-colors disabled:opacity-50"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Confirmar Turno
                                    </button>
                                    <button
                                        onClick={() => openWhatsApp(`Hola ${selectedRequest.client_name}, el técnico ${selectedRequest.technicians?.name || 'asignado'} está en camino a tu domicilio.`, selectedRequest.phone)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                                    >
                                        <User className="w-4 h-4" />
                                        Técnico en Camino
                                    </button>
                                    <button
                                        onClick={() => openWhatsApp(`Hola ${selectedRequest.client_name}, ya finalizamos el trabajo. Podés ver el estado y calificarnos aquí: https://multitech-pro.vercel.app/estado/${selectedRequest.id}`, selectedRequest.phone)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-bold hover:bg-purple-100 transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Solicitar Feedback
                                    </button>
                                </div>

                                {/* Technician Assignment */}
                                <div className="border-t border-slate-100 pt-6">
                                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Técnico Asignado</label>
                                    {selectedRequest.technicians ? (
                                        <div className="flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-4 py-2 rounded-lg inline-block">
                                            <User className="w-4 h-4" />
                                            {selectedRequest.technicians.name}
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <select
                                                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={selectedTechId}
                                                    onChange={(e) => setSelectedTechId(e.target.value)}
                                                >
                                                    <option value="">Seleccionar Técnico...</option>
                                                    {techs.map(t => (
                                                        <option key={t.id} value={t.id}>{t.name} ({t.role})</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                            <button
                                                disabled={!selectedTechId}
                                                onClick={() => updateStatus(selectedRequest.id, 'asignado', selectedTechId)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Asignar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
                                {(selectedRequest.status === 'asignado' || selectedRequest.status === 'en_proceso') && (
                                    <button
                                        onClick={() => updateStatus(selectedRequest.id, 'finalizado')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                                    >
                                        Finalizar Trabajo
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

function RequestCard({ req, onClick }: { req: any, onClick: () => void }) {
    return (
        <motion.div
            layout
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{req.client_name}</span>
                {req.urgency === "urgente" && (
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className={`w-2 h-2 rounded-full ${req.status === 'pendiente' ? 'bg-yellow-500' :
                        req.status === 'finalizado' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                    <span className="truncate">{req.services}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{req.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {new Date(req.created_at).toLocaleDateString()}
                </div>
                {req.technicians && (
                    <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mt-2 pt-2 border-t border-slate-50">
                        <User className="w-3 h-3" />
                        {req.technicians.name}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
