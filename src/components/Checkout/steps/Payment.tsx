import { GetServerSideProps } from 'next';
import Push from 'push.js';
import { useEffect, useState } from 'react';
import { api } from '../../../server/api';
import {
    iCheckoutProduct,
    iPaymentMethod,
    iPaymentMethods,
    iPaymentMethodsRestaurantss,
    iRestaurantWithFKData,
} from '../../../types/types';

interface iPayment {
    products: Array<iCheckoutProduct> | null | undefined;
    paymentMethodSelected: iPaymentMethod['data'] | null;
    setPaymentMethodSelected: Function;
    restaurant: iRestaurantWithFKData | undefined;
    handleFinishOrder(): Promise<void>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            data: {},
        },
    };
};

export function Payment({
    paymentMethodSelected,
    setPaymentMethodSelected,
    restaurant,
    handleFinishOrder,
}: iPayment) {
    const [paymentMethods, setPaymentMethods] = useState<
        iPaymentMethods['data']
    >([]);

    useEffect(() => {
        const getPaymentMethods = async () => {
            const getPaymentMethodsRestaurant: iPaymentMethodsRestaurantss =
                await api.get(
                    'api/payment_methods_restaurants/' + restaurant!.id
                );
            const getPaymentMethods: iPaymentMethods = await api.get(
                'api/payment_method'
            );
            const filterPaymentMethodsRestaurant =
                getPaymentMethodsRestaurant.data.map((pmr) => {
                    return getPaymentMethods.data[
                        getPaymentMethods.data.findIndex(
                            (pm) => pm.id === pmr.payment_method_id
                        )
                    ];
                });
            setPaymentMethods(filterPaymentMethodsRestaurant);
        };
        getPaymentMethods();
    }, [restaurant]);

    const nextStep = async () => {
        Push.create('Pedido Feito ', {
            body: 'Seu pedido está em analise!',
            icon: restaurant?.picture_url,
            timeout: 4000,

            onClick: function () {
                window.focus();
                close();
            },
        });
        await handleFinishOrder();
    };

    return (
        <>
            <div className="min-h-[400px] gap-y-2 flex flex-col">
                <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
                    {paymentMethods.map((paymentMethod) => {
                        return (
                            <div
                                key={paymentMethod.id}
                                className={`border-2 border-indigo-800 w-full h-16 hover:bg-indigo-800 flex items-center pl-6 cursor-pointer hover:text-white rounded-md 
                  ${
                      paymentMethodSelected === null
                          ? ''
                          : paymentMethodSelected!.name === paymentMethod.name
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-800'
                  }`}
                                onClick={() => {
                                    setPaymentMethodSelected(paymentMethod);
                                }}
                            >
                                <span className="text-xl">
                                    {paymentMethod.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
