import {
    DigitalMenuContext,
    iShowModalsState,
} from '@/src/contexts/DigitalMenuContext';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { iDigitalMenuData } from '@/src/types/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useReducer, useState } from 'react';

import DigitalMenuContent from '@/src/components/DigitalMenuContent';
import DigitalMenuModals from '@/src/components/DigitalMenuModals';
import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions';
import { ProductsReducer } from '@/src/reducers/ProductsReducer/reducer';
import { supabase } from '@/src/server/api';

import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant = await getRestaurantBySlugFetch(context.query.slug);

    const { data: products } = await supabase
        .from('product_categories')
        .select('*, products (*)')
        .eq('restaurant_id', restaurant!.id)
        .order('category_order', { ascending: true });

    var data: iDigitalMenuData = {
        restaurant: restaurant,
        // groupedProducts: await getProductsGroupedByCategories(restaurant?.id),
        groupedProducts: products,
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

    const [state, dispatch] = useReducer(ProductsReducer, []);

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
                productReducer: { state, dispatch },
            }}
        >
            <div className="bg-gray-100">
                <Head>
                    <title>{restaurant.name}</title>
                    <link
                        href={restaurant.picture_url}
                        rel="icon"
                        sizes="any"
                    />
                </Head>
                <DigitalMenuModals />
                <DigitalMenuContent />
                <footer className="relative bottom-0 mt-32 w-full mb-0 flex flex-col items-center gap-3 bg-gray-800 justify-center py-5">
                    <div className="flex items-center gap-2">
                        <Image
                            className=""
                            src={'/LogoLaranja.png'}
                            alt="asdasd"
                            width={160}
                            height={160}
                        />
                    </div>
                    <span className="text-sm text-white">versão 1.0.0</span>
                </footer>
            </div>
        </DigitalMenuContext.Provider>
    );
}
