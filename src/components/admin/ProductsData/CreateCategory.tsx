import { ProductContext } from "@/src/contexts/ProductContext"
import { FormEvent, useContext } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { api, supabase } from "@/src/server/api";
interface iCreateCategoryProps {
    categoryType: "product_category" | "additional_category"
}

const newCategoryValidationSchema = zod.object({
    name: zod.string(),
    order: zod.number(),
})


type newCategory = zod.infer<typeof newCategoryValidationSchema>
const newCategoryDefaultValue: newCategory = {
    name: '',
    order: 0,
};

export function CreateCategory({ categoryType }: iCreateCategoryProps) {
    const { restaurant } = useContext(ProductContext)

    const { register, getValues } = useForm<newCategory>({
        resolver: zodResolver(newCategoryValidationSchema),
        defaultValues: newCategoryDefaultValue
    })

    const handleCreateCategory = async (e: FormEvent) => {
        e.preventDefault()
        const name = getValues("name")
        const order = getValues("order")
        if (categoryType === "product_category") {
            const category = await supabase.from("product_categories").insert({
                name,
                category_order: order,
                restaurant_id: restaurant.id,
            }).select("*")
        }
        if (categoryType === "additional_category") {
            console.log
            const category = await supabase.from("additional_categories").insert({
                name,
                category_order: order,
                restaurant_id: restaurant.id,
            }).select("*")
        }
    }

    return (

        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="px-6 py-2 rounded-full bg-blue-400 ">
                    <BsPlusLg size={16} className="text-white" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[40%] left-[50%]  h-[500px] w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                        Criar categoria
                    </Dialog.Title>

                    <form className="flex flex-wrap gap-3">
                        <label htmlFor=""> Nome </label>
                        <input type="text" {...register("name")} />
                        <label htmlFor=""> Ordem </label>
                        <input type="number" {...register("order")} />
                        <button type="submit"
                            onClick={(e) => handleCreateCategory(e)}>
                            save
                        </button>
                    </form>

                    <Dialog.Close asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                        <FiX />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}