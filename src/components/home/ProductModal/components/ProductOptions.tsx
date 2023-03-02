import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { filterOptionsSelected } from '@/src/helpers/filterOptionsSelected';
import useProductSelectsWithOptions from '@/src/hooks/useProductSelectsWithOptions';
import { useContext, useMemo } from 'react';
import SelectComponent from './SelectComponent';

interface iProductOptions {
    product_id: string;
}

export default function ProductOptions({ product_id }: iProductOptions) {
    const { productSelects, selectOption } =
        useProductSelectsWithOptions(product_id);

    const { selects } = useContext(DigitalMenuContext);

    useMemo(() => {
        selects?.set(
            filterOptionsSelected({
                productsOptionsSelected: productSelects,
            })
        );
    }, []);

    return (
        <div>
            {productSelects.map((select, selectIndex) => (
                <SelectComponent
                    select={select}
                    key={selectIndex}
                    index={selectIndex}
                    handleOptionClick={(optionIndex: number) => {
                        selectOption(selectIndex, optionIndex);
                    }}
                />
            ))}
        </div>
    );
}
