import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TripList from "../components/TripList";
import {
  Compass,
  ShieldCheck,
  PhoneCall,
  Globe,
  Facebook,
  Instagram,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-mada-green selection:text-white">
      <Navbar />

      <Hero />

      {/* Section Valeurs : Cartes Flottantes */}
      <section className="py-24 relative overflow-hidden">
        {/* Décoration en arrière-plan */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mada-green/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mada-blue/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <FeatureCard
              icon={
                <Compass
                  size={32}
                  className="text-mada-blue group-hover:text-white transition-colors"
                />
              }
              title="Aventures Locales"
              desc="Des circuits conçus par des Malgaches pour une immersion totale et respectueuse."
            />
            <FeatureCard
              icon={
                <ShieldCheck
                  size={32}
                  className="text-mada-green group-hover:text-white transition-colors"
                />
              }
              title="Sûreté & Confort"
              desc="Véhicules récents et partenaires hôteliers sélectionnés pour votre tranquillité."
            />
            <FeatureCard
              icon={
                <Globe
                  size={32}
                  className="text-mada-blue group-hover:text-white transition-colors"
                />
              }
              title="Impact Positif"
              desc="Chaque voyage soutient l'économie locale et la préservation de la biodiversité."
            />
          </div>
        </div>
      </section>

      {/* Main Content : Catalogue */}
      <main id="voyages" className="max-w-7xl mx-auto py-16 px-6">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-mada-green/10 rounded-full text-mada-green text-xs font-bold uppercase tracking-widest">
            Nos Destinations
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-mada-blue tracking-tighter leading-tight">
            Prêt pour le{" "}
            <span className="text-mada-green italic">départ ?</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Choisissez l'expérience qui vous ressemble parmi nos sélections
            exclusives à travers la Grande Île.
          </p>
          <div className="h-1 w-20 bg-mada-green mx-auto rounded-full"></div>
        </div>

        {/* Le catalogue des circuits */}
        <div className="animate-fade-in">
          <TripList />
        </div>
      </main>

      {/* Footer Moderne & Épuré */}
      <footer className="bg-mada-blue pt-24 pb-12 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <h2 className="text-4xl font-black tracking-tighter">
                Mada<span className="text-mada-green">Visit</span>
              </h2>
              <p className="text-blue-100/60 max-w-md leading-relaxed text-lg">
                Première plateforme de réservation de voyages à Madagascar. Nous
                rendons l'aventure accessible, sécurisée et inoubliable.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase text-xs tracking-widest text-mada-green opacity-80">
                Contactez-nous
              </h4>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-lg font-medium group cursor-pointer">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-mada-green transition-colors">
                    <PhoneCall size={18} />
                  </div>
                  +261 34 00 000 00
                </p>
                <p className="text-blue-100/50 flex items-center gap-3">
                  Antananarivo, Madagascar
                </p>
              </div>
            </div>

            <div className="space-y-6 md:text-right">
              <h4 className="font-bold uppercase text-xs tracking-widest text-mada-green opacity-80">
                Suivez l'aventure
              </h4>
              <div className="flex md:justify-end gap-4">
                {[<Facebook size={20} />, <Instagram size={20} />].map(
                  (icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-mada-green hover:-translate-y-1 transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:row justify-between items-center gap-6 text-blue-100/30 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 MadaVisit — Made with ❤️ in Madagascar.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-mada-green transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-mada-green transition-colors">
                Mentions Légales
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-10 rounded-[2.5rem] bg-white hover:bg-mada-blue transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-3 border border-gray-50 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-mada-green/5 rounded-full -mr-16 -mt-16 group-hover:bg-mada-green/10 transition-colors"></div>

    <div className="w-16 h-16 bg-mada-blue/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>

    <h3 className="text-2xl font-black text-mada-blue group-hover:text-white mb-4 transition-colors tracking-tight">
      {title}
    </h3>
    <p className="text-gray-500 group-hover:text-blue-100/70 leading-relaxed transition-colors">
      {desc}
    </p>
  </div>
);

export default Home;
