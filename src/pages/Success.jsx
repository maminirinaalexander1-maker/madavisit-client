import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  CheckCircle,
  MessageCircle,
  Mail,
  ArrowRight,
  PartyPopper,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const { user, getToken } = useAuth();
  const [status, setStatus] = useState("loading");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const confirmReservation = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/send-confirmation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: user?.email,
              userName: user?.displayName || user?.name || "Cher voyageur",
              sessionId: sessionId,
            }),
          },
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-mada-green/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-mada-blue/10 rounded-full blur-3xl"></div>

      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-8 md:p-12 text-center border border-gray-50 relative animate-in fade-in zoom-in duration-500">
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-2 bg-mada-green"></div>

        <div className="w-24 h-24 bg-mada-green/10 text-mada-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          {status === "loading" ? (
            <Loader2 className="w-12 h-12 animate-spin" />
          ) : status === "success" ? (
            <PartyPopper className="w-12 h-12 animate-bounce" />
          ) : (
            <AlertCircle className="w-12 h-12 text-orange-500" />
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-mada-blue mb-2 tracking-tighter">
          Misaotra !
        </h1>
        <p className="text-sm font-black text-mada-green mb-8 uppercase tracking-[0.3em]">
          Paiement Confirmé
        </p>

        {status === "loading" && (
          <div className="py-4">
            <p className="text-gray-400 font-bold italic animate-pulse">
              Sécurisation de votre aventure en cours...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            <div className="p-6 bg-gray-50 rounded-4xl border border-gray-100 relative">
              <Mail
                className="absolute -top-3 -right-3 text-mada-green bg-white rounded-full p-1 shadow-md"
                size={32}
              />
              <p className="text-gray-600 leading-relaxed font-medium">
                Votre voyage est officiellement réservé. Le récapitulatif a été
                envoyé à : <br />
                <span className="font-black text-mada-blue block mt-1">
                  {user?.email}
                </span>
              </p>
            </div>

            <div className="bg-mada-blue text-white p-8 rounded-[2.5rem] text-left flex items-start gap-5 shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute -right-5 -bottom-5 opacity-10 group-hover:scale-110 transition-transform">
                <MessageCircle size={120} />
              </div>
              <div className="bg-white/10 p-3 rounded-2xl">
                <MessageCircle size={24} className="text-mada-green" />
              </div>
              <div className="relative z-10">
                <p className="font-black text-lg mb-1 italic">
                  Prochaine étape
                </p>
                <p className="text-xs text-blue-100/80 leading-relaxed font-medium">
                  Un conseiller MadaVisit vous contactera sur{" "}
                  <span className="text-mada-green font-bold">
                    WhatsApp sous 24h
                  </span>{" "}
                  pour finaliser vos transferts et options personnalisées.
                </p>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 mb-8">
            <p className="text-orange-700 text-sm font-bold leading-relaxed">
              Le paiement a réussi, mais l'envoi du mail de confirmation a
              rencontré un souci technique. Rassurez-vous, votre place est
              réservée !
            </p>
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/my-trips"
            className="group w-full bg-mada-blue hover:bg-mada-green text-white py-5 rounded-4xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
          >
            Voir mon carnet de voyage
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
          <Link
            to="/"
            className="inline-block mt-6 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-mada-blue transition-colors"
          >
            Retourner au catalogue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
