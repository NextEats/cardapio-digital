import { GetServerSideProps } from 'next';
import { useEffect, useReducer, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import AdminWrapper from '@/src/components/admin/AdminWrapper';
import { CardapioDigitalButton } from '@/src/components/admin/cardapio-digital/CardapioDigitalButton';
import Categories from '@/src/components/admin/cardapio-digital/Categories';
import { CategoryModal } from '@/src/components/admin/cardapio-digital/CategoryModal';
import EditableMenuProductCard from '@/src/components/admin/cardapio-digital/EditableMenuProductCard';
import MenuProduct from '@/src/components/admin/cardapio-digital/MenuProduct';
import {
    setAddingProductAction,
    setIsViewingAddingOrOpdatingProductAction,
    setViewpProductAction,
} from '@/src/reducers/EditableProductReducer/actions';
import {
    defaultValues,
    editableProductReducer,
} from '@/src/reducers/EditableProductReducer/reducer';
import {
    iInsertAdditionals,
    iInsertProductAdditionals,
    iInsertProductCategory,
    iInsertProductOptions,
    iInsertProductSelects,
    iInsertSelects,
    iProductCategories,
    iProducts,
    iRestaurantWithFKData,
} from '@/src/types/types';
import { getAdditionalsByRestaurantIdFetch } from 'src/fetch/additionals/getAdditionals';
import { getProductAdditionalsFetch } from 'src/fetch/productAdditionals/getProductAdditionals';
import { getProductOptionsFetch } from 'src/fetch/productOptions/getProductOptions';
import { getProductsByRestaurantIdFetch } from 'src/fetch/products/getProductsByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from 'src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getProductSelectsFetch } from 'src/fetch/productSelects/getProductSelects';
import { getRestaurantBySlugFetch } from 'src/fetch/restaurant/getRestaurantBySlug';
import { getSelectsByRestaurantIdFetch } from 'src/fetch/selects/getSelectsByRestaurantId';

interface iCardapioDigitalProps {
    productCategories: iProductCategories['data'];
    products: iProducts['data'];
    selects: iInsertSelects['data'];
    productSelects: iInsertProductSelects['data'];
    productOptions: iInsertProductOptions['data'];
    productAdditionals: iInsertProductAdditionals['data'];
    additionals: iInsertAdditionals['data'];
    restaurant: iRestaurantWithFKData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant: iRestaurantWithFKData = await getRestaurantBySlugFetch(
        context.query.slug
    );
    const productCategories = await getProductsCategoriesByRestaurantIdFetch(
        restaurant.id
    );
    const products = await getProductsByRestaurantIdFetch(restaurant.id);
    const additionals = await getAdditionalsByRestaurantIdFetch(restaurant.id);
    const selects = await getSelectsByRestaurantIdFetch(restaurant.id);
    const productSelects = await getProductSelectsFetch();
    const productOptions = await getProductOptionsFetch();
    const productAdditionals = await getProductAdditionalsFetch();
    return {
        props: {
            products,
            productCategories,
            productSelects,
            productOptions,
            productAdditionals,
            additionals,
            selects,
            restaurant,
        },
    };
};

