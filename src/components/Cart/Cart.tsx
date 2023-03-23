import CloseModalButton from '@/src/components/CloseModalButton';
import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import useProductsInCheckout from '@/src/hooks/useProductsInCheckout';
import { supabase } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import Button from '../Button';
import {
    returnDistanceInMeters,
    SubmitForm,
} from '../Checkout/subcomponents/SubmitForm';
import DynamicProductsList from '../DynamicProductsList';
import RestaurantInfoHeader from '../RestaurantInfoHeader';
import SubmitOrderForm from '../SubmitOrderForm';

export type tTabs = 'delivery' | 'takeout';

const newOrderFormValidationSchema = zod.object({
    name: zod.string().min(1, 'O nome é obrigatório'),
    whatsappNumber: zod.number().min(11).max(11),
    cep: zod.number().min(7).max(7),
    complement: zod.string().nullable(),
    change_need: zod.boolean().nullable(),
    number: zod.string().min(1),
    paymentMethod: zod.number(),
    deliveryForm: zod.number(),
    change_value: zod.number(),
});

type NewOrderFormData = zod.infer<typeof newOrderFormValidationSchema>;

export default function Cart() {
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

    const newOrderForm = useForm<NewOrderFormData>({
        resolver: zodResolver(newOrderFormValidationSchema),
        defaultValues: {
            name: '',
            whatsappNumber: 0,
            cep: 0,
            change_need: false,
            complement: '',
            paymentMethod: 0,
            number: '',
            deliveryForm: 1,
            change_value: 0,
        },
    });

    const {
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = newOrderForm;
    const { restaurant, modals } = useContext(DigitalMenuContext);

    const products = useProductsInCheckout();

    const [subtotalPrice, setSubtotalPrice] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);

    useEffect(() => {
        async function getTotalPrice() {
            const price = await calculateTotalOrderPrice({
                products,
                restaurantId: restaurant?.id,
            });
            console.log('price', price);
            setSubtotalPrice(price ? price : 0);
        }

        getTotalPrice().catch((error) => {
            console.error(error);
        });
    }, [products, restaurant?.id]);

    const [currentSelectedTab, setCurrentSelectedTab] =
        useState<tTabs>('delivery');

    const handleCloseModal = () => {
        modals?.set((prev) => {
            return {
                ...prev,
                checkout: false,
            };
        });
    };

    useEffect(() => {
        setValue('deliveryForm', 1);
    }, [setValue]);

    const cep = watch('cep');
    const number = watch('number');

    useEffect(() => {
        async function getDeliveryFee(cep: string, number: string) {
            let foundDeliveryFee;

            if (!restaurant!.address_string) {
                console.error(
                    "O parâmetro 'address_string' não foi configurado corretamente para este restaurante!"
                );
                setDeliveryFee(0);
                return null;
            }

            const distance_in_km = await returnDistanceInMeters(
                restaurant!.address_string,
                cep + ' ' + number
            );

            const { data: delivery_fees_data } = await supabase
                .from('delivery_fees')
                .select('*')
                .eq('restaurant_id', restaurant?.id);

            foundDeliveryFee = delivery_fees_data!.find((df) => {
                console.log(distance_in_km!, df.end_km!, df.start_km!);
                return (
                    distance_in_km! <= df.end_km! &&
                    distance_in_km! >= df.start_km!
                );
            });

            if (!foundDeliveryFee) {
                setDeliveryFee(0);
                return;
            }

            setDeliveryFee(foundDeliveryFee.fee);
        }

        async function fetchData() {
            await getDeliveryFee(watch('cep').toString(), watch('number'));
        }

        fetchData();
    }, [cep, number, restaurant, watch]);

    useEffect(() => {
        console.log('useEffect');

        if (getValues('deliveryForm') == 2) {
            const doesNameInputIsFilled = !!getValues('name');
            const doesPaymentMethodInputIsFilled = !!getValues('paymentMethod');
            const doesWhatsAppNumberInputIsFilled =
                !!getValues('whatsappNumber');

            const isAllRequiredFieldsFilled =
                doesNameInputIsFilled &&
                doesPaymentMethodInputIsFilled &&
                doesWhatsAppNumberInputIsFilled;

            console.log('isAllRequiredFieldsFilled', isAllRequiredFieldsFilled);

            setIsReadyToSubmit(isAllRequiredFieldsFilled);
        } else {
            const isAllRequiredFieldsFilled =
                !!getValues('name') &&
                !!getValues('cep') &&
                !!getValues('paymentMethod') &&
                !!getValues('number') &&
                !!getValues('whatsappNumber');

            console.log(isAllRequiredFieldsFilled);

            setIsReadyToSubmit(isAllRequiredFieldsFilled);
        }
    }, [getValues]);

    if (!restaurant) {
        handleCloseModal();
        return null;
    }

    const handleFinishOrder = (e: FormEvent) => {
        e.preventDefault();
        const {
            cep,
            complement,
            name,
            number,
            whatsappNumber,
            paymentMethod,
            deliveryForm,
            change_value,
        } = getValues();
        console.log(getValues());
        SubmitForm({
            setDeliveryFee,
            name,
            number,
            cep,
            whatsapp: whatsappNumber,
            products,
            restaurant,
            payment_method: paymentMethod,
            change_value,
            deliveryForm: Number(deliveryForm),
            complement,
        });
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center fixed z-[2000]">
            <FormProvider {...newOrderForm}>
                <div
                    onClick={handleCloseModal}
                    className="bg-black opacity-90 h-full fixed w-screen cursor-pointer"
                ></div>
                <form
                    // onSubmit={handleSubmit(handleFinishOrder)}
                    className="h-[95vh] overflow-y-auto px-2 pb-10 bg-white rounded-xl shadow-md max-w-[500px] w-[95%] z-[2000]"
                >
                    <CloseModalButton
                        className="ml-auto mr-4 mt-4"
                        handleCloseModal={handleCloseModal}
                    />
                    <RestaurantInfoHeader restaurant={restaurant} />
                    <DynamicProductsList />
                    <SubmitOrderForm
                        currentSelectedTab={currentSelectedTab}
                        setCurrentSelectedTab={setCurrentSelectedTab}
                    />
                    {subtotalPrice !== 0 ? (
                        <div className="px-4 mt-7">
                            <div className="px-5">
                                {`${watch('deliveryForm')}` == '1' ? (
                                    <div className="my-2 flex flex-row justify-between w-full">
                                        <span className="font-semibold">
                                            Subtotal
                                        </span>
                                        <span>R$ {subtotalPrice}</span>
                                    </div>
                                ) : null}
                                {`${watch('deliveryForm')}` == '1' &&
                                watch('cep') &&
                                watch('number') &&
                                deliveryFee ? (
                                    <div className="my-2 flex flex-row justify-between w-full">
                                        <span className="font-semibold">
                                            Taxa de Entrega
                                        </span>
                                        <span>R$ {deliveryFee}</span>
                                    </div>
                                ) : null}

                                <div className="my-2 flex flex-row justify-between w-full">
                                    <span className="font-semibold">Total</span>
                                    <span>
                                        R${' '}
                                        {deliveryFee &&
                                        watch('deliveryForm') == 1
                                            ? subtotalPrice + deliveryFee
                                            : subtotalPrice}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-7">
                                <Button
                                    text={'confirmar pedido'}
                                    onClick={handleFinishOrder}
                                    disabled={!isReadyToSubmit}
                                />
                            </div>
                        </div>
                    ) : null}
                </form>
            </FormProvider>
        </div>
    );
}
