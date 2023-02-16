import Image from 'next/image';
import { iCheckoutProduct } from '../../../types/types';
import { QuantitySelector } from '../../QuantitySelector';

interface iProductList {
    products: Array<iCheckoutProduct> | null | undefined;
    productsDispatch: Function;
}
export function ProductList({ products, productsDispatch }: iProductList) {
    const deleteProduct = (index: number) => {
        productsDispatch({
            type: 'deleteProduct',
            payload: { index: index },
        });
    };

    const addQuantityToProduct = (index: number) => {
        productsDispatch({
            type: 'addQuantity',
            payload: { index: index },
        });
    };

    const subtractQuantityToProduct = (index: number) => {
        productsDispatch({
            type: 'subtractQuantity',
            payload: { index: index },
        });
    };

    if (products === null || products === undefined) {
        return <></>;
    }

    return (
        <>
            <div className="min-h-[400px] gap-y-2 flex flex-col">
                {products.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center p-4 bg-gray-100 rounded-md"
                    >
                        <Image
                            src={item.picture_url}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-16 h-16 rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <h2 className="font-medium text-xl text-gray-800">
                                {item.name}
                            </h2>
                            <p className="text-md text-green-600">
                                R$ {item.price}
                            </p>
                        </div>
                        <QuantitySelector
                            value={item.quantity}
                            deleteValue={() => deleteProduct(index)}
                            addValue={() => addQuantityToProduct(index)}
                            subtractValue={() =>
                                subtractQuantityToProduct(index)
                            }
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
