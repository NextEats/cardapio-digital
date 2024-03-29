import { api } from '../server/api';
import { iAdditionals } from '../types/iAdditional';
import { iProducts } from '../types/iProducts';

export async function calculateTotalOrderPrice({
  products,
  restaurantId,
}: {
  products: any;
  restaurantId: number | undefined;
}) {
  if (!restaurantId) return 0;

  const { data: additionalData } = await api.get(
    `api/additionals/${restaurantId}`
  );
  const { data: productsData } = await api.get(`api/products/${restaurantId}`);

  const additionals = additionalData as iAdditionals['data'];
  const orderPrice: number = await products.state.reduce(
    async (acc: Promise<number>, item: any) => {
      const productFound = (productsData as iProducts['data']).find(
        p => p.id === item.id
      );
      if (!productFound) return await acc;

      const totalAdditionalPrice = await item.additionals.reduce(
        async (accAdd: Promise<number>, itemAdd: any) => {
          const additionalFoundById = additionals.find(
            a => a.id === itemAdd.additional_id
          );
          if (!additionalFoundById) return await accAdd;

          const accAddValue = await accAdd;
          return accAddValue + additionalFoundById.price * itemAdd.quantity;
        },
        Promise.resolve(0)
      );

      const totalOrderProductPriceWithAdditionals =
        (productFound?.price + totalAdditionalPrice) * item.quantity;

      const accValue = await acc;
      return accValue + totalOrderProductPriceWithAdditionals;
    },
    Promise.resolve(0)
  );

  return orderPrice;
}
