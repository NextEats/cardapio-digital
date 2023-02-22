import { TableContext } from "@/src/contexts/TableControlContext";
import { iTable } from "@/src/types/types";
import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import InputWithLabel from "../../InputWithLabel";
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton";
import Table from "./Table";

interface iCreateTableModalProps {
    setIsOpenedCreateTableModal: Dispatch<SetStateAction<boolean>>;
    isOpenedCreateTableModal: boolean;
}

export default function CreateTableModal({ isOpenedCreateTableModal, setIsOpenedCreateTableModal }: iCreateTableModalProps) {

    const { createNewtable } = useContext(TableContext)
    const [cheirAmount, setCheirAmount] = useState('')

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <CardapioDigitalButton name="Nova Mesa" h="h-9" w="w-36" onClick={() => setIsOpenedCreateTableModal(true)} />
                </Dialog.Trigger>
                {isOpenedCreateTableModal ?
                    <Dialog.Portal>
                        <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                        <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6" >
                            <Dialog.Title className="text-base w-full text-center font-semibold mb-6">
                                Criar nova mesa
                            </Dialog.Title>

                            <form className="w-full flex flex-col gap-6" onSubmit={() => createNewtable(cheirAmount)}>
                                <InputWithLabel label="Quandidade de lugares" type="number" placeholder="ex.: 4" setState={setCheirAmount} />
                                <div className="flex flex-1 items-center justify-end">
                                    <CardapioDigitalButton h="h-9" w="w-32" />
                                </div>
                            </form>

                            <Dialog.Close className="fixed top-3 right-3 text-gray-600">
                                <FiX size={22} />
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                    : null}
            </Dialog.Root>
        </>
    )
}