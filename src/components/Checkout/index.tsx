import { useContext, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { iCheckoutProduct, iPaymentMethod } from '../../types/types';

import { ProductList } from './steps/ProductList';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { Address } from './steps/Address';
import ContactInfo from './steps/ContactInfo';
import { Payment } from './steps/Payment';
import { SuccessMessage } from './steps/SuccessMessage';
import { TypeCEP } from './steps/TypeCEP';

import { handleFinishOrder } from './handleFinishOrder';

export type iOrderType = 'delivery' | 'takeout' | 'reserve';
export type iPaymentMethodSelectedType = 'pix' | 'dinheiro';
export interface iAddress {
    cep: string;
    city: string;
    neighborhood: string;
    number: number;
    service: string;
    state: string;
    street: string;
}
export interface iPaymentOption {
    id: number;
    name: string;
}

export default function Checkout({
    products,
    onClose,
    productsDispatch,
}: {
    products: Array<iCheckoutProduct> | null | undefined;
    onClose: () => void;
    productsDispatch: Function;
}) {
    const { restaurant } = useContext(DigitalMenuContext);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState<
        iPaymentMethod['data'] | null
    >(null);
    const [cepState, setCepState] = useState<string>('');
    const [address, setAddress] = useState<iAddress>({
        cep: '',
        city: '',
        neighborhood: '',
        number: 0,
        service: '',
        state: '',
        street: '',
    });

    function closeModal() {
        onClose();
    }

    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function nextStepIndex() {
        setCurrentStepIndex((prev) => {
            return (prev += 1);
        });
    }

    function previousStepIndex() {
        setCurrentStepIndex((prev) => {
            if (prev === 0) {
                closeModal();
                return prev;
            }

            return (prev -= 1);
        });
    }

    const steps = [
        {
            name: 'Informações de Contato',
            component: <ContactInfo />,
        },
        {
            name: 'Finalizar Pedido',
            component: (
                <ProductList
                    products={products}
                    productsDispatch={productsDispatch}
                />
            ),
        },
        {
            name: 'Digite seu CEP',
            component: (
                <TypeCEP
                    products={products}
                    cepState={cepState}
                    setCepState={setCepState}
                    setAddress={setAddress}
                />
            ),
        },
        {
            name: 'Confirme Seu Endereço',
            component: <Address address={address} setAddress={setAddress} />,
        },
        {
            name: 'Selecione o Método de Pagamento',
            component: (
                <Payment
                    handleFinishOrder={() =>
                        handleFinishOrder({
                            restaurant: restaurant,
                            address: address,
                            cepState: cepState,
                            products: products,
                            paymentMethodSelected: paymentMethodSelected,
                        })
                    }
                    restaurant={restaurant}
                    paymentMethodSelected={paymentMethodSelected}
                    products={products}
                    setPaymentMethodSelected={setPaymentMethodSelected}
                />
            ),
        },
        {
            name: 'Sucesso!!',
            component: <SuccessMessage />,
        },
    ];

    if (products === null || products === undefined) {
        return <></>;
    }

    return (
        <>
            <div className="absolute h-screen w-[99vw] flex items-center justify-center">
                <div
                    className="fixed bg-black w-[99vw] h-screen opacity-60 z-[100] cursor-pointer"
                    onClick={closeModal}
                ></div>
                <div className="pb-9 px-4 bg-white rounded-lg z-[200] fixed overflow-auto shadow-2xl w-[95vw] max-w-[600px] ">
                    <div className="sticky top-0">
                        <div className="flex flex-row w-full items-center py-12 justify-center">
                            <h4 className="font-semibold text-xl text-gray-800">
                                {steps[currentStepIndex].name}
                            </h4>
                            <BsX
                                className="my-8 cursor-pointer absolute right-7"
                                size={30}
                                onClick={closeModal}
                            />
                        </div>
                        <>
                            <div className="min-h-[400px] gap-y-2 flex flex-col px-5">
                                {steps[currentStepIndex].component}

                                <div className="mt-auto">
                                    {currentStepIndex === 0 ? (
                                        <button
                                            onClick={() => closeModal()}
                                            className="font-semibold border-indigo-600 border-2 hover:text-white text-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-5"
                                        >
                                            ADICIONAR MAIS ITENS
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => previousStepIndex()}
                                            className="font-semibold border-indigo-600 border-2 hover:text-white text-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-5"
                                        >
                                            VOLTAR
                                        </button>
                                    )}
                                    <button
                                        onClick={() => nextStepIndex()}
                                        className="font-semibold bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-1"
                                    >
                                        CONTINUAR
                                    </button>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}
