import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import useProductDataForId from '@/src/hooks/useProductDataForId';
import Image from 'next/image';
import { useContext } from 'react';
import { QuantitySelector } from '../../QuantitySelector';

export default function ProductListItem({ product }: any) {
    const { dispatch, state } = useContext(DigitalMenuContext).productReducer!;

    const data = useProductDataForId(product.id);

    if (!data || !state) {
        return null;
    }

    const returnCurrentIndex = () => {
        return state.findIndex((elem: any) => elem.id === product.id);
    };

    const returnCurrentQuantity = () => {
        const thisProduct = state.find((elem: any) => elem.id === product.id);
        return thisProduct!.quantity;
    };

    return (
        <>
            <div className="bg-[#00000005] shadow-sm border border-[#0000000c] p-3 m-3 flex flex-row h-44 sm:h-32 items-center rounded-sm">
                <Image
                    src={data.picture_url}
                    alt={data!.picture_url}
                    width={80}
                    height={50}
                />
                <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between w-full">
                    <div className="flex flex-col ml-4 pb-1">
                        <span className="text-xl font-bold text-[#3a3a3a]">
                            {data.name}
                        </span>
                        <span className=" text-[#7d7d7d] truncate w-[200px]">
                            {data.description}
                        </span>
                        <span className="mt-2 text-md text-[#4b9e40]">
                            R$ {data.price}
                        </span>
                    </div>
                    <div className="mt-2 ml-4 sm:mt-0 sm:ml-0">
                        <QuantitySelector
                            value={returnCurrentQuantity()}
                            addValue={() => {
                                dispatch({
                                    type: 'addQuantity',
                                    payload: { index: returnCurrentIndex() },
                                });
                            }}
                            subtractValue={() => {
                                dispatch({
                                    type: 'subtractQuantity',
                                    payload: { index: returnCurrentIndex() },
                                });
                            }}
                            deleteValue={() => {
                                dispatch({
                                    type: 'deleteProduct',
                                    payload: { index: returnCurrentIndex() },
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
