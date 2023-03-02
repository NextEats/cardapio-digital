import { TableContext } from "@/src/contexts/TableControlContext";
import { iTable } from "@/src/types/types";
import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import InputWithLabel from "../../InputWithLabel";
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton";
import Table from "./Table";

interface iCreateTableModalProps {

}

export default function CreateTableModal({ }: iCreateTableModalProps) {

    const { createNewtable, setIsOpenedCreateTableModal, isOpenedCreateTableModal } = useContext(TableContext)
    const [tableName, setTableName] = useState('')
    const [cheirAmount, setCheirAmount] = useState('4')

    async function handleCreateTable() {
        await createNewtable(cheirAmount, tableName)
    }

    return (
        <>
            <Dialog.Root open={isOpenedCreateTableModal}>
                <Dialog.Trigger>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setIsOpenedCreateTableModal(false)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6" >
                        <Dialog.Title className="text-base w-full text-center font-semibold mb-6">
                            Criar nova mesa
                        </Dialog.Title>

                        <form className="w-full flex flex-col gap-6" onSubmit={(e) => {
                            e.preventDefault()
                            handleCreateTable()
                        }}>
                            <InputWithLabel label="Nome da mesa" type="text" placeholder="Ex.: Mesa 12" setState={setTableName} />
                            <InputWithLabel defaultValue={4} label="Quandidade de lugares" type="number" placeholder="ex.: 4" setState={setCheirAmount} />
                            <div className="flex flex-1 items-center justify-end">
                                <CardapioDigitalButton h="h-9" w="w-32" />
                            </div>
                        </form>

                        <Dialog.Close className="fixed top-3 right-3 text-gray-600" onClick={() => setIsOpenedCreateTableModal(false)}>
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Root>
        </>
    )
}