import ProductsDetails from './ProductsDetails';

export default function ProductionOrder({
    productionOrder,
    printProductionOrder,
    orderFound,
    ordersTablesFound,
    additionals,
    result,
    orderProductFiltered,
    selects,
    productsFiltered,
}: any) {
    return (
        <div className="fixed bg-white z-[-1000] hidden">
            <div
                ref={productionOrder}
                className="bg-white shadow-bd w-[298px] fixed right-1/2 
                            translate-x-1/2 px-6 pt-3 pb-6 "
            >
                <ProductionOrderContent
                    productsFiltered={productsFiltered}
                    orderFound={orderFound}
                    ordersTablesFound={ordersTablesFound}
                    additionals={additionals}
                    result={result}
                    orderProductFiltered={orderProductFiltered}
                    selects={selects}
                />
            </div>
            <button onClick={printProductionOrder}>Print this out!</button>
        </div>
    );
}

function ProductionOrderContent({
    orderFound,
    ordersTablesFound,
    additionals,
    result,
    orderProductFiltered,
    selects,
    productsFiltered,
}: any) {
    const textStyles =
        'text-[10px] leading-[14px] font-semibold text-black text-left leading-6';

    return (
        <div className="uppercase">
            <h2 className="text-center uppercase text-black font-semibold text-sm">
                PRODUÇÃO
            </h2>

            <hr className="my-2" />
            <div className="uppercase">
                <p className={`${textStyles}`}>
                    Nº do pedido:{' '}
                    <strong>
                        {' '}
                        #{orderFound?.number.toString().padStart(4, '0')}{' '}
                    </strong>
                </p>
                {ordersTablesFound ? (
                    <p className={`${textStyles}`}>
                        Nome da mesa :{' '}
                        <strong> {ordersTablesFound.tables.name} </strong>
                    </p>
                ) : null}
            </div>

            {orderFound?.clients ? (
                <>
                    <div>
                        <p className={`${textStyles} text-left `}>
                            Nome: <strong> {orderFound?.clients?.name}</strong>
                        </p>
                    </div>
                </>
            ) : null}

            <hr className="my-2" />

            <ProductsDetails
                productsFiltered={productsFiltered}
                additionals={additionals}
                result={result}
                orderProductFiltered={orderProductFiltered}
                selects={selects}
            />
        </div>
    );
}
