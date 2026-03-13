import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 p-12 text-center border border-gray-100">
        
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
          🛑
        </div>

        <h1 className="text-3xl font-black text-[#003366] mb-4">
          Paiement interrompu
        </h1>

        <p className="text-gray-500 mb-10 leading-relaxed font-medium">
          Vous avez annulé la transaction. Rassurez-vous, <span className="text-[#003366] font-bold">aucun débit</span> n'a été effectué sur votre compte.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-[#003366] text-white py-5 rounded-2xl font-black transition-all hover:bg-[#002244] shadow-lg active:scale-95"
          >
            Réessayer la réservation
          </Link>

          <Link
            to="/"
            className="block w-full text-gray-400 hover:text-[#003366] font-black uppercase text-xs tracking-widest transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;