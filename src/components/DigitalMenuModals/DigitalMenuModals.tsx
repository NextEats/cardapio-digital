import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext } from 'react';
import ProductModal from '../home/ProductModal';
import { WeekdayOperatingTime } from '../WeekdayOperatingTime';

export default function DigitalMenuModals() {
    const { modals, selectedProduct } = useContext(DigitalMenuContext);

    return (
        <>
            {modals?.state.operatingTime && <WeekdayOperatingTime />}
            {selectedProduct && <ProductModal />}
            {/* {showCheckoutModal && (
                <Checkout
                    onClose={() => setShowCheckoutModal(false)}
                    products={products}
                    productsDispatch={productsDispatch}
                />
            )} */}
        </>
    );
}
