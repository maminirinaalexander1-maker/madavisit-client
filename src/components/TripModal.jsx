import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  CreditCard,
  Loader2,
  Sparkles,
} from "lucide-react";

const TripModal = ({ trip, onClose }) => {
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!trip) return null;

  const handlePayment = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour réserver ce voyage.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tripId: trip.id,
          titre: trip.titre,
          prix: trip.prix,
          userEmail: user.email,
          userId: user.uid,
          userName: user.nom || "Voyageur",
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (data.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("URL de paiement introuvable");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Erreur lors de l'initialisation du paiement : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-mada-blue/80 backdrop-blur-sm z-100 flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-auto md:max-w-5xl md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300">
        {/* Bouton Fermer Mobile (Flottant) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white md:hidden"
        >
          <X size={24} />
        </button>

        {/* Partie Gauche : Image & Badge */}
        <div className="relative w-full md:w-5/12 h-72 md:h-162.5">
          <img
            src={
              trip.images?.[0] ||
              "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
            }
            alt={trip.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 bg-mada-green text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
            <Sparkles size={14} />
            {trip.categorie || "Exclusivité"}
          </div>
          {/* Dégradé sur l'image pour mobile */}
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent md:hidden"></div>
        </div>

        {/* Partie Droite : Contenu */}
        <div className="flex-1 p-6 md:p-14 overflow-y-auto flex flex-col">
          {/* Header Desktop */}
          <div className="hidden md:flex justify-between items-start mb-8">
            <div className="space-y-1">
              <span className="text-mada-green font-black text-xs uppercase tracking-[0.2em]">
                Destinations 2026
              </span>
              <h2 className="text-4xl font-black text-mada-blue tracking-tighter leading-none">
                {trip.titre}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={32} />
            </button>
          </div>

          {/* Header Mobile */}
          <div className="md:hidden -mt-12 relative z-10 mb-6">
            <h2 className="text-3xl font-black text-mada-blue tracking-tighter mb-2">
              {trip.titre}
            </h2>
            <div className="flex items-center gap-2 text-mada-green font-bold text-xs uppercase">
              <MapPin size={14} />
              <span>Madagascar</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-10">
            <div className="bg-mada-blue/5 p-4 rounded-3xl border border-mada-blue/5 flex items-center gap-4 group hover:bg-mada-blue transition-colors duration-300">
              <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-mada-green transition-colors">
                <Clock
                  className="text-mada-blue group-hover:text-white"
                  size={20}
                />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase group-hover:text-white/60">
                  Durée
                </p>
                <p className="text-sm font-black text-mada-blue group-hover:text-white">
                  {trip.duree || "7 Jours"}
                </p>
              </div>
            </div>
            <div className="bg-mada-green/5 p-4 rounded-3xl border border-mada-green/5 flex items-center gap-4 group hover:bg-mada-green transition-colors duration-300">
              <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-mada-blue transition-colors">
                <Award
                  className="text-mada-green group-hover:text-white"
                  size={20}
                />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase group-hover:text-white/60">
                  Difficulté
                </p>
                <p className="text-sm font-black text-mada-blue group-hover:text-white">
                  {trip.difficulte || "Moyenne"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10 flex-1">
            <h3 className="text-[10px] font-black uppercase text-mada-green mb-4 tracking-[0.3em]">
              Itinéraire & Détails
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">
              {trip.description}
            </p>
          </div>

          {/* Footer & CTA */}
          <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-mada-blue tracking-tighter">
                {trip.prix}€
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                / pers.
              </span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`relative overflow-hidden group px-10 py-5 rounded-4xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 ${
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-mada-blue text-white hover:bg-mada-green shadow-blue-900/20 hover:shadow-mada-green/30"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <CreditCard
                    size={22}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Réserver maintenant</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
            <ShieldCheck size={14} className="text-mada-green" />
            Paiement 100% Sécurisé via Stripe
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
