import {
    iAdditional,
    iAdditionals,
    iInsertOrdersProducts,
    iProducts,
    iSelects,
} from '@/src/types/types';

export interface iProductsDetailsProps {
    additionals: iAdditionals['data'];
    productsFiltered: iProducts['data'];
    selects: iSelects['data'];
    orderProductFiltered: iInsertOrdersProducts['data'];
    result: {
        id: number | undefined;
        name: string;
        count: number;
        price: number;
    }[];
}

export default function ProductsDetails({
    additionals,
    orderProductFiltered,
    result,
    productsFiltered,
}: iProductsDetailsProps) {

    const textStyles =
        'text-[10px] leading-[14px] font-semibold text-black text-left leading-6';
    let ordersProductsId: number[] = [];
    if (!productsFiltered) return null;
    return (
        <div className="mb-2 w-full">
            <div>
                {productsFiltered!.map((product, index) => {
                    const orderProductByProductId = orderProductFiltered.find(
                        (op) =>
                            op.product_id === product.id &&
                            !ordersProductsId.some((opId) => opId === op.id)
                    );
                    if (!orderProductByProductId) return;
                    ordersProductsId = [
                        ...ordersProductsId,
                        orderProductByProductId.id!,
                    ];

                    const selectsDada = orderProductByProductId.selects_data as
                        | {
                            id: number;
                            max_selected_options: number;
                            name: string;
                            options: {
                                id: number;
                                is_default_value: boolean;
                                name: string;
                                picture_url: string;
                                select_id: number;
                                selected: boolean;
                            }[];
                        }[]
                        | undefined
                        | null;

                    const additionalsData =
                        orderProductByProductId.additionals_data as {
                            quantity: number;
                            additional_id: number;
                        }[];

                    const additionalsDataFiltered =
                        additionalsData !== null
                            ? additionalsData.reduce(
                                (
                                    acc: {
                                        additional: iAdditional['data'];
                                        quantity: number;
                                    }[], item
                                ) => {
                                    if (
                                        additionals.some(
                                            (a) => a.id === item.additional_id
                                        )
                                    ) {
                                        return [
                                            ...acc,
                                            {
                                                additional:
                                                    additionals[
                                                    additionals.findIndex((a) => a.id === item.additional_id)],
                                                quantity: item.quantity,
                                            },
                                        ];
                                    }
                                    return [...acc];
                                },
                                []
                            )
                            : [];

                    if (product === undefined) {
                        return;
                    }
                    return (
                        <div key={index} className="w-full">
                            <div
                                className={`w-full flex items-center justify-between ${textStyles} mt-1`}
                            >
                                <span>
                                    {1} -{' '}
                                    <strong className="">{product.name}</strong>
                                </span>
                                <span className="font-bold text-green-500">
                                    {' '}
                                    R$ {product.price}
                                </span>
                            </div>
                            <div className="flex">
                                {
                                    <>
                                        {selectsDada!.map((s) => {
                                            return (
                                                <div
                                                    key={s.id}
                                                    className="flex flex-row"
                                                >
                                                    {s.options.map((o) => {
                                                        return (
                                                            <span
                                                                key={o.id}
                                                                className={`text- font-normal ml-2 ${textStyles} `}
                                                            >
                                                                {o.name}
                                                                {','}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </>
                                }
                            </div>
                            <div className="ml-2">
                                {additionalsDataFiltered.map((additional) => {
                                    return (
                                        <div
                                            key={additional.additional.id}
                                            className="flex items-center justify-between pr-2 text-[10px] font-normal"
                                        >
                                            <span>
                                                {' '}
                                                {additional.quantity} -{' '}
                                                {additional.additional.name}{' '}
                                            </span>
                                            <span className="text-green-500">
                                                {' '}
                                                R${' '}
                                                {additional.additional.price *
                                                    additional.quantity}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
