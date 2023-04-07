import * as Switch from '@radix-ui/react-switch';
import { ProductContext } from "@/src/contexts/ProductContext"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { iProductsWithFKData } from '@/src/types/types'
import { supabase } from '@/src/server/api';
interface iProductTableDataProps {

}

export function ProductTable({ }: iProductTableDataProps) {

    const { products, setProducts, productSelected, setProductSelected, hanleViewProduct } = useContext(ProductContext)

    const thDefaultStyle = " text-left px-2 py-4 "
    const tdDefaultStyle = " px-2 py-3 h-[70px]"

    const productsFiltered = products.filter(p => !p.is_deleted)

    const handleSelectProduct = ({ product, isSelectAll = false }: { product?: iProductsWithFKData, isSelectAll?: boolean }) => {
        if (isSelectAll) {
            if (productsFiltered.length === productSelected.length) {
                setProductSelected(state => state = [])
                return
            }
            setProductSelected(productsFiltered)
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
            products.map(async (product) => {
                if (product.id === productId) {
                    await supabase.from("products").update({
                        active: checked,
                    }).eq("id", productId);
                    return { ...product, active: checked };
                }
                return product;
            })
        );

        setProducts(updatedProducts);
    }

    return (
        <div className={` bg-white`}>
            <div className="h-full overflow-auto">

                <table className="p-2 w-full">
                    <thead>
                        <tr>
                            <th className={`` + thDefaultStyle}>
                                <input
                                    type="checkbox"
                                    className='h-5 w-5'
                                    checked={productsFiltered && productsFiltered.length === productSelected.length}
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
                        {products ? products.map(product => {
                            if (product.is_deleted) return null

                            return <tr key={product.id} className="border-t-[1px] border-t-gray-300 ">
                                <td className={`` + tdDefaultStyle} >
                                    <input
                                        type="checkbox"
                                        checked={productSelected.some(p => product.id === p.id)}
                                        className='h-5 w-5  cursor-pointer'
                                        onChange={(e) => handleSelectProduct({ product, })} />
                                </td>
                                <td onClick={() => hanleViewProduct(product)} className={` w-12 max-h-12` + tdDefaultStyle}>
                                    <div className='w-[40px]  max-h-[40px] object-cover'>
                                        <Image
                                            className="w-[40px]  max-h-[42px] object-cover rounded-sm"
                                            src={product.picture_url}
                                            alt={product.name}
                                            width={480}
                                            height={480}
                                        />
                                    </div>

                                </td>
                                <td onClick={() => hanleViewProduct(product)} className={` w-80 ` + tdDefaultStyle}>
                                    <span className='w-full truncate'>
                                        {product.name}
                                    </span>
                                </td>
                                <td onClick={() => hanleViewProduct(product)} className={`` + tdDefaultStyle}>
                                    <span className='w-full truncate'>
                                        {product.category_id.name}
                                    </span>
                                </td>
                                <td onClick={() => hanleViewProduct(product)} className={`` + tdDefaultStyle}>
                                    <span className='w-full truncate'>
                                        R$ {product.price.toLocaleString('pt-Br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </td>
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
        </div>
    )
}