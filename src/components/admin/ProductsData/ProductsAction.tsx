import { BsFillPencilFill, BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import * as Separator from '@radix-ui/react-separator';
import { ChangeEvent, useContext, useState } from "react";
import { ProductContext } from "@/src/contexts/ProductContext";
import { ChangeProductsPrice } from "./ChangeProductsPrice";
import { CategoriesModal } from "./CategoriesModal";
import { Additionals } from "./Additionals";
import { Selects } from "./Selects";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { supabase } from "@/src/server/api";
import { BiTrash } from "react-icons/bi";

interface iProductsActionProps {
}

export function ProductsAction({ }: iProductsActionProps) {

    const [isChangingProductPrice, setIsChangingProductPrice] = useState(false)
    const styleD = 'text-blue-400 cursor-pointer'

    const { productSelected, setProductSelected, setProducts, categories, setFilter, filter, additionals, isCreatingProductState } = useContext(ProductContext)
    const [isCreatingProduct, setIsCreatingProduct] = isCreatingProductState

    function handleFilter(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        setFilter({
            name,
            category: null,
        });
    }

    function handleFilterByCategory(categoryId: number) {
        setFilter({
            name: null,
            category: categoryId,
        });
    }
    const handleDeleteProducts = async () => {
        productSelected.forEach(async product => {
            await Promise.all([
                supabase.from("product_additionals").delete().eq("product_id", product.id),
                supabase.from("product_selects").delete().eq("product_id", product.id),
            ])
            await supabase.from("products").update({
                is_deleted: true
            }).eq("id", product.id);
            setProducts(state => {
                state.splice(state.findIndex(p => p.id === product.id), 1);
                return [...state]
            })
        })
    }

    return (
        <div className={''}>
            <div className="flex items-center justify-between mb-3">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleFilter}
                    className="w-52 lg:w-80 placeholder:text-gray-400 font-medium text-xs px-3 py-[6px] shadow-sm focus:border-2 focus:border-blue-400 outline-none rounded-full" />

                <div className="flex items-center gap-3">

                    {productSelected.length === 0 ?
                        <div className="flex items-center">
                            <span className={`` + styleD}>
                                <CategoriesModal categoryType="product_category" />
                            </span>
                            <Separator.Root
                                className="bg-red-700 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 mx-2"
                                decorative
                                orientation="vertical"
                            />
                            <span className={`` + styleD}>
                                <Additionals type="list" />
                            </span>
                            <Separator.Root
                                className="bg-red-700 data-[orientation=vertical]:h-full w-2 mx-2"
                                decorative={true}
                                orientation="vertical"
                            />
                            <span className={`` + styleD}>
                                <Selects type="list" />
                            </span>
                        </div>
                        : <div className="flex mr-3 ">
                            {isChangingProductPrice ?
                                <ChangeProductsPrice isChangingProductPrice={isChangingProductPrice} setIsChangingProductPrice={setIsChangingProductPrice} />
                                : null}
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger  >
                                    <button className="bg-white flex items-center gap-4 pl-8 pr-2 py-1 rounded-full text-blue-400 shadow-blue-md">
                                        <span className="leading-none font-semibold"> Ações </span>  <RiArrowDownSLine className="" size={24} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        className="min-w-[220px] bg-white rounded-md p-[5px] z-30 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        sideOffset={5}
                                    >
                                        <DropdownMenu.Item
                                            onClick={() => setIsChangingProductPrice(true)}
                                            className="group hover:text-blue-400 text-[13px] leading-none text-violet11 items-center rounded-[3px] flex pl-5 gap-3 hover:bg-white-blue cursor-pointer h-9 pr-[5px] relative"
                                        >
                                            <BsFillPencilFill size={16} className="" />
                                            <span className="text-base">Alterar Preço</span>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item
                                            onClick={() => handleDeleteProducts()}
                                            className="group hover:text-blue-400 text-[13px] leading-none text-violet11 items-center rounded-[3px] flex pl-5 gap-3 hover:bg-white-blue cursor-pointer h-9 pr-[5px] relative"
                                        >
                                            <BiTrash size={20} className="" />
                                            <span className="text-base"> Excluir </span>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Arrow className="fill-white" />
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>

                            {/* <select name="" id="" className="h-8 px-4 border border-blue-400 rounded-full">
                            <option value="" className="cursor-pointer">
                            selecione
                            </option>
                            <option
                            value=""
                            className="cursor-pointer"
                                onClick={() => { }}
                                >
                                <AiOutlineDollarCircle />
                            </option>
                        </select> */}
                        </div>
                    }



                    <button onClick={() => setIsCreatingProduct(true)} className="bg-blue-400 px-8 py-2 rounded-full">
                        < BsPlusLg size={16} className="text-white" />
                    </button>
                </div>
            </div>
            <div className="w-full overflow-x-auto flex items-center gap-2">
                <div
                    onClick={() => handleFilterByCategory(0)}
                    className={`flex items-center justify-center px-6 border border-black cursor-pointer rounded-full font-semibold 
                    ${filter.category === 0 ? 'border-blue-400 text-blue-400' : 'border-black'}`}
                >
                    <span className="text-base mb-[3px]"> Todos </span>
                </div>
                {categories.map(category => {
                    return <div
                        key={category.id}
                        onClick={() => handleFilterByCategory(category.id)}
                        className={`flex items-center justify-center px-6 border  cursor-pointer rounded-full font-semibold 
                        ${filter.category === category.id ? 'border-blue-400 text-blue-400' : 'border-black'}`}
                    >
                        <span className="text-base mb-[3px] " > {category.name}</span>
                    </div>
                })}
            </div>
        </div>
    )
}