import React from "react";

const Hero = () => {
  const scrollToTrips = () => {
    const section = document.getElementById("voyages");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-[#003366]">
      {/* Arrière-plan avec animation de zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=2000"
          alt="Madagascar Baobabs"
          className="w-full h-full object-cover scale-110 animate-[zoom_20s_infinite_alternate]"
        />
        {/* Overlay progressif : plus sombre à gauche pour le texte */}
        <div className="absolute inset-0 bg-linear-to-r from-[#003366] via-[#003366]/60 to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-white z-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block bg-[#00A86B] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-lg shadow-green-900/20">
            Destination Madagascar
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            L'aventure <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A86B] to-emerald-300">
              Absolue.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/80 max-w-xl mb-12 font-medium leading-relaxed">
            Des Tsingy de Bemaraha aux eaux turquoise de Nosy Be, créez des
            souvenirs qui dureront toute une vie.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={scrollToTrips}
              className="bg-[#00A86B] text-white px-10 py-5 rounded-4xl font-black text-lg shadow-2xl shadow-green-900/40 hover:bg-white hover:text-[#003366] hover:-translate-y-1 transition-all duration-300"
            >
              Réserver mon circuit
            </button>
            <button className="group bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-4xl font-black text-lg hover:bg-white/20 transition-all flex items-center gap-3">
              <span className="w-8 h-8 bg-white text-[#003366] rounded-full flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                ▶
              </span>
              Voir le film
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-12 flex items-center gap-4 text-white/40 font-bold text-xs uppercase tracking-widest animate-pulse">
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00A86B] animate-[scroll_2s_infinite]"></div>
        </div>
        Scroll pour explorer
      </div>
    </div>
  );
};

export default Hero;
