import Button from '@/src/components/Button/Button';
import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import useProductsInCheckout from '@/src/hooks/useProductsInCheckout';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { SubmitForm } from './../SubmitForm/SubmitForm';

interface iOrderPriceInformation {
  setIsDone: any;
  setOrderNumber: any;
  getValues: any;
  watch: any;
  isReadyToSubmit: any;
  deliveryFee: any;
  setDeliveryFee: any;
}

export default function OrderPriceInformation({
  setIsDone,
  setOrderNumber,
  getValues,
  watch,
  isReadyToSubmit,
  deliveryFee,
  setDeliveryFee,
}: iOrderPriceInformation) {
  const products = useProductsInCheckout();
  const { restaurant } = useContext(DigitalMenuContext);

  const [subtotalPrice, setSubtotalPrice] = useState<number>(0);

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
      restaurant: restaurant!,
      payment_method: paymentMethod,
      change_value,
      deliveryForm: Number(deliveryForm),
      complement,
      neighborhood,
      street,
    });

    setIsDone(true);
  };

  return (
    <>
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
            {/* {`${watch('deliveryForm')}` == '1' &&
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
            ) : null} */}

            <div className="my-2 flex flex-row justify-between w-full">
              <span className="font-semibold">Total</span>
              <span>
                R${' '}
                {subtotalPrice.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                {/* {deliveryFee &&
                  (watch('deliveryForm') == 1
                    ? subtotalPrice + deliveryFee
                    : subtotalPrice
                  ).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} */}
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
    </>
  );
}
