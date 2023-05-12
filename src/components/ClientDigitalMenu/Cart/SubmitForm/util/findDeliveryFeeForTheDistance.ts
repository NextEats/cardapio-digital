import { supabase } from '@/src/server/api';
import { iDeliveryFee } from '@/src/types/iDeliveryFee';
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
  if (!restaurant_address_string) {
    toast.error(
      "Um endereço válido não foi cadastrado para este restaurante. Favor verificar a propriedade 'restaurant_address_string' no banco de dados."
    );
    return;
  }

  const destinationAddress = await getAddressFromCep(cep.toString());

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

    const { distance: distanceInKm } = await response.json();

    const { data: deliveryFeesData } = await supabase
      .from('delivery_fees')
      .select('*')
      .eq('restaurant_id', restaurant_id)
      .is('deleted_at', null);

    if (!deliveryFeesData) {
      return;
    }

    const sortedDeliveryFeesData = deliveryFeesData.sort((a: any, b: any) => {
      return b.end_km - a.end_km || b.start_km - a.start_km;
    });

    const foundDeliveryFee = sortedDeliveryFeesData.find(
      (df: iDeliveryFee['data']) => {
        if (df.end_km !== null && df.start_km !== null) {
          return distanceInKm <= df.end_km && distanceInKm >= df.start_km;
        }
      }
    );

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
