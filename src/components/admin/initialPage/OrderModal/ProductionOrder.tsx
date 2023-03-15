import ProductsDetails from './ProductsDetails';

export default function ProductionOrder({
    productionOrder,
    printProductionOrder,
    restaurant,
    orderFound,
    orderDateFormated,
    ordersTablesFound,
    address,
    additionals,
    result,
    orderProductFiltered,
    totalPriceOfProducts,
    selects,
    totalAdditionalPrice,
}: any) {
    return (
        <div className="fixed bg-white z-[-1000] hidden">
            <div
                ref={productionOrder}
                className="bg-white shadow-bd w-[298px] fixed right-1/2 
                            translate-x-1/2 px-6 pt-3 pb-6 "
            >
                <ProductionOrderContent
                    restaurant={restaurant}
                    orderFound={orderFound}
                    orderDateFormated={orderDateFormated}
                    ordersTablesFound={ordersTablesFound}
                    address={address}
                    additionals={additionals}
                    result={result}
                    orderProductFiltered={orderProductFiltered}
                    totalPriceOfProducts={totalPriceOfProducts}
                    selects={selects}
                    totalAdditionalPrice={totalAdditionalPrice}
                />
            </div>
            <button onClick={printProductionOrder}>Print this out!</button>
        </div>
    );
}

function ProductionOrderContent({
    restaurant,
    orderFound,
    orderDateFormated,
    ordersTablesFound,
    address,
    additionals,
    result,
    orderProductFiltered,
    totalPriceOfProducts,
    selects,
    totalAdditionalPrice,
}: any) {
    const textStyles =
        'text-[10px] leading-[14px] font-semibold text-black text-left leading-6';

    return (
        <>
            <h2 className="text-center uppercase text-black font-semibold text-sm">
                PRODUÇÃO
            </h2>

            <hr className="my-2" />
            <div>
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
                additionals={additionals}
                result={result}
                orderProductFiltered={orderProductFiltered}
                selects={selects}
            />
        </>
    );
}
