import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { iProduct } from '../../../../types/types';

export default function SubmitButtons({
    productModal,
    price,
    submitFunction,
    quantity,
    setPrice,
    setQuantity,
}: {
    productModal: iProduct['data'] | undefined | null;
    price: number;
    quantity: number;
    submitFunction: Function;
    setPrice: Function;
    setQuantity: Function;
}) {
    return (
        <div className="flex flex-1 items-center">
            <div className="w-[98px] h-10 flex items-center justify-between mr-2 px-3 bg-white-300 shadow-md rounded-md ">
                <AiOutlineMinus
                    size={12}
                    className="cursor-pointer"
                    onClick={() => {
                        if (quantity - 1 != 0 && productModal?.price) {
                            setQuantity((prev: any) => prev - 1);
                            setPrice(
                                (prev: any) => (prev -= productModal?.price)
                            );
                        }
                    }}
                />
                <span className="text-xl text-gray-700 font-normal">
                    {quantity?.toString()}
                </span>
                <AiOutlinePlus
                    size={12}
                    className="cursor-pointer"
                    onClick={() => {
                        setQuantity((prev: any) => prev + 1);
                        setPrice((prev: any) => (prev += productModal?.price));
                    }}
                />
            </div>

            <div
                onClick={(e) => submitFunction(e)}
                className="h-10 flex flex-1 items-center justify-center bg-gray-700 shadow-md rounded-md"
            >
                <div className="cursor-pointer">
                    <span className="uppercase text-white text-md font-normal opacity-80">
                        Adicionar
                    </span>
                    <span className="text-white mx-3 font-extrabold ">·</span>
                    <span className="text-white font-semibold">
                        R$ {price}&nbsp;
                    </span>
                </div>
            </div>
        </div>
    );
}
