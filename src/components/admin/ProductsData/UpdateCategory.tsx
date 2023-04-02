import { ProductContext } from "@/src/contexts/ProductContext"
import { FormEvent, useContext, useEffect } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsFillPencilFill, BsPlusLg } from "react-icons/bs";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { api, supabase } from "@/src/server/api";
interface iUpdateCategoryProps {
    categoryType: "product_category" | "additional_category"
}

const updateCategoryValidationSchema = zod.object({
    name: zod.string(),
    order: zod.number(),
})


type updateCategory = zod.infer<typeof updateCategoryValidationSchema>
const updateCategoryDefaultValue: updateCategory = {
    name: '',
    order: 0,
};

export function UpdateCategory({ categoryType }: iUpdateCategoryProps) {
    const { updateCategoryState, setUpdateCategoryState } = useContext(ProductContext)

    const { register, getValues, setValue, reset } = useForm<updateCategory>({
        resolver: zodResolver(updateCategoryValidationSchema),
        defaultValues: updateCategoryDefaultValue
    })

    useEffect(() => {
        setValue("name", updateCategoryState?.name!)
        setValue("order", updateCategoryState?.category_order!)
    }, [updateCategoryState, setValue])

    const handleUpdateCategory = async (e: FormEvent) => {
        e.preventDefault()
        const name = getValues("name")
        const order = getValues("order")
        if (categoryType === "additional_category") {

            const category = await supabase.from("product_categories").update({
                name,
                category_order: order,
            }).eq("id", updateCategoryState?.id).select("*")
        }
        if (categoryType === "additional_category") {
            const category = await supabase.from("additional_categories").update({
                name,
                category_order: order,
            }).eq("id", updateCategoryState?.id).select("*")
        }
        reset()
    }

    return (

        <Dialog.Root open={updateCategoryState !== null}>
            <Dialog.Trigger />
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => {
                        setUpdateCategoryState(null)
                        reset()
                    }}
                    className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[40%] left-[50%] h-[500px] w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
                        Editar categoria
                    </Dialog.Title>

                    <form className="flex flex-wrap gap-3">
                        <label htmlFor=""> Nome </label>
                        <input type="text" {...register("name")} />
                        <label htmlFor=""> Ordem </label>
                        <input type="number" {...register("order")} />
                        <button type="submit"
                            onClick={(e) => handleUpdateCategory(e)}>
                            Salvar
                        </button>
                    </form>

                    <Dialog.Close
                        onClick={() => {
                            setUpdateCategoryState(null)
                            reset()
                        }}
                        asChild
                        className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                        <FiX />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}