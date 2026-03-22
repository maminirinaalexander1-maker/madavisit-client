import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Search, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import TripModal from "./TripModal";
import WhatsAppChat from "./WhatsAppChat";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    // Référence à la collection "trips" triée par date de création
    const q = query(collection(db, "trips"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tripData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripData);
        setLoading(false);
      },
      (err) => {
        console.error("Erreur Firestore :", err);
        setError(
          "Impossible de charger les voyages. Vérifiez votre connexion.",
        );
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Filtrage intelligent
  const filteredTrips = trips.filter((t) => {
    const titre = (t.titre || "").toLowerCase();
    const categorie = (t.categorie || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return titre.includes(search) || categorie.includes(search);
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32">
        <Loader2 className="h-12 w-12 text-mada-green animate-spin mb-4" />
        <p className="text-mada-blue font-bold animate-pulse tracking-tight">
          Exploration de la Grande Île...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Barre de Recherche Responsive */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-xl group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mada-green transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Où voulez-vous aller ? (ex: Nosy Be, Sud...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-mada-green/20 focus:border-mada-green outline-none transition-all text-sm md:text-base"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-mada-green/10 text-mada-green px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            {filteredTrips.length} circuits
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl mb-8 text-sm">
          {error}
        </div>
      )}

      {/* Grille de Voyages : 2 colonnes Mobile, 3 colonnes Desktop */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="group bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer active:scale-95 md:active:scale-100"
            >
              {/* Image avec Overlay */}
              <div className="relative h-40 md:h-72 overflow-hidden">
                <img
                  src={
                    trip.images?.[0] ||
                    "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
                  }
                  alt={trip.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Catégorie */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/95 backdrop-blur-md text-mada-blue px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-tighter md:tracking-widest shadow-sm">
                  {trip.categorie || "Aventure"}
                </div>
                {/* Prix */}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-mada-green text-white px-2 py-1 md:px-5 md:py-2.5 rounded-lg md:rounded-2xl text-[10px] md:text-xl font-black shadow-xl">
                  {trip.prix ? `${trip.prix} €` : "Devis"}
                </div>
              </div>

              {/* Contenu de la Card */}
              <div className="p-3 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-mada-green text-[9px] md:text-xs font-bold mb-1 md:mb-4 uppercase tracking-widest">
                  <Clock size={12} className="md:w-4" />
                  <span>{trip.duree || "7 jours"}</span>
                </div>

                <h3 className="text-[13px] md:text-2xl font-black text-mada-blue mb-1 md:mb-4 group-hover:text-mada-green transition-colors leading-tight line-clamp-2">
                  {trip.titre}
                </h3>

                {/* Description - Cachée sur mobile pour la clarté */}
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8 italic">
                  {trip.description}
                </p>

                <div className="mt-auto pt-2 md:pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-[8px] md:text-[11px] font-bold uppercase tracking-tighter">
                    <MapPin size={10} className="md:w-3.5" />
                    <span>Madagascar</span>
                  </div>
                  <button className="flex items-center gap-1 md:gap-2 text-mada-blue font-black text-[9px] md:text-xs group/btn">
                    <span className="hidden md:inline">DÉCOUVRIR</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* État Vide (Empty State) */
        <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-gray-100">
          <div className="text-5xl mb-4">🛶</div>
          <h3 className="text-mada-blue font-black text-xl mb-2">
            Aucun circuit trouvé
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Essayez un autre mot-clé ou une autre destination.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="bg-mada-blue text-white px-8 py-3 rounded-full font-bold hover:bg-mada-green transition-all shadow-lg shadow-blue-900/10"
          >
            Voir tous les voyages
          </button>
        </div>
      )}

      {/* Modales et Chats */}
      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
      <WhatsAppChat />
    </div>
  );
};

export default TripList;
