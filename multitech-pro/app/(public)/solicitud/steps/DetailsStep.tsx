import { useFormContext } from "react-hook-form";
import { Mic } from "lucide-react";
import { openWhatsApp } from "@/utils/whatsapp";
import { useService } from "@/context/ServiceContext";
import { RequestFormData } from "../schemas";

export default function DetailsStep() {
    const { register, setValue, watch, formState: { errors } } = useFormContext<RequestFormData>();
    const { selectedServices } = useService();
    const issueType = watch("issueType");

    const commonIssues = [
        "No enciende", "Hace ruido extraño", "Pierde agua/gas",
        "No enfría/calienta", "Mantenimiento preventivo", "Instalación nueva"
    ];

    const handleAudioClick = () => {
        const msg = `Hola, quiero enviar un audio sobre mi problema con ${selectedServices.map((s) => s.title).join(", ")}.`;
        openWhatsApp(msg);
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Detalles del Problema
            </h3>

            <div className="space-y-6">
                {/* Common Issues Tags */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-3">
                        Problemas comunes (Seleccioná uno o escribí abajo)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {commonIssues.map((issue) => (
                            <button
                                key={issue}
                                type="button"
                                onClick={() => setValue("issueType", issue)}
                                className={`px-4 py-2 rounded-full text-sm border transition-all ${issueType === issue
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                                    }`}
                            >
                                {issue}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Message */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Descripción detallada
                    </label>
                    <textarea
                        {...register("message")}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none ${errors.message ? "border-red-500" : "border-slate-200"
                            }`}
                        placeholder="Contanos más detalles..."
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                {/* Audio Option */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <Mic className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">¿Te da fiaca escribir?</p>
                            <p className="text-xs text-slate-500">Mandanos un audio por WhatsApp</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleAudioClick}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-colors"
                    >
                        Ir a WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
