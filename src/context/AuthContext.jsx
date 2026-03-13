import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Nettoyer l'écouteur Firestore précédent si l'utilisateur change
      if (unsubscribeDoc) unsubscribeDoc();

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);

        unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              ...userData,
            });
          } else {
            // Cas où l'utilisateur est dans Auth mais pas encore dans Firestore
            setUser(currentUser);
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName: name });

      // Structure conforme au plan maître [cite: 9]
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        nom: name,
        email: email,
        role: "client", // [cite: 6]
        createdAt: serverTimestamp(),
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const getToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken(true);
  };

  const value = {
    user,
    login,
    logout,
    register,
    getToken,
    // Vérifications de rôles précises
    isAdmin: user?.role === "admin",
    isEmployee: [
      "admin",
      "conseiller voyage",
      "comptable",
      "modérateur",
    ].includes(user?.role),
    role: user?.role || "guest",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
};
