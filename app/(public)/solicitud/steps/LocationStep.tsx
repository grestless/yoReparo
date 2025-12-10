import { useFormContext } from "react-hook-form";
import { Home, Building2, Store } from "lucide-react";
import { RequestFormData } from "../schemas";

interface LocationStepProps {
    onNext: () => void;
}

export default function LocationStep({ onNext }: LocationStepProps) {
    const { setValue, watch, formState: { errors } } = useFormContext<RequestFormData>();
    const locationType = watch("locationType");

    const locations = [
        { id: "hogar", icon: Home, label: "Hogar", desc: "Casa o Depto" },
        { id: "empresa", icon: Building2, label: "Empresa", desc: "Oficina o Edificio" },
        { id: "local", icon: Store, label: "Local", desc: "Comercio" },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <h3 className="text-2xl font-bold text-slate-800 text-center">
                ¿Dónde necesitamos ir?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
                {locations.map((type) => (
                    <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                            setValue("locationType", type.id as any);
                            onNext();
                        }}
                        className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all hover:scale-105 ${locationType === type.id
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                            : "border-slate-100 hover:border-blue-300 hover:shadow-lg"
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${locationType === type.id ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                            }`}>
                            <type.icon className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold text-slate-800">{type.label}</span>
                        <span className="text-sm text-slate-500">{type.desc}</span>
                    </button>
                ))}
            </div>
            {errors.locationType && (
                <p className="text-red-500 font-medium animate-pulse">
                    {errors.locationType.message}
                </p>
            )}
        </div>
    );
}
