import { supabase } from '@/src/server/api';
import { iTablePaymentWithPaymentFKData } from '@/src/types/types';
import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

interface iPaymentsTableProps {
  tablePaymentsState: [
    iTablePaymentWithPaymentFKData[],
    Dispatch<SetStateAction<iTablePaymentWithPaymentFKData[]>>
  ];
}

export function PaymentsTable({ tablePaymentsState }: iPaymentsTableProps) {
  const [table_payments, set_table_payments] = tablePaymentsState;

  const handleDeleteTablePayments = async (id: number) => {
    const data = await supabase.from('table_payments').delete().eq('id', id);
    set_table_payments(state => {
      state.splice(
        state.findIndex(tp => tp.id === id),
        1
      );
      return [...state];
    });
  };

  return (
    <div className="flex flex-1">
      <table className="w-full">
        <tbody>
          {!table_payments || table_payments.length === 0 ? (
            <tr className="first:border-t-0 border-t border-t-white-blue">
              <td className="w-full text-lg font-semibold pr-3">
                Nenhum pagamento{' '}
              </td>
              <td>
                <div className="flex items-center justify-between w-28">
                  <span> R$ 0,00</span>
                </div>
              </td>
            </tr>
          ) : null}
          {table_payments
            ? table_payments.map(table_payment => {
                return (
                  <tr
                    key={table_payment.id}
                    className="first:border-t-0 border-t border-t-white-blue"
                  >
                    <td className="w-full text-lg font-semibold pr-3">
                      {table_payment.payment_methods.name}
                    </td>
                    <td>
                      <div className="flex items-center justify-between w-28">
                        <span>
                          R${' '}
                          {table_payment.value.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <FaRegTrashAlt
                          onClick={() =>
                            handleDeleteTablePayments(table_payment.id)
                          }
                          className="text-red-orange cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
