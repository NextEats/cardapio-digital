import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext, useEffect } from 'react';
import ProductModal from '../../home/ProductModal';
import CartModal from '../Cart/CartModal';
import { WeekdayOperatingTime } from '../WeekdayOperatingTime';

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
      {modals?.state.operatingTime ? <WeekdayOperatingTime /> : null}
      {selectedProduct ? <ProductModal /> : null}
      {modals?.state.checkout ? <CartModal /> : null}
    </>
  );
}
