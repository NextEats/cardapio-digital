import { serverURL, supabase } from '@/src/server/api';
import { toast } from 'react-toastify';
import { returnDistanceInMeters } from './returnDistanceInMeters';

export default async function findDeliveryFeeForTheDistance({
  restaurant_address_string,
  restaurant_slug,
  restaurant_id,
  cep,
  number,
}: {
  restaurant_address_string: string | null;
  restaurant_slug: string;
  restaurant_id: number;
  cep: number;
  number: string;
}) {
  if (!restaurant_address_string) {
    alert(
      "Um endereço válido não foi cadastrado para este restaurante. Favor verificar a propriedade 'restaurant_address_string' no banco de dados."
    );
    return;
  }

  const distance_in_km = await returnDistanceInMeters(
    restaurant_address_string,
    cep + ' ' + number
  );

  const { data: delivery_fees_data } = await supabase
    .from('delivery_fees')
    .select('*')
    .eq('restaurant_id', restaurant_id);

  const foundDeliveryFee = delivery_fees_data!.find(df => {
    console.log(distance_in_km!, df.end_km!, df.start_km!);
    return distance_in_km! <= df.end_km! && distance_in_km! >= df.start_km!;
  });

  if (!foundDeliveryFee) {
    toast.error(
      'Sinto muito, o endereço digitado está fora do alcance de nossos entregadores!',
      {
        theme: 'light',
        position: 'top-center',
      }
    );

    setTimeout(() => {
      window.location.href = serverURL + restaurant_slug;
    }, 6000);

    return null;
  }

  return foundDeliveryFee;
}
