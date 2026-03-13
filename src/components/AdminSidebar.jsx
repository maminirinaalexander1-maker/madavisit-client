import React from "react";
import { LayoutDashboard, Map, Calendar, Users, LogOut } from "lucide-react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: "stats",
      label: "Vue d'ensemble",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "trips", label: "Voyages", icon: <Map size={20} /> },
    { id: "bookings", label: "Réservations", icon: <Calendar size={20} /> },
    { id: "users", label: "Utilisateurs", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-8">
        <h2 className="text-2xl font-black text-[#003366] tracking-tighter">
          Mada<span className="text-[#00A86B]">Admin</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === item.id
                ? "bg-[#003366] text-white shadow-lg shadow-blue-900/20"
                : "text-gray-400 hover:bg-gray-50 hover:text-[#003366]"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-gray-50">
        <div className="bg-blue-50 p-4 rounded-2xl">
          <p className="text-[10px] font-black uppercase text-[#003366] mb-1">
            Mode
          </p>
          <p className="text-xs font-bold text-[#00A86B]">
            Administrateur Principal
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
