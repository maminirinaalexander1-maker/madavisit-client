import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppChat = () => {
  const phoneNumber = "261340000000"; // Remplace par ton vrai numéro Madagascar
  const message =
    "Bonjour MadaVisit ! J'aimerais avoir des informations sur un voyage.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppChat;
