import { useFormContext } from "react-hook-form";
import { User, Smartphone, MapPin, CheckCircle } from "lucide-react";
import { RequestFormData } from "../schemas";

interface ContactStepProps {
    onSubmit: () => void;
}

export default function ContactStep({ onSubmit }: ContactStepProps) {
    const { register, handleSubmit, formState: { errors } } = useFormContext<RequestFormData>();

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Datos de Contacto
            </h3>

            <form id="wizard-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-1 block">Nombre</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none ${errors.name ? "border-red-500" : "border-slate-200"
                                    }`}
                                placeholder="Tu nombre"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-1 block">Teléfono</label>
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="tel"
                                {...register("phone")}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none ${errors.phone ? "border-red-500" : "border-slate-200"
                                    }`}
                                placeholder="11 1234 5678"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-600 mb-1 block">Dirección</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            {...register("address")}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none ${errors.address ? "border-red-500" : "border-slate-200"
                                }`}
                            placeholder="Calle y Altura"
                        />
                    </div>
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start mt-4">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                        Al confirmar, un técnico revisará tu solicitud y te contactará para coordinar la visita.
                    </p>
                </div>
            </form>
        </div>
    );
}
