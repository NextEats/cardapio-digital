import { SetStateAction } from "react";
import { iCurrentSection } from "./Configuracoes";

interface iConfigCategoriesMenu {
  currentSection: iCurrentSection;
  setCurrentSection: React.Dispatch<SetStateAction<iCurrentSection>>;
}

export default function ConfigCategoriesMenu({
  currentSection,
  setCurrentSection,
}: iConfigCategoriesMenu) {
  return (
    <div className="flex flex-row child:px-5 child:py-3 child:cursor-pointer child:border-b-4 child-hover:bg-[rgba(37, 100, 235, 0.164)] ">
      <div
        className={`${
          currentSection === "general" ? "border-b-blue-600" : "border-b-white"
        }`}
        onClick={() => setCurrentSection("general")}
      >
        Configurações Gerais
      </div>
      <div
        className={`${
          currentSection === "payment" ? "border-b-blue-600" : "border-b-white"
        }`}
        onClick={() => setCurrentSection("payment")}
      >
        Pagamento
      </div>
      <div
        className={`${
          currentSection === "distance_fee"
            ? "border-b-blue-600"
            : "border-b-white"
        }`}
        onClick={() => setCurrentSection("distance_fee")}
      >
        Taxas de Distâncias
      </div>
      <div
        className={`${
          currentSection === "whatsapp" ? "border-b-blue-600" : "border-b-white"
        }`}
        onClick={() => setCurrentSection("whatsapp")}
      >
        WhatsApp
      </div>
    </div>
  );
}
