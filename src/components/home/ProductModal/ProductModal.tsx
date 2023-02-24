import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import Image from 'next/image';
import { MouseEvent, useContext, useEffect, useReducer, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';

import { getProductWithFKData } from '@/src/fetch/products/getProductWithFKData';
import useAdditionals from '@/src/hooks/useAdditionals';
import Additionals from './components/Additionals';
import ProductOptions from './components/ProductOptions';
import SubmitButtons from './components/SubmitButtons';
import { productsReducer } from '@/src/reducers/CheckoutReducer/reducer';
import { ProductsReducer } from '@/src/reducers/ProductsReducer/reducer';

export default function ProductModal() {
    const selects = useContext(DigitalMenuContext).selects;

    const { selectedProduct, productReducer } = useContext(DigitalMenuContext);

    // const [checkoutState, chackoutDispatch] = useReducer(ProductsReducer, [])

    const [observation, setObservation] = useState('');
    const [productData, setProductData] = useState<any>(undefined);

    const { dispatch: additionalsDispatch, state: additionalsState } =
        useAdditionals(productData?.id);

    useEffect(() => {
        if (selectedProduct?.state) {
            getProductWithFKData(selectedProduct).then((result) => {
                setProductData(result);
            });
        }
    }, [selectedProduct?.state, selectedProduct]);

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

    function handleSubmit(e: MouseEvent) {
        e.preventDefault();

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
                selects: selects?.state,
                observation: observation
            }
        })

        console.log({
            id: productData.id,
            additionals: additionals_data,
            selects: selects?.state,
            observation: observation
        });

        setObservation('')
    }
    console.log(productReducer?.state);

    /*
        {
            id: '1',
            additionals: [
                {
                    id: '1',
                    quantity: 1,
                }
            ],
            selects: [
                {
                    id: '1',
                    options: [
                        {
                            id: '1',
                        }
                    ]
                }
            ]
        }
    */

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

                    <ProductOptions product_id={selectedProduct.state} />

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

                    {/* <SubmitButtons
                        submitFunction={setProductData}
                        productModal={null}
                        price={20}
                        quantity={2}
                        setQuantity={setProductData}
                        setPrice={setProductData}
                    /> */}
                </div>
            </div>
        </>
    );
}
