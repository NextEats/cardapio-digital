import Link from "next/link";
import { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Whatsapp() {

    const [isCode, setIsCode] = useState(false)
    const [standbyScreen, setStandbyScreen] = useState(false)
    return (
        <div className="px-4 " >
            <div className="h-full flex flex-col justify-between">
                <div className="flex flex-1 items-center ">
                    <Link href="/">
                        <BsArrowLeftCircle
                            className="mt-8 mb-16 cursor-pointer" size={30}
                        />
                    </Link>
                </div>

                <div className=" h-full flex flex-col items-center">
                    <h1 className="text-2xl  font-extrabold text-gray-700 mb-3">{isCode ? "Insira o Código" : "WhatsApp"}</h1>
                    <p className="text-gray-700 w-[290px] font-medium text-sm mb-12">
                        {isCode ? "Que foi enviado para o seu WhatsApp." : "Insira seu número para receber atualizações em tempo real do seu pedido."}
                    </p>
                    {isCode ? <input className="w-[295px] h-9 mb-2 text-center text-lg font-medium text-gray-700 rounded-md border border-gray-500" type="tel"
                        maxLength={4} /> :
                        <input className="w-[295px] h-9 mb-2 text-center text-lg font-medium text-gray-700 rounded-md border border-gray-500" type="tel" />}

                    <span className="text-gray-400 w-[290px] text-[10px] font-normal">
                        {isCode ? "Expira em: 04:22" : "Ao continuar, você concorda com a nossa Política de Compartilhamento de Dados."}
                    </span>
                </div>
            </div>
            <div className="w-full absolute bottom-0 left-0 px-4 pb-8 pt-4 bg-white ">

                {isCode && <button className="w-full h-10 flex items-center justify-center gap-2 border-2 mb-3 border-black rounded-md text-sm uppercase text-gray-600 font-medium">
                    Não recebi o código
                </button>}
                <button className="w-full h-10 flex items-center justify-center gap-2 bg-gray-700 rounded-md text-sm uppercase text-white-300 font-medium "
                    onClick={() => isCode ? setStandbyScreen(true) : setIsCode(true)}
                >
                    continuar
                </button>
            </div>

            {standbyScreen && <div className="w-screem h-screen fixed inset-0 bg-white flex items-center justify-center ">
                <h1 className="max-w-[300px] text-center text-yellow-500 text-2xl font-extrabold">Pedido recebido, aguarde confirmação do restaurante.</h1>
            </div>}
        </div>
    )
}

