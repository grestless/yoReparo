import { useFormContext } from "react-hook-form";
import { Trash2, Calendar, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useService } from "@/context/ServiceContext";
import { RequestFormData } from "../schemas";

export default function ServiceStep() {
    const { selectedServices, removeService } = useService();
    const { setValue, watch } = useFormContext<RequestFormData>();
    const urgency = watch("urgency");

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                ¿Qué servicio necesitás?
            </h3>

            {/* Selected Services List */}
            <div className="mb-8">
                {selectedServices.length === 0 ? (
                    <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-500 mb-4">No seleccionaste ningún servicio aún.</p>
                        <Link href="/servicios" className="text-blue-600 font-bold hover:underline">
                            + Agregar Servicio desde el Inicio
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedServices.map((s) => (
                            <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <span className="font-medium text-slate-700">{s.title}</span>
                                <button type="button" onClick={() => removeService(s.id)} className="text-red-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Urgency Selector */}
            <div className="mt-auto">
                <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">¿Es una urgencia?</h4>
                <div className="flex gap-4 justify-center">
                    <button
                        type="button"
                        onClick={() => setValue("urgency", "normal")}
                        className={`flex-1 max-w-xs p-4 rounded-xl border-2 flex items-center justify-center gap-3 transition-all ${urgency === "normal"
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-slate-200 hover:border-green-200"
                            }`}
                    >
                        <Calendar className="w-5 h-5" />
                        <div className="text-left">
                            <div className="font-bold">Normal</div>
                            <div className="text-xs opacity-80">Coordinar visita</div>
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("urgency", "urgente")}
                        className={`flex-1 max-w-xs p-4 rounded-xl border-2 flex items-center justify-center gap-3 transition-all ${urgency === "urgente"
                            ? "border-red-500 bg-red-50 text-red-700 animate-pulse-slow"
                            : "border-slate-200 hover:border-red-200"
                            }`}
                    >
                        <AlertTriangle className="w-5 h-5" />
                        <div className="text-left">
                            <div className="font-bold">Urgente</div>
                            <div className="text-xs opacity-80">Lo antes posible</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
