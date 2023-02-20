import cep from 'cep-promise';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { iCheckoutProduct } from '../../../types/types';

interface iTypeCEP {
    products: Array<iCheckoutProduct> | null | undefined;
    cepState: string;
    setCepState: Function;
    setAddress: Function;
}
export function TypeCEP({
    products,
    cepState,
    setCepState,
    setAddress,
}: iTypeCEP) {
    const [hasError, setHasError] = useState<boolean>(false);

    if (products === null || products === undefined) {
        return <></>;
    }

    const nextStep = () => {
        function clearNumbers() {
            let onlyNumbersString = '';

            for (let i = 0; i < cepState.length; i++) {
                if (!isNaN(Number(cepState[i]))) {
                    onlyNumbersString += cepState[i];
                }
            }
            return Number(onlyNumbersString);
        }

        cep(clearNumbers())
            .then((res) => {
                setAddress(res);
                setHasError(false);
                // nextStepIndex('address');
            })
            .catch((err) => setHasError(true));
    };

    const handleCepChange = (e: any) => {
        setCepState(e.target.value);
    };

    return (
        <>
            <div className="min-h-[400px] gap-y-2 flex flex-col">
                <div>
                    <InputMask
                        mask="99999-999"
                        value={cepState}
                        onChange={(e) => handleCepChange(e)}
                        type="text"
                        className="border-b-indigo-800 border-b-2 w-full py-2 text-3xl text-center"
                        placeholder="Digite seu CEP"
                    />
                </div>
                {hasError && (
                    <span className="text-center w-full text-sm text-red-400">
                        Este CEP não é válido, verifique se o número está
                        correto.
                    </span>
                )}
            </div>
        </>
    );
}
