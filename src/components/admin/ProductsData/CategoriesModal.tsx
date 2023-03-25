import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { CategoryModal } from "./CategoryModal";

interface iCategoriesModalProps {
}

export function CategoriesModal({ }: iCategoriesModalProps) {
    const { products, categories } = useContext(ProductContext)
    // const procutsAmountByCategory = products.reduce((acc, item) => {
    //     if (item.category_id === category.id) return acc + 1;
    //     return acc;
    // }, 0);

    return (
        <div className={``}>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                        {categories.length} Categorias
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[40%] left-[50%]  h-[500px] w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                            Categorias
                            <CategoryModal />
                        </Dialog.Title>

                        <div className="flex flex-wrap gap-3">
                            {categories.map(category => {
                                const count = products.reduce((total, product) => {
                                    return product.category_id === category.id ? total + 1 : total;
                                }, 0);
                                return (
                                    <div key={category.id} className="w-[200px] h-[70px] p-2 rounded-sm bg-white shadow-sm">
                                        <div className="flex justify-between ">
                                            <span className="w-[160px] truncate"> {category.category_order}° - {category.name} </span>
                                            <BsThreeDotsVertical size={16} className="text-gray-400" />
                                        </div>
                                        <span>  {count} </span>
                                    </div>
                                );
                            })}

                        </div>

                        <Dialog.Close asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}