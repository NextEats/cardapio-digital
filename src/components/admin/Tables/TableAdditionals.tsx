import { TableContext } from '@/src/contexts/TableControlContext';
import {
    changeAdditionalQuantityAction,
    selectAdditionalAction,
} from '@/src/reducers/tableReducer/action';
import { iAdditional } from '@/src/types/types';
import Image from 'next/image';
import { useContext } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function TableAdditionals() {
    const {
        additionals,
        tableDispatch,
        tableState,
        productAdditionals,
        viewProduct,
    } = useContext(TableContext);

    function handleSelectAdditional(additional: iAdditional['data']) {
        tableDispatch(selectAdditionalAction(additional));
    }

    function changeAdditionalQuantity(
        isIncrement: boolean,
        additionalId: number
    ) {
        tableDispatch(
            changeAdditionalQuantityAction(isIncrement, additionalId)
        );
    }

    const additionalByProductId = additionals.filter((a) => {
        return productAdditionals.some(
            (pa) => pa.additional_id === a.id && pa.product_id === viewProduct?.id
        );
    });

    return (
        <>
            {additionalByProductId.map((additional) => {
                const additionalHasAlreadyBeenSelected =
                    tableState.quantityAdditionals.some(
                        (aq) => aq.additionalId === additional.id
                    );
                const additionalQuantity = tableState.quantityAdditionals.find(
                    (aq) => aq.additionalId === additional.id
                );

                return (
                    <div
                        key={additional.id}
                        className=" pr-4 h-[60px] shadow-md rounded-md relative bg-white-300"
                    >
                        <div className="flex flex-1 h-full items-center gap-2">
                            <Image
                                src={additional.picture_url}
                                className="rounded-tl-md rounded-bl-md h-full"
                                alt={additional?.name}
                                width={91}
                                height={200}
                            />
                            <div className=" flex flex-1 flex-col">
                                <p className="font-bold text-black text-sm ">
                                    {additional?.name}
                                </p>
                                <p className="font-medium text-xs text-black ">
                                    R${additional?.price}
                                </p>
                            </div>
                            <div>
                                {!additionalHasAlreadyBeenSelected ? (
                                    <BsPlusCircleFill
                                        size={24}
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() =>
                                            handleSelectAdditional(additional)
                                        }
                                    />
                                ) : (
                                    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={() =>
                                                changeAdditionalQuantity(
                                                    false,
                                                    additional.id
                                                )
                                            }
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="">
                                            {additionalQuantity
                                                ? additionalQuantity.quantity
                                                : ''}
                                        </span>
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={() =>
                                                changeAdditionalQuantity(
                                                    true,
                                                    additional.id
                                                )
                                            }
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
