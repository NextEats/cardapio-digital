
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { AiOutlineClose, AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { api } from '../../../../server/api';
import axios from 'axios';


interface IModalProps {
    setShowModal: Dispatch<SetStateAction<"cep" | "number" | "paiement" | "checkOut" | "">>,
    showModal: "cep" | "number" | "paiement" | "checkOut" | ""
}

type IPaiementOtions = "Dinheiro" | "Pix" | "Cartão de crédito" | "Cartão de Débito" | "Ticket Restaurante" | "VR Refeição" | "Sedexo refeição" | "ALELO REFEIÇÃO*"

const paiementOptions: IPaiementOtions[] = [
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


    const [selectedValue, setSelectedValue] = useState('');
    function handlePaiementOption(event: ChangeEvent<HTMLInputElement>) {
        setSelectedValue('')
        setSelectedValue(event.target.value);
        console.log(selectedValue)
    }

    const [cep, setCep] = useState('')
    const [cepError , setCepError] = useState(false)
    async function getAddressByCEP(cep: string) {
        setCep(cep)

        if (cep.length === 8) {

            const getCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            if (getCep.data.erro) setCepError(true)  
            else setCepError(false)
            console.log(getCep)
        }
        console.log(cepError)
        
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-20 ">

            <div className='w-full h-full absolute inset-0 bg-black opacity-40 backdrop-blur-0'></div>

            <div className='w-[280px] h-[490px] bg-white z-20 rounded-md shadow-2xl px-4  py-4' >
                <div className="flex flex-1 items-center mb-9">
                    <span className='w-full text-center text-gray-700 font-extrabold text-lg'>
                        {showModal === "cep" && "number" ? " Endereo de Entrega " : showModal === "paiement" ? " Forma de Pagamento " : "Confira os dados"}
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
                                <input className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name" />
                            </fieldset>
                            <fieldset className="flex flex-col ">
                                <label className="text-gray-700 font-bold text-base mb-1" htmlFor="name"> Complemento </label>
                                <input className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name" />
                            </fieldset>
                        </div>
                    }

                    {
                        showModal === "paiement" && <div className='flex flex-col  gap-2'>
                            {
                                paiementOptions.map((item, index) => {
                                    return (
                                        <div key={index} >
                                            <label
                                                className={`w-full h-8 flex items-center pl-5 gap-2 border-2 border-gray-700 rounded-md ${item === selectedValue && "bg-gray-700"} `} >
                                                <input type="radio" value={item} hidden checked={selectedValue === item} onChange={handlePaiementOption} id="" />
                                                <div className='flex items-center justify-center gap-4 text-sm text-black font-medium'>
                                                    {item === "Dinheiro" && <FaRegMoneyBillAlt className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Pix" && <AiOutlineBank className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Cartão de Débito" && <AiOutlineBank className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Cartão de crédito" && <AiOutlineCreditCard className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Ticket Restaurante" && <HiOutlineTicket className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "VR Refeição" && <HiOutlineTicket className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "Sedexo refeição" && <HiOutlineTicket className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    {item === "ALELO REFEIÇÃO*" && <AiOutlineCreditCard className='w-5 h-5' color={ item === selectedValue ? "#FFFFFF" : "#8047F8"} />}
                                                    <span className={` ${ item === selectedValue ? "text-white" : "text-gray-700" } font-normal`} >{item}</span>
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
                                            Rua João Daniel Martinelli, 102 {' '}
                                            </strong>
                                            Farrapos - Porto Alegre, RS
                                        </span>
                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center ">
                                        <BsCurrencyDollar className='w-4 h-4' color='#FFFFFF' />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <h2 className='text-xl font-bold text-gray-700'>Endereço de entrega</h2>
                                        <span> Cartão de crédito  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    
                    {
                        showModal === "cep" && <button
                            className="w-full h-10 flex items-center justify-center gap-2 border-2 disabled:cursor-not-allowed border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                            onClick={() => setShowModal('number')}
                            disabled={cep.length < 8 || cepError}
                        >
                            Proximo
                        </button>
                    }
                    {
                        showModal === "number" && <button
                            className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                            onClick={() => setShowModal('paiement')}
                        >
                            Proximo
                        </button>
                    }
                    {
                        showModal === "paiement" && <button
                            className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                            onClick={() => setShowModal('checkOut')}
                        >
                            Proximo
                        </button>
                    }
                    {
                        showModal === "checkOut" && <button
                            className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                            onClick={() => setShowModal('checkOut')}
                        >
                            Concluir
                        </button>
                    }
                </div>
            </div>

        </div >
    )
}