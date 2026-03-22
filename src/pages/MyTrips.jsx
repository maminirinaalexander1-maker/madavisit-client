import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  CreditCard,
  Map,
  FileText,
  ChevronRight,
  Globe,
  ArrowLeft,
  Ticket,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const MyTrips = () => {
  const { user } = userAuth();
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedData = data.sort(
          (a, b) =>
            (b.paymentDate?.seconds || 0) - (a.paymentDate?.seconds || 0),
        );
        setMyReservations(sortedData);
        setLoading(false);
      },
      (err) => {
        console.error("Erreur Firestore:", err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Barre de navigation */}
      <nav className="sticky top-0 z-50 bg-mada-blue px-6 py-5 text-white flex justify-between items-center shadow-xl">
        <Link to="/" className="flex items-center gap-2 group">
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xl font-black tracking-tighter uppercase">
            Mada<span className="text-mada-green">Visit</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/60">
          <ShieldCheck size={16} className="text-mada-green" />
          Espace Sécurisé
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-10 md:py-16 px-4 md:px-6">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-mada-blue tracking-tighter mb-2">
              Mes <span className="text-mada-green">Aventures</span>
            </h1>
            <p className="text-gray-400 font-medium">
              Ravi de vous revoir,{" "}
              <span className="text-mada-blue font-bold">
                {user?.displayName || "Voyageur"}
              </span>
              .
            </p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-mada-green/10 rounded-2xl flex items-center justify-center text-mada-green">
              <Ticket size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                Total
              </p>
              <p className="text-2xl font-black text-mada-blue">
                {myReservations.length}
              </p>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-mada-green animate-spin mb-4" />
            <p className="text-mada-blue font-bold">
              Chargement de vos voyages...
            </p>
          </div>
        ) : myReservations.length > 0 ? (
          <div className="grid gap-8">
            {myReservations.map((res) => (
              <div
                key={res.id}
                className="group bg-white rounded-4xl md:rounded-[3rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 flex flex-col lg:flex-row hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative lg:w-80 h-56 lg:h-auto overflow-hidden">
                  <img
                    src={
                      res.tripImage ||
                      "https://images.unsplash.com/photo-1544257750-572358f5da22?q=80&w=800"
                    }
                    alt={res.tripTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-mada-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {res.status || "Confirmé"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-mada-green font-bold text-[10px] uppercase tracking-widest mb-2">
                      <Globe size={14} /> Circuit Madagascar
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-mada-blue leading-tight tracking-tight">
                      {res.tripTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-mada-blue shadow-sm">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Montant
                        </p>
                        <p className="text-sm font-black text-mada-blue">
                          {res.amount} €
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-mada-green shadow-sm">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Paiement
                        </p>
                        <p className="text-sm font-black text-mada-blue">
                          {res.paymentDate?.toDate()
                            ? res.paymentDate
                                .toDate()
                                .toLocaleDateString("fr-FR")
                            : "Récemment"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-mada-blue text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-mada-green transition-all shadow-lg active:scale-95">
                      <Map size={18} /> Voir Itinéraire
                    </button>
                    <button className="flex-1 bg-gray-50 text-mada-blue py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100">
                      <FileText size={18} /> Facture PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 px-6">
            <Globe
              className="mx-auto mb-6 text-gray-200 animate-pulse"
              size={48}
            />
            <h3 className="text-2xl font-black text-mada-blue mb-2">
              Aucun voyage pour le moment
            </h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Prêt pour votre prochaine aventure ? Découvrez nos circuits
              exclusifs.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-mada-blue text-white px-8 py-4 rounded-2xl font-black hover:bg-mada-green transition-all shadow-xl active:scale-95"
            >
              Explorer les circuits <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTrips;
