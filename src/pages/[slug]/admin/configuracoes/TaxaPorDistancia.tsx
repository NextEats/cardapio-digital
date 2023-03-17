import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import { useContext, useEffect, useState } from 'react';

export default function TaxaPorDistancia() {
    const { restaurant } = useContext(AdminContext);

    const [deliveryFees, setDeliveryFees] = useState<any>([]);

    useEffect(() => {
        const fetchDeliveryFees = async () => {
            const { data: deliveryFees, error } = await supabase
                .from('delivery_fees')
                .select('*')
                .eq('restaurant_id', restaurant!.id);

            if (error) {
                console.error(error);
            } else {
                setDeliveryFees(deliveryFees);
            }
        };

        fetchDeliveryFees();
    }, [restaurant]);

    if (!restaurant) {
        return null;
    }

    const addDeliveryFee = async (
        startKm: number,
        endKm: number,
        fee: number
    ) => {
        try {
            const { data: newDeliveryFee, error } = await supabase
                .from('delivery_fees')
                .insert({
                    fee: fee,
                    start_km: startKm,
                    end_km: endKm,
                    restaurant_id: restaurant.id,
                })
                .select('*');

            newDeliveryFee
                ? setDeliveryFees([...deliveryFees, newDeliveryFee[0]])
                : null;
        } catch (err) {
            console.error(err);
        }
    };

    const deleteDeliveryFee = async (id: number) => {
        const { error } = await supabase
            .from('delivery_fees')
            .delete()
            .match({ id });
        if (error) console.error(error);
        else setDeliveryFees(deliveryFees.filter((fee: any) => fee.id !== id));
    };

    const handleAddDeliveryFee = () => {
        const startKm = parseInt(
            prompt('Digite a distância inicial da taxa de entrega (em km):') ||
                '0'
        );
        const endKm = parseInt(
            prompt('Digite a distância final da taxa de entrega (em km):') ||
                '0'
        );
        const fee = parseFloat(
            prompt('Digite o valor da taxa de entrega (em R$):') || '0'
        );
        if (startKm && endKm && fee) {
            addDeliveryFee(startKm, endKm, fee);
        }
    };

    const handleDeleteDeliveryFee = (id: number) => {
        if (
            window.confirm(
                'Tem certeza que deseja excluir essa taxa de entrega?'
            )
        ) {
            deleteDeliveryFee(id);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Taxas de entrega por distância
            </h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleAddDeliveryFee}
            >
                Adicionar nova taxa de entrega
            </button>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Distância</th>
                        <th className="px-4 py-2">Taxa de entrega</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryFees.map((deliveryFee: any) => (
                        <tr key={deliveryFee.id}>
                            <td className="border px-4 py-2">{`${deliveryFee.start_km} km - ${deliveryFee.end_km} km`}</td>
                            <td className="border px-4 py-2">{`R$ ${deliveryFee.fee.toFixed(
                                2
                            )}`}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                                    onClick={() =>
                                        deliveryFee.id
                                            ? handleDeleteDeliveryFee(
                                                  deliveryFee.id
                                              )
                                            : console.error('id não encontrado')
                                    }
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
