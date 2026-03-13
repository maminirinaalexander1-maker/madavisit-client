import React from "react";
import { Clock, ArrowRight, Star } from "lucide-react";

const TripCard = ({ trip, onClick }) => {
  return (
    <div
      onClick={() => onClick(trip)}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            trip.imageUrl ||
            trip.image ||
            "https://images.unsplash.com/photo-1589982841202-0e9803159981?q=80&w=800"
          }
          alt={trip.titre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl font-black text-[#003366] shadow-xl">
          {trip.prix} €
        </div>
        <div className="absolute bottom-5 left-5">
          <span className="bg-[#00A86B] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
            {trip.categorie}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-[#00A86B] font-bold text-xs uppercase tracking-widest">
            <Clock size={14} /> {trip.duree || "10 jours"}
          </div>
          <div className="flex items-center gap-1 text-orange-400 font-bold text-xs">
            <Star size={14} fill="currentColor" /> 5.0
          </div>
        </div>

        <h3 className="text-2xl font-black text-[#003366] mb-3 leading-tight group-hover:text-[#00A86B] transition-colors">
          {trip.titre}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {trip.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Voir détails
          </span>
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all duration-300">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
