import React from "react";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 p-10 md:p-14 text-center border border-gray-50 relative animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-100">
          <XCircle size={48} />
        </div>

        <h1 className="text-3xl font-black text-mada-blue mb-4 tracking-tighter">
          Paiement interrompu
        </h1>

        <div className="space-y-4 mb-10">
          <p className="text-gray-500 leading-relaxed font-medium">
            La transaction a été annulée à votre demande.{" "}
            <span className="text-mada-blue font-bold">Aucun montant</span> n'a
            été prélevé sur votre carte.
          </p>

          <div className="flex items-center justify-center gap-2 text-mada-green font-bold text-[10px] uppercase tracking-widest bg-mada-green/5 py-2 rounded-full">
            <ShieldCheck size={14} /> Données de paiement sécurisées
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full bg-mada-blue hover:bg-mada-green text-white py-5 rounded-2xl font-black transition-all shadow-xl active:scale-95 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Réessayer la réservation
          </Link>

          <div className="pt-4 border-t border-gray-50 mt-6">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              Besoin d'aide ?
            </p>
            <button className="flex items-center justify-center gap-2 w-full text-mada-blue font-black text-sm hover:underline transition">
              <HelpCircle size={16} /> Contacter le support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
