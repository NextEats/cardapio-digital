import { api } from '@/src/server/api';
import { iDeliveryFee } from '@/src/types/types';
import { useEffect, useState } from 'react';
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
      await getDeliveryFee(cep, number);
    }

    fetchData();
  }, [cep, number, restaurant]);

  return { deliveryFee, setDeliveryFee };
}

export default useDeliveryFee;
