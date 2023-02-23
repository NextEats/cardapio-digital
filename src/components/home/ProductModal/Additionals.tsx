import { iProductAdditional } from './getProductAdditionals'
import Image from 'next/image'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function Additionals({
    data,
    setPrice,
    selectedAdditionals,
    setSelectedAdditionals,
}: {
    data: iProductAdditional[]
    setPrice: Function
    selectedAdditionals: any[]
    setSelectedAdditionals: Function
}) {
    if (data) {
        return (
            <div className="mb-24">
                <h2 className="mb-5 font-bold  text-lg text-[#3a3a3a]">
                    Adicionais
                </h2>
                {data.map(({ additionals }) => {
                    return (
                        <div
                            key={additionals.id}
                            className="flex flex-col mb-3"
                        >
                            <div className="flex flex-1 items-center justify-between pr-4 rounded-md bg-white-300">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={additionals.picture_url}
                                        alt="backgfroundheader"
                                        width={91}
                                        height={200}
                                    />
                                    <div className="">
                                        <p className="font-semibold text-black text-sm ">
                                            {additionals.name}
                                        </p>
                                        <p className="font-semibold text-xs text-black">
                                            R$ {additionals.price}
                                        </p>
                                    </div>
                                </div>

                                {selectedAdditionals.find(
                                    (add) => add.id == additionals.id
                                ) ? (
                                    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={(e) => {
                                                e.preventDefault()

                                                setPrice((prev: any) => (prev -= additionals.price))

                                                let varSelectedAdditionals = selectedAdditionals

                                                let x = varSelectedAdditionals.findIndex((add) => add.id == additionals.id)

                                                if (
                                                    varSelectedAdditionals[x].quantity - 1 === 0
                                                ) {
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals.filter(
                                                            (elem, index) =>
                                                                index !== x
                                                        ),
                                                    ])
                                                } else {
                                                    varSelectedAdditionals[
                                                        x
                                                    ].quantity -= 1
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals,
                                                    ])
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
                                                e.preventDefault()

                                                setPrice(
                                                    (prev: any) =>
                                                    (prev +=
                                                        additionals.price)
                                                )

                                                let varSelectedAdditionals =
                                                    selectedAdditionals

                                                let x =
                                                    varSelectedAdditionals.findIndex(
                                                        (add) =>
                                                            add.id ==
                                                            additionals.id
                                                    )

                                                varSelectedAdditionals[
                                                    x
                                                ].quantity += 1

                                                setSelectedAdditionals([
                                                    ...varSelectedAdditionals,
                                                ])
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
                                            )
                                            setSelectedAdditionals(
                                                (prev: any) => {
                                                    return [
                                                        ...prev,
                                                        {
                                                            id: additionals.id,
                                                            quantity: 1,
                                                        },
                                                    ]
                                                }
                                            )
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return <>Carregando...</>
    }
}
