import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const sampleTrips = [
  {
    titre: "L'Allée des Baobabs au Soleil Couchant",
    description:
      "Découvrez le monument naturel le plus célèbre de Madagascar dans le Menabe.",
    prix: 450,
    categorie: "Aventure",
    images: [
      "https://images.unsplash.com/photo-1504109502422-9654d6232152?q=80&w=800",
    ], // Array pour Cloudinary plus tard
    duree: "4 jours",
    inclus: ["4x4 privé", "Guide local", "Hébergement", "Petit-déjeuner"],
    difficulte: "Facile",
    createdAt: serverTimestamp(),
  },
];

export const seedDatabase = async () => {
  try {
    const tripsRef = collection(db, "trips");
    for (const trip of sampleTrips) {
      await addDoc(tripsRef, trip);
    }
    console.log("Données de test injectées !");
  } catch (error) {
    console.error("Erreur Seed:", error);
  }
};
