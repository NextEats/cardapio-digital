import { serverURL, supabase } from '@/src/server/api';
import { iDeliveryFee } from '@/src/types/types';
import cepPromise from 'cep-promise';
import { toast } from 'react-toastify';

async function getAddressFromCep(cep: string) {
  try {
    const { street, neighborhood, city, state } = await cepPromise(cep);
    return `${street}, ${neighborhood}, ${city} - ${state}, ${cep}`;
  } catch (error) {
    console.error('Error fetching address from CEP:', error);
    return null;
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

  if (!destinationAddress) {
    toast.error(
      'Ocorreu um erro ao buscar o endereço. Por favor, verifique o CEP digitado.'
    );
    return;
  }

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
      .eq('restaurant_id', restaurant_id);

    if (!deliveryFeesData) {
      toast.error(
        'Sinto muito, o endereço digitado está fora do alcance de nossos entregadores!'
      );

      setTimeout(() => {
        window.location.href = serverURL + restaurant_slug;
      }, 5000);

      return;
    }

    const foundDeliveryFee = deliveryFeesData.find(
      (df: iDeliveryFee['data']) => {
        if (df.end_km && df.start_km) {
          return distanceInKm <= df.end_km && distanceInKm >= df.start_km;
        }
      }
    );

    if (!foundDeliveryFee) {
      toast.error(
        'Sinto muito, o endereço digitado está fora do alcance de nossos entregadores!'
      );

      setTimeout(() => {
        window.location.href = serverURL + restaurant_slug;
      }, 6000);

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
