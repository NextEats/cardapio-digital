import { AdminContext } from '@/src/contexts/adminContext';
import { useContext, useEffect, useState } from 'react';
import { iPaymentMethod } from '../../../../types/types';
import {
    getPaymentMethodsAvailable,
    getPaymentMethodsForThisRestaurant,
} from './../../../../server/api';

export default function Payment() {
    const restaurant = useContext(AdminContext).restaurant;

    const [paymentMethodsAvailable, setPaymentMethodsAvailable] =
        useState<iPaymentMethod['data'][]>();

    const [
        paymentMethodsForThisRestaurant,
        setPaymentMethodsForThisRestaurant,
    ] = useState<any>();

    useEffect(() => {
        async function getData() {
            await getPaymentMethodsAvailable().then((data) => {
                if (data) {
                    setPaymentMethodsAvailable(data);
                }
            });
        }

        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            await getPaymentMethodsForThisRestaurant(restaurant!.id).then(
                (data) => {
                    if (data) {
                        setPaymentMethodsForThisRestaurant(data.data);
                        console.log(data.data);
                    }
                }
            );
        }

        getData();
    }, []);

    return (
        <div>
            <h3 className="mb-4 font-semibold">Métodos de Pagamento Ativos</h3>
            {paymentMethodsAvailable && (
                <div className="flex flex-col gap-y-3">
                    {paymentMethodsAvailable.map(
                        (
                            paymentMethod: iPaymentMethod['data'],
                            index: number
                        ) => {
                            return (
                                <div key={index}>
                                    <div className="ml-4 relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            name={paymentMethod.name}
                                            id={paymentMethod.name}
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                            defaultValue={paymentMethod.name}
                                        />
                                        <label
                                            htmlFor={paymentMethod.name}
                                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        ></label>
                                    </div>
                                    <span className="uppercase">
                                        {paymentMethod.name}
                                    </span>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}
