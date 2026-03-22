import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Map, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black text-mada-blue tracking-tighter group"
        >
          Mada
          <span className="text-mada-green group-hover:text-mada-blue transition-colors">
            Visit
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link">
            Accueil
          </Link>

          {user && !isAdmin && (
            <Link
              to="/mes-voyages"
              className="nav-link flex items-center gap-2"
            >
              <Map size={18} />
              <span>Mes Voyages</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-mada-blue">
                  {user.nom || "Voyageur"}
                </span>
                <span className="text-[10px] text-mada-green font-semibold uppercase tracking-widest">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-mada-red transition-all hover:scale-110"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-mada-blue text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transition-all"
            >
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-mada-blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="font-bold text-lg"
          >
            Accueil
          </Link>
          {user && (
            <Link
              to="/mes-voyages"
              onClick={() => setIsOpen(false)}
              className="font-bold text-lg"
            >
              Mes Voyages
            </Link>
          )}
          <hr />
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-mada-red font-bold"
            >
              <LogOut size={20} /> Déconnexion
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-mada-blue text-white text-center py-3 rounded-xl font-bold"
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
