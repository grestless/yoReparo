"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Plus, Trash2, Shield, X, Edit2, Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Technician } from "@/types";
import { toast } from "sonner";

export default function TechniciansPage() {
    const [techs, setTechs] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState<Technician | null>(null);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        status: "active"
    });

    useEffect(() => {
        fetchTechs();
    }, []);

    const fetchTechs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('technicians')
            .select('*')
            .order('name');

        if (error) {
            console.error("Error fetching techs:", error);
            toast.error("Error al cargar técnicos");
        } else {
            setTechs(data as any || []);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Convert empty strings to null for optional fields to avoid DB constraints
        // NOTE: 'email' column is missing in DB, excluding it for now to allow updates
        const dataToSave = {
            name: formData.name,
            role: formData.role,
            phone: formData.phone || null,
            email: formData.email || null,
            status: formData.status
        };

        console.log("Saving technician data:", dataToSave);

        if (editingTech) {
            // Update
            const { error } = await supabase
                .from('technicians')
                .update(dataToSave)
                .eq('id', editingTech.id);

            if (error) {
                console.error("Error updating technician:", error);
                toast.error(`Error al actualizar técnico: ${error.message}`);
            } else {
                toast.success("Técnico actualizado");
                fetchTechs();
                closeModal();
            }
        } else {
            // Create
            const { error } = await supabase
                .from('technicians')
                .insert([dataToSave]);

            if (error) {
                console.error("Error creating technician:", error);
                toast.error(`Error al crear técnico: ${error.message}`);
            } else {
                toast.success("Técnico creado");
                fetchTechs();
                closeModal();
            }
        }
        setSaving(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este técnico?")) {
            const { error } = await supabase
                .from('technicians')
                .delete()
                .eq('id', id);

            if (error) {
                toast.error("Error al eliminar técnico");
            } else {
                toast.success("Técnico eliminado");
                fetchTechs();
            }
        }
    };

    const openModal = (tech: Technician | null = null) => {
        if (tech) {
            setEditingTech(tech);
            setFormData({
                name: tech.name,
                role: tech.role,
                phone: tech.phone || "",
                email: tech.email || "",
                status: tech.status
            });
        } else {
            setEditingTech(null);
            setFormData({ name: "", role: "", phone: "", email: "", status: "active" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTech(null);
    };

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Equipo Técnico</h1>
                    <p className="text-slate-500">Gestioná a tus colaboradores.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Técnico
                </button>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techs.map((tech) => (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <User className="w-6 h-6" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${tech.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {tech.status === 'active' ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1">{tech.name}</h3>
                            <p className="text-sm text-blue-600 font-medium mb-4">{tech.role}</p>

                            <div className="space-y-2 text-sm text-slate-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {tech.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    ID: TECH-{tech.id.toString().padStart(3, '0')}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-slate-50">
                                <button
                                    onClick={() => openModal(tech)}
                                    className="flex-1 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(tech.id)}
                                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editingTech ? "Editar Técnico" : "Nuevo Técnico"}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Rol / Especialidad</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="active">Activo</option>
                                        <option value="inactive">Inactivo</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Guardar
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
