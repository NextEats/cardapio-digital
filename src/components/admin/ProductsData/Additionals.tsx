import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsFillPencilFill, BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { CreateCategory } from "./CreateCategory";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UpdateCategory } from "./UpdateCategory";
import Image from "next/image";
import { CategoriesModal } from "./CategoriesModal";
import { CreateAdditional } from "./CreateAdditional";
import { UpdateAdditional } from "./UpdateAdditional";

interface iAdditionalsModalProps {
}

export function Additionals({ }: iAdditionalsModalProps) {
    const { products, additionals, updateAdditionalState } = useContext(ProductContext)
    const [updateAdditional, setUpdateAdditional] = updateAdditionalState
    console.log(updateAdditional)

    if (!additionals) return null

    return (
        <div className={``}>
            {updateAdditional ? <UpdateAdditional /> : null}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                        {additionals.length} Adicionais
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[40%] left-[50%]  h-[500px] w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                            Adicionais
                            <div className="flex items-center gap-2">
                                <CategoriesModal categoryType="additional_category" />
                                <CreateAdditional />
                            </div>
                        </Dialog.Title>


                        <div className="flex flex-wrap gap-3">

                            {(additionals).map(additional => {
                                // const count = products.reduce((total, product) => {
                                //     return product.category_id === additional.id ? total + 1 : total;
                                // }, 0);
                                return (
                                    <div key={additional.id} className="w-[417px] h-[80px] rounded-sm bg-white shadow-sm flex gap-3 relative">
                                        <Image
                                            className="rounded-sm object-cover w-[80px] sm:h-full "
                                            src={additional.picture_url}
                                            alt=""
                                            width={200}
                                            height={200}
                                        />
                                        <div className="flex flex-col mt-2">
                                            <span className="w-[280px] truncate text-lg font-semibold"> {additional.name} </span>
                                            <span className=""> R$ {additional.price.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2, maximumFractionDigits: 2
                                            })} </span>
                                        </div>
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger className="absolute top-3 right-4" >
                                                <BsThreeDotsVertical size={18} className="text-gray-400" />
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content
                                                    className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                                    sideOffset={5}
                                                >
                                                    <DropdownMenu.Item
                                                        onClick={() => setUpdateAdditional(additional)}
                                                        className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] 
                                                            relative pl-[25px]"
                                                    >
                                                        <BsFillPencilFill size={16} />
                                                        <span className="text-base">Editar adicional</span>
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Arrow className="fill-white" />
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </div>
                                );
                            })}

                        </div>

                        <Dialog.Close
                            asChild
                            className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                        >
                            <FiX size={16} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}