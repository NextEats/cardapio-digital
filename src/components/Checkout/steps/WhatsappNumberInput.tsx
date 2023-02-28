import { useContext, useState } from 'react';
import InputMask from 'react-input-mask';

import { RestaurantContext } from '@/src/contexts/DigitalMenuContext';

interface iWhatsappNumberInput {
    whatsappNumber: number | undefined;
    setWhatsappNumber: Function;
    nextStepIndex: Function;
    previousStepIndex: Function;
}
export function WhatsappNumberInput({
    whatsappNumber,
    setWhatsappNumber,
    nextStepIndex,
    previousStepIndex,
}: iWhatsappNumberInput) {
    const [hasError, setHasError] = useState<boolean>(false);
    const [restaurant, setRestaurant] =
        useContext(RestaurantContext).restaurant;

    const backStep = () => {
        previousStepIndex();
    };

    const nextStep = async () => {
        nextStepIndex();
    };

    const handleWhatsappChange = (e: any) => {
        setWhatsappNumber(e.target.value);
    };

    return (
        <div className="mb-9">
            <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
                <div>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={whatsappNumber}
                        onChange={(e) => handleWhatsappChange(e)}
                        type="text"
                        className="border-b-indigo-800 border-b-2 w-full py-2 text-3xl text-center focus:outline-0 focus:border-b-4"
                        placeholder="WhatsApp"
                    />
                </div>
                {hasError && (
                    <span className="text-center w-full text-sm text-red-400">
                        Este WhatsApp não é válido, verifique se o número está
                        correto.
                    </span>
                )}
            </div>
            <button
                onClick={backStep}
                className="font-semibold border-indigo-600 border-2 hover:text-white text-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-5"
            >
                VOLTAR
            </button>
            <button
                onClick={nextStep}
                className="font-semibold bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-1"
            >
                CONTINUAR
            </button>
        </div>
    );
}
