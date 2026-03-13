import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const ComptaDashboard = () => {
  const { logout, user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ total: 0, count: 0, average: 0 });

  useEffect(() => {
    // On écoute la collection des paiements
    const q = query(collection(db, "payments"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);

      // Calcul des stats en temps réel
      const total = docs.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setStats({
        total: total,
        count: docs.length,
        average: docs.length > 0 ? (total / docs.length).toFixed(2) : 0,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      {/* Sidebar Finance */}
      <aside className="w-64 bg-[#003366] text-white p-8 flex flex-col">
        <div className="text-2xl font-bold mb-12">
          Mada<span className="text-[#00A86B]">Visit</span>
        </div>
        <nav className="flex-1 space-y-4">
          <div className="bg-[#00A86B] p-3 rounded-xl font-bold">
            💰 Revenus
          </div>
          <div className="p-3 text-blue-200 hover:bg-white/10 rounded-xl cursor-not-allowed">
            🧾 Factures
          </div>
          <div className="p-3 text-blue-200 hover:bg-white/10 rounded-xl cursor-not-allowed">
            📊 Rapports
          </div>
        </nav>
        <button
          onClick={logout}
          className="text-red-300 text-sm font-bold hover:text-red-500 transition"
        >
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#003366]">
            Analyse Financière
          </h1>
          <p className="text-gray-500">
            Suivi des encaissements Stripe en temps réel
          </p>
        </header>

        {/* Cartes de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-[#00A86B]">
            <p className="text-gray-400 font-bold text-xs uppercase mb-2">
              Chiffre d'Affaires
            </p>
            <p className="text-4xl font-black text-[#003366]">
              {stats.total} €
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-blue-500">
            <p className="text-gray-400 font-bold text-xs uppercase mb-2">
              Transactions
            </p>
            <p className="text-4xl font-black text-[#003366]">{stats.count}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-orange-500">
            <p className="text-gray-400 font-bold text-xs uppercase mb-2">
              Panier Moyen
            </p>
            <p className="text-4xl font-black text-[#003366]">
              {stats.average} €
            </p>
          </div>
        </div>

        {/* Tableau des Transactions */}
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-50 bg-gray-50/50">
            <h2 className="font-bold text-[#003366]">Derniers Paiements</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase text-gray-400 font-black border-b border-gray-50">
                <th className="p-6">Client</th>
                <th className="p-6">Circuit</th>
                <th className="p-6">Montant</th>
                <th className="p-6">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-6 font-bold text-[#003366]">{t.userName}</td>
                  <td className="p-6 text-gray-600">{t.tripTitle}</td>
                  <td className="p-6 font-black text-[#00A86B]">
                    {t.amount} €
                  </td>
                  <td className="p-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      Confirmé
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="p-20 text-center text-gray-300 italic">
              Aucune donnée financière enregistrée.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ComptaDashboard;
