import { whatsappRestApi } from '@/src/server/api';
import { iDeliveryFee, iRestaurantWithFKData } from '@/src/types/types';
import { removeNonAlphaNumeric } from '../SubmitForm';

export default async function sendDeliveryFeeMessage(
  restaurant: iRestaurantWithFKData,
  whatsapp: number,
  foundDeliveryFee: iDeliveryFee['data'] | null | undefined
) {
  try {
    await whatsappRestApi.post('/send-message', {
      id: restaurant!.slug,
      number: '55' + removeNonAlphaNumeric(whatsapp.toString()),
      message: `🏍 O valor da taxa de entrega é: R$ ${foundDeliveryFee?.fee}`,
    });
  } catch (err) {
    console.error(err);
  }
}
