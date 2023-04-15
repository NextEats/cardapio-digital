import { iTablePayments } from '@/src/types/types';
import { FaRegTrashAlt } from 'react-icons/fa';

interface iPaymentsTableProps {
  table_payments: iTablePayments['data'];
}

export function PaymentsTable({ table_payments }: iPaymentsTableProps) {
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
                      dinheiro
                    </td>
                    <td>
                      <div className="flex items-center justify-between w-28">
                        <span>
                          R${' '}
                          {(30).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <FaRegTrashAlt className="text-red-orange cursor-pointer" />
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
