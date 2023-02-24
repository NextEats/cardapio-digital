import {
    DigitalMenuContext,
    iShowModalsState,
} from '@/src/contexts/DigitalMenuContext';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { iDigitalMenuData } from '@/src/types/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import DigitalMenuContent from '@/src/components/DigitalMenuContent';
import DigitalMenuModals from '@/src/components/DigitalMenuModals';
import { getProductsGroupedByCategories } from '@/src/fetch/products/getProductsGroupedByCategories';
import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant = await getRestaurantBySlugFetch(context.query.slug);

    console.log('restaurant: ', restaurant);

    var data: iDigitalMenuData = {
        restaurant: restaurant,
        groupedProducts: await getProductsGroupedByCategories(restaurant?.id),
    };

    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
};

export default function CardapioDigital({ data }: { data: iDigitalMenuData }) {
    const { restaurant, groupedProducts } = data;

    const [showModalsState, setShowModalsState] = useState<iShowModalsState>({
        checkout: false,
        operatingTime: false,
        product: false,
    });

    const [selectedProductId, setSelectedProductId] = useState<
        string | undefined
    >(undefined);

    const [selects, setSelects] = useState<tSelectWithOptions[]>([]);

    if (!restaurant || !groupedProducts) {
        return <>Restaurante não encontrado, ou está sem produtos</>;
    }

    return (
        <DigitalMenuContext.Provider
            value={{
                restaurant,
                modals: { state: showModalsState, set: setShowModalsState },
                selectedProduct: {
                    state: selectedProductId,
                    set: setSelectedProductId,
                },
                selects: { state: selects, set: setSelects },
                products: groupedProducts,
            }}
        >
            <Head>
                <title>{restaurant.name}</title>
                <link href={restaurant.picture_url} rel="icon" sizes="any" />
            </Head>
            <DigitalMenuModals />
            <DigitalMenuContent />
        </DigitalMenuContext.Provider>
    );
}
