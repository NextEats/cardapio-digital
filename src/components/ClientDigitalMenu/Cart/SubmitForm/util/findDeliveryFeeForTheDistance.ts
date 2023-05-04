import { supabase } from '@/src/server/api';
import { iDeliveryFee } from '@/src/types/types';
import { toast } from 'react-toastify';

export async function getAddressFromCep(cep: string) {
  try {
    const response = await fetch(`/api/get-address-from-cep?cep=${cep}`);

    const { address } = await response.json();
    return address;
  } catch (error) {
    console.error(error);
  }
}

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
  // console.log('33333333333333333333333333');
  if (!restaurant_address_string) {
    toast.error(
      "Um endereço válido não foi cadastrado para este restaurante. Favor verificar a propriedade 'restaurant_address_string' no banco de dados."
    );
    return;
  }

  const destinationAddress = await getAddressFromCep(cep.toString());

  // console.log('destinationAddress', destinationAddress);
  // console.log('2222222222222222222222');

  try {
    const response = await fetch('/api/calculate_distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startAddress: restaurant_address_string,
        destinationAddress: `${destinationAddress}, ${number}`,
      }),
    });

    // console.log('222 destinationAddress', destinationAddress);

    const { distance: distanceInKm } = await response.json();

    // console.log('distanceInKm', distanceInKm);

    const { data: deliveryFeesData } = await supabase
      .from('delivery_fees')
      .select('*')
      .match({ restaurant_id: restaurant_id, deleted_at: null });

    if (!deliveryFeesData) {
      return;
    }

    console.log('deliveryFeesData', deliveryFeesData);

    const sortedDeliveryFeesData = deliveryFeesData.sort((a: any, b: any) => {
      return b.end_km - a.end_km || b.start_km - a.start_km;
    });
    // console.log('sortedDeliveryFeesData', sortedDeliveryFeesData);

    const foundDeliveryFee = sortedDeliveryFeesData.find(
      (df: iDeliveryFee['data']) => {
        if (df.end_km !== null && df.start_km !== null) {
          return distanceInKm <= df.end_km && distanceInKm >= df.start_km;
        }
      }
    );

    // console.log('foundDeliveryFee', foundDeliveryFee);

    console.log('teste distance', foundDeliveryFee);
    if (!foundDeliveryFee) {
      return null;
    }
    return foundDeliveryFee;
  } catch (error) {
    console.error('Error fetching delivery fee:', error);
    toast.error(
      'Ocorreu um erro ao buscar a taxa de entrega. Por favor, tente novamente mais tarde.'
    );
    return null;
  }
}
