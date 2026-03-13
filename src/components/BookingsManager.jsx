import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="p-6 text-xs font-black uppercase text-gray-400">
              Client
            </th>
            <th className="p-6 text-xs font-black uppercase text-gray-400">
              Voyage
            </th>
            <th className="p-6 text-xs font-black uppercase text-gray-400">
              Montant
            </th>
            <th className="p-6 text-xs font-black uppercase text-gray-400">
              Statut
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-6">
                <p className="font-bold text-[#003366]">{b.userName}</p>
                <p className="text-xs text-gray-400">{b.userEmail}</p>
              </td>
              <td className="p-6 font-medium text-gray-600">{b.tripTitle}</td>
              <td className="p-6 font-black text-[#003366]">{b.amount} €</td>
              <td className="p-6">
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    b.status === "complet"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsManager;
