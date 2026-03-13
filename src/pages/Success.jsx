import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const { user, getToken } = useAuth();
  const [status, setStatus] = useState("loading");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const confirmReservation = async () => {
      try {
        const token = await getToken();
        
        // On appelle le backend pour confirmer la réception côté client
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/send-confirmation`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
              email: user?.email,
              userName: user?.name || "Cher client", // 'name' standardisé
              sessionId: sessionId
            }),
          }
        );

        if (response.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Erreur confirmation:", error);
        setStatus("error");
      }
    };

    if (sessionId && user) {
      confirmReservation();
    }
  }, [sessionId, user, getToken]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-12 text-center border border-gray-100 relative overflow-hidden">
        
        {/* Décoration de fond */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#00A86B]"></div>

        <div className="w-24 h-24 bg-green-50 text-[#00A86B] rounded-full flex items-center justify-center mx-auto mb-8 text-5xl animate-bounce">
          ✨
        </div>

        <h1 className="text-4xl font-black text-[#003366] mb-4">
          Misaotra !
        </h1>
        <p className="text-lg font-bold text-[#00A86B] mb-6 uppercase tracking-widest">
          Paiement Confirmé
        </p>

        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Sécurisation de votre réservation...</p>
          </div>
        )}

        {status === "success" && (
          <div className="animate-fade-in">
            <p className="text-gray-600 mb-8 leading-relaxed">
              Votre aventure commence maintenant. Un récapitulatif complet a été envoyé à : <br/>
              <span className="font-black text-[#003366]">{user?.email}</span>
            </p>
            <div className="bg-[#003366] text-white p-6 rounded-3xl mb-10 text-left flex items-start gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-bold text-sm">Étape suivante :</p>
                <p className="text-xs opacity-80">Un conseiller MadaVisit vous contactera sur WhatsApp sous 24h pour valider vos détails logistiques.</p>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-orange-600 mb-8 font-medium">
            Le paiement est validé, mais nous avons eu un petit souci pour envoyer l'email. Pas d'inquiétude, notre équipe vous contactera.
          </p>
        )}

        <Link
          to="/"
          className="inline-block w-full bg-[#003366] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#00A86B] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
        >
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
};

export default Success;