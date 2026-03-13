import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// --- PAGES ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import MyTrips from "./pages/MyTrips";
import Home from "./pages/Home"; // À créer pour la vue client

// --- DASHBOARDS ---
import ConseillerDashboard from "./pages/dashboards/ConseillerDashboard";
import ModoDashboard from "./pages/dashboards/ModoDashboard";
import ComptaDashboard from "./pages/dashboards/ComptaDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard"; // Mieux que de le laisser dans App.jsx

// --- COMPOSANT DE PROTECTION DE ROUTE ---
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-mada-blue border-t-mada-green rounded-full animate-spin mb-4"></div>
        <p className="text-mada-blue font-bold">MadaVisit se charge...</p>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* ROUTES PUBLIQUES */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* ROUTE RACINE : REDIRECTION SELON RÔLE [Source: Plan Maître] */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? (
                <AdminDashboard />
              ) : user?.role === "conseiller voyage" ? (
                <ConseillerDashboard />
              ) : user?.role === "comptable" ? (
                <ComptaDashboard />
              ) : user?.role === "modérateur" ? (
                <ModoDashboard />
              ) : (
                <Home />
              )}
            </PrivateRoute>
          }
        />

        {/* ROUTES CLIENTS PROTEGEES */}
        <Route
          path="/mes-voyages"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <MyTrips />
            </PrivateRoute>
          }
        />

        <Route
          path="/success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <PrivateRoute>
              <Cancel />
            </PrivateRoute>
          }
        />

        {/* REDIRECTION PAR DÉFAUT */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
