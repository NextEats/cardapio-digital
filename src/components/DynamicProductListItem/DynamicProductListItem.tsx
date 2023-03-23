import {
    DigitalMenuContext,
    iProductsReducer,
} from '@/src/contexts/DigitalMenuContext';
import useProductDataForId from '@/src/hooks/useProductDataForId';
import { useContext } from 'react';
import { QuantitySelector } from '../QuantitySelector';

interface iDynamicProductListItem {
    product: iProductsReducer;
    index: number;
}

export default function DynamicProductListItem({
    product,
    index,
}: iDynamicProductListItem) {
    const data = useProductDataForId(product.id);
    const { dispatch } = useContext(DigitalMenuContext).productReducer!;

    const addQuantity = () => {
        dispatch({
            type: 'addQuantity',
            payload: { index: index },
        });
    };

    const subtractValue = () => {
        dispatch({
            type: 'subtractQuantity',
            payload: { index: index },
        });
    };

    const deleteProduct = () => {
        dispatch({
            type: 'deleteProduct',
            payload: { index: index },
        });
    };

    return (
        <div className="flex justify-between items-center hover:bg-[#ededed49] border-b-not-fist-child py-4 px-7">
            <div className="flex flex-col space-y-3">
                <span className="font-normal text-xl leading-5">
                    {data?.name}
                </span>
                <span className="font-normal text-md leading-4">
                    R$&nbsp;{data?.price}
                </span>
            </div>
            <div>
                <QuantitySelector
                    value={product.quantity}
                    addValue={addQuantity}
                    subtractValue={subtractValue}
                    deleteValue={deleteProduct}
                />
            </div>
        </div>
    );
}
