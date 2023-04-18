import { whatsappRestApi } from '@/src/server/api';
import { iDeliveryFee, iRestaurantWithFKData } from '@/src/types/types';
import { removeNonAlphaNumeric } from '../SubmitForm';

export default async function sendTotalOrderPriceMessage(
  restaurant: iRestaurantWithFKData,
  whatsapp: number,
  isDelivery: boolean,
  foundDeliveryFee: iDeliveryFee['data'] | null | undefined,
  totalOrderPrice: number
) {
  if (isDelivery) {
    try {
      await whatsappRestApi({
        method: 'post',
        url: '/send-message',
        data: {
          id: restaurant!.slug,
          number: '55' + removeNonAlphaNumeric(whatsapp.toString()),
          message: `😊 O valor total do seu pedido é de ${
            isDelivery && foundDeliveryFee
              ? foundDeliveryFee.fee + totalOrderPrice
              : totalOrderPrice
          }\n\nPague através da chave pix: _*${
            restaurant!.pix
          }*_\n\n☑ _Assim que fizer a transferência, envie o comprovante aqui_`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
}
