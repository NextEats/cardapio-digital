import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions'
import useProductSelectsWithOptions from '@/src/hooks/useProductSelectsWithOptions'
import SelectComponent from './SelectComponent'

type tState = {
    productSelects: tSelectWithOptions[]
}

interface iProductOptions {
    product_id: number
}

export default function ProductOptions({ product_id }: iProductOptions) {
    const { productSelects, selectOption } =
        useProductSelectsWithOptions(product_id)

    return (
        <div>
            {productSelects.map((select, selectIndex) => (
                <SelectComponent
                    select={select}
                    key={selectIndex}
                    index={selectIndex}
                    handleOptionClick={(optionIndex: number) => {
                        selectOption(selectIndex, optionIndex)
                    }}
                />
            ))}
        </div>
    )
}
