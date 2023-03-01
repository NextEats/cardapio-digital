import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext } from 'react';
import ProductsList from '../home/ProductsList';
import RestaurantHeader from '../home/RestaurantHeader';

export default function DigitalMenuContent() {
    const { productReducer, modals } = useContext(DigitalMenuContext);

    const handleOpenCheckoutModal = () => {
        modals?.set((prev) => {
            return {
                ...prev,
                checkout: true,
            };
        });
    };

    return (
        <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
            <div className="bg-gray-100 max-w-7xl w-full">
                <RestaurantHeader />
                <ProductsList />

                {productReducer?.state.length > 0 && (
                    <div className="fixed bottom-6 max-w-7xl w-full px-6 h-12">
                        <div
                            className="h-12 bg-[#ca2a2a] z-[90] flex justify-center items-center uppercase text-xl cursor-pointer"
                            onClick={handleOpenCheckoutModal}
                        >
                            meu pedido
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
