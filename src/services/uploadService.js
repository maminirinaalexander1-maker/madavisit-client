// src/services/uploadService.js

const CLOUD_NAME = "dc3znfgtx"; // <--- Ton Cloud Name ici
const UPLOAD_PRESET = "madavisit_preset"; // <--- Ton Preset Unsigned ici

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Échec de l'upload sur Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Retourne l'URL HTTPS de l'image
  } catch (error) {
    console.error("Erreur Cloudinary:", error);
    throw error;
  }
};