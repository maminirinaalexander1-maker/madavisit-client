import React from "react";

const categories = ["Tout", "Tourisme", "École", "Entreprise", "Sur Mesure"];

const Filters = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-8 py-3 rounded-2xl font-bold transition-all ${
            active === cat
              ? "bg-[#003366] text-white shadow-xl shadow-blue-900/20 scale-105"
              : "bg-white text-gray-400 border border-gray-100 hover:border-[#00A86B] hover:text-[#00A86B]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Filters;
