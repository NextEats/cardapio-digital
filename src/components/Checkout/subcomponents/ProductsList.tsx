import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext } from 'react';
import ProductListItem from './ProductListItem';

export default function ProductsList({
    handleCloseModal,
    setCurrentStep,
}: any) {
    const products = useContext(DigitalMenuContext).productReducer!;

    console.log(products.state);

    return (
        <>
            <div className="w-full flex justify-center">
                <span className="text-center text-2xl font-semibold">
                    Confirme seu Pedido
                </span>
            </div>
            <div className="mt-8 overflow-y-auto h-[400px]">
                {products.state?.map((product: any, index: number) => {
                    return <ProductListItem product={product} key={index} />;
                })}
            </div>
            <div className="flex sm:flex-row flex-col gap-y-2 justify-center w-full gap-x-2 mt-4">
                <button
                    onClick={handleCloseModal}
                    className="font-semibold text-sm uppercase shadow border border-indigo-600 bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 focus:shadow-outline focus:outline-none py-3 px-10 rounded"
                >
                    Adicionar + produtos
                </button>
                <button
                    onClick={() => {
                        setCurrentStep('contact_info');
                    }}
                    className="font-semibold text-sm uppercase shadow bg-indigo-800 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white py-3 px-10 rounded"
                >
                    finalizar pedido
                </button>
            </div>
        </>
    );
}
