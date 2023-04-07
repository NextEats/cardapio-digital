import { ProductContext } from "@/src/contexts/ProductContext";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsFillPencilFill, BsThreeDotsVertical } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { CategoriesModal } from "./CategoriesModal";
import { CreateAdditional } from "./CreateAdditional";
import { UpdateAdditional } from "./UpdateAdditional";

import { getPathByPictureUrl } from "@/src/helpers/getPathByPictureUrl";
import { supabase } from "@/src/server/api";
import { iAdditional, iProductAdditionals } from "@/src/types/types";

interface iAdditionalsModalProps {
  type: "list" | "select_additionals";
}

export function Additionals({ type }: iAdditionalsModalProps) {
  const {
    additionals,
    updateAdditionalState,
    setAdditionals,
    selectAdditionalState,
    productEditDataState,
    updateProductState,
  } = useContext(ProductContext);
  const [updateAdditional, setUpdateAdditional] = updateAdditionalState;
  const [selectAdditional, setSelectAdditional] = selectAdditionalState;
  const [productEditData, setProductEditData] = productEditDataState;
  const [product_additionals, setProduct_additionals] = useState<
    iProductAdditionals["data"]
  >([]);

  useEffect(() => {
    if (updateProductState[0] !== null) {
      const getPoductAdditionals = async () => {
        const { data } = await supabase
          .from("product_additionals")
          .select("*")
          .eq("product_id", updateProductState[0]!.id);
        data ? setProduct_additionals([...data]) : null;
      };
      getPoductAdditionals();
    }
  }, [updateProductState]);

  const handleDeleteAdditional = async (additional: iAdditional["data"]) => {
    const { path } = getPathByPictureUrl(additional.picture_url);
    await Promise.all([
      supabase.storage.from("teste").remove([path!]),
      supabase.from("additionals").delete().eq("id", additional.id),
    ]);
    setAdditionals((state) => {
      state.splice(
        state.findIndex((a) => a.id === additional.id),
        1
      );
      return [...state];
    });
    alert("adicional deletado com sucesso.");
  };

  const handleSelectAdditional = async (additional: iAdditional["data"]) => {
    if (selectAdditional.some((a) => a.id === additional.id)) {
      setSelectAdditional((state) => {
        state.splice(
          state.findIndex((a) => a.id === additional.id),
          1
        );
        return [...state];
      });
      if (updateProductState[0] !== null) {
        if (
          product_additionals.some((pa) => pa.additional_id === additional.id)
        ) {
          setProductEditData((state) =>
            state
              ? [
                  ...state,
                  {
                    select_id: null,
                    additional_id: additional.id,
                    type: "deleted",
                  },
                ]
              : [
                  {
                    select_id: null,
                    additional_id: additional.id,
                    type: "deleted",
                  },
                ]
          );
          return;
        }
      }
      return;
    }
    if (updateProductState[0] !== null) {
      setProductEditData((state) =>
        state
          ? [
              ...state,
              { select_id: null, additional_id: additional.id, type: "added" },
            ]
          : [{ select_id: null, additional_id: additional.id, type: "added" }]
      );
    }
    setSelectAdditional((state) => [...state, additional]);
  };

  const handleChangeAdditionalStatus = async (
    additional: iAdditional["data"]
  ) => {
    console.log("adasd");
    const { data } = await supabase
      .from("additionals")
      .update({ active: !additional.active })
      .eq("id", additional.id)
      .select("*");
    if (!data) return null;
    setAdditionals((state) => {
      state.map((a) => {
        if (a.id === data[0].id) {
          a.active = !a.active;
        }
      });
      return [...state];
    });
  };

  if (!additionals) return null;
  return (
    <div className={``}>
      {updateAdditional ? <UpdateAdditional /> : null}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          {type === "select_additionals" ? (
            <button className="text-blue-400">Selecionar</button>
          ) : (
            <button className=" px-[15px] font-medium leading-none outline-none text-blue-400">
              {additionals.length} Adicionais
            </button>
          )}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className="data-[state=open]:animate-contentShow fixed top-0 right-0 3xs:top-[40%] 3xs:left-[50%] h-screen 3xs:h-[500px] w-screen 3xs:w-[500px] 
                    2md:w-[900px] 3xs:translate-x-[-50%] 3xs:translate-y-[-50%] 3xs:rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          >
            <Dialog.Title className="text-xl flex flex-1 items-center justify-between m-0 text-[17px] font-bold">
              Adicionais
              <div className="flex items-center gap-2">
                <CategoriesModal categoryType="additional_category" />
                <CreateAdditional />
              </div>
            </Dialog.Title>

            <div className="flex flex-wrap gap-3 mt-3">
              {additionals.map((additional) => {
                const isAdditionalSelected =
                  type === "select_additionals" &&
                  selectAdditional.some((a) => a.id === additional.id);
                return (
                  <div
                    onClick={() =>
                      type === "select_additionals"
                        ? handleSelectAdditional(additional)
                        : null
                    }
                    key={additional.id}
                    className={` w-full 2md:w-[417px] h-[80px] rounded-sm bg-white shadow-sm flex gap-3 relative
                                        ${
                                          isAdditionalSelected
                                            ? "border-2 border-blue-400"
                                            : ""
                                        }`}
                  >
                    <Image
                      className="rounded-sm object-cover w-[80px] sm:h-full "
                      src={additional.picture_url}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <div className="flex flex-col mt-2 w-full">
                      <p className=" w-full pr-9 3xs:pr-0 flex items-center gap-2 3xs:w-[280px] truncate text-lg font-semibold">
                        {!additional.active ? (
                          <div className="h-3 w-3 z-10 bg-red-400 rounded-full"></div>
                        ) : null}
                        {additional.name}
                      </p>
                      <span className="">
                        {" "}
                        R${" "}
                        {additional.price.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                      </span>
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger className="absolute top-3 right-4">
                        <BsThreeDotsVertical
                          size={18}
                          className="text-gray-400"
                        />
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            onClick={() => setUpdateAdditional(additional)}
                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] 
                                                            relative pl-[25px]"
                          >
                            <BsFillPencilFill size={16} />
                            <span className="text-base">Editar adicional</span>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            onClick={() =>
                              handleChangeAdditionalStatus(additional)
                            }
                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] 
                                                            relative pl-[25px]"
                          >
                            <BsFillPencilFill size={16} />
                            <span className="text-base">
                              {" "}
                              {additional.active
                                ? "Inativar adicional"
                                : "Ativar adicional"}{" "}
                            </span>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            onClick={() => handleDeleteAdditional(additional)}
                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] 
                                                            relative pl-[25px]"
                          >
                            <BsFillPencilFill size={16} />
                            <span className="text-base">Apagar adicional</span>
                          </DropdownMenu.Item>
                          <DropdownMenu.Arrow className="fill-white" />
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </div>
                );
              })}
            </div>

            <Dialog.Close
              asChild
              className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
            >
              <FiX size={16} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
