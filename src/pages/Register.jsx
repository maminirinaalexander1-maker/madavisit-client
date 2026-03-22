import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2, Sparkles } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      navigate("/");
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 relative overflow-hidden">
      {/* Cercles de couleurs pour le dynamisme */}
      <div className="absolute top-[-5%] right-[-5%] w-80 h-80 bg-mada-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-mada-green/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-50">
          <div className="bg-mada-green p-10 text-white text-center relative">
            <div className="absolute top-4 right-4 animate-pulse">
              <Sparkles size={24} className="text-white/40" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">
              Bienvenue !
            </h2>
            <p className="text-white/80 font-medium">
              Explorez Madagascar avec nous
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border-l-4 border-red-500">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mada-green transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-mada-green/20 focus:border-mada-green outline-none transition-all font-medium"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mada-green transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Adresse email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-mada-green/20 focus:border-mada-green outline-none transition-all font-medium"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-mada-green transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-mada-green/20 focus:border-mada-green outline-none transition-all font-medium"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mada-blue hover:shadow-mada-green/20 hover:bg-mada-green text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "Créer mon compte"
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-50">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                Déjà voyageur ?{" "}
                <Link
                  to="/login"
                  className="text-mada-blue hover:text-mada-green transition-colors underline-offset-4 hover:underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
