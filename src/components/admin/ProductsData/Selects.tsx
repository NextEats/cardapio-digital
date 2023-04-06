
import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useEffect, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsFillPencilFill, BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import { CreateSelect } from "./CreateSelect";
import { CreateProductOption } from "./CreateProductOption";
import { iProductOption, iProductSelects, iSelect } from "@/src/types/types";
import { UpdateSelect } from "./UpdateSelects";
import { UpdateProductOption } from "./UpdateProductOption";
import { supabase } from "@/src/server/api";
import { getPathByPictureUrl } from "@/src/helpers/getPathByPictureUrl";
import { promise } from "zod";

interface iSelectsProps {
    type: "list" | "select_selects"
}

export function Selects({ type }: iSelectsProps) {
    const { selectsState, product_options_state, selectSelectState, productEditDataState, updateProductState } = useContext(ProductContext)
    const [setectSelect, setSelectSelect] = selectSelectState
    const [selectToCreateOption, setSelectToCreateOption] = useState<iSelect["data"] | null>(null)
    const [isUpadatingSelect, setIsUpadatingSelect] = useState<iSelect["data"] | null>(null)
    const [updateOption, setUpdateOption] = useState<iProductOption["data"] | null>(null)

    const [productEditData, setProductEditData] = productEditDataState
    const [selects, setSelects] = selectsState
    const [product_options, setProduct_options] = product_options_state

    const [product_selects, setProduct_selects] = useState<iProductSelects["data"]>([])

    useEffect(() => {
        if (updateProductState[0] !== null) {
            const getPoductAdditionals = async () => {
                const { data } = await supabase.from("product_selects").select("*").eq("product_id", updateProductState[0]!.id)
                data ? setProduct_selects([...data]) : null
            }
            getPoductAdditionals()
        }
    }, [updateProductState])

    const handleSelectSelect = (select: iSelect["data"]) => {
        if (setectSelect.some(s => s.id === select.id)) {
            setSelectSelect((state) => {
                state.splice(state.findIndex((s) => s.id === select.id), 1);
                return [...state];
            });
            if (updateProductState[0] !== null) {
                if (product_selects.some(ps => ps.select_id === select.id)) {
                    setProductEditData(state => state ?
                        [...state, { additional_id: null, select_id: select.id, type: "deleted" }] :
                        [{ additional_id: null, select_id: select.id, type: "deleted" }]
                    )
                    return
                }
            }
            return
        }
        if (updateProductState[0] !== null) {
            setProductEditData(state => state ?
                [...state, { additional_id: null, select_id: select.id, type: "added" }] :
                [{ additional_id: null, select_id: select.id, type: "added" }]
            )
        }
        setSelectSelect(state => [...state, select])
    }

    const handleDeleteSelect = async (select: iSelect["data"]) => {
        const { data } = await supabase.from("product_selects").select("*").eq("select_id", select.id)

        if (data && data.length > 0) {
            const isConfirmed = confirm("Esta personalização está a alguns produtos. Tem certeza de que deseja excluí-la?");
            if (isConfirmed) {
                await supabase.from("product_selects").delete().eq("select_id", select.id)
                await deleteSelect(select)
            } else {
                return
            }
        }
        await deleteSelect(select)
    }

    const deleteSelect = async (select: iSelect["data"]) => {

        await Promise.all([
            product_options?.forEach(async op => {
                if (op.select_id === select.id) {
                    await handleDeleteOption(op)
                }
            })
        ])

        await supabase.from("selects").delete().eq("id", select.id)
        setSelects(state => {
            state?.splice(state.findIndex(s => s.id === select.id), 1)
            return [...state!]
        })

    }

    const handleChangeSelectStatus = async (select: iSelect["data"]) => {
        await supabase.from("selects").update({
            active: !select.active
        }).eq("id", select.id)
        setSelects(state => {
            const newState = state?.map(s => {
                if (select.id === s.id) {
                    return { ...s, active: !select.active }
                }
                return s
            })
            return newState!
        })
    }
    const handleDeleteOption = async (option: iProductOption["data"]) => {
        const { path } = getPathByPictureUrl(option.picture_url)

        const { error, data } = await supabase.storage.from("teste").remove([path!])
        if (error !== null) {
            alert("Erro ao excluir a opção, por favor contate um administrador!")
            return
        }
        await supabase.from("product_options").delete().eq("id", option.id)
        setProduct_options(state => {
            state?.splice(state.findIndex(op => op.id === option.id), 1)
            return [...state!]
        })
    }
    const handleChangeOptionStatus = async (option: iProductOption["data"]) => {
        await supabase.from("product_options").update({
            active: !option.active
        }).eq("id", option.id)
        setProduct_options(state => {
            const newState = state?.map(op => {
                if (option.id === op.id) {
                    return { ...op, active: !option.active }
                }
                return op
            })
            return newState!
        })
    }

    if (!selects) return null
    return (
        <div className={``}>
            <UpdateSelect isUpadatingSelect={isUpadatingSelect} setIsUpadatingSelect={setIsUpadatingSelect} />
            <UpdateProductOption
                updateOption={updateOption}
                setUpdateOption={setUpdateOption}
            />
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    {type === "select_selects" ?
                        <button className="text-blue-400">Selecionar</button> :
                        <button className="px-[15px] font-medium leading-none outline-none text-blue-400">
                            {selects.length} Personalizações
                        </button>
                    }
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow  z-30 fixed top-0 right-0 3xs:top-[40%] 3xs:left-[50%] h-screen 3xs:h-[500px] w-screen 3xs:w-[500px] 
                    2md:w-[900px] 3xs:translate-x-[-50%] 3xs:translate-y-[-50%] 3xs:rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-4">
                            Personalizações
                            <CreateSelect />
                        </Dialog.Title>

                        {selectToCreateOption ? <CreateProductOption
                            selectToCreateOption={selectToCreateOption}
                            setSelectToCreateOption={setSelectToCreateOption}
                        /> : null}
                        <div className="w-full h-[85%]">
                            <div className="flex flex-col gap-3 h-full w-full 3xs:h-[400px] overflow-auto scrollbar-custom">
                                {selects.map(select => {
                                    return (
                                        <div key={select.id} className="w-full flex flex-col gap-2">
                                            <div className="flex items-center justify-between pr-3">
                                                <div className="flex items-center gap-2">
                                                    {type === "select_selects" ?
                                                        <input type="checkbox" className="h-5 w-5" onClick={() => handleSelectSelect(select)} />
                                                        : null}
                                                    <span className="w-[160px] truncate"> {select.name} </span>
                                                    {!select.active ?
                                                        <div className="h-3 w-3 z-10 bg-red-400 rounded-full"></div>
                                                        : null}
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    {select.has_default_price ?
                                                        <span className=""> R$ {select.price?.toLocaleString("pt-BR", {
                                                            minimumFractionDigits: 2, maximumFractionDigits: 2
                                                        })} </span>
                                                        : null}
                                                    <DropdownMenu.Root>
                                                        <DropdownMenu.Trigger >
                                                            <BsThreeDotsVertical size={16} className="text-gray-400" />
                                                        </DropdownMenu.Trigger>
                                                        <DropdownMenu.Portal>
                                                            <DropdownMenu.Content
                                                                className="min-w-[220px] bg-white rounded-md p-[5px] z-30 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                                                sideOffset={5}
                                                            >
                                                                <DropdownMenu.Item
                                                                    onClick={() => setIsUpadatingSelect(select)}
                                                                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
                                                                >
                                                                    <BsFillPencilFill size={16} />
                                                                    <span className="text-base">Editar personalização</span>
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    onClick={() => handleDeleteSelect(select)}
                                                                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
                                                                >
                                                                    <BsFillPencilFill size={16} />
                                                                    <span className="text-base">Excluir personalização</span>
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    onClick={() => handleChangeSelectStatus(select)}
                                                                    className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
                                                                >
                                                                    <BsFillPencilFill size={16} />
                                                                    <span className="text-base">
                                                                        {!select.active ? 'Ativar personalização' : 'Inativar personalização'}
                                                                    </span>
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Arrow className="fill-white" />
                                                            </DropdownMenu.Content>
                                                        </DropdownMenu.Portal>
                                                    </DropdownMenu.Root>

                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {product_options?.map((product_option) => {
                                                    if (product_option.select_id !== select.id) return
                                                    return <div key={product_option.id} >
                                                        {/* <label
                                                        className=""
                                                        htmlFor={select.name + product_option.id}
                                                    > */}
                                                        <div className={`w-[100px] h-[100px] rounded-lg relative cursor-pointer`} >
                                                            <DropdownMenu.Root >
                                                                <DropdownMenu.Trigger className="absolute top-1 right-1 z-30">
                                                                    <BsThreeDotsVertical size={16} className="text-black" />
                                                                </DropdownMenu.Trigger>
                                                                <DropdownMenu.Portal>
                                                                    <DropdownMenu.Content
                                                                        className="min-w-[220px] bg-white rounded-md p-[5px] z-30 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                                                        sideOffset={5}
                                                                    >
                                                                        <DropdownMenu.Item
                                                                            onClick={() => setUpdateOption(product_option)}
                                                                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px]  relative pl-[25px]"
                                                                        >
                                                                            <BsFillPencilFill size={16} />
                                                                            <span className="text-base">Editar opção</span>
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Item
                                                                            onClick={() => handleDeleteOption(product_option)}
                                                                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
                                                                        >
                                                                            <BsFillPencilFill size={16} />
                                                                            <span className="text-base">Excluir opção</span>
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Item
                                                                            onClick={() => handleChangeOptionStatus(product_option)}
                                                                            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
                                                                        >
                                                                            <BsFillPencilFill size={16} />
                                                                            <span className="text-base">
                                                                                {product_option.active ? 'Inativar opção' : 'Ativar opção'}
                                                                            </span>
                                                                        </DropdownMenu.Item>
                                                                        <DropdownMenu.Arrow className="fill-white" />
                                                                    </DropdownMenu.Content>
                                                                </DropdownMenu.Portal>
                                                            </DropdownMenu.Root>
                                                            <div className={`w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]`}></div>
                                                            {!product_option.active ?
                                                                <div className="h-3 w-3 z-10 bg-red-400 absolute top-2 left-2 rounded-full"></div>
                                                                : null}
                                                            <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium">
                                                                {product_option.name}
                                                            </span>
                                                            {product_option.picture_url && (
                                                                <Image
                                                                    src={product_option.picture_url}
                                                                    alt={product_option.name}
                                                                    className={'w-full h-full relative rounded-lg object-cover'}
                                                                    width={326}
                                                                    height={358}
                                                                />
                                                            )}
                                                        </div>
                                                        {/* </label> */}
                                                    </div>
                                                })}
                                                <button
                                                    onClick={() => setSelectToCreateOption(select)}
                                                    className="w-[100px] h-[100px] rounded-lg flex items-center justify-center border border-gray-300 cursor-pointer">
                                                    <BsPlusLg size={32} />
                                                </button>
                                            </div>


                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Dialog.Close
                            asChild
                            className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                        >
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    )
}