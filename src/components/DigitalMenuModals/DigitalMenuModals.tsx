import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext, useEffect } from 'react';
import Cart from '../Cart';
import ProductModal from '../home/ProductModal';
import { WeekdayOperatingTime } from '../WeekdayOperatingTime';

export default function DigitalMenuModals() {
    const { modals, selectedProduct } = useContext(DigitalMenuContext);

    const body = document.querySelector('body');

    useEffect(() => {
        if (modals?.state.checkout === true) {
            body?.classList.add('overflow-hidden');
        } else {
            body?.classList.remove('overflow-hidden');
        }
    }, [modals?.state.checkout, body?.classList]);

    return (
        <>
            {modals?.state.operatingTime && <WeekdayOperatingTime />}
            {selectedProduct && <ProductModal />}
            {modals?.state.checkout && <Cart />}
        </>
    );
}
