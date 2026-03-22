import React from "react";
import { Play, ChevronDown, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToTrips = () => {
    const section = document.getElementById("voyages");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[95vh] w-full overflow-hidden bg-mada-blue">
      {/* Background avec Overlay Multi-couches */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=2000"
          alt="Madagascar Baobabs"
          className="w-full h-full object-cover scale-105 animate-[zoom_25s_infinite_alternate]"
        />
        {/* Gradient sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-linear-to-r from-mada-blue via-mada-blue/40 to-transparent"></div>
        {/* Vignette pour l'aspect cinéma */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-mada-blue/40"></div>
      </div>

      {/* Contenu Principal */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-white z-10">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Sparkles size={14} className="text-mada-green" />
            L'Expérience Authentique
          </div>

          <h1 className="text-6xl md:text-[7rem] font-black mb-8 leading-[0.85] tracking-tighter">
            L'île <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-mada-green to-emerald-300">
              Infinie.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-50/70 max-w-xl mb-12 font-medium leading-relaxed">
            Des forêts de pierres de Bemaraha aux lagons secrets de Nosy Be.
            Découvrez Madagascar comme vous ne l'avez jamais imaginé.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={scrollToTrips}
              className="group bg-mada-green text-white px-12 py-6 rounded-4xl font-black text-lg shadow-2xl shadow-mada-green/30 hover:bg-white hover:text-mada-blue hover:-translate-y-2 transition-all duration-500 flex items-center gap-3"
            >
              Explorer les circuits
              <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </button>

            <button className="group bg-white/5 backdrop-blur-2xl border border-white/10 text-white px-10 py-6 rounded-4xl font-black text-lg hover:bg-white/15 transition-all flex items-center gap-4">
              <div className="w-10 h-10 bg-white text-mada-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play size={16} fill="currentColor" />
              </div>
              Regarder le film
            </button>
          </div>
        </div>
      </div>

      {/* Indicateur de Scroll Latéral */}
      <div className="absolute bottom-12 left-12 hidden md:flex items-center gap-6 text-white/40">
        <div className="flex flex-col items-center gap-2">
          <div className="w-0.5 h-16 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-mada-green animate-[scroll_2.5s_infinite]"></div>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] vertical-text">
          Scroll pour explorer
        </span>
      </div>

      {/* Décoration de coin */}
      <div className="absolute bottom-0 right-0 p-12 hidden lg:block">
        <div className="text-right">
          <p className="text-4xl font-black text-white/10 tracking-tighter uppercase">
            Madagasikara
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
