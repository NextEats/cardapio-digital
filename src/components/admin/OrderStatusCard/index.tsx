import Image from "next/image";
import { Dispatch, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";
import { switchToDeliveredAction, switchToTheWayAction } from "../../../reducers/statusReducer/action";
import { iStatusReducer } from "../../../reducers/statusReducer/reducer";
import { supabase } from "../../../server/api";
import { iInsertOrders } from "../../../types/types";

interface IOrderStatusCardProps {
  statusName: string,
  orders: iInsertOrders["data"],
  dispatch: Dispatch<any>,
  state: iStatusReducer,
}

export default function OrderStatusCard({ statusName, orders, state, dispatch }: IOrderStatusCardProps) {
  const tdStyle =
    "border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium";
  const [nn, setnn] = useState(0)
  function switchToTheWay(orderId: number) {
    if (statusName === "Em produção") {
      const aCaminhoStatus = state.orderStatuss?.find(status => status.status_name === "a caminho")
      const ordersproductFiltered = state.ordersProducts?.filter(op => op.order_id === orderId)
      ordersproductFiltered.forEach(async op => {
        const ordersProductData = await supabase.from("orders_products").update({ order_status_id: aCaminhoStatus?.id }).eq("id", op.id).select("*")
      })
      dispatch(switchToTheWayAction(orderId))
    } else if (statusName === "A caminho") {
      const entregueStatus = state.orderStatuss?.find(status => status.status_name === "entregue")
      const ordersproductFiltered = state.ordersProducts?.filter(op => op.order_id === orderId)
      ordersproductFiltered.forEach(async op => {
        const ordersProductData = await supabase.from("orders_products").update({ order_status_id: entregueStatus?.id }).eq("id", op.id).select("*")
      })
      dispatch(switchToDeliveredAction(orderId))
    } else {

    }
  }

  return (
    <div className="flex flex-1 min-h-[240px]  lg:w-full flex-col shadow-sm px-4 pt-2 pb-4">
      <div className=" flex items-center justify-between mb-4">
        <h2 className="text-base font-bold"> {statusName} </h2>
        <span className="text-md font-medium">{orders.length}</span>
      </div>

      <table className="w-full ">
        <tbody className="w-full border-collapse ">
          {
            orders?.map(order => {
              return <tr key={order.id} className="w-full h-4 text-center ">
                <td className=" min-w-8 mx-2">
                  <Image
                    src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
                    alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                    className="rounded-full "
                    width={26}
                    height={26}
                  />
                </td>
                <td className="text-left text-sm font-medium px-2 hidden 2xs:table-cell md:hidden xl:table-cell">
                  <span className=" " >
                    Fulano da silva
                  </span>
                </td>
                <td className={`${tdStyle} px-5  hidden sm:table-cell md:hiden 2xl:table-cell`}>3</td>
                {/* <td className={tdStyle}> 00 : 15 </td> */}
                <td className={`${tdStyle}`}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full pl-[1px] w-8 h-6 bg-gray-400 cursor-pointer flex items-center justify-center">
                      <AiFillEye className="text-xl text-white" />
                    </div>
                    {
                      statusName !== "Entregue" ? <button
                        onClick={() => switchToTheWay(order.id!)}
                        className=" w-12 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center">
                        <BiArrowFromLeft className="text-xl text-white" />
                      </button> : null
                    }
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}
