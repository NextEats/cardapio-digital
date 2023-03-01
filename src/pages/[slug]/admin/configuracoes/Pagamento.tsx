import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import { useContext, useEffect, useState } from 'react';

interface PaymentMethod {
    id: number;
    name: string;
}

interface Props {
    restaurantId: number;
}

export default function PaymentMethods({ restaurantId }: Props) {
    const { restaurant } = useContext(AdminContext);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [enabledPaymentMethods, setEnabledPaymentMethods] = useState<
        number[]
    >([]);

    useEffect(() => {
        async function fetchPaymentMethods() {
            const { data, error } = await supabase
                .from('payment_methods')
                .select('*');
            if (error) console.error(error);
            else setPaymentMethods(data);
        }

        async function fetchEnabledPaymentMethods() {
            const { data, error } = await supabase
                .from('payment_methods_restaurants')
                .select('payment_method_id')
                .eq('restaurant_id', restaurant!.id);
            if (error) console.error(error);
            else {
                const enabledMethods = data.map(
                    (item: { payment_method_id: number }) =>
                        item.payment_method_id
                );
                setEnabledPaymentMethods(enabledMethods);
            }
        }

        fetchPaymentMethods();
        fetchEnabledPaymentMethods();
    }, [restaurant]);

    if (!restaurant) {
        return null;
    }

    async function handleTogglePaymentMethod(
        paymentMethodId: number,
        enabled: boolean
    ) {
        const { error } = await supabase
            .from('payment_methods_restaurants')
            .upsert({
                payment_method_id: paymentMethodId,
                restaurant_id: restaurant!.id,
                enabled,
            })
            .match({
                restaurant_id: restaurant!.id,
                payment_method_id: paymentMethodId,
            });
        if (error) {
            console.error(error);
        } else {
            if (enabled) {
                setEnabledPaymentMethods([
                    ...enabledPaymentMethods,
                    paymentMethodId,
                ]);
            } else {
                setEnabledPaymentMethods(
                    enabledPaymentMethods.filter((id) => id !== paymentMethodId)
                );
            }
        }
    }

    return (
        <div className="flex flex-col">
            {paymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id} className="flex items-center mt-2">
                    <input
                        type="checkbox"
                        id={`paymentMethod-${paymentMethod.id}`}
                        onChange={(e) =>
                            handleTogglePaymentMethod(
                                paymentMethod.id,
                                e.target.checked
                            )
                        }
                        checked={enabledPaymentMethods.includes(
                            paymentMethod.id
                        )}
                    />
                    <label
                        htmlFor={`paymentMethod-${paymentMethod.id}`}
                        className="ml-2"
                    >
                        {paymentMethod.name}
                    </label>
                </div>
            ))}
        </div>
    );
}
