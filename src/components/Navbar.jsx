import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Map } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black text-[#003366] tracking-tighter"
        >
          Mada<span className="text-[#00A86B]">Visit</span>
        </Link>

        {/* Liens Droite */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hidden md:block text-sm font-bold text-gray-600 hover:text-[#00A86B]"
          >
            Accueil
          </Link>

          {user ? (
            <>
              {!isAdmin && (
                <Link
                  to="/mes-voyages"
                  className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#00A86B]"
                >
                  <Map size={18} />
                  <span>Mes Voyages</span>
                </Link>
              )}

              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex flex-col items-end sm:flex">
                  <span className="text-xs font-bold text-[#003366]">
                    {user.nom || "Utilisateur"}
                  </span>
                  <span className="text-[10px] text-gray-400 capitalize">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#003366] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#002244] transition-all"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
