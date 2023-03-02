import { tSelectWithOptions } from '../fetch/productSelects/getProductSelectWithOptions';

interface iFilterOptionsSelctedProps {
    productsOptionsSelected: tSelectWithOptions[];
}

export function filterOptionsSelected({
    productsOptionsSelected,
}: iFilterOptionsSelctedProps) {
    const productsSelected = productsOptionsSelected.reduce(
        (acc: any, item) => {
            if (item.options.some((op) => op.selected === true)) {
                return (acc = [
                    ...acc,
                    {
                        id: item.id,
                        options: item.options.filter(
                            (op) => op.selected === true
                        ),
                    },
                ]);
            } else {
                return acc;
            }
        },
        []
    );

    return productsSelected;
}
