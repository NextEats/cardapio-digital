import * as Switch from '@radix-ui/react-switch';
import { ProductContext } from "@/src/contexts/ProductContext"
import Image from "next/image"
import { useContext } from "react"

interface iProductTableDataProps {

}

export function ProductTable({ }: iProductTableDataProps) {
    const { products } = useContext(ProductContext)

    const thDefaultStyle = " text-left px-2 py-4 "
    const tdDefaultStyle = " px-2 py-4 "

    return (
        <div className={`min-h-[400px] h-full bg-white shadow-md rounded`}>

            <table className="p-2 w-full">
                <thead>
                    <tr>
                        <th className={`` + thDefaultStyle}>
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th className={`w-12 ` + thDefaultStyle} >  </th>
                        <th className={`w-80 ` + thDefaultStyle} > Nome </th>
                        <th className={`` + thDefaultStyle}> Categoria </th>
                        <th className={`` + thDefaultStyle}> Preço</th>
                        <th className={`max-w-28 ` + thDefaultStyle}> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {products ? products.map(product => {
                        return <tr key={product.id} className="border-t-2 border-t-gray-400 ">
                            <td className={`` + tdDefaultStyle} >
                                <input type="checkbox" name="" id="" />
                            </td>
                            <td className={` w-12 max-h-12` + tdDefaultStyle}>
                                <Image
                                    className="w-full max-h-12 object-cover"
                                    src={product.picture_url}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                />

                            </td>
                            <td className={` w-80 ` + tdDefaultStyle}>
                                {product.name}
                            </td>
                            <td className={`` + tdDefaultStyle}> {product.name} </td>
                            <td className={`` + tdDefaultStyle}> {product.price} </td>
                            <td className={` max-w-28` + tdDefaultStyle}>
                                <Switch.Root
                                    className="w-[42px] h-6 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                    id="airplane-mode"
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