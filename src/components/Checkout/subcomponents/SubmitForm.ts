import { supabase, whatsappRestApi } from '@/src/server/api';
import {
    iAddress,
    iCashBox,
    iClient,
    iContact,
    iOrder,
} from '@/src/types/types';

export async function SubmitForm({
    cep,
    name,
    number,
    whatsapp,
    products,
    restaurant,
    payment_method,
}: any) {
    try {
        const { data: addressData } = await supabase
            .from('addresses')
            .insert({
                cep,
                number: Number(number),
            })
            .select('*');

        const address = addressData![0] as unknown as iAddress['data'];

        const { data: contactData } = await supabase
            .from('contacts')
            .insert({ phone: Number(whatsapp) })
            .select('*');

        const contact = contactData![0] as unknown as iContact['data'];

        const { data: clientData } = await supabase
            .from('clients')
            .insert({
                name,
                address_id: address.id,
                contact_id: contact.id,
            })
            .select('*');

        const client = clientData![0] as unknown as iClient['data'];

        const { data: currentCashBoxData } = await supabase
            .from('cash_boxes')
            .select('*')
            .match({ restaurant_id: restaurant!.id, is_open: true });

        const currentCashBox =
            currentCashBoxData![0] as unknown as iCashBox['data'];

        const { data: orderData } = await supabase
            .from('orders')
            .insert({
                restaurant_id: restaurant!.id,
                client_id: client.id,
                order_type_id: 1,
                cash_box_id: currentCashBox.id,
                order_status_id: 2,
                payment_method_id: payment_method,
            })
            .select('*');

        const order = orderData![0] as unknown as iOrder['data'];

        products.state.forEach(async (product: any) => {
            const { data: ordersProductsData } = await supabase
                .from('orders_products')
                .insert({
                    order_id: order.id,
                    product_id: product.id,
                    selects_data: product.selects,
                    observation: product.observation,
                    additionals_data: product.additionals,
                })
                .select('*');
        });
        try {
            await whatsappRestApi({
                method: 'post',
                url: '/send-message',
                data: {
                    id: restaurant!.slug,
                    number: '55' + whatsapp,
                    message:
                        'O seu pedido foi recebido com sucesso pelo restaurante ' +
                        restaurant!.name,
                },
            });
        } catch (err) {
            console.error(err);
        }
    } catch (error) {
        console.error(error);
    }
}
