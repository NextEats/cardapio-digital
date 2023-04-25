import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext, useEffect } from 'react';
import Cart from '../Cart';
import { WeekdayOperatingTime } from '../WeekdayOperatingTime';
import ProductModal from '../home/ProductModal';

export default function DigitalMenuModals() {
  const { modals, selectedProduct } = useContext(DigitalMenuContext);

  useEffect(() => {
    if (document) {
      const body = document.querySelector('body');

      if (modals?.state.checkout === true) {
        body?.classList.add('overflow-hidden');
      } else {
        body?.classList.remove('overflow-hidden');
      }
    }
  }, [modals?.state.checkout]);

  return (
    <>
      {modals?.state.operatingTime && <WeekdayOperatingTime />}
      {selectedProduct && <ProductModal />}
      {modals?.state.checkout && <Cart />}
    </>
  );
}
