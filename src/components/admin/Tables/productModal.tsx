import { TableContext } from '@/src/contexts/TableControlContext';
import { selectOptionAction } from '@/src/reducers/tableReducer/action';
import { iProductOption, iProducts, iSelect } from '@/src/types/types';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { FiTrash2, FiX } from 'react-icons/fi';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import TableAdditionals from './TableAdditionals';

interface iProductModalProps {

}

export default function ProductModal({ }: iProductModalProps) {

    const { viewProduct, setViewProduct, selects, productOptions, additionals, tableState, tableDispatch } = useContext(TableContext)

    function handleSelectOption(option: iProductOption["data"], select: iSelect["data"]) {
        if (tableState.optionsSelected.some(o => o.id !== option.id)) {
            if (tableState.optionsSelected.length >= select.max_selected_options) {
                alert("Selecione no máximo duas opções")
                return
            }
            tableDispatch(selectOptionAction(option, select))
            return
        }
        tableDispatch(selectOptionAction(option, select))
    }

    return (
        <div>
            <Dialog.Root open={viewProduct !== null} >
                <Dialog.Trigger>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setViewProduct(null)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content className="fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] lg:w-[900px] max-h-[68vh] bg-white shadow-md p-6" >
                        <Dialog.Title className="text-base w-full flex items-center text-center font-semibold mb-3">
                            {/* <input type='text' onChange={handleFilter} placeholder="pesquisar" className='mb-3 w-[50%]' /> */}
                        </Dialog.Title>
                        <div className=' max-h-[452px] overflow-auto mb-3 scrollbar-custom pr-2 py-2'>

                            <div className="grid grid-cols-2 gap-10">
                                <div className='flex flex-col gap-3'>
                                    <Image
                                        className="rounded-md w-full" alt="" width={200} height={200}
                                        src={viewProduct?.picture_url!}
                                    />
                                    <h2 className='' > {viewProduct?.name} </h2>
                                    <p> {viewProduct?.description} </p>
                                    <span className=''> R$ {viewProduct?.price} </span>

                                </div>

                                <div className='flex flex-col gap-3 '>
                                    {selects!.map(select => {
                                        return <div key={select.id} className="mb-3">
                                            <span> {select.name} </span>

                                            <div className='grid grid-cols-4 gap-2'>
                                                {productOptions.map(option => {
                                                    if (option.select_id !== select.id) return
                                                    const selectedStyles = tableState.optionsSelected.some(o => o.id === option.id) ? 'bg-red-400' : ''
                                                    return <div key={option.id} className='relative' onClick={() => handleSelectOption(option, select)}>
                                                        <Image
                                                            className="rounded-md h-full" alt="" width={200} height={200}
                                                            src={option.picture_url}
                                                        />
                                                        <div className={`absolute inset-0 w-full h-full ${selectedStyles}`}></div>
                                                        <div className="w-full h-full absolute inset-0 rounded-md z-10 bg-gradient-to-t from-[#000000ff] via-[#00000010] to-[#00000000]"></div>
                                                        <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium ">
                                                            {option.name}
                                                        </span>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    })}

                                    <h2> Adicionais </h2>

                                    <TableAdditionals />

                                </div>


                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end gap-3">
                            <CardapioDigitalButton name="Cancelar" h="h-9" w="w-44" onClick={() => setViewProduct(null)} />
                            <CardapioDigitalButton name="Confirmar" h="h-9" w="w-44" />
                        </div>
                        <Dialog.Close className="fixed top-3 right-3 text-gray-600" onClick={() => setViewProduct(null)}>
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}