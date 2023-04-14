import { FaRegTrashAlt } from 'react-icons/fa';

interface iPaymentsTableProps {}

export function PaymentsTable({}: iPaymentsTableProps) {
  return (
    <div className="flex flex-1">
      <table className="w-full">
        <tbody>
          <tr className="first:border-t-0 border-t border-t-white-blue">
            <td className="w-full text-lg font-semibold pr-3">dinheiro</td>
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
        </tbody>
      </table>
    </div>
  );
}
