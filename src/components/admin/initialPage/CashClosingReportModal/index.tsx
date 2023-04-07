import { getOrdersProductsData } from "@/src/helpers/getOrdersProductsData";
import { api, supabase } from "@/src/server/api";
import {
  iAdditionals,
  iCashBox,
  iOrdersProducts,
  iOrdersWithFKData,
  iProducts,
  iSelects,
  iUserDetails,
} from "@/src/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";

interface CashClosingReportModalProps {
  setOpenCashBoxClosingReportModal: Dispatch<SetStateAction<boolean>>;
  openCashBoxClosingReportModal: boolean;
  ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
  restaurantId: number;
  cashBoxState: iCashBox["data"] | undefined;
  billing: number;
}

export default function CashClosingReportModal({
  ordersGroupedByOrderStatus,
  restaurantId,
  cashBoxState,
  billing,
  openCashBoxClosingReportModal,
  setOpenCashBoxClosingReportModal,
}: CashClosingReportModalProps) {
  const [ordersProducts, setOrdersProducts] = useState<iOrdersProducts["data"]>(
    []
  );
  const [additionals, setAdditionals] = useState<iAdditionals["data"]>([]);
  const [selects, setSelects] = useState<iSelects["data"]>([]);
  const [products, setProducts] = useState<iProducts["data"]>([]);
  const [usersData, setUsersData] = useState<iUserDetails["data"] | null>(null);
  const CashBoxReportComponent = useRef<HTMLDivElement>(null);

  const user = useUser();

  const moment = new Date();
  const cashBoxOpenedAt = new Date(cashBoxState?.opened_at!);

  useEffect(() => {
    async function fetchData() {
      const ordersProductsData = await api.get(`api/orders_products`);
      setOrdersProducts(ordersProductsData.data);
      const additionalsData = await api.get(`api/additionals/${restaurantId}`);
      setAdditionals(additionalsData.data);
      const productsData = await api.get(`api/products/${restaurantId}`);
      setProducts(productsData.data);
      const getUserData = await supabase
        .from("user_details")
        .select()
        .eq("user_id", user?.id);
      if (getUserData.data) setUsersData(getUserData.data[0]);
      const selectsData = await api.get(`api/selects/${restaurantId}`);
      setSelects(selectsData.data as iSelects["data"]);
    }
    fetchData();
  }, [restaurantId, user]);

  async function handleCloseCashBox() {
    if (
      ordersGroupedByOrderStatus["em análise"] ||
      ordersGroupedByOrderStatus["a caminho"]
    ) {
      toast.error(
        "Para fechar o caixa, todos os pedidos precisam ser entregues.",
        {
          theme: "light",
        }
      );
      return;
    }
    const cashBox = await api.post("api/cash_boxes/close", {
      restaurant_id: restaurantId,
    });
    setOpenCashBoxClosingReportModal(false);
  }
  interface Payment {
    payment_method: string;
    value: number;
  }

  function getPaymentTotals(orders: iOrdersWithFKData[]): Payment[] {
    const paymentTotals: Payment[] = [];
    if (!orders) return [];
    orders.forEach((order) => {
      const paymentMethod = order.payment_methods.name;
      const orderValue = getOrderValue(order);

      const paymentTotalIndex = paymentTotals.findIndex(
        (payment) => payment.payment_method === paymentMethod
      );

      if (paymentTotalIndex === -1) {
        paymentTotals.push({
          payment_method: paymentMethod,
          value: orderValue,
        });
      } else {
        paymentTotals[paymentTotalIndex].value += orderValue;
      }
    });

    return paymentTotals;
  }

  function getOrderValue(order: iOrdersWithFKData): number {
    const ordersProductFiltered = ordersProducts.filter(
      (op) => op.order_id === order.id
    );

    const totalPriceOfOrder = getOrdersProductsData({
      ordersProducts: ordersProductFiltered,
      additionals,
      products,
      selects,
    }).reduce((acc: number, item: any) => acc + item.totalPrice, 0);

    const deliveryFees = order.delivery_fees ? order.delivery_fees.fee : 0;
    return deliveryFees + totalPriceOfOrder;
  }

  const textStyles = "text-[10px]";

  let totalValueOfDoneOrders: any;

  if (!ordersGroupedByOrderStatus) {
    totalValueOfDoneOrders = 0;
  } else {
    totalValueOfDoneOrders = getPaymentTotals(
      ordersGroupedByOrderStatus["entregue"]
    );
  }

  const canceledOrders = ordersGroupedByOrderStatus["cancelado"];

  const totalValueOfCanceledOrdersGroupedByPaymentMethod =
    getPaymentTotals(canceledOrders);

  const totalValueOfCanceledOrders =
    totalValueOfCanceledOrdersGroupedByPaymentMethod.reduce((acc, current) => {
      return acc + current.value;
    }, 0);

  return (
    <>
      <div className="flex items-center gap-3">
        <Dialog.Root open={openCashBoxClosingReportModal}>
          <Dialog.Trigger></Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              onClick={() => setOpenCashBoxClosingReportModal(false)}
              className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out"
            />
            <Dialog.Content
              ref={CashBoxReportComponent}
              className="hideShadowToPrint fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[298px] bg-white shadow-md p-6"
            >
              <Dialog.Title className="text-base w-full uppercase text-center font-semibold mb-6">
                Extrato de Caixa
              </Dialog.Title>

              <div className="max-w-full">
                <p className={`${textStyles}`}>
                  Usuário:{" "}
                  <span className="font-bold">
                    {usersData ? usersData.name : null}
                  </span>
                </p>
                <p className={`${textStyles} mb-2`}>
                  Email: <span className="font-bold">{user?.email}</span>
                </p>

                {cashBoxState ? (
                  <p className={`${textStyles}`}>
                    Data de abertura:{" "}
                    <span className="font-bold">
                      {format(cashBoxOpenedAt, "P", {
                        locale: ptBR,
                      })}{" "}
                      {format(cashBoxOpenedAt, "HH")} {":"}{" "}
                      {format(cashBoxOpenedAt, "mm")}
                    </span>
                  </p>
                ) : null}
                <p className={`${textStyles}`}>
                  Saldo abertura: <span className="font-bold">0,00</span>
                </p>
                <p className={`${textStyles}`}>
                  Data de fechamento:{" "}
                  <span className="font-bold">
                    {format(moment, "P", { locale: ptBR })}{" "}
                    {format(moment, "HH")} {":"}
                    {format(moment, "mm")}
                  </span>
                </p>
                <p className={`${textStyles}`}>
                  Saldo fechamento:{" "}
                  <span className="font-bold">
                    {billing.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </p>
                <hr className="my-2" />
                <h3 className="text-xs w-full uppercase text-center font-bold my-3">
                  Valores totais do caixa
                </h3>

                <p className="text-base font-semibold mb-2">Entradas</p>
                {cashBoxState
                  ? totalValueOfDoneOrders.map(
                      (paymentMethods: any, index: any) => {
                        return (
                          <p
                            key={index}
                            className={`${textStyles}  font-medium`}
                          >
                            {" "}
                            {paymentMethods.payment_method}: R${" "}
                            {paymentMethods.value.toLocaleString("pt-BR", {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            })}{" "}
                          </p>
                        );
                      }
                    )
                  : null}
                <hr className="my-2" />
                <p className="text-base font-semibold mb-2">Cancelados</p>
                <p>
                  {canceledOrders ? (
                    <span>R$&nbsp;{totalValueOfCanceledOrders}</span>
                  ) : null}
                </p>
              </div>

              <Dialog.Close
                className="fixed top-3 right-3 text-gray-600 hideButtonToPrint"
                onClick={() => setOpenCashBoxClosingReportModal(false)}
              >
                <FiX size={22} />
              </Dialog.Close>

              <div className="flex flex-col items-center gap-3 w-full mt-6 hideButtonToPrint">
                <ReactToPrint
                  copyStyles={true}
                  content={() => CashBoxReportComponent.current}
                  onAfterPrint={() => handleCloseCashBox()}
                  trigger={() => {
                    return (
                      <CardapioDigitalButton
                        name="Imprimir e fechar o caixa"
                        w="w-full"
                        h="h-8"
                      />
                    );
                  }}
                />

                <ReactToPrint
                  copyStyles={true}
                  content={() => CashBoxReportComponent.current}
                  trigger={() => {
                    return (
                      <CardapioDigitalButton
                        name="Imprimir"
                        w="w-full"
                        h="h-8"
                      />
                    );
                  }}
                />
                <CardapioDigitalButton
                  onClick={() => handleCloseCashBox()}
                  name="Fechar caixa"
                  w="w-full"
                  h="h-8"
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
