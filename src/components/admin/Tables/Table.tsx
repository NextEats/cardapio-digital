import { TableContext } from '@/src/contexts/TableControlContext';
import { iTable } from '@/src/types/types';
import { useContext } from 'react';
import { BsPeople } from 'react-icons/bs';
import { GiTable } from 'react-icons/gi';

interface iTableProps {
    table: iTable['data'];
}

export default function Table({ table }: iTableProps) {
    const { ordersTables } = useContext(TableContext);
    if (!table) return <></>;

    const thisTable = ordersTables.filter(
        (elem, index) => elem.tables.id === table.id
    );

    const tableStatusColor = ` ${table.is_occupied
            ? 'text-blue-400'
            : table.is_active
                ? 'text-red-400'
                : 'text-gray-400'
        }`;
    const tableBorderStatusColor = ` ${table.is_occupied
            ? 'border-blue-400'
            : table.is_active
                ? 'border-red-400'
                : 'border-gray-400'
        }`;

    return (
        <div
            className={`flex flex-1 flex-col border-l-8 rounded-md bg-white shadow-md py-2 pr-3 pl-4 ${tableBorderStatusColor} `}
        >
            <div className="flex flex-1 items-center justify-end ">
                <span className="text-sm font-medium flex items-center text-gray-500">
                    {' '}
                    <span className="mr-2"> {table.chair_ammount} </span>{' '}
                    <BsPeople size={16} />{' '}
                </span>
            </div>
            <div className="flex flex-1 gap-3 mb-4">
                <GiTable className="text-gray-350" size={32} />
                <div className="flex flex-col gap-4">
                    <span className="text-lg font-bold text-start">
                        {table.name}
                    </span>
                    {/* <span className="text-sm font-medium ">
                        {' '}
                        Aguadando cliente{' '}
                    </span> */}
                </div>
            </div>
            <span
                className={
                    `w-full  text-xs font-normal text-right` + tableStatusColor
                }
            >
                {!table
                    ? ''
                    : table.is_occupied
                        ? 'Ocupada'
                        : table.is_reserved
                            ? 'Reservada' :
                            table.is_active ? 'Inativa'
                                : 'Livre'}
            </span>
        </div>
    );
}
