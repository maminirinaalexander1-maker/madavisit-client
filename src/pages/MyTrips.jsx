import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  CreditCard,
  Map,
  FileText,
  ChevronRight,
  Globe,
} from "lucide-react";

const MyTrips = () => {
  const { user } = useAuth();
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Utilisation de la collection "bookings" créée par le webhook Stripe
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      //orderBy("paymentDate", "desc") // Optionnel: nécessite un index Firestore
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyReservations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation Mobile Optimisée */}
      <nav className="sticky top-0 z-50 bg-[#003366] px-6 py-4 text-white flex justify-between items-center shadow-lg">
        <Link to="/" className="text-xl font-black tracking-tighter">
          MADA<span className="text-[#00A86B]">VISIT</span>
        </Link>
        <Link
          to="/"
          className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-bold transition"
        >
          Retour au site
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto py-8 md:py-16 px-4 md:px-6">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-[#003366] tracking-tight">
            Mes Aventures
          </h1>
          <p className="text-gray-500 mt-3 font-medium">
            Bonjour {user?.displayName || "Voyageur"}, voici l'état de vos
            réservations.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#00A86B] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#003366] font-bold">
              Synchronisation de vos dossiers...
            </p>
          </div>
        ) : myReservations.length > 0 ? (
          <div className="space-y-8">
            {myReservations.map((res) => (
              <div
                key={res.id}
                className="group bg-white rounded-4xl md:rounded-[3rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-2xl transition-all duration-500"
              >
                {/* Image avec Overlay Statut */}
                <div className="relative md:w-72 h-56 md:h-auto overflow-hidden">
                  <img
                    src={
                      res.tripImage ||
                      "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
                    }
                    alt={res.tripTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#00A86B] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {res.status || "Confirmé"}
                    </span>
                  </div>
                </div>

                {/* Contenu de la Carte */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-black text-[#003366] leading-tight">
                      {res.tripTitle}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#003366]">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                            Prix Payé
                          </p>
                          <p className="text-sm font-black text-gray-800">
                            {res.amount} €
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#00A86B]">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                            Date Paiement
                          </p>
                          <p className="text-sm font-black text-gray-800">
                            {res.paymentDate
                              ?.toDate()
                              .toLocaleDateString("fr-FR") || "Récemment"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Mobiles : Boutons côte à côte */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-[#003366] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#00A86B] transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                      <Map size={18} /> Itinéraire
                    </button>
                    <button className="flex-1 bg-gray-50 text-[#003366] py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100">
                      <FileText size={18} /> Facture PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* State Vide (Empty State) */
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200 px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="text-gray-300 animate-spin-slow" size={40} />
            </div>
            <h3 className="text-2xl font-black text-[#003366] mb-3">
              Aucune aventure en vue...
            </h3>
            <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">
              Votre passeport s'ennuie ! Explorez nos circuits exclusifs et
              commencez votre histoire malgache.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-[#003366] text-white px-10 py-5 rounded-2xl font-black hover:bg-[#00A86B] transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Parcourir les circuits <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </main>

      {/* Message de support mobile */}
      <footer className="max-w-4xl mx-auto px-6 pb-12 text-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
          Besoin d'aide ? Contactez notre support 24/7 sur WhatsApp
        </p>
      </footer>
    </div>
  );
};

export default MyTrips;
