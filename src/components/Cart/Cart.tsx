import CloseModalButton from '@/src/components/CloseModalButton';
import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import useProductsInCheckout from '@/src/hooks/useProductsInCheckout';
import { api } from '@/src/server/api';
import { iDeliveryFee } from '@/src/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import Button from '../Button';
import DynamicProductsList from '../DynamicProductsList';
import RestaurantInfoHeader from '../RestaurantInfoHeader';
import SubmitOrderForm from '../SubmitOrderForm';
import { SubmitForm } from './SubmitForm/SubmitForm';
import { returnDistanceInMeters } from './SubmitForm/util/returnDistanceInMeters';
import ThankYouPage from './ThankYou';

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
  neighborhood: zod.string(),
  street: zod.string(),
});

type NewOrderFormData = zod.infer<typeof newOrderFormValidationSchema>;

export default function Cart() {
  const [orderNumber, setOrderNumber] = useState<number | undefined>(undefined);
  const [isDone, setIsDone] = useState(false);
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
      neighborhood: '',
      street: '',
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
      setSubtotalPrice(price ? price : 0);
    }

    getTotalPrice().catch(error => {
      console.error(error);
    });
  }, [products, restaurant?.id]);

  const [currentSelectedTab, setCurrentSelectedTab] =
    useState<tTabs>('delivery');

  const handleCloseModal = () => {
    modals?.set(prev => {
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

      const { data: delivery_fees_data } = await api.post<
        Array<iDeliveryFee['data']>
      >('/api/delivery_fees', {
        id: restaurant!.id,
      });

      foundDeliveryFee = delivery_fees_data!.find(df => {
        return distance_in_km! <= df.end_km! && distance_in_km! >= df.start_km!;
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
    if (getValues('deliveryForm') == 2) {
      const doesNameInputIsFilled = !!getValues('name');
      const doesPaymentMethodInputIsFilled = !!getValues('paymentMethod');
      const doesWhatsAppNumberInputIsFilled = !!getValues('whatsappNumber');

      const isAllRequiredFieldsFilled =
        doesNameInputIsFilled &&
        doesPaymentMethodInputIsFilled &&
        doesWhatsAppNumberInputIsFilled;

      setIsReadyToSubmit(isAllRequiredFieldsFilled);
    } else {
      const isAllRequiredFieldsFilled =
        !!getValues('name') &&
        !!getValues('cep') &&
        !!getValues('paymentMethod') &&
        !!getValues('number') &&
        !!getValues('whatsappNumber');

      setIsReadyToSubmit(isAllRequiredFieldsFilled);
    }
  }, [getValues]);

  if (!restaurant) {
    handleCloseModal();
    return null;
  }

  const isPhoneValid =
    String(watch('whatsappNumber')).replace(/\D/g, '').length < 11;
  const isCepValid = String(watch('cep')).replace(/\D/g, '').length < 8;

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
      neighborhood,
      street,
    } = getValues();

    SubmitForm({
      setOrderNumber,
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
      neighborhood,
      street,
    });

    setIsDone(true);
  };

  if (isDone && orderNumber) {
    return <ThankYouPage deliveryFee={deliveryFee} orderNumber={orderNumber} />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center fixed z-[2000]">
      <FormProvider {...newOrderForm}>
        <div
          onClick={handleCloseModal}
          className="bg-black opacity-90 h-full fixed w-screen cursor-pointer"
        ></div>
        <form className="h-[95vh] overflow-y-auto px-2 pb-10 bg-white rounded-xl shadow-md max-w-[500px] w-[95%] z-[2000]">
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
                    <span className="font-semibold">Subtotal</span>
                    <span>
                      R${' '}
                      {subtotalPrice.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : null}
                {`${watch('deliveryForm')}` == '1' &&
                watch('cep') &&
                watch('number') &&
                deliveryFee ? (
                  <div className="my-2 flex flex-row justify-between w-full">
                    <span className="font-semibold">Taxa de Entrega</span>
                    <span>
                      R${' '}
                      {deliveryFee.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : null}

                <div className="my-2 flex flex-row justify-between w-full">
                  <span className="font-semibold">Total</span>
                  <span>
                    R${' '}
                    {deliveryFee &&
                      (watch('deliveryForm') == 1
                        ? subtotalPrice + deliveryFee
                        : subtotalPrice
                      ).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </div>
              </div>
              <div className="mt-7 mb-12">
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
