import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface Props {
  deliveryFee?: number;
  orderNumber: number;
}

function ThankYouPage({ deliveryFee = 0, orderNumber }: Props): JSX.Element {
  const { restaurant } = useContext(DigitalMenuContext);
  const { productReducer } = useContext(DigitalMenuContext);

  const [orderPrice, setOrderPrice] = useState(0);

  useEffect(() => {
    async function fetchOrderPrice() {
      const price = await calculateTotalOrderPrice({
        products: productReducer!,
        restaurantId: restaurant?.id,
      });
      setOrderPrice(price || 0);
    }
    fetchOrderPrice();
  }, [productReducer, restaurant?.id]);

  return (
    <div
      className="min-w-screen min-h-screen w-screen h-screen fixed z-[1000]
                        bg-gray-100 flex items-center justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 py-12 sm:px-6 lg:px-8 max-w-720px max-w-[95%]">
        <div className="flex items-center pr-12 pb-12 lg:pb-0 flex-col lg:flex-row">
          <div
            className="w-24 h-24 border-[7px] border-green-600 mb-6
                                        rounded-full flex justify-center items-center"
          >
            <FaCheck className="text-[40px] text-green-600" />
          </div>
          <div className="ml-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Sucesso</h2>
            <p className="mt-2 text-md text-gray-600 w-64 italic">
              Seu pedido foi recebido e está sendo processado. Você receberá uma
              confirmação em breve.
            </p>
          </div>
        </div>
        <div className="flex flex-col border-t lg:border-t-[#00000000] lg:border-l border-t-[#c5c5c5] border-l-[#c5c5c5] pl-12">
          <div className="h-4 my-4 text-gray-700">
            Número do pedido:&nbsp;
            <span className="font-bold">#{orderNumber}</span>
          </div>

          {deliveryFee > 0 && (
            <div className="h-4 my-4 text-gray-700">
              Subtotal:&nbsp;
              <span className="font-bold">R$&nbsp;{orderPrice.toFixed(2)}</span>
            </div>
          )}

          {deliveryFee > 0 && (
            <div className="h-4 my-4 text-gray-700">
              Taxa de Entrega:&nbsp;
              <span className="font-bold">
                R$&nbsp;{deliveryFee.toFixed(2)}
              </span>
            </div>
          )}

          <div className="h-4 my-4 text-gray-700">
            Valor Total:&nbsp;
            <span className="font-bold">
              R$&nbsp;
              {(deliveryFee + orderPrice).toFixed(2)}
            </span>
          </div>

          <div className="mt-6 w-full">
            <Link
              href={`/${restaurant!.slug}`}
              className="py-2 px-4 rounded-md shadow-md shadow-orange-600 text-md font-medium text-white bg-orange-600 
                            hover:bg-orange-700"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
