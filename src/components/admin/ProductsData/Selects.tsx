
import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsFillPencilFill, BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { CreateCategory } from "./CreateCategory";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UpdateCategory } from "./UpdateCategory";
import Image from "next/image";
import { CreateAdditional } from "./CreateAdditional";
import { CreateSelect } from "./CreateSelect";

interface iSelectsProps {
}

export function Selects({ }: iSelectsProps) {
    const { selectsState, product_options_state } = useContext(ProductContext)

    const [selects, setSelects] = selectsState
    const [product_options, setProduct_options] = product_options_state

    if (!selects) return null
    return (
        <div className={``}>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                        {selects.length} Personalizações
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[40%] left-[50%]  h-[500px] w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                            Personalizações
                            <CreateSelect />
                        </Dialog.Title>

                        <div className="flex flex-col gap-3 w-full">
                            {selects.map(select => {
                                return (
                                    <div key={select.id} className="w-full flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="w-[160px] truncate"> {select.name} </span>
                                            <div className="flex item-center gap-2">
                                                <span> R$ 00,00 </span>
                                            </div>
                                        </div>
                                        <div className="flex mt-8 flex-wrap gap-2">
                                            {product_options?.map((product_option) => {
                                                if (product_option.select_id !== select.id) return
                                                return <div key={product_option.id} >
                                                    <label
                                                        className=""
                                                        htmlFor={select.name + product_option.id}
                                                    >
                                                        <div className={`w-[100px] h-[100px] rounded-lg relative cursor-pointer`} >
                                                            <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                                                            <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium">
                                                                {product_option.name}
                                                            </span>
                                                            {product_option.picture_url && (
                                                                <Image
                                                                    src={product_option.picture_url}
                                                                    alt={product_option.name}
                                                                    className={'w-full h-full relative rounded-lg object-cover'}
                                                                    width={326}
                                                                    height={358}
                                                                />
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            })}
                                            <button className="w-[100px] h-[100px] rounded-lg flex items-center justify-center border border-gray-300 cursor-pointer">
                                                <BsPlusLg size={32} />
                                            </button>
                                        </div>

                                        {/* <DropdownMenu.Root>
                                                <DropdownMenu.Trigger >
                                                    <BsThreeDotsVertical size={16} className="text-gray-400" />
                                                </DropdownMenu.Trigger>
                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.Content
                                                        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                                        sideOffset={5}
                                                    >
                                                        <DropdownMenu.Item
                                                            onClick={() => setUpdateCategoryState(category)}
                                                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] 
                                                            relative pl-[25px]"
                                                        >
                                                            <BsFillPencilFill size={16} />
                                                            <span className="text-base">Editar categoria</span>
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Arrow className="fill-white" />
                                                    </DropdownMenu.Content>
                                                </DropdownMenu.Portal>
                                            </DropdownMenu.Root> */}

                                    </div>
                                );
                            })}
                        </div>

                        <Dialog.Close
                            asChild
                            className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                        >
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    )
}