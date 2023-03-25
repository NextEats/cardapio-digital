import { BsPlusLg } from "react-icons/bs";
import * as Separator from '@radix-ui/react-separator';
import { ChangeEvent, useContext } from "react";
import { ProductContext } from "@/src/contexts/ProductContext";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { ChangeProductsPrice } from "./ChangeProductsPrice";
import * as Menubar from '@radix-ui/react-menubar';
import { CategoriesModal } from "./CategoriesModal";

interface iProductsActionProps {
}

export function ProductsAction({ }: iProductsActionProps) {

    const styleD = 'text-blue-400 cursor-pointer'

    const { productSelected, setProductSelected, categories, setFilter, filter } = useContext(ProductContext)



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
        // setCategoryId(categoryId);
    }

    return (
        <div className={''}>
            <div className="flex items-center mb-3">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleFilter}
                    className="w-52 lg:w-80 placeholder:text-gray-400 font-medium text-xs px-3 py-[6px] shadow-sm focus:border-2 focus:border-blue-400 outline-none rounded-full" />


                {productSelected.length === 0 ?
                    <div className="flex items-center">
                        <span className={`` + styleD}>
                            <CategoriesModal />
                        </span>
                        <Separator.Root
                            className="bg-red-700 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 mx-2"
                            decorative
                            orientation="vertical"
                        />
                        <span className={`` + styleD}>3 addicionais</span>
                        <Separator.Root
                            className="bg-red-700 data-[orientation=vertical]:h-full w-2 mx-2"
                            decorative={true}
                            orientation="vertical"
                        />
                        <span className={`` + styleD}>3 personalizações</span>
                    </div>
                    : <div className="flex justify-end mr-3 flex-1 ">
                        <ChangeProductsPrice />
                        {/* <Menubar.Root className="flex bg-white p-[3px] rounded-md shadow-[0_2px_10px] shadow-blackA7">
                            <Menubar.Menu>
                                <Menubar.Trigger className="py-2 px-3 outline-none select-none font-medium leading-none rounded text-violet11 text-[13px] flex items-center justify-between gap-[2px] data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
                                    File
                                </Menubar.Trigger>
                                <Menubar.Portal>
                                    <Menubar.Content
                                        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]"
                                        align="start"
                                        sideOffset={5}
                                        alignOffset={-3}
                                    >
                                        <Menubar.Item className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none">
                                
                                        </Menubar.Item>
                                    </Menubar.Content>
                                </Menubar.Portal>
                            </Menubar.Menu>
                        </Menubar.Root> */}

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



                <button className="bg-blue-400 px-8 py-2 rounded-full">
                    < BsPlusLg size={16} className="text-white" />
                </button>
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
                        <span className="text-base mb-[3px]" > {category.name}</span>
                    </div>
                })}
            </div>
        </div>
    )
}