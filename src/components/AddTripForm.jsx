import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../services/uploadService";

const AddTripForm = () => {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Touriste",
    imageUrl: "", // Standardisé
    duration: "", // Standardisé
    difficulty: "Facile", // Standardisé
    location: "", // Standardisé
  });

  // Nettoyage de l'URL d'aperçu pour la performance
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // --- GESTION DE L'IMAGE AVEC CLOUDINARY ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop lourde (max 5Mo)");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error("Cloudinary Error:", err);
      alert("Échec de l'upload. Vérifiez votre connexion.");
      setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  // --- SOUMISSION FINALE VERS FIRESTORE ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) return alert("L'image est encore en cours d'envoi...");
    if (!formData.imageUrl) return alert("Une image est obligatoire.");
    if (Number(formData.price) <= 0)
      return alert("Le prix doit être supérieur à 0.");

    setLoading(true);
    try {
      await addDoc(collection(db, "trips"), {
        ...formData,
        price: Number(formData.price),
        createdAt: serverTimestamp(),
        // On s'assure que les données sont propres
        searchTitle: formData.title.toLowerCase(),
      });

      setSuccessMessage("✨ Voyage publié avec succès !");

      // Reset
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Touriste",
        imageUrl: "",
        duration: "",
        difficulty: "Facile",
        location: "",
      });
      setImagePreview(null);

      // Effacer le message après 5 secondes
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Firestore Error:", error);
      alert("Erreur lors de la publication : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 max-w-4xl mx-auto my-10">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-[#003366]">
          Créer une Expérience
        </h3>
        <p className="text-gray-400">
          Remplissez les détails du nouveau circuit MadaVisit.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-[#00A86B] font-bold rounded-2xl border border-green-100 animate-bounce">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- ZONE D'UPLOAD D'IMAGE --- */}
        <div className="relative group h-64 w-full bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:border-[#00A86B]">
          {imagePreview ? (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Preview"
                className={`w-full h-full object-cover ${isUploading ? "opacity-40" : ""}`}
              />
              {isUploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#00A86B] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#003366] font-bold mt-2 bg-white/80 px-4 py-1 rounded-full text-xs uppercase tracking-tighter">
                    Optimisation Cloudinary...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-4xl">🏝️</span>
              <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">
                Ajouter une photo de couverture
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isUploading || loading}
          />
        </div>

        {/* --- CHAMPS DU FORMULAIRE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Titre du circuit
            </label>
            <input
              type="text"
              placeholder="ex: Trekking à l'Isalo"
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white text-[#003366] font-medium"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Lieu / Destination
            </label>
            <input
              type="text"
              placeholder="ex: Fianarantsoa, Madagascar"
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white text-[#003366] font-medium"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Prix total (EUR)
            </label>
            <input
              type="number"
              placeholder="ex: 850"
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white text-[#003366] font-bold"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Catégorie cible
            </label>
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white appearance-none cursor-pointer text-[#003366] font-medium"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Touriste">🌴 Touriste</option>
              <option value="École">🎓 École</option>
              <option value="Entreprise">💼 Entreprise</option>
              <option value="Sur mesure">✨ Sur mesure</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Durée du séjour
            </label>
            <input
              type="text"
              placeholder="ex: 5 Jours / 4 Nuits"
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white text-[#003366] font-medium"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Difficulté
            </label>
            <select
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00A86B] transition border-transparent border focus:bg-white appearance-none cursor-pointer text-[#003366] font-medium"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
            >
              <option value="Facile">🟢 Facile</option>
              <option value="Modéré">🟡 Modéré</option>
              <option value="Difficile">🔴 Difficile</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 ml-2">
            Description & Programme
          </label>
          <textarea
            placeholder="Décrivez l'aventure étape par étape..."
            className="w-full p-4 bg-gray-50 rounded-3xl outline-none focus:ring-2 focus:ring-[#00A86B] transition h-40 resize-none border-transparent border focus:bg-white text-[#003366]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* --- BOUTON D'ACTION --- */}
        <button
          type="submit"
          disabled={loading || isUploading}
          className={`w-full py-5 rounded-2xl font-black text-white text-lg transition-all shadow-xl ${
            loading || isUploading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#003366] hover:bg-[#00A86B] hover:-translate-y-0.5 active:scale-95 shadow-blue-900/20"
          }`}
        >
          {loading
            ? "🚀 Publication..."
            : isUploading
              ? "⏳ Upload Image..."
              : "Confirmer et Publier"}
        </button>
      </form>
    </div>
  );
};

export default AddTripForm;
