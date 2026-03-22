import React from "react";
import { Clock, ArrowRight, Star, MapPin } from "lucide-react";

const TripCard = ({ trip, onClick }) => {
  // Gestion sécurisée de l'image
  const displayImage =
    trip.imageUrl ||
    trip.image ||
    (trip.images && trip.images[0]) ||
    "https://images.unsplash.com/photo-1589982841202-0e9803159981?q=80&w=800";

  return (
    <div
      onClick={() => onClick(trip)}
      className="group bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-mada-blue/10 transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col h-full active:scale-95 md:active:scale-100"
    >
      {/* Image Container */}
      <div className="relative h-40 md:h-72 overflow-hidden">
        <img
          src={displayImage}
          alt={trip.titre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />

        {/* Prix - Badge flottant haute visibilité */}
        <div className="absolute top-2 right-2 md:top-5 md:right-5 bg-white/90 backdrop-blur-md px-2 py-1 md:px-5 md:py-2.5 rounded-lg md:rounded-2xl font-black text-mada-blue shadow-xl text-[10px] md:text-lg border border-white/20">
          {trip.prix} €
        </div>

        {/* Catégorie - Style Étiquette */}
        <div className="absolute bottom-2 left-2 md:bottom-5 md:left-5">
          <span className="bg-mada-green text-white text-[8px] md:text-[10px] font-black px-2 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
            {trip.categorie || "Circuit"}
          </span>
        </div>

        {/* Overlay sombre discret pour améliorer le contraste des badges */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info Container */}
      <div className="p-3 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-1 md:mb-4">
          <div className="flex items-center gap-1 text-mada-green font-bold text-[9px] md:text-xs uppercase tracking-[0.15em]">
            <Clock size={12} className="md:w-4 md:h-4" />
            {trip.duree || "10j"}
          </div>
          <div className="flex items-center gap-1 text-orange-400 font-bold text-[10px] md:text-sm">
            <Star size={12} fill="currentColor" className="md:w-4 md:h-4" />
            <span className="text-gray-400 font-medium">5.0</span>
          </div>
        </div>

        <h3 className="text-sm md:text-2xl font-black text-mada-blue mb-1 md:mb-4 leading-tight group-hover:text-mada-green transition-colors line-clamp-2 tracking-tight">
          {trip.titre}
        </h3>

        {/* Description - Masquée sur mobile pour garder la grille propre */}
        <p className="hidden md:block text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8 font-medium italic opacity-80">
          {trip.description}
        </p>

        {/* Footer de la carte */}
        <div className="mt-auto pt-2 md:pt-6 border-t border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
            <MapPin size={10} className="md:w-3.5 md:h-3.5 text-mada-green" />
            <span>Madagascar</span>
          </div>

          {/* Bouton d'action dynamique */}
          <div className="w-7 h-7 md:w-14 md:h-14 bg-mada-blue/5 rounded-lg md:rounded-2xl flex items-center justify-center text-mada-blue group-hover:bg-mada-blue group-hover:text-white group-hover:rotate-[-10deg] transition-all duration-300 shadow-sm">
            <ArrowRight size={14} className="md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
