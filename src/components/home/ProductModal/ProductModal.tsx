import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import Image from 'next/image';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';

import { getProductWithFKData } from '@/src/fetch/products/getProductWithFKData';
import ProductOptions from './components/ProductOptions';

export default function ProductModal() {
    const selectedProduct = useContext(DigitalMenuContext).selectedProduct;

    const [productData, setProductData] = useState<any>(undefined);

    console.log(productData);

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

                    <ProductOptions product_id={selectedProduct.state} />
                    {/* <Additionals product_id={selectedProduct.state} /> */}

                    <form className="w-full h-24 mb-8">
                        <textarea
                            name=""
                            // onBlur={(e) => setObservation(e.target.value)}
                            className=" scrollbar-custom w-full h-full resize-none rounded-sm bg-[#f6f6f6] shadow-sm text-base outline-none p-4"
                            placeholder="Observações"
                        ></textarea>
                    </form>

                    {/* <SubmitButtons
                        productModal={productModal}
                        price={price}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        setPrice={setPrice}
                    /> */}
                </div>
            </div>
        </>
    );
}
