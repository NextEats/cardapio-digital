import { useContext, useMemo, useState } from 'react';
import { DigitalMenuContext } from '../contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '../helpers/calculateTotalOrderPrice';

export default function useProductsInCheckout() {
    const { restaurant } = useContext(DigitalMenuContext);
    const products = useContext(DigitalMenuContext).productReducer!;
    const [totalPrice, setTotalPrice] = useState(0);

    useMemo(async () => {
        const price = await calculateTotalOrderPrice({
            products,
            restaurantId: restaurant?.id,
        });
        setTotalPrice(price ? price : 0);
    }, [products, restaurant?.id]);

    return { ...products, totalPrice };
}
