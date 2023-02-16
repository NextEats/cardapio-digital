import { api } from '@/src/server/api';
import {
    iAddresses,
    iCashBoxes,
    iCheckoutProduct,
    iClients,
    iOrders,
    iPaymentMethod,
} from '@/src/types/types';
import { iRestaurantWithFKData } from 'src/types/types';
import { iAddress } from './index';

export interface iHandleFinishOrder {
    restaurant: iRestaurantWithFKData | undefined;
    address: iAddress;
    cepState: string;
    products: iCheckoutProduct[] | null | undefined;
    paymentMethodSelected: iPaymentMethod['data'] | null;
}

export async function handleFinishOrder({
    restaurant,
    address,
    cepState,
    products,
    paymentMethodSelected,
}: iHandleFinishOrder) {
    const cashBoxesData: iCashBoxes = await api.get(
        'api/cash_boxes/' + restaurant!.id
    );

    const cashBoxOpened = cashBoxesData.data.find((cb) => cb.is_open === true);

    if (!cashBoxOpened) {
        alert('O restaurante não está recebendo pedidos no momento!');
        return;
    }

    const addressData: iAddresses = await api.post('api/addresses', {
        cep: cepState,
        number: address!.number,
        complement: '',
    });

    if (!addressData) {
        alert(
            'Desculpe, houve um erro com o seu pedido por favor tente novamente!'
        );
        return;
    }

    const clientData: iClients = await api.post('api/clients', {
        address_id: addressData.data[0]!.id,
        name: 'José',
        contact_id: 2,
    });

    if (!clientData) {
        alert(
            'Desculpe, houve um erro com o seu pedido por favor tente novamente!'
        );
        return;
    }

    const orderData: iOrders = await api.post('api/orders/' + restaurant!.id, {
        order_type_id: 1,
        cash_box_id: cashBoxOpened.id,
        client_id: clientData.data[0]!.id,
        order_status_id: 2,
        payment_method_id: paymentMethodSelected!.id,
    });

    const createOrdersProdducts = async () => {
        products!.forEach(async (p) => {
            const orderProductData = await api.post('api/orders_products/', {
                product_id: p.id,
                order_id: orderData.data[0]!.id,
                observation: p.observation,
            });
        });
    };

    await createOrdersProdducts();
}
