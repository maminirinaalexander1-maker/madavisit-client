import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TripList from "../components/TripList";
import { Compass, ShieldCheck, PhoneCall, Globe } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#00A86B] selection:text-white">
      <Navbar />

      <Hero />

      {/* Section Valeurs : Design Minimaliste et Aéré */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FeatureCard
              icon={<Compass size={32} className="text-[#003366]" />}
              title="Aventures Locales"
              desc="Des circuits conçus par des Malgaches pour une immersion totale et respectueuse."
            />
            <FeatureCard
              icon={<ShieldCheck size={32} className="text-[#00A86B]" />}
              title="Sûreté & Confort"
              desc="Véhicules récents et partenaires hôteliers sélectionnés pour votre tranquillité."
            />
            <FeatureCard
              icon={<Globe size={32} className="text-[#003366]" />}
              title="Impact Positif"
              desc="Chaque voyage soutient l'économie locale et la préservation de la biodiversité."
            />
          </div>
        </div>
      </section>

      {/* Main Content : Catalogue */}
      <main id="voyages" className="max-w-7xl mx-auto py-10 px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black text-[#003366] tracking-tighter">
            Prêt pour le <span className="text-[#00A86B]">départ ?</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">
            Choisissez l'expérience qui vous ressemble parmi nos sélections
            exclusives.
          </p>
          <div className="h-1.5 w-24 bg-[#00A86B] mx-auto rounded-full"></div>
        </div>

        <TripList />
      </main>

      {/* Footer Moderne */}
      <footer className="bg-[#003366] pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black">
              Mada<span className="text-[#00A86B]">Visit</span>
            </h2>
            <p className="text-blue-100/60 max-w-sm leading-relaxed">
              Première plateforme de réservation de voyages à Madagascar. Nous
              rendons l'aventure accessible, sécurisée et inoubliable.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-[#00A86B]">
              Contact
            </h4>
            <p className="flex items-center gap-2 text-sm">
              <PhoneCall size={16} /> +261 34 00 000 00
            </p>
            <p className="text-sm opacity-60">Antananarivo, Madagascar</p>
          </div>
          <div className="space-y-4 text-right">
            <h4 className="font-bold uppercase text-xs tracking-widest text-[#00A86B]">
              Suivez-nous
            </h4>
            <div className="flex justify-end gap-4">
              <span className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#00A86B] transition-colors cursor-pointer">
                FB
              </span>
              <span className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#00A86B] transition-colors cursor-pointer">
                IG
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-100/40 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 MadaVisit. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Mentions Légales
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Composant interne pour les avantages
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-[2.5rem] bg-white hover:bg-[#003366] transition-all duration-500 hover:-translate-y-2 border border-gray-100">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-black text-[#003366] group-hover:text-white mb-3 transition-colors">
      {title}
    </h3>
    <p className="text-gray-500 group-hover:text-blue-100/60 text-sm leading-relaxed transition-colors">
      {desc}
    </p>
  </div>
);

export default Home;
