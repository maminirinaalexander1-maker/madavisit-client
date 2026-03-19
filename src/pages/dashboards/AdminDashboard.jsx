import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "../../components/AdminSidebar"; // Déjà présent dans tes imports [cite: 261]
import StatsOverview from "./StatsOverview";
import BookingsManager from "./BookingsManager";
import AddTripForm from "./AddTripForm"; // Ton formulaire existant [cite: 342]
import UserManagement from "./UserManagement"; // Ta gestion d'utilisateurs existante [cite: 342]

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("stats"); // Initialisé sur 'stats' comme dans ton code [cite: 264]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fidèle à ton architecture [cite: 273] */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-mada-blue">
              {activeTab === "stats"
                ? "Tableau de Bord"
                : activeTab === "bookings"
                  ? "Réservations"
                  : activeTab === "trips"
                    ? "Gestion des Voyages"
                    : "Gestion Utilisateurs"}
            </h1>
            <p className="text-gray-500 font-medium">
              Bienvenue, Administrateur {user?.nom}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition shadow-sm"
          >
            Déconnexion
          </button>
        </header>

        {/* Contenu dynamique basé sur tes onglets [cite: 342] */}
        <div className="animate-in fade-in duration-500">
          {activeTab === "stats" && <StatsOverview />}
          {activeTab === "bookings" && <BookingsManager />}
          {activeTab === "trips" && <AddTripForm />}
          {activeTab === "users" && <UserManagement />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
