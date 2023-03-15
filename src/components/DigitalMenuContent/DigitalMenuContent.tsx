import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import { useContext, useMemo, useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import ProductsList from '../home/ProductsList';
import RestaurantHeader from '../home/RestaurantHeader';

export default function DigitalMenuContent() {
    const [orderPrice, setOrderPrice] = useState(0)

    const { productReducer, modals } = useContext(DigitalMenuContext);
    const restaurant = useContext(DigitalMenuContext).restaurant;

    const handleOpenCheckoutModal = () => {
        modals?.set((prev) => {
            return {
                ...prev,
                checkout: true,
            };
        });
    };

    useMemo(async () => {
        const price = await calculateTotalOrderPrice(({ products: productReducer, restaurantId: restaurant?.id }))
        setOrderPrice(price ? price : 0)
    }, [productReducer, restaurant?.id])

    return (
        <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
            <div className="bg-gray-100 max-w-7xl w-full">
                <RestaurantHeader />
                <ProductsList />

                {productReducer?.state?.length > 0 && (
                    <div className="fixed bottom-6 max-w-7xl w-full px-6 h-12">
                        <div
                            className="h-12 shadow rounded text-white font-semibold bg-[#ca2a2a] z-[90] flex justify-between items-center px-8 uppercase text-xl cursor-pointer"
                            onClick={handleOpenCheckoutModal}
                        >
                            <div className='flex justify-center items-center gap-1'>
                                <HiShoppingCart className="mr-3" />
                                <span className="">meu pedido</span>
                            </div>

                            <p className=''> R$ {orderPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
