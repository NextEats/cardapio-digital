import AdminWrapper from "../../../../components/admin/AdminWrapper";
import { useState } from "react";

import Whatsapp from "./Whatsapp";
import Geral from "./Geral";
import Pagamento from "./Pagamento";
import TaxaPorDistancia from "./TaxaPorDistancia";
import ConfigCategoriesMenu from "./ConfigCategoriesMenu";

export type iCurrentSection =
  | "general"
  | "payment"
  | "distance_fee"
  | "whatsapp";

export default function Config() {
  const [currentSection, setCurrentSection] =
    useState<iCurrentSection>("general");


     // https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/bonzi%20buddy.jpg

     

  return (
    
    <AdminWrapper>
      <>
        <ConfigCategoriesMenu
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <div className="mt-8">
          {currentSection === "general" && <Geral />}
          {currentSection === "payment" && <Pagamento />}
          {currentSection === "distance_fee" && <TaxaPorDistancia />}
          {currentSection === "whatsapp" && <Whatsapp />}
        </div>
      </>
    </AdminWrapper>
  );
}
