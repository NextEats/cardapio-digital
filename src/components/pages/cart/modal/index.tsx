
import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';


interface IModalProps {
    setShowModal: Dispatch<SetStateAction<"cep" | "number" | "paiment" | "checkOut" | "">>,
    showModal: "cep" | "number" | "paiment" | "checkOut" | ""
}

export default function Modal({ setShowModal, showModal }: IModalProps) {
    return (
        <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-20 ">

            <div className='w-full h-full absolute inset-0 bg-black opacity-40 backdrop-blur-0'></div>

            <div className='w-[280px] h-[420px] bg-white z-20 rounded-md shadow-2xl px-6  py-4' >
                <div className="flex flex-1 items-center mb-9">
                    <span className='w-full text-center text-gray-700 font-extrabold text-lg'>
                         { showModal === "cep" && "number" ? " Endereo de Entrega " :  showModal === "paiment" ? " Forma de Pagamento " : "Confira os dados" } 
                         </span>
                    <AiOutlineClose
                        className='cursor-pointer' size={20}
                        onClick={() => setShowModal('')}
                    />
                </div>
                <div className="h-[calc(100%-66px)] flex flex-col justify-between">

                    {
                        showModal === "cep" && <fieldset className="flex flex-col ">
                            <label className="text-gray-700 font-bold text-base mb-1" htmlFor="name"> CEP </label>
                            <input className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium" id="name" />
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
                        showModal === "cep" && <button
                            className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                            onClick={() => setShowModal('number')}
                        >
                            Proximo
                        </button>
                    }
                    {
                        showModal === "number" && <button
                        className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                        onClick={() => setShowModal('paiment')}
                    >
                        Proximo
                    </button>
                    }
                    {
                        showModal === "paiment" && <button
                        className="w-full h-10 flex items-center justify-center gap-2 border-2 border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                        onClick={() => setShowModal('checkOut')}
                    >
                        Proximo
                    </button>
                    }
                </div>
            </div>

        </div >
    )
}