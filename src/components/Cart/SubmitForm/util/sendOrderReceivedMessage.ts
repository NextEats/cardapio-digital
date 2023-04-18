import { whatsappRestApi } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/types';
import { removeNonAlphaNumeric } from '../SubmitForm';

export default async function sendOrderReceivedMessage(
  restaurant: iRestaurantWithFKData,
  whatsapp: number
) {
  try {
    await whatsappRestApi({
      method: 'post',
      url: '/send-message',
      data: {
        id: restaurant!.slug,
        number: '55' + removeNonAlphaNumeric(whatsapp.toString()),
        message: `*${
          restaurant!.name
        }*\n\n☺✅ _Seu pedido foi recebido com sucesso e começará a ser preparado em breve!_ Você receberá aqui todas as atualizações.`,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
