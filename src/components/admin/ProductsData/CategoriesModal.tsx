import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsFillPencilFill, BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { CreateCategory } from "./CreateCategory";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UpdateCategory } from "./UpdateCategory";

interface iCategoriesModalProps {
    categoryType: "product_category" | "additional_category"
}

export function CategoriesModal({ categoryType }: iCategoriesModalProps) {
    const { products, categories, setUpdateCategoryState, additional_categories } = useContext(ProductContext)

    // const procutsAmountByCategory = products.reduce((acc, item) => {
    //     if (item.category_id === category.id) return acc + 1;
    //     return acc;
    // }, 0);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className=" px-[15px] font-medium leading-none outline-none text-blue-400">
                    {categoryType === "product_category" ? categories.length : additional_categories.length} Categorias
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-0 right-0 3xs:top-[40%] 3xs:left-[50%] h-screen 3xs:h-[500px] w-screen 
                    3xs:w-[500px] 2md:w-[900px] 3xs:translate-x-[-50%] 3xs:translate-y-[-50%] 3xs:rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                        Categorias
                        <CreateCategory categoryType={categoryType} />
                    </Dialog.Title>
                    <UpdateCategory categoryType={categoryType} />

                    <div className="flex flex-wrap 2md:justify-start justify-center gap-3">
                        {(categoryType === "product_category" ? categories : additional_categories).map(category => {
                            const count = products.reduce((total, product) => {
                                return product.category_id === category.id ? total + 1 : total;
                            }, 0);
                            return (
                                <div key={category.id} className="w-full 3xs:w-[200px] h-[70px] p-2 rounded-sm bg-white shadow-sm">
                                    <div className="flex justify-between ">
                                        <span className=" w-full mr-11 3xs:w-[160px] truncate"> {category.category_order}° - {category.name} </span>

                                        <DropdownMenu.Root>
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
                                        </DropdownMenu.Root>


                                    </div>
                                    <span>  {count} </span>
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
    )
}