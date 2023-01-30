import { iStatusReducer } from "../../../../reducers/statusReducer/reducer";
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";
import { Dispatch } from "react";
import { showModalAction } from "../../../../reducers/statusReducer/action";


interface iOrderModalProps {
    state: iStatusReducer,
    dispatch: Dispatch<any>,
}

export function OrderModal({ state, dispatch }: iOrderModalProps) {

    const descriptionsStyles = "text-sm font-semibold text-gray-red-400 text-center mb-3 mt-6"
    const textStyles = "text-sm font-semibold text-gray-red-400 text-left leading-6"

    return (
        <div>
            <Dialog.Root open={state.isOpenOrderModal}>

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black opacity-40 fixed inset-0 transition-all ease-in-out duration-300" onClick={() => dispatch(showModalAction())} />
                    <Dialog.Content className="bg-white shadow-bd w-[350px] fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  rounded-md p-6" >

                        <Dialog.Title className="text-xl font-bold text-center">Next Eats</Dialog.Title>


                        <Dialog.Description className={`${descriptionsStyles}`}>
                            Dados do restaurante
                        </Dialog.Description>

                        <div>
                            <p className={`${textStyles} text`} > Restaurante: <strong>Quintal do  Hambúrguer</strong> </p>
                            <p className={`${textStyles}`} > Nº do pedido: <strong>  45452124 </strong> </p>
                            <p className={`${textStyles}`} > Data: <strong>  29/03/2023 </strong> </p>
                        </div>

                        <Dialog.Description className={`${descriptionsStyles}`}>
                            Dados do cliente
                        </Dialog.Description>

                        <div>
                            <p className={`${textStyles}`} > Nome: <strong>  Adolfino </strong> </p>
                            <p className={`${textStyles}`} > Telefone: <strong>  (87) 9 98199329 </strong> </p>
                            <p className={`${textStyles}`} > Endereço: <strong>  Avenida Jose de Tanranran, 456 </strong> </p>
                            <p className={`${textStyles}`} > Bairro: <strong>  Adnalva César </strong> </p>
                            <p className={`${textStyles}`} > Cidade: <strong>  São Paulo, SP  </strong> </p>
                        </div>

                        <Dialog.Description className={`${descriptionsStyles}`}>
                            Detalhes do pedido
                        </Dialog.Description>

                        <table className="mb-4 w-full">
                            <thead>
                                <tr>
                                    <td className={`${textStyles}`} > Qnt </td>
                                    <td className={`${textStyles}`} > Item </td>
                                    <td className={`${textStyles} w-24`} > Preço </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${textStyles}`} > <strong> 2</strong> </td>
                                    <td className={`${textStyles}`} > <strong> X-salada</strong> </td>
                                    <td className={`${textStyles}`} > <strong>  R$ 50,00 </strong> </td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles}`} >sub-total:</span>
                                <span className={`${textStyles}`} > <strong>  R$ 1-- </strong> </span>
                            </p>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles} `} >Taxa de entrega:</span>
                                <span className={`${textStyles}`} > <strong>  R$ 1-- </strong> </span>
                            </p>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles}`} >Total a pagar:</span>
                                <span className={`${textStyles} w-`} > <strong>  R$ 1-- </strong> </span>
                            </p>
                        </div>

                        <div className="flex flex-1 items-center justify-end mt-5">
                            <CardapioDigitalButton name="Imprimir" w="w-28" h="h-8" />
                        </div>

                        {/* <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button className="Button green">Save changes</button>
                            </Dialog.Close>
                        </div> */}
                        <Dialog.Close asChild onClick={() => dispatch(showModalAction())}>
                            <button className="absolute top-3 right-3" aria-label="Close">
                                <FiX className="w-6 h-6" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}