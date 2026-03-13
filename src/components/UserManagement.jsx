import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      alert("Rôle mis à jour !");
      fetchUsers();
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 font-semibold text-[#003366]">Nom</th>
            <th className="p-4 font-semibold text-[#003366]">Email</th>
            <th className="p-4 font-semibold text-[#003366]">Rôle Actuel</th>
            <th className="p-4 font-semibold text-[#003366]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">{u.nom}</td>
              <td className="p-4 text-gray-500">{u.email}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    u.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : u.role === "employee"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {u.role.toUpperCase()}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button
                  onClick={() => changeRole(u.id, "employee")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Mettre Employé
                </button>
                <button
                  onClick={() => changeRole(u.id, "client")}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Mettre Client
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
