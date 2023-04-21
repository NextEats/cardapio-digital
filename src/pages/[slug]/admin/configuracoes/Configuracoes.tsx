import { useState } from 'react';
import AdminWrapper from '../../../../components/admin/AdminWrapper';

import ConfigCategoriesMenu from './ConfigCategoriesMenu';
import Geral from './Geral';
import Pagamento from './Pagamento';
import TaxaPorDistancia from './TaxaPorDistancia';
import Whatsapp from './Whatsapp/Whatsapp';

export type iCurrentSection =
  | 'general'
  | 'payment'
  | 'distance_fee'
  | 'whatsapp';

export default function Config() {
  const [currentSection, setCurrentSection] =
    useState<iCurrentSection>('general');

  return (
    <AdminWrapper>
      <>
        <ConfigCategoriesMenu
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <div className="mt-8">
          {currentSection === 'general' && <Geral />}
          {currentSection === 'payment' && <Pagamento />}
          {currentSection === 'distance_fee' && <TaxaPorDistancia />}
          {currentSection === 'whatsapp' && <Whatsapp />}
        </div>
      </>
    </AdminWrapper>
  );
}
