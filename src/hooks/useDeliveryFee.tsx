import { supabase } from '@/src/server/api';
import { useEffect, useState } from 'react';
import { getAddressFromCep } from '../components/ClientDigitalMenu/Cart/SubmitForm/util/findDeliveryFeeForTheDistance';
import { returnDistanceInMeters } from '../components/ClientDigitalMenu/Cart/SubmitForm/util/returnDistanceInMeters';

function useDeliveryFee(cep: string, number: string, restaurant: any) {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

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

      const destinationAddress = await getAddressFromCep(cep);

      console.log('startAddress', restaurant!.address_string);
      console.log('destinationAddress', destinationAddress + ' ' + number);

      const distance_in_km = await returnDistanceInMeters(
        restaurant!.address_string,
        destinationAddress + ' ' + number
      );

      console.log('distance_in_km', distance_in_km);

      // const { data: delivery_fees_data } = await api.post<
      //   Array<iDeliveryFee['data']>
      // >('/api/delivery_fees', {
      //   id: restaurant!.id,
      // });
      const { data: delivery_fees_data, error } = await supabase
        .from('delivery_fees')
        .select('*')
        .eq('restaurant_id', restaurant!.id)
        .is('deleted_at', null);

      if (delivery_fees_data === null) {
        setDeliveryFee(0);
        return;
      }

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
      await getDeliveryFee(cep, number);
    }

    fetchData();
  }, [cep, number, restaurant]);

  return { deliveryFee, setDeliveryFee };
}

export default useDeliveryFee;
