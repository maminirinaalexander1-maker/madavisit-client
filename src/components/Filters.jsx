import React from "react";
import { Compass, GraduationCap, Briefcase, Sparkles, Map } from "lucide-react";

const categories = [
  { name: "Tout", icon: <Map size={16} /> },
  { name: "Tourisme", icon: <Compass size={16} /> },
  { name: "École", icon: <GraduationCap size={16} /> },
  { name: "Entreprise", icon: <Briefcase size={16} /> },
  { name: "Sur Mesure", icon: <Sparkles size={16} /> },
];

const Filters = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onChange(cat.name)}
          className={`group flex items-center gap-2 px-8 py-4 rounded-4xl font-black text-sm uppercase tracking-widest transition-all duration-300 active:scale-90 ${
            active === cat.name
              ? "bg-mada-blue text-white shadow-2xl shadow-blue-900/20 -translate-y-1"
              : "bg-white text-gray-400 border border-gray-100 hover:border-mada-green hover:text-mada-green hover:shadow-lg"
          }`}
        >
          <span
            className={`${active === cat.name ? "text-mada-green" : "text-gray-300 group-hover:text-mada-green"} transition-colors`}
          >
            {cat.icon}
          </span>
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Filters;
