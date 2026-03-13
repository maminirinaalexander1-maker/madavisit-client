import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config"; // Vérifie ton chemin vers firebase
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const ConseillerDashboard = () => {
  const { logout, user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Récupération en temps réel des messages/demandes
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Marquer comme traité
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "en_attente" ? "traité" : "en_attente";
    await updateDoc(doc(db, "messages", id), { status: newStatus });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar Simple pour Conseiller */}
      <aside className="w-full md:w-64 bg-[#003366] text-white p-6">
        <div className="text-2xl font-bold mb-10">
          Mada<span className="text-[#00A86B]">Visit</span>
        </div>
        <nav className="space-y-4">
          <div className="bg-white/10 p-3 rounded-xl border-l-4 border-[#00A86B]">
            📬 Demandes Clients
          </div>
          <div className="p-3 text-blue-200 hover:bg-white/5 rounded-xl cursor-not-allowed">
            📅 Calendrier Vols
          </div>
        </nav>
        <button
          onClick={logout}
          className="mt-20 w-full py-3 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-xl transition font-bold"
        >
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#003366]">
              Support Client
            </h1>
            <p className="text-gray-500">
              Gérez les demandes de voyages sur mesure
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-400 italic">
              Connecté en tant que
            </span>
            <p className="font-bold text-[#003366]">{user?.nom}</p>
          </div>
        </header>

        {loading ? (
          <div className="animate-pulse flex space-y-4">
            Chargement des messages...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`bg-white p-6 rounded-4xl shadow-sm border-l-8 transition-all hover:shadow-md ${
                  req.status === "traité"
                    ? "border-gray-200 opacity-60"
                    : "border-[#00A86B]"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#003366]">
                        {req.clientName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          req.status === "traité"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {req.status === "en_attente" ? "Nouveau" : "Traité"}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mb-1">
                      📍 {req.subject}
                    </p>
                    <p className="text-sm text-gray-400">📧 {req.email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Bouton WhatsApp */}
                    <a
                      href={`https://wa.me/${req.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#25D366] text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition"
                    >
                      <span>WhatsApp</span>
                    </a>

                    {/* Action de statut */}
                    <button
                      onClick={() => toggleStatus(req.id, req.status)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition"
                      title="Changer le statut"
                    >
                      {req.status === "en_attente" ? "✅" : "🔄"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">
                  Aucune nouvelle demande pour le moment.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ConseillerDashboard;
