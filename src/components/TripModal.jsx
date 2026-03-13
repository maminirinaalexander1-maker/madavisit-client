import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, MapPin, Clock, Award, ShieldCheck, CreditCard } from "lucide-react";

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

      // Utilisation de VITE_API_URL pour la cohérence avec ton .env
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
    <div className="fixed inset-0 bg-[#003366]/60 backdrop-blur-md z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row">
        {/* Partie Gauche : Image & Badges */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={
              trip.images && trip.images[0]
                ? trip.images[0]
                : "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
            }
            alt={trip.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-mada-green text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
            {trip.categorie || "Aventure"}
          </div>
        </div>

        {/* Partie Droite : Contenu */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-mada-blue transition-colors"
          >
            <X size={28} />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-mada-blue leading-tight mb-2">
              {trip.titre}
            </h2>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase">
              <MapPin size={16} className="text-mada-green" />
              <span>Madagascar</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
              <Clock className="text-mada-blue" size={20} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Durée
                </p>
                <p className="text-sm font-black text-mada-blue">
                  {trip.duree || "Flexible"}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
              <Award className="text-mada-blue" size={20} />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Difficulté
                </p>
                <p className="text-sm font-black text-mada-blue">
                  {trip.difficulte || "Modérée"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{trip.description}</p>
          </div>

          {/* Section Prix et Action */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Prix par personne
                </p>
                <p className="text-4xl font-black text-mada-green">
                  {trip.prix}€
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <ShieldCheck className="text-mada-green mb-1" size={20} />
                <span className="text-[9px] font-bold text-gray-400 uppercase max-w-20">
                  Annulation gratuite 48h
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-mada-blue text-white hover:bg-mada-blue-dark active:scale-95 shadow-blue-900/20"
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <CreditCard size={22} />
                  Réserver mon aventure
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
