import { AdminContext } from '@/src/contexts/adminContext';
import useAllPaymentMethods from '@/src/hooks/useAllPaymentMethods';
import { supabase } from '@/src/server/api';
import { useContext } from 'react';
import { iPaymentMethod } from '../../../../types/types';

export default function Payment() {
    const restaurant = useContext(AdminContext).restaurant;

    const allPaymentMethods = useAllPaymentMethods();

    if (!restaurant) {
        return null;
    }

    const handleCheckboxChange = (paymentMethodId: number) => {
        togglePaymentMethod(restaurant.id, paymentMethodId);
    };

    return (
        <div>
            <h3 className="mb-4 font-semibold">Métodos de Pagamento Ativos</h3>
            {allPaymentMethods && (
                <div className="flex flex-col gap-y-3">
                    {allPaymentMethods.map(
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
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    paymentMethod.id
                                                )
                                            }
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

async function checkIfPaymentMethodsIsActive(
    restaurant_id: number,
    payment_method_id: number
) {
    try {
        const { data: foundPaymentMethod } = await supabase
            .from('payment_methods_restaurants')
            .select()
            .eq('payment_method_id', payment_method_id)
            .eq('restaurant_id', restaurant_id);

        if (!foundPaymentMethod) {
            return;
        }

        return foundPaymentMethod;
    } catch (error) {
        console.log(error);
    }
}

async function togglePaymentMethod(
    restaurant_id: number,
    payment_method_id: number
) {
    const foundPaymentMethod = await checkIfPaymentMethodsIsActive(
        restaurant_id,
        payment_method_id
    );

    if (!foundPaymentMethod) {
        return;
    }

    if (foundPaymentMethod?.length > 0) {
        console.log('deletar');
        try {
            await supabase
                .from('payment_methods_restaurants')
                .delete()
                .eq('payment_method_id', payment_method_id)
                .eq('restaurant_id', restaurant_id);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('criar');
        try {
            await supabase.from('payment_methods_restaurants').insert({
                payment_method_id: payment_method_id,
                restaurant_id: restaurant_id,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
