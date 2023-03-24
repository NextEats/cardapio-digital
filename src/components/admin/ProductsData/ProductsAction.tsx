import { BsPlusLg } from "react-icons/bs";
import * as Separator from '@radix-ui/react-separator';
import { useContext } from "react";
import { ProductContext } from "@/src/contexts/ProductContext";

interface iProductsActionProps {
}

export function ProductsAction({ }: iProductsActionProps) {

    const styleD = 'text-blue-400 cursor-pointer'

    const { productSelected, setProductSelected, categories } = useContext(ProductContext)


    return (
        <div className={''}>
            <div className="flex items-center justify-between mb-3">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-52 lg:w-80 placeholder:text-gray-400 font-medium text-xs px-3 py-[6px] shadow-sm focus:border-2 focus:border-blue-400 outline-none rounded-full" />


                {productSelected.length === 0 ?
                    <div className="flex items-center">
                        <span className={`` + styleD}>3 categoris</span>
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
                    : <div>
                        {productSelected.length}
                    </div>
                }



                <button className="bg-blue-400 px-8 py-2 rounded-full">
                    < BsPlusLg size={16} className="text-white" />
                </button>
            </div>
            <div className="w-full overflow-x-auto flex items-center gap-2">
                <div
                    className={`flex items-center justify-center px-6 border border-black cursor-pointer rounded-full font-semibold `}
                >
                    <span className="text-base mb-[3px]"> Todos </span>
                </div>
                {categories.map(category => {
                    return <div
                        key={category.id}
                        className={`flex items-center justify-center px-6 border border-black cursor-pointer rounded-full font-semibold `}
                    >
                        <span className="text-base mb-[3px]" > {category.name}</span>
                    </div>
                })}
            </div>
        </div>
    )
}