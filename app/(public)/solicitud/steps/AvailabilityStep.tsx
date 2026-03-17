import { useFormContext } from "react-hook-form";
import { Sun, Sunset, Clock } from "lucide-react";
import { RequestFormData } from "../schemas";

export default function AvailabilityStep() {
    const { register, setValue, watch, formState: { errors } } = useFormContext<RequestFormData>();
    const timeSlot = watch("timeSlot");

    const slots = [
        { id: "manana", label: "Mañana", time: "8:00 - 12:00", icon: Sun },
        { id: "tarde", label: "Tarde", time: "12:00 - 16:00", icon: Sun },
        { id: "noche", label: "Vespertino", time: "16:00 - 20:00", icon: Sunset },
    ];

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                ¿Cuándo podés recibirnos?
            </h3>

            <div className="space-y-8">
                {/* Date Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-3 text-center">
                        Elegí una fecha preferida
                    </label>
                    <div className="flex flex-col items-center">
                        <input
                            type="date"
                            {...register("scheduledDate")}
                            min={new Date().toISOString().split('T')[0]}
                            className={`px-6 py-3 rounded-xl border text-slate-700 font-medium focus:ring-2 focus:ring-brand outline-none shadow-sm w-full max-w-xs ${errors.scheduledDate ? "border-red-500" : "border-slate-200"
                                }`}
                        />
                        {errors.scheduledDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.scheduledDate.message}</p>
                        )}
                    </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-3 text-center">
                        Franja Horaria
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {slots.map((slot) => (
                            <button
                                key={slot.id}
                                type="button"
                                onClick={() => setValue("timeSlot", slot.id)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${timeSlot === slot.id
                                    ? "border-brand bg-brand/5 text-brand"
                                    : "border-slate-100 hover:border-brand/30 text-slate-600"
                                    }`}
                            >
                                <slot.icon className={`w-6 h-6 ${timeSlot === slot.id ? "text-brand" : "text-slate-400"}`} />
                                <span className="font-bold">{slot.label}</span>
                                <span className="text-xs opacity-80">{slot.time}</span>
                            </button>
                        ))}
                    </div>
                    {errors.timeSlot && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errors.timeSlot.message}</p>
                    )}
                </div>

                <div className="bg-brand/5 p-4 rounded-xl flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-brand-foreground/80 md:text-black">
                        Haremos lo posible por cumplir tu preferencia. El técnico te confirmará el horario exacto.
                    </p>
                </div>
            </div>
        </div>
    );
}
