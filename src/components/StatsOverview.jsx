import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { TrendingUp, Users, Map as MapIcon, CreditCard } from "lucide-react";

const StatsOverview = () => {
  const [stats, setStats] = useState({
    trips: 0,
    users: 0,
    bookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const tripsSnap = await getDocs(collection(db, "trips"));
      const usersSnap = await getDocs(collection(db, "users"));
      const bookingsSnap = await getDocs(collection(db, "bookings"));

      let totalRevenue = 0;
      bookingsSnap.forEach((doc) => {
        if (doc.data().statut === "payé")
          totalRevenue += doc.data().montant || 0;
      });

      setStats({
        trips: tripsSnap.size,
        users: usersSnap.size,
        bookings: bookingsSnap.size,
        revenue: totalRevenue,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Voyages Actifs",
      value: stats.trips,
      icon: <MapIcon />,
      color: "bg-blue-500",
    },
    {
      label: "Clients",
      value: stats.users,
      icon: <Users />,
      color: "bg-green-500",
    },
    {
      label: "Réservations",
      value: stats.bookings,
      icon: <TrendingUp />,
      color: "bg-purple-500",
    },
    {
      label: "Chiffre d'Affaires",
      value: `${stats.revenue} €`,
      icon: <CreditCard />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100 flex items-center gap-5"
        >
          <div className={`${card.color} text-white p-4 rounded-2xl shadow-lg`}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {card.label}
            </p>
            <p className="text-2xl font-black text-[#003366]">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
