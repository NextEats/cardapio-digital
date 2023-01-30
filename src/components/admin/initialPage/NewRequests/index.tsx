import Image from "next/image";
import { Dispatch, useMemo, useState } from "react";
import { AiFillEye, AiOutlineCheck } from "react-icons/ai";
import { dataByOrderId } from "../../../../hooks/DataByOrderId";
import { getModalDataAction, showModalAction, switchToProductioAction } from "../../../../reducers/statusReducer/action";
import { iStatusReducer } from "../../../../reducers/statusReducer/reducer";
import { api, supabase } from "../../../../server/api";

interface iNewRequestProps {
  state: iStatusReducer,
  dispatch: Dispatch<any>,
}

export default function NewRequests({ state, dispatch }: iNewRequestProps) {

  const tdStyle = "border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium";


  async function moveToEmProduçãoCard(orderId: number) {

    const emProduçãoStatus = state.orderStatuss?.find(status => status.status_name === "em produção")
    const ordersproductFiltered = state.ordersProducts?.filter(op => op.order_id === orderId)
    ordersproductFiltered.forEach(async op => {
      const ordersProductData = await supabase.from("orders_products").update({ order_status_id: emProduçãoStatus?.id }).eq("id", op.id).select("*")
    })

    dispatch(switchToProductioAction(orderId))
    // window.location.reload()
  }

  function showModal(orderId: number) {
    dispatch(showModalAction())
    dispatch(getModalDataAction(orderId))
  }
  // const [orderId, setOrderId] = useState(0)
  // const [order, setOrder] = useState({})
  // useMemo(() => {
  //   const { address, client, phone, totalProductsPrice, productsFiltered } = dataByOrderId(state, orderId)
  //   setOrder({ address, client, phone, totalProductsPrice, productsFiltered })
  // }, [orderId, state])
  // console.log(order)

  const [addressState, setAddressState] = useState<{
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

  return (
    <div className="flex flex-1 flex-col min-h-[230px] bg-white w-auto shadow-sm px-6 pt-2 rounded-md ">
      <h2 className="text-base font-bold mb-4">Novos pedidos </h2>
      <div>
        <table className="w-full ">
          <tbody className="w-full border-collapse ">
            {
              state.emAnaliseOrders?.map(order => {
                // setOrderId(order.id!)
                const ordersProductsFiltered = state.ordersProducts.filter(op => op.order_id === order.id!)
                const productsFiltered = ordersProductsFiltered.map(op => {
                  return state.products[state.products.findIndex(p => op.product_id === p.id)]
                })
                const totalProductsPrice = productsFiltered.reduce((acc, p) => acc + p.price, 0)
                const client = state.clients.find(cl => cl.id === order.client_id)
                const contact = state.contacts.find(co => co.id === client?.contact_id)
                const phone = contact?.phone?.toString()

                const address = state.addresses.find(ad => ad.id === client?.address_id)


                const getAddress = async () => {
                  const res = await api.get(`https://viacep.com.br/ws/${address?.cep}/json/`)
                  return res
                }
                getAddress()

                return <tr key={order.id!} className="w-full h-4 text-center">
                  <td>
                    <Image
                      src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
                      alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                      className="rounded-full"
                      width={26}
                      height={26}
                    />
                  </td>
                  <td className="text-left h-4 text-sm font-medium p-2">
                    {client?.name}
                  </td>
                  <td className={`${tdStyle} w-16 hidden 3xs:table-cell`}> {productsFiltered.length} </td>
                  <td className={`${tdStyle} hidden 3xs:table-cell`}>R$ {totalProductsPrice} </td>
                  <td
                    className={`${tdStyle} w-auto text-ellipsis whitespace-nowrap overflow-hidden hidden sm:table-cell`}
                  >
                    {'( ' + phone?.slice(0, 2) + ' ) ' + phone?.slice(2, 7) + '-' + phone?.slice(7, phone.length)}
                  </td>
                  <td
                    className={`${tdStyle} w-auto text-ellipsis whitespace-nowrap overflow-hidden hidden lg:table-cell`}
                  >
                    {addressState.logradouro}, {address?.number} ...
                  </td>
                  <td className={`${tdStyle}`}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => showModal(order.id!)}
                        className="rounded-full pl-[1px] w-8 h-6 bg-gray-400 cursor-pointer flex items-center justify-center">
                        <AiFillEye className="text-xl text-white" />
                      </button>
                      <button
                        onClick={() => moveToEmProduçãoCard(order.id!)}
                        className=" w-10 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
