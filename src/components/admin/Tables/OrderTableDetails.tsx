import { TableContext } from '@/src/contexts/TableControlContext';
import { iOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import { useContext, useRef, useState } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import ReactToPrint from 'react-to-print';
import FinishServicePopover from './FinishServicePopover';

export default function OrderTableDetails() {
    const { tableData, openedTableModal, ordersTables } =
        useContext(TableContext);

    const productsInProduction = tableData.productsInProductionData
        ? tableData.productsInProductionData
        : [];
    const productsDelivered = tableData.productsDeliveredData
        ? tableData.productsDeliveredData
        : [];
    const [ordersProductsOfTheTable, seyOrdersProductsOfTheTable] = useState<
        iOrdersProductsData[]
    >([...productsInProduction, ...productsDelivered]);

    const textStyles =
        'text-[12px] leading-[14px] font-semibold text-black text-left leading-6';

    const totalOrderPrice = ordersProductsOfTheTable.reduce(
        (acc, item) => acc + item.totalPrice,
        0
    );

    const enableFinishServiceButton = ordersTables.some(
        (o) =>
            o.orders.order_status.status_name === 'em produção' &&
            o.tables.id === openedTableModal!.id
    );

    const printOrderTableComponent = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div className="hidden">
                <div
                    ref={printOrderTableComponent}
                    className="z-[-2000] fixed bg-white ml-auto shadow-bd w-[298px] text-[12px] shadow-md p-4 hideShadowToPrint centerCompontetToPrint"
                >
                    <h2 className="text-center uppercase text-black font-semibold">
                        COMANDA
                    </h2>

                    <div className="flex flex-col gap-2 uppercase">
                        {ordersProductsOfTheTable.map((productsData) => {
                            return (
                                <div
                                    key={productsData.product.id}
                                    className="flex flex-col"
                                >
                                    <strong className="mb-1 ">
                                        {productsData.product.name}
                                    </strong>
                                    {productsData.selects.length > 0 ? (
                                        <div className="flex">
                                            <div>
                                                |&nbsp;
                                                <span>
                                                    {productsData.selects.map(
                                                        (
                                                            productSelects,
                                                            psIndex
                                                        ) => {
                                                            return productSelects.options.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        option.name +
                                                                        ' | '
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}

                                    {productsData.additionalsData.map(
                                        (additional) => {
                                            return (
                                                <span
                                                    key={
                                                        additional.additional.id
                                                    }
                                                >
                                                    {
                                                        additional.quantityOfAdditionals
                                                    }{' '}
                                                    -{' '}
                                                    {additional.additional.name}{' '}
                                                    -{' '}
                                                    <span className="font-semibold">
                                                        R${' '}
                                                        {
                                                            additional.totalPriceOfAdditionals
                                                        }
                                                    </span>
                                                </span>
                                            );
                                        }
                                    )}

                                    <hr className="my-2" />
                                </div>
                            );
                        })}
                    </div>

                    <div>
                        <p className="grid grid-cols-2 items-center gap-10">
                            <span className={`${textStyles}`}>
                                Total a pagar:{' '}
                            </span>
                            <span className={`${textStyles} w-`}>
                                <strong>R$ {totalOrderPrice}</strong>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white ml-auto shadow-bd w-[298px] text-[12px] shadow-md p-4 hideShadowToPrint centerCompontetToPrint max-h-[350px] overflow-auto">
                <h2 className="text-center uppercase text-black font-semibold">
                    COMANDA
                </h2>

                <div className="flex flex-col gap-2 uppercase">
                    {ordersProductsOfTheTable.map((productsData) => {
                        return (
                            <div
                                key={productsData.product.id}
                                className="flex flex-col"
                            >
                                <strong className="mb-1 ">
                                    {productsData.product.name}
                                </strong>
                                {productsData.selects.length > 0 ? (
                                    <div className="flex">
                                        <div>
                                            |&nbsp;
                                            <span>
                                                {productsData.selects.map(
                                                    (
                                                        productSelects,
                                                        psIndex
                                                    ) => {
                                                        return productSelects.options.map(
                                                            (option, index) => {
                                                                return (
                                                                    option.name +
                                                                    ' | '
                                                                );
                                                            }
                                                        );
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                {productsData.additionalsData.map(
                                    (additional) => {
                                        return (
                                            <span
                                                key={additional.additional.id}
                                            >
                                                {
                                                    additional.quantityOfAdditionals
                                                }{' '}
                                                - {additional.additional.name} -{' '}
                                                <span className="font-semibold">
                                                    R${' '}
                                                    {
                                                        additional.totalPriceOfAdditionals
                                                    }
                                                </span>
                                            </span>
                                        );
                                    }
                                )}

                                <hr className="my-2" />
                            </div>
                        );
                    })}
                </div>

                <div>
                    <p className="grid grid-cols-2 items-center gap-10">
                        <span className={`${textStyles}`}>Total a pagar: </span>
                        <span className={`${textStyles} w-`}>
                            <strong>R$ {totalOrderPrice}</strong>
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 w-[298px] ml-auto">
                {openedTableModal?.is_occupied && !enableFinishServiceButton ? (
                    <FinishServicePopover />
                ) : (
                    <button
                        disabled
                        className={`bg-white shadow-md h-8 w-full rounded-sm font-medium text-base disabled:text disabled:bg-gray-500 disabled:cursor-not-allowed`}
                    >
                        Finalizar atendimento
                    </button>
                )}
                <ReactToPrint
                    copyStyles={true}
                    content={() => printOrderTableComponent.current}
                    trigger={() => {
                        return (
                            <button className="bg-white shadow-md h-8 w-12 flex items-center justify-center rounded-sm">
                                <AiOutlinePrinter size={24} />
                            </button>
                        );
                    }}
                />
            </div>
        </div>
    );
}
