import { TableContext } from "@/src/contexts/TableControlContext";
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from "react";
import { BsGear } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import CustomerAtTheTable from "./CustomerAtTheTable";
import ProductTableModal from "./ProductTableModal";
interface iTableModalProps {
    // setIsOpenedTableModal?: Dispatch<SetStateAction<boolean>>;
    // isOpenedTableModal?: boolean;
    // table: iTable["data"]
}

export default function TableModal({ }: iTableModalProps) {

    const { createNewtable } = useContext(TableContext)
    const [cheirAmount, setCheirAmount] = useState('')
    const { tables, openedTableModal, setOpenedTableModal } = useContext(TableContext)

    return (
        <>
            <ProductTableModal />
            <Dialog.Root open={openedTableModal !== null}>
                <Dialog.Trigger>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setOpenedTableModal(null)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[600px] lg:w-[900px] h-[] bg-white shadow-md p-6" >
                        <Dialog.Title className="flex items-center justify-between text-base w-full text-center font-semibold mb-6 mt-3">
                            <div className="flex items-center justify-start gap-3">
                                <FaHome className="text-gray-350" size={32} /> <span className="text-lg font-bold "> Mesa {openedTableModal?.id} </span>
                            </div>
                            <BsGear size={24} className="cursor-pointer" />
                        </Dialog.Title>
                        <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 ">
                            <CustomerAtTheTable />
                        </div>
                        <Dialog.Close className="fixed top-3 right-3 text-gray-600" onClick={() => setOpenedTableModal(null)}>
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}