import { iStatusReducer } from "../../../../reducers/statusReducer/reducer";
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { showModalAction } from "../../../../reducers/statusReducer/action";
import { api } from "../../../../server/api";


interface iOrderModalProps {
    state: iStatusReducer,
    dispatch: Dispatch<any>,
}

export function OrderModal({ state, dispatch }: iOrderModalProps) {

    const [address, setAddress] = useState<{
        bairro: string,
        cep: string,
        complemento: string,
        ddd: string,
        gia: string,
        ibge: string,
        localidade: string,
        logradouro: string,
        siafi: string,
        uf: string,
    }>({
        bairro: '',
        cep: '',
        complemento: '',
        ddd: '',
        gia: '',
        ibge: '',
        localidade: '',
        logradouro: '',
        siafi: '',
        uf: '',
    })

    // products
    const orderProductFiltered = state.ordersProducts.filter(op => op.order_id === state.orderId)
    const productsFiltered = orderProductFiltered.map(op => {
        return state.products.find(p => {
            return p.id === op?.product_id
        })
    })


    // data client
    const descriptionsStyles = "text-sm font-semibold text-gray-red-400 text-center mb-3 mt-6"
    const textStyles = "text-sm font-semibold text-gray-red-400 text-left leading-6"

    const orderFound = state.orders.find(order => order.id === state.orderId);
    const clientFuound = state.clients.find(client => client.id === orderFound?.client_id)

    const contact = state.contacts.find(contact => contact.id === clientFuound?.contact_id)
    const addressFound = state.addresses?.find(address => address.id === clientFuound?.address_id)

    useMemo(() => {
        const getAddress = async () => {
            const res = await api.get(`https://viacep.com.br/ws/${addressFound?.cep}/json/`)
            setAddress(res.data)
        }
        getAddress()

    }, [addressFound])

    let countProducts: { [key: string]: { id: number | undefined, count: number, name: string, price: number } } = {}
    for (let i = 0; i < productsFiltered.length; i++) {
        if (productsFiltered[i] === undefined) {
            return
        }

        if (!countProducts[productsFiltered[i]!.name]) {

            countProducts[productsFiltered[i]!.name] = {
                id: productsFiltered[i]!.id,
                count: 0,
                name: productsFiltered[i]!.name,
                price: 0,
            };
        }
        countProducts[productsFiltered[i]!.name].count += 1;
        countProducts[productsFiltered[i]!.name].price += productsFiltered[i]!.price;
    }

    const result = Object.entries(countProducts).map(([name, { id, count, price }]) => ({
        id,
        name,
        count,
        price,
    }));
    const totalPriceOfProducts = result.reduce((acc, product) => acc + product.price, 0)
    const deliveryPrice = 10

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
                            <p className={`${textStyles}`} > Nome: <strong>  {clientFuound?.name}  </strong> </p>
                            <p className={`${textStyles}`} > Telefone: <strong> {contact?.phone} </strong> </p>
                            <p className={`${textStyles}`} > Email: <strong> {contact?.email} </strong> </p>
                            <p className={`${textStyles}`} > Endereço: <strong>  {address.logradouro}, {addressFound?.number} </strong> </p>
                            <p className={`${textStyles}`} > Bairro: <strong>  {address.bairro} </strong> </p>
                            <p className={`${textStyles}`} > Cidade: <strong>  {address.localidade}, {address.uf}  </strong> </p>
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
                                {
                                    result.map(product => {
                                        if (product === undefined) {
                                            return
                                        }
                                        return (
                                            <tr key={product.id}>
                                                <td className={`${textStyles}`} > <strong> {product.count} </strong> </td>
                                                <td className={`${textStyles}`} > <strong> {product.name} </strong> </td>
                                                <td className={`${textStyles}`} > <strong> R$ {product.price} </strong> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <div>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles}`} >sub-total:</span>
                                <span className={`${textStyles}`} > <strong>  R$ {totalPriceOfProducts} </strong> </span>
                            </p>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles} `} >Taxa de entrega:</span>
                                <span className={`${textStyles}`} > <strong>  R$ {deliveryPrice} </strong> </span>
                            </p>
                            <p className="grid grid-cols-2 items-center gap-20">
                                <span className={`${textStyles}`} >Total a pagar: </span>
                                <span className={`${textStyles} w-`} > <strong>  R$ {totalPriceOfProducts + deliveryPrice} </strong> </span>
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