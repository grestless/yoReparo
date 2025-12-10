import Link from "next/link";
import { CheckCircle, Search } from "lucide-react";

interface SuccessScreenProps {
    id: number;
}

export default function SuccessScreen({ id }: SuccessScreenProps) {
    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">¡Solicitud Recibida!</h2>
                    <p className="text-slate-600 mb-8">
                        Tu solicitud ha sido registrada con éxito. Un técnico revisará tu caso y te contactará a la brevedad.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                        <p className="text-sm text-slate-500 mb-2 uppercase tracking-wide font-bold">Tu ID de Solicitud</p>
                        <p className="text-4xl font-black text-blue-600">#{id}</p>
                        <p className="text-xs text-slate-400 mt-2">Guardá este número para consultar el estado</p>
                    </div>

                    <Link
                        href={`/estado/${id}`}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]"
                    >
                        <Search className="w-5 h-5" />
                        Ver Estado de mi Solicitud
                    </Link>

                    <Link href="/" className="block mt-6 text-slate-400 hover:text-slate-600 font-medium text-sm">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </main>
    );
}
