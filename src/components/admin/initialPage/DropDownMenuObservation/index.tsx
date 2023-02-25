import Additionals from '@/src/components/home/ProductModal/components/Additionals';
import ordersProduct from '@/src/pages/api/orders_products';
import { api } from '@/src/server/api';
import { iAdditional, iAdditionals, iInsertOrderProduct } from '@/src/types/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useMemo } from 'react';
import { AiFillEye } from 'react-icons/ai';

interface iDropdownMenuObservationProps {
    orderProduct: iInsertOrderProduct["data"]
    additionals: iAdditionals['data'];
}
interface iSelectData {
    id: number
    max_selected_options: number
    name: string
    options: {
        id: number
        is_default_value: boolean
        name: string
        picture_url: string
        select_id: number
        selected: boolean
    }[]


}

export function DropdownMenuObservation({ orderProduct, additionals }: iDropdownMenuObservationProps) {

    const orders = orderProduct.selects_data as {
        id: number
        max_selected_options: number
        name: string
        options: {
            id: number
            is_default_value: boolean
            name: string
            picture_url: string
            select_id: number
            selected: boolean
        }[]
    }[] | undefined | null
    const additionalsData = orderProduct.additionals_data as { quantity: number, additional_id: number }[]


    const additionalsDataFiltered = additionalsData.reduce((acc: { additional: iAdditional["data"], quantity: number }[], item) => {
        if (additionals.some(a => a.id === item.additional_id)) {
            return [...acc, { additional: additionals[additionals.findIndex(a => a.id === item.additional_id)], quantity: item.quantity }]
        }
        return [...acc]
    }, [])

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <AiFillEye className="text-2xl text-gray-400" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content data-state="top" className='rounded max-w-[350px] sm:max-w-[400px] bg-white p-2 shadow-md '>
                    {/* <DropdownMenu.Label className='mb-2 text-xl font-bold text-gray-400'> Observação </DropdownMenu.Label> */}

                    <p className='text-lg font-medium text-gray-700 ml-2'>
                        {orderProduct.observation ? orderProduct.observation : ''}
                    </p>

                    <div>
                        {
                            orderProduct.selects_data !== null ?
                                <>
                                    {orders!.map(s => {
                                        return <div key={s.id} className="mb-3">
                                            <h3 className='text-sm font-normal mb-1'>{s.name}</h3>

                                            <div className='grid grid-cols-3'>
                                                {
                                                    s.options.map(o => {
                                                        return <div key={o.id} className="relative">
                                                            <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                                                            <span className="absolute bottom-2 left-1 z-20 w-[70px] truncate text-white-300 text-xs font-normal">
                                                                {o.name}
                                                            </span>
                                                            <Image
                                                                src={o.picture_url}
                                                                className="rounded-md rounded-bl-md h-20 w-20 object-cover"
                                                                alt={o?.name}
                                                                width={80}
                                                                height={80}
                                                            />
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    })}
                                </> : null
                        }
                    </div>

                    <div>
                        <h2 className='text-base font-medium mb-2'>Adicionais</h2>
                        {
                            additionalsDataFiltered.map((additional) => {
                                return <div key={additional.additional.id} className="flex items-center justify-between pr-2 text-sm font-normal">
                                    <span> {additional.quantity} - {additional.additional.name} </span>
                                    <span className='text-green-500'> R$ {additional.additional.price * additional.quantity}</span>
                                </div>
                            })
                        }
                    </div>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Arrow className='fill-white' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}