import { TableContext } from '@/src/contexts/TableControlContext';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { FiX } from 'react-icons/fi';

interface iProductTableModalProps {

}

export default function ProductTableModal({ }: iProductTableModalProps) {

    const { isOpenedProductTableModal, setIsOpenedProductTableModal } = useContext(TableContext)

    return (
        <div>
            <Dialog.Root open={isOpenedProductTableModal} >
                <Dialog.Trigger>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setIsOpenedProductTableModal(false)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[600px] lg:w-[900px] h-[] bg-white shadow-md p-6" >
                        <Dialog.Title className="text-base w-full text-center font-semibold mb-6">

                        </Dialog.Title>
                        <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 ">
                            <div className="flex items-center gap-3 mb-7">
                                <div className='flex items-center justify-center px-6 border border-black cursor-pointer rounded-full text-lg font-semibold '>
                                    <span> Bebidas </span>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <Dialog.Close className="fixed top-3 right-3 text-gray-600" onClick={() => setIsOpenedProductTableModal(false)}>
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}