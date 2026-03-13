import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Search, MapPin, Clock, ArrowRight } from "lucide-react";
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

  // Filtrage intelligent (recherche par titre ou catégorie)
  const filteredTrips = trips.filter((t) => {
    const titre = (t.titre || "").toLowerCase();
    const categorie = (t.categorie || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return titre.includes(search) || categorie.includes(search);
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-mada-green border-r-transparent border-b-mada-blue border-l-transparent mb-4"></div>
        <p className="text-mada-blue font-medium animate-pulse">
          Recherche des meilleures offres...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Barre de Recherche Ultra Moderne */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-full max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Où voulez-vous aller ? (ex: Nosy Be, Aventure...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-mada-green focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 text-sm text-gray-500 font-medium">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {filteredTrips.length} circuits trouvés
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl mb-8">
          {error}
        </div>
      )}

      {/* Grille de Voyages Style "Card Moderne" */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col"
            >
              {/* Image avec Overlay au Hover */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    trip.images && trip.images[0]
                      ? trip.images[0]
                      : "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
                  }
                  alt={trip.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-mada-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  {trip.categorie || "Circuit"}
                </div>
                <div className="absolute bottom-4 right-4 bg-mada-green text-white px-4 py-2 rounded-xl text-lg font-black shadow-lg">
                  {trip.prix ? `${trip.prix} €` : "Sur devis"}
                </div>
              </div>

              {/* Contenu de la Card */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-mada-green text-xs font-bold mb-3 uppercase tracking-widest">
                  <Clock size={14} />
                  {trip.duree || "Durée flexible"}
                </div>

                <h3 className="text-2xl font-bold text-mada-blue mb-3 group-hover:text-mada-green transition-colors">
                  {trip.titre}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                  {trip.description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-xs italic">
                    <MapPin size={14} />
                    Madagascar
                  </div>
                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="flex items-center gap-2 text-mada-blue font-black text-sm group/btn"
                  >
                    DÉCOUVRIR
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem]">
          <div className="text-6xl mb-4">🏝️</div>
          <p className="text-gray-500 text-xl font-medium italic">
            Aucun trésor trouvé pour cette recherche...
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-6 bg-mada-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-mada-green transition-all"
          >
            Réinitialiser
          </button>
        </div>
      )}

      {/* Modale de détails (TripModal) */}
      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}

      {/* Support WhatsApp */}
      <WhatsAppChat />
    </div>
  );
};

export default TripList;
