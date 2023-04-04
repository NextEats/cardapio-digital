import { api } from '@/src/server/api';
import { iCashBox, iCashBoxes, iOrdersWithFKData } from '@/src/types/types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';
import CashClosingReportModal from '../CashClosingReportModal';

interface iCashBoxButtons {
    cashBoxes: iCashBoxes['data'];
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    restaurantId: number;
    cashBoxState: iCashBox['data'] | undefined;
    billing: number;
}

export default function CashBoxButtons({
    cashBoxes,
    ordersGroupedByOrderStatus,
    restaurantId,
    cashBoxState,
    billing,
}: iCashBoxButtons) {
    const [openCashBoxState, setOpenCashBoxState] = useState(false);
    const [openCashBoxClosingReportModal, setOpenCashBoxClosingReportModal] =
        useState(false);

    async function handleOpenCashBox() {
        const cashBox = await api.post('api/cash_boxes/open', {
            restaurant_id: restaurantId,
        });
        setOpenCashBoxState(true);
    }

    async function openCashBoxReportToCloseCashBox() {
        if (
            ordersGroupedByOrderStatus['em análise'] ||
            ordersGroupedByOrderStatus['a caminho']
        ) {
            toast.error(
                'Para fechar o caixa, todos os pedidos precisam ser entregues.',
                {
                    theme: 'light',
                }
            );
            return;
        }
        setOpenCashBoxClosingReportModal(true);
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
                onClick={() => openCashBoxReportToCloseCashBox()}
            />

            <CashClosingReportModal
                cashBoxState={cashBoxState}
                ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                restaurantId={restaurantId}
                openCashBoxClosingReportModal={openCashBoxClosingReportModal}
                setOpenCashBoxClosingReportModal={
                    setOpenCashBoxClosingReportModal
                }
                billing={billing}
            />
        </div>
    );
}
