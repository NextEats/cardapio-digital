import { TableContext } from '@/src/contexts/TableControlContext';
import { useContext } from 'react';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import CreateTableModal from './CreateTableModal';
import InactiveTablesModal from './InactiveTables';
import Table from './Table';
import TableModal from './TableModal';

export default function Tables() {
    const {
        tables,
        setOpenedTableModal,
        openedTableModal,
        setIsOpenedCreateTableModal,
    } = useContext(TableContext);

    return (
        <div>
            {openedTableModal ? <TableModal /> : null}
            <div className="flex flex-1 items-center justify-between mb-4">
                <CreateTableModal />
                <CardapioDigitalButton
                    name="Nova Mesa"
                    h="h-9"
                    w="w-36"
                    onClick={() => setIsOpenedCreateTableModal(true)}
                />
            </div>
            <span className='flex flex-1 items-center justify-end m-2'>
                {<InactiveTablesModal />}
            </span>
            <div className="flex flex-col  sm:grid sm:grid-cols-2 xl:grid-cols-3 1280px gap-5">
                {tables.map((t, index) => {
                    if (t.is_active) return
                    return (
                        <button
                            key={index}
                            onClick={() => setOpenedTableModal(t)}
                        >
                            <Table table={t} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
