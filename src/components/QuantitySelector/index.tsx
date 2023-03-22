import { FormEvent } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

interface iQuantitySelector {
    value: number;
    addValue: Function;
    subtractValue: Function;
    deleteValue?: Function;
}

export function QuantitySelector({
    value,
    addValue,
    subtractValue,
    deleteValue,
}: iQuantitySelector) {
    const handleIncrementOnClick = (e: FormEvent) => {
        e.preventDefault();
        addValue();
    };

    const handleDecrementOnClick = (e: FormEvent) => {
        e.preventDefault();
        subtractValue();
    };

    const handleDeleteOnClick = (e: FormEvent) => {
        e.preventDefault();
        if (!deleteValue) return;
        deleteValue();
    };

    return (
        <div className="w-24 flex flex-row justify-between p-1">
            <button
                className="text-orange-600 w-6 text-md flex items-center justify-center"
                onClick={
                    value == 1 ? handleDeleteOnClick : handleDecrementOnClick
                }
            >
                {value == 1 && deleteValue ? <FaTrash /> : null}
                {value > 1 ? <FaMinus /> : null}
            </button>
            <span className="text-gray-800">{value}</span>
            <button
                className="text-orange-600 w-6 text-md flex items-center justify-center"
                onClick={handleIncrementOnClick}
            >
                <FaPlus />
            </button>
        </div>
    );
}
