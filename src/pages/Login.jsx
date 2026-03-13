import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/"); // Redirection vers l'accueil [Source: Instructions utilisateur]
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-mada-blue p-8 text-white text-center">
          <h2 className="text-3xl font-bold italic">MadaVisit</h2>
          <p className="text-blue-100 mt-2">Heureux de vous revoir !</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Votre email"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mada-green outline-none transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Votre mot de passe"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mada-green outline-none transition-all"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mada-blue hover:bg-mada-blue-dark text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Se connecter"
            )}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Nouveau ici ?{" "}
            <Link
              to="/register"
              className="text-mada-green font-bold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
