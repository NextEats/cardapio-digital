import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import useDeliveryFee from '@/src/hooks/useDeliveryFee';
import useFormProvider from '@/src/hooks/useFormProvider';
import { useContext, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import CloseModalButton from '../CloseModalButton';
import DynamicProductsList from '../DynamicProductsList';
import RestaurantInfoHeader from '../RestaurantInfoHeader';
import SubmitOrderForm from '../SubmitOrderForm';
import ThankYouPage from './ThankYou';
import OrderPriceInformation from './components/OrderPriceInformation';

export type tTabs = 'delivery' | 'takeout';

interface iCart {
  handleCloseModal: () => void;
}

export default function Cart({ handleCloseModal }: iCart) {
  const [orderNumber, setOrderNumber] = useState<number | undefined>(undefined);
  const [isDone, setIsDone] = useState(false);

  const formProvider = useFormProvider();

  const { isReadyToSubmit } = formProvider;
  const { getValues, setValue, watch } = formProvider.form;

  const { restaurant } = useContext(DigitalMenuContext);

  const cep = watch('cep');
  const number = watch('number');
  const deliveryForm = watch('deliveryForm');

  const isDelivery = deliveryForm == 1;

  console.log('deliveryForm', deliveryForm);
  console.log('isDelivery', isDelivery);

  const { deliveryFee, setDeliveryFee } = useDeliveryFee(
    cep ? cep.toString() : '',
    number,
    restaurant
  );

  if (isDone && orderNumber) {
    return (
      <ThankYouPage
        deliveryFee={deliveryFee}
        orderNumber={orderNumber}
        isDelivery={isDelivery}
      />
    );
  }

  return (
    <FormProvider {...formProvider.form}>
      <div className="py-10 h-[95vh] overflow-y-auto x-2 pb-10 bg-white rounded-xl shadow-md max-w-[500px] w-[95%] z-[2000]">
        <CloseModalButton
          className="ml-auto mr-5"
          handleCloseModal={handleCloseModal}
        />
        <RestaurantInfoHeader />
        <DynamicProductsList />
        <SubmitOrderForm />
        <OrderPriceInformation
          getValues={getValues}
          setOrderNumber={setOrderNumber}
          setDeliveryFee={setDeliveryFee}
          setIsDone={setIsDone}
          watch={watch}
          deliveryFee={deliveryFee}
          isDelivery={isDelivery}
          isReadyToSubmit={isReadyToSubmit}
        />
      </div>
    </FormProvider>
  );
}
