import { QuantitySelector } from '@/src/components/QuantitySelector';
import Image from 'next/image';
import { IoMdAddCircle } from 'react-icons/io';

export default function Additionals({
    data,
    setProductData,
}: {
    data: any;
    setProductData: any;
}) {
    if (data) {
        return (
            <div className="mb-12">
                <h2 className="mb-5 font-bold  text-lg text-[#3a3a3a]">
                    Adicionais
                </h2>
                {data.map((additional: any, index: number) => {
                    return (
                        <div key={additional.id} className="flex flex-col mb-3">
                            <div className="flex flex-1 items-center justify-between pr-4 rounded-md bg-white-300">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={additional.picture_url}
                                        alt="backgfroundheader"
                                        width={91}
                                        height={200}
                                    />
                                    <div className="">
                                        <p className="font-semibold text-black text-sm ">
                                            {additional.name}
                                        </p>
                                        <p className="font-semibold text-xs text-black">
                                            R$ {additional.price}
                                        </p>
                                    </div>
                                </div>

                                {additional.quantity === 0 ? (
                                    <div className="flex justify-center items-center">
                                        <button
                                            type="button"
                                            className={`text-[30px] rounded-full text-[#00000090]`}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setProductData((prev: any) => {
                                                    prev.additionals[
                                                        index
                                                    ].quantity += 1;

                                                    return prev;
                                                });
                                            }}
                                        >
                                            <IoMdAddCircle />
                                        </button>
                                    </div>
                                ) : (
                                    <QuantitySelector
                                        value={0}
                                        addValue={() => { }}
                                        subtractValue={() => { }}
                                        deleteValue={() => { }}
                                    />
                                )}

                                {/* {selectedAdditionals.find(
                                    (add) => add.id == additionals.id
                                ) ? (
                                    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setPrice(
                                                    (prev: any) =>
                                                        (prev -=
                                                            additionals.price)
                                                );

                                                let varSelectedAdditionals =
                                                    selectedAdditionals;

                                                let x =
                                                    varSelectedAdditionals.findIndex(
                                                        (add) =>
                                                            add.id ==
                                                            additionals.id
                                                    );

                                                if (
                                                    varSelectedAdditionals[x].quantity - 1 === 0
                                                ) {
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals.filter(
                                                            (elem, index) =>
                                                                index !== x
                                                        ),
                                                    ]);
                                                } else {
                                                    varSelectedAdditionals[
                                                        x
                                                    ].quantity -= 1;
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals,
                                                    ]);
                                                }
                                            }}
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="">
                                            {
                                                selectedAdditionals.find(
                                                    (add) =>
                                                        add.id == additionals.id
                                                ).quantity
                                            }
                                        </span>
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setPrice(
                                                    (prev: any) =>
                                                        (prev +=
                                                            additionals.price)
                                                );

                                                let varSelectedAdditionals =
                                                    selectedAdditionals;

                                                let x =
                                                    varSelectedAdditionals.findIndex(
                                                        (add) =>
                                                            add.id ==
                                                            additionals.id
                                                    );

                                                varSelectedAdditionals[
                                                    x
                                                ].quantity += 1;

                                                setSelectedAdditionals([
                                                    ...varSelectedAdditionals,
                                                ]);
                                            }}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                ) : (
                                    <BsFillPlusCircleFill
                                        className="cursor-pointer"
                                        color="3A3A3A"
                                        size={25}
                                        onClick={() => {
                                            setPrice(
                                                (prev: any) =>
                                                    (prev += additionals.price)
                                            );
                                            setSelectedAdditionals(
                                                (prev: any) => {
                                                    return [
                                                        ...prev,
                                                        {
                                                            id: additionals.id,
                                                            quantity: 1,
                                                        },
                                                    ];
                                                }
                                            );
                                        }}
                                    />
                                )} */}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <>Carregando...</>;
    }
}