export default function CardapioDigital({
    productCategories,
    products,
    productSelects,
    productOptions,
    productAdditionals,
    additionals,
    selects,
    restaurant,
}: iCardapioDigitalProps) {
    const [productId, setProductId] = useState<number | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [productsState, setProductsState] = useState<iProducts['data']>([]);
    const [productsFilteredState, setProductsFilteredState] = useState<
        iProducts['data']
    >([]);
    const [viewCategory, setViewCategory] = useState({
        isViewing: false,
        categoryId: 0,
        categoryName: '',
    });
    const [editCategory, setEditCategory] = useState<{
        isEditing: boolean;
        categoryData: iInsertProductCategory['data'];
    }>({
        isEditing: false,
        categoryData: {
            name: '',
            category_order: 0,
            restaurant_id: 0,
            id: 0,
        },
    });

    const [state, dispatch] = useReducer(editableProductReducer, defaultValues);

    useEffect(() => {
        setProductsState(products);
        async function setProtoduct() {
            const product = products.find((p) => p.id === productId);

            const productSelectsByProdctId = productSelects.filter(
                (select) => select.product_id === product?.id
            );

            let selectsByProductSelect: Array<{
                created_at?: string | null | undefined;
                id?: number | undefined;
                name: string;
            }> = [];
            for (let i = 0; i < productSelectsByProdctId.length; i++) {
                const selectsIndex = selects.findIndex(
                    (select) =>
                        select.id === productSelectsByProdctId[i].select_id
                );
                if (selectsIndex <= -1) {
                    return;
                }
                selectsByProductSelect = [
                    ...selectsByProductSelect,
                    selects[selectsIndex],
                ];
            }

            const categoryFound = productCategories.find(
                (c) => c.id === product?.category_id
            );

            const productOptiosBySelectId = productOptions.filter((option) => {
                return selectsByProductSelect.map(
                    (select) => select?.id === option.select_id && option
                );
            });

            const productAdditionalsByProductId = productAdditionals.filter(
                (productAdditional) =>
                    productAdditional.product_id === productId
            );

            const additionalsByProductAdditionalsId =
                productAdditionalsByProductId?.map((productAdditional) => {
                    return additionals[
                        additionals.findIndex(
                            (additional) =>
                                productAdditional.additional_id ===
                                additional.id
                        )
                    ];
                });
            dispatch(
                setViewpProductAction(
                    product!,
                    selectsByProductSelect,
                    productOptiosBySelectId,
                    additionalsByProductAdditionalsId,
                    categoryFound!
                )
            );
        }

        if (state.isViewingUpdatingOrAdding === 'VIEWING') {
            setProtoduct();
        }
    }, [
        state.isViewingUpdatingOrAdding,
        products,
        productId,
        productSelects,
        productOptions,
        productAdditionals,
        additionals,
        selects,
        productCategories,
    ]);

    function filterProducts(name: string) {
        let productsFiltered: iProducts['data'] = [];
        productsFiltered = productsState.filter((product) => {
            return product.name
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase());
        });
        setProductsFilteredState(productsFiltered);
    }

    return (
        <AdminWrapper>
            <>
                <div className="flex gap-10">
                    <div className="flex flex-col flex-1 ">
                        <h2 className="text-xl font-bold text-gray-700">
                            5 itens mais vendidos
                        </h2>

                        <div className="flex items-center justify-between mb-5 mt-7">
                            <h2 className="text-xl font-bold text-gray-700 ">
                                Categorias
                            </h2>
                            <CardapioDigitalButton
                                onClick={() => setModalIsOpen(true)}
                                name="Novo"
                                h="h-7"
                                w="w-24"
                                Icon={<AiOutlinePlus />}
                            />
                        </div>
                        <CategoryModal
                            productCategories={productCategories}
                            modalIsOpen={modalIsOpen}
                            products={products}
                            setViewCategory={setViewCategory}
                            viewCategory={viewCategory}
                            editCategory={editCategory}
                            setEditCategory={setEditCategory}
                            setModalIsOpen={setModalIsOpen}
                            restaurant={restaurant}
                        />
                        <Categories
                            productCategories={productCategories}
                            products={products}
                            setViewCategory={setViewCategory}
                            setEditCategory={setEditCategory}
                        />

                        <div className="flex items-center justify-between mb-5 mt-7">
                            <h2 className="text-xl font-bold text-gray-700 ">
                                {' '}
                                Itens do cardápio{' '}
                            </h2>
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                onChange={(e) => filterProducts(e.target.value)}
                                className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400"
                            />
                            <CardapioDigitalButton
                                onClick={() => {
                                    dispatch(setAddingProductAction());
                                    dispatch(
                                        setIsViewingAddingOrOpdatingProductAction(
                                            'ADDING'
                                        )
                                    );
                                    setProductModal(true);
                                }}
                                name="Novo"
                                h="h-7"
                                w="w-24"
                                Icon={<AiOutlinePlus />}
                            />
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                            {productsFilteredState.length > 0 ? (
                                <>
                                    {productsFilteredState.map((product) => {
                                        return (
                                            <MenuProduct
                                                dispatch={dispatch}
                                                setProductModal={
                                                    setProductModal
                                                }
                                                setProductId={setProductId}
                                                key={product.id}
                                                product={product}
                                            />
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {productsState.map((product) => {
                                        return (
                                            <MenuProduct
                                                dispatch={dispatch}
                                                setProductModal={
                                                    setProductModal
                                                }
                                                setProductId={setProductId}
                                                key={product.id}
                                                product={product}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                    <EditableMenuProductCard
                        state={state}
                        dispatch={dispatch}
                        restaurant={restaurant}
                        productModal={productModal}
                        productId={productId}
                        productOptions={productOptions}
                        selects={selects}
                        setProductModal={setProductModal}
                        additionals={additionals}
                        productCategories={productCategories}
                        products={products}
                    />
                </div>
            </>
        </AdminWrapper>
    );
}
