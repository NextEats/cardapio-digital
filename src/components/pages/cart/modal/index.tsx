
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { AiOutlineClose, AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { api } from '../../../../server/api';
import axios from 'axios';


interface IModalProps {
    setShowModal: Dispatch<SetStateAction<"cep" | "number" | "payment" | "checkOut" | "">>,
    showModal: "cep" | "number" | "payment" | "checkOut" | ""
}

type IPaymentOtions = "Dinheiro" | "Pix" | "Cartão de crédito" | "Cartão de Débito" | "Ticket Restaurante" | "VR Refeição" | "Sedexo refeição" | "ALELO REFEIÇÃO*"

interface IAddress {
    bairro: string
    cep: string
    complemento: string
    ddd: string
    gia: string
    ibge: string
    localidade: string
    logradouro: string
    siafi: string
    uf: string
}

const paymentOptions: IPaymentOtions[] = [
    "Dinheiro",
    "Pix",
    "Cartão de crédito",
    "Cartão de Débito",
    "Ticket Restaurante",
    "VR Refeição",
    "Sedexo refeição",
    "ALELO REFEIÇÃO*",
]

export default function Modal({ setShowModal, showModal }: IModalProps) {

    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')

    const [selectedPaymentValue, setSelectedPaymentValue] = useState('');
    function handlePaymentOption(value: string) {
        setSelectedPaymentValue(() => {
            return value
        });
    }

    const [cep, setCep] = useState('')
    const [cepError, setCepError] = useState(false)
    const [address, setAddress] = useState<IAddress>()
    async function getAddressByCEP(cep: string) {
        setCep(cep)
        if (cep.length === 8) {

            const getCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            setAddress(getCep.data)
            if (getCep.data.erro) setCepError(true)
            else setCepError(false)
        }
    }

    async function finalizeOrder() {
        await api.post("order", {
            address: {
                cep,
                number,
                complement,
            },
            selectedPaymentValue
        })
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-20 ">

            <div className='w-full h-full absolute inset-0 bg-black opacity-40 backdrop-blur-0'></div>

            <div className='w-[280px] h-[490px] bg-white z-20 rounded-md shadow-2xl px-4  py-4' >
                <div className="flex flex-1 items-center mb-9">
                    <span className='w-full text-center text-gray-700 font-extrabold text-lg'>
                        {showModal === "cep" && "number" ? " Endereo de Entrega " : showModal === "payment" ? " Forma de Pagamento " : "Confira os dados"}
                    </span>
                    <AiOutlineClose
                        className='cursor-pointer w-5'
                        onClick={() => setShowModal('')}
                    />
                </div>
                <div className="h-[calc(100%-66px)] flex flex-col justify-between">

                    {
                        showModal === "cep" && <fieldset className="flex flex-col ">
                            <label className="text-gray-700 font-bold text-base mb-1" htmlFor="name"> CEP </label>
                            <input
                                type='text'
                                value={cep}
                                className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name"
                                onChange={(e) => getAddressByCEP(e.target.value)}
                                maxLength={8}
                            />
                            {cepError && <span className='text-red-500 text-xs font-normal'>Não encontramos o seu endereço, por favor verifique se o CEP está correto!</span>}
                        </fieldset>
                    }

                    {
                        showModal === "number" && <div>
                            <fieldset className="flex flex-col mb-3">
                                <label className="text-gray-700 font-bold text-base mb-1" htmlFor="name"> Número </label>
                                <input
                                    type="number"
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name"
                                    min={0}
                                />
                            </fieldset>
                            <fieldset className="flex flex-col ">
                                <label className="text-gray-700 font-bold text-base mb-1" htmlFor="name"> Complemento </label>
                                <input
                                    type="text"
                                    onChange={(e) => setComplement(e.target.value)}
                                    className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name" />
                            </fieldset>
                        </div>
                    }

                    {
                        showModal === "payment" && <div className='flex flex-col  gap-2'>
                            {
                                paymentOptions.map((item, index) => {
                                    return (
                                        <div key={index} >
                                            <label
                                                className={`w-full h-8 flex items-center pl-5 gap-2 border-2 border-gray-700 rounded-md ${item === selectedPaymentValue && "bg-gray-700"} `} >
                                                <input type="radio" value={item} hidden checked={selectedPaymentValue === item} onChange={(e) => handlePaymentOption(e.target.value)} id="" />
                                                <div className='flex items-center justify-center gap-4 text-sm text-black font-medium'>
                                                    {item === "Dinheiro" && <FaRegMoneyBillAlt className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Pix" && <AiOutlineBank className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Cartão de Débito" && <AiOutlineBank className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Cartão de crédito" && <AiOutlineCreditCard className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Ticket Restaurante" && <HiOutlineTicket className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "VR Refeição" && <HiOutlineTicket className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Sedexo refeição" && <HiOutlineTicket className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "ALELO REFEIÇÃO*" && <AiOutlineCreditCard className='w-5 h-5' color={item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"} />}
                                                    <span className={` ${item === selectedPaymentValue ? "text-white" : "text-gray-700"} font-normal`} >{item}</span>
                                                </div>
                                            </label>
                                            {item === "ALELO REFEIÇÃO*" ? <span className='text-[10px] font-medium leading-[8px]' >*APENAS CARTÕES COM CHIP</span> : null}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    {
                        showModal === "checkOut" && <div className='flex flex-col  gap-2'>
                            <div className="">
                                <div className='flex gap-3 mb-5'>
                                    <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center ">
                                        <FiMapPin className='w-4 h-4' color='#FFFF' />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <h2 className='text-xl font-bold text-gray-700'>Endereço de entrega</h2>
                                        <span>
                                            Entrega em{' '}
                                            <strong>
                                                {address?.logradouro}, {number} {' '}
                                            </strong>
                                            {address?.bairro} - {address?.localidade}, {address?.uf}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center ">
                                        <BsCurrencyDollar className='w-4 h-4' color='#FFFFFF' />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <h2 className='text-xl font-bold text-gray-700'>Endereço de entrega</h2>
                                        <span> {selectedPaymentValue}  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {showModal === "cep" && <Button data={{ cep, cepError, number, selectedPaymentValue }} name='Próximo' route='number' setShowModal={setShowModal} />}
                    {showModal === "number" && <Button data={{ cep, cepError, number, selectedPaymentValue }} name='Próximo' route='payment' setShowModal={setShowModal} />}
                    {showModal === "payment" && <Button data={{ cep, cepError, number, selectedPaymentValue }} name='Próximo' route='checkOut' setShowModal={setShowModal} />}
                    {showModal === "checkOut" && <button
                        className="w-full h-10 flex items-center justify-center gap-2 border-2 disabled:cursor-not-allowed border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                        onClick={() => finalizeOrder()}
                    >
                        Concluir
                    </button>}

                </div>
            </div>

        </div >
    )
}

interface IButtonProps {
    setShowModal: Dispatch<SetStateAction<"cep" | "number" | "payment" | "checkOut" | "">>,
    route: "cep" | "number" | "payment" | "checkOut" | "",
    name: string
    data: {
        selectedPaymentValue: string
        cep: string,
        number: string,
        cepError: boolean,
    }
}

function Button({ name, route, data, setShowModal }: IButtonProps) {

    return (
        <button
            className="w-full h-10 flex items-center justify-center gap-2 border-2 disabled:cursor-not-allowed border-black rounded-md text-sm uppercase text-gray-600 font-medium"
            onClick={() => setShowModal(route)}
            disabled={
                route == "number" ? data.cep.length < 8 || data.cepError :
                    route == "payment" ? data.number.length == 0 :
                        route == "checkOut" ? data.selectedPaymentValue.length == 0 : false
            }
        >
            {name}
        </button>
    )
}