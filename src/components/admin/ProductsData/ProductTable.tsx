import * as Switch from '@radix-ui/react-switch';
import { ProductContext } from "@/src/contexts/ProductContext"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { iProductsWithFKData } from '@/src/types/types'
import { supabase } from '@/src/server/api';
interface iProductTableDataProps {

}

export function ProductTable({ }: iProductTableDataProps) {

    const { products, productSelected, setProductSelected, hanleViewProduct } = useContext(ProductContext)

    const [productsState, setProductsState] = useState<iProductsWithFKData[]>([])

    useEffect(() => {
        setProductsState(products)
    }, [products])

    const thDefaultStyle = " text-left px-2 py-4 "
    const tdDefaultStyle = " px-2 py-4 h-[70px] "

    const handleSelectProduct = ({ product, isSelectAll = false }: { product?: iProductsWithFKData, isSelectAll?: boolean }) => {
        if (isSelectAll) {
            if (productsState.length === productSelected.length) {
                setProductSelected(state => state = [])
                return
            }
            setProductSelected(productsState)
            return
        }
        if (productSelected.some(p => p.id === product!.id)) {
            setProductSelected(state => {
                state.splice(state.findIndex(p => p.id === product!.id), 1)
                return [...state]
            })
            return
        }
        setProductSelected(state => [...state, product!])
    }

    const handleChangeProductStatus = async ({ checked, productId }: { checked: boolean, productId: number }) => {
        const updatedProducts = await Promise.all(
            productsState.map(async (product) => {
                if (product.id === productId) {
                    await supabase.from("products").update({
                        active: checked,
                    }).eq("id", productId);
                    return { ...product, active: checked };
                }
                return product;
            })
        );

        setProductsState(updatedProducts);
    }

    return (
        <div className={` bg-white`}>
            <table className="p-2 w-full">
                <thead>
                    <tr>
                        <th className={`` + thDefaultStyle}>
                            <input
                                type="checkbox"
                                name="" id=""
                                className='h-4 w-4'
                                checked={productsState && productsState.length === productSelected.length}
                                onChange={(e) => handleSelectProduct({ isSelectAll: true })} />
                        </th>
                        <th className={`w-12 ` + thDefaultStyle} >  </th>
                        <th className={`w-80 ` + thDefaultStyle} > Nome </th>
                        <th className={`` + thDefaultStyle}> Categoria </th>
                        <th className={`` + thDefaultStyle}> Preço</th>
                        <th className={`max-w-28 ` + thDefaultStyle}> Status </th>
                    </tr>
                </thead>
                <tbody className=' overflow-y-scroll'>
                    {productsState ? productsState.map(product => {

                        return <tr key={product.id} className="border-t-[1px] border-t-gray-300 ">
                            <td className={`` + tdDefaultStyle} >
                                <input
                                    type="checkbox"
                                    name="" id=""
                                    checked={productSelected.some(p => product.id === p.id)}
                                    className='h-4 w-4 cursor-pointer'
                                    onChange={(e) => handleSelectProduct({ product, })} />
                            </td>
                            <td onClick={() => hanleViewProduct(product)} className={` w-12 max-h-12` + tdDefaultStyle}>
                                <Image
                                    className="w-full max-h-12 object-cover"
                                    src={product.picture_url}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                />

                            </td>
                            <td onClick={() => hanleViewProduct(product)} className={` w-80 ` + tdDefaultStyle}>
                                {product.name}
                            </td>
                            <td onClick={() => hanleViewProduct(product)} className={`` + tdDefaultStyle}> {product.category_id.name} </td>
                            <td onClick={() => hanleViewProduct(product)} className={`` + tdDefaultStyle}> R$ {product.price.toLocaleString('pt-Br', {
                                minimumFractionDigits: 2, maximumFractionDigits: 2
                            })} </td>
                            <td className={` max-w-28` + tdDefaultStyle}>
                                <Switch.Root
                                    className="w-[42px] h-6 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                    id="airplane-mode"
                                    checked={product.active}
                                    onCheckedChange={(checked: boolean) => { handleChangeProductStatus({ checked, productId: product.id }) }}
                                    value={product.id}
                                // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
                                >
                                    <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                </Switch.Root>
                            </td>
                        </tr>
                    }) : null}

                </tbody>
            </table>
        </div>
    )
}