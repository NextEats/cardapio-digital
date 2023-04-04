import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import { useContext, useEffect, useState } from 'react';
import * as Switch from '@radix-ui/react-switch';

interface PaymentMethod {
    id: number;
    name: string;
}

interface Props {
    restaurantId: number;
}

export default function PaymentMethods() {
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

        const { data: paymentMethodList } = await supabase
            .from('payment_methods_restaurants')
            .select('*').eq('restaurant_id', restaurant!.id)
        
        const paymentMethodAlreadyEnabled = paymentMethodList!.find((item) => item.payment_method_id === paymentMethodId)

        if(paymentMethodAlreadyEnabled){
        const { error } = await supabase
            .from('payment_methods_restaurants')
            .update({
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
       }else{
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
    }

    return (
        <div className="flex flex-col">
            {paymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id} className="flex items-center mt-2">
                    <Switch.Root
                        className="w-[42px] h-6 bg-[red] rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                        id={`paymentMethod-${paymentMethod.id}`}
                        onCheckedChange={(checked : boolean) =>
                            handleTogglePaymentMethod(
                                paymentMethod.id,
                                checked
                            )
                        }
                        checked={enabledPaymentMethods.includes(
                            paymentMethod.id
                        )}
                    >
                        <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>

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
