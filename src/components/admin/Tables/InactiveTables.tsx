import { TableContext } from '@/src/contexts/TableControlContext';
import { useContext } from 'react';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import CreateTableModal from './CreateTableModal';
import Table from './Table';
import TableModal from './TableModal';
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from 'react-icons/fi';

export default function InactiveTablesModal() {
    const {
        tables,
        setOpenedTableModal,
        openedTableModal,
        isOpenedInactiveTablesModalState,
    } = useContext(TableContext);

    return (
        <div>
            <Dialog.Root open={isOpenedInactiveTablesModalState.state}>
                <Dialog.Trigger onClick={() => isOpenedInactiveTablesModalState.set(true)}>
                    <span className='text-lg font-semibold text-gray-500'> Mesas inativas</span>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay
                        onClick={() => isOpenedInactiveTablesModalState.set(false)}
                        className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out"
                    />
                    <Dialog.Content className="fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] md:w-[750px] lg:w-[900px] max-h-[68vh] bg-white shadow-md p-6">
                        <Dialog.Title className="text-base w-full flex items-center text-center font-semibold mb-3">
                            Mesas Inativas
                        </Dialog.Title>

                        {openedTableModal ? <TableModal /> : null}

                        <div className='h-96 overflow-auto scrollbar-custom p-2'>

                            <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
                                {tables.map((t, index) => {
                                    if (!t.is_active) return
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

                        <Dialog.Close
                            className="fixed top-3 right-3 text-gray-600"
                            onClick={() => isOpenedInactiveTablesModalState.set(false)}
                        >
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}