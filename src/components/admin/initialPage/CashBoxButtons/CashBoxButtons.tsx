import { api } from '@/src/server/api';
import { iCashBox, iCashBoxes, iOrdersWithFKData } from '@/src/types/types';
import { useState } from 'react';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';

interface iCashBoxButtons {
    cashBoxes: iCashBoxes['data'];
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    restaurantId: number;
    cashBoxState: iCashBox['data'] | undefined;
}

export default function CashBoxButtons({
    cashBoxes,
    ordersGroupedByOrderStatus,
    restaurantId,
    cashBoxState,
}: iCashBoxButtons) {
    const [openCashBoxState, setOpenCashBoxState] = useState(false);

    async function handleOpenCashBox() {
        const cashBox = await api.post('api/cash_boxes/open', {
            restaurant_id: restaurantId,
        });
        setOpenCashBoxState(true);
    }

    async function handleCloseCashBox() {
        if (
            ordersGroupedByOrderStatus['em análise'] ||
            ordersGroupedByOrderStatus['em produção'] ||
            ordersGroupedByOrderStatus['a caminho']
        ) {
            alert(
                'Para fechar o caixa, todos os pedidos precisam ser entregues.'
            );
            return;
        }
        const cashBox = await api.post('api/cash_boxes/close', {
            restaurant_id: restaurantId,
        });
        setOpenCashBoxState(false);
    }

    return (
        <div className="flex items-center gap-3">
            <CardapioDigitalButton
                name="Abrir caixa"
                h="h-10"
                w="w-40"
                disabled={cashBoxState !== undefined}
                onClick={() => handleOpenCashBox()}
            />
            <CardapioDigitalButton
                name="Fechar caixa"
                h="h-10"
                w="w-40"
                disabled={cashBoxState === undefined}
                onClick={() => handleCloseCashBox()}
            />
        </div>
    );
}
