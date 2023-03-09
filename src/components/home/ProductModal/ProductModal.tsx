import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { filterOptionsSelected } from '@/src/helpers/filterOptionsSelected';
import Image from 'next/image';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';

import { getProductWithFKData } from '@/src/fetch/products/getProductWithFKData';
import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions';
import useAdditionals from '@/src/hooks/useAdditionals';
import useProductSelectsWithOptions from '@/src/hooks/useProductSelectsWithOptions';
import { supabase } from '@/src/server/api';
import { iCashBox } from '@/src/types/types';
import Additionals from './components/Additionals';
import ProductOptions from './components/ProductOptions';
import SubmitButtons from './components/SubmitButtons';

export default function ProductModal() {
    const { selectedProduct, productReducer } = useContext(DigitalMenuContext);
    const { productSelects, selectOption } = useProductSelectsWithOptions(
        selectedProduct!.state!
    );

    const restaurant = useContext(DigitalMenuContext).restaurant;

    const [observation, setObservation] = useState('');
    const [productData, setProductData] = useState<any>(undefined);

    useEffect(() => {
        if (selectedProduct?.state) {
            getProductWithFKData(selectedProduct).then((result) => {
                setProductData(result);
            });
        }
    }, [selectedProduct?.state, selectedProduct]);

    const { dispatch: additionalsDispatch, state: additionalsState } =
        useAdditionals(selectedProduct?.state ? selectedProduct?.state : '0');



    if (!productData || !selectedProduct?.state) {
        return <></>;
    }

    const body = document.querySelector('body');
    body?.classList.add('overflow-hidden');

    function closeModal() {
        setProductData(undefined);
        selectedProduct?.set(undefined);
        body?.classList.remove('overflow-hidden');
    }

    async function handleSubmit(e: MouseEvent) {
        e.preventDefault();

        const { data: currentCashBoxData } = await supabase
            .from('cash_boxes')
            .select('*')
            .match({ restaurant_id: restaurant!.id, is_open: true });

        const currentCashBox =
            currentCashBoxData![0] as unknown as iCashBox['data'];

        if (!currentCashBox) {
            alert('O Pedido só pode ser feito se o caixa estiver aberto.');
            return;
        }

        const additionals_data = additionalsState.quantityAdditionals.reduce(
            (acc: { quantity: number; additional_id: number }[], item) => {
                return (acc = [
                    ...acc,
                    {
                        quantity: item.quantity,
                        additional_id: item.additionalId,
                    },
                ]);
            },
            []
        );

        productReducer?.dispatch({
            type: 'add',
            payload: {
                id: productData.id,
                additionals: additionals_data,
                selects: filterOptionsSelected({
                    productsOptionsSelected:
                        productSelects as unknown as tSelectWithOptions[],
                }),
                observation: observation,
                quantity: 1,
            },
        });

        setObservation('');
        closeModal();
    }

    return (
        <>
            <div
                className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
                onClick={() => {
                    closeModal();
                }}
            ></div>
            <div
                className={`max-w-[645px] pb-9 px-8 bg-white top-0 right-0 z-[200] fixed overflow-auto shadow-2xl h-screen`}
            >
                <div className="sticky">
                    <BsArrowLeftCircle
                        className="my-8 cursor-pointer"
                        size={30}
                        onClick={() => {
                            closeModal();
                        }}
                    />
                    <div className="flex items-center justify-center mb-9">
                        <Image
                            className="rounded-3xl"
                            src={productData.picture_url}
                            alt="backgfroundheader"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="mb-9">
                        <h1 className="font-extrabold text-xl text-gray-800 ">
                            {productData.name}
                        </h1>
                        <p className="font-normal text-md text-gray-800 mt-3">
                            {productData.description}
                        </p>
                    </div>

                    <ProductOptions
                        product_id={selectedProduct.state}
                        productSelects={productSelects}
                        selectOption={selectOption}
                    />
                    <div className="flex flex-col gap-3 mt-12">
                        <Additionals
                            dispatch={additionalsDispatch}
                            state={additionalsState}
                            product_id={selectedProduct.state}
                        />
                    </div>

                    <form className="w-full mt-12 h-24 mb-8">
                        <textarea
                            name=""
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            className=" scrollbar-custom w-full h-full resize-none rounded-sm bg-[#f6f6f6] shadow-sm text-base outline-none p-4"
                            placeholder="Observações"
                        ></textarea>
                    </form>

                    <SubmitButtons handleSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
}
