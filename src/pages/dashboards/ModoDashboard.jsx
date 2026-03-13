import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AddTripForm from "../../components/AddTripForm";
import TripList from "../../components/TripList";

const ModoDashboard = () => {
  const { logout, user } = useAuth(); // Correction : useAuth() au lieu de userAuth()
  const [view, setView] = useState("list");

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar Latérale - Palette MadaVisit */}
      <aside className="w-full md:w-72 bg-[#003366] text-white p-8 flex flex-col justify-between">
        <div>
          <div className="text-3xl font-black mb-12 tracking-tighter">
            Mada<span className="text-[#00A86B]">Visit</span>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => setView("list")}
              className={`w-full text-left p-4 rounded-2xl transition font-bold flex items-center gap-3 ${view === "list" ? "bg-[#00A86B] shadow-lg shadow-green-900/20" : "hover:bg-white/10"}`}
            >
              📂 Catalogue Voyages
            </button>
            <button
              onClick={() => setView("add")}
              className={`w-full text-left p-4 rounded-2xl transition font-bold flex items-center gap-3 ${view === "add" ? "bg-[#00A86B] shadow-lg shadow-green-900/20" : "hover:bg-white/10"}`}
            >
              ✨ Nouveau Circuit
            </button>
          </nav>
        </div>

        <div className="pt-10 border-t border-white/10">
          <p className="text-xs text-blue-200 uppercase font-bold mb-4">
            Session : {user?.nom}
          </p>
          <button
            onClick={logout}
            className="w-full py-4 bg-white/10 hover:bg-red-500/20 hover:text-red-400 rounded-2xl transition font-bold"
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Zone de travail principale */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#003366]">
              Marketing & Contenu
            </h1>
            <p className="text-gray-400 mt-2 font-medium">
              Éditez les merveilles de l'Île Rouge
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <span className="block text-2xl font-bold text-[#00A86B]">
              Mode Éditeur
            </span>
            <span className="text-sm text-gray-400">
              Accès restreint aux contenus
            </span>
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {view === "list" ? (
            <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
              <div className="flex justify-between items-center mb-8 px-4">
                <h2 className="text-2xl font-bold text-[#003366]">
                  Circuits Actuels
                </h2>
                <button
                  onClick={() => setView("add")}
                  className="bg-[#003366] text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition"
                >
                  + Ajouter
                </button>
              </div>
              {/* On réutilise ton TripList mais on pourrait y ajouter des boutons "Supprimer/Modifier" plus tard */}
              <TripList />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-blue-900/5">
                <AddTripForm />
              </div>
              <button
                onClick={() => setView("list")}
                className="mt-8 text-gray-400 font-bold hover:text-[#003366] transition flex items-center gap-2 mx-auto"
              >
                ← Annuler et revenir à la liste
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ModoDashboard;
