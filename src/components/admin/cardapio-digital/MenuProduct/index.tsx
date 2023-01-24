import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { EditableProductActions } from "../../../../reducers/aditableProduct/actions";
import { iPayloadProduct } from "../../../../reducers/aditableProduct/reducer";
import { iProduct } from "../../../../types/types";

interface iMenuProduct {
    prosuctIsOutOfStock?: boolean;
    product: iProduct["data"],
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
    setProductId: Dispatch<SetStateAction<number | null>>
    setProductModal: Dispatch<SetStateAction<boolean>>,
}

export default function MenuProduct({ product, dispatch, setProductId, setProductModal }: iMenuProduct) {
 
    function viewProduct() {
        setProductModal(true)
        setProductId(product.id);
        dispatch({
            type: EditableProductActions.IS_VIEWING_UPDATING_OR_ADDING,
            payload: { 
                isViewingUpdatingOrAdding: 'VIEWING'
            }
        })
    }
  
    return (

        <div 
            onClick={() => viewProduct()}
            className="bg-white shadow-sm h-28 flex flex-1 items-center rounded-md p-2 hover:shadow-md hover:transition-all ease-in-out cursor-pointer">
            <Image
                className="rounded-md h-full"
                src={product.picture_url}
                alt=""
                width={100}
                height={40}
            />
            <div className="w-full flex items-center justify-between px-2">
                <div className="flex flex-col items-start justify-start gap-1 overflow-hidden">
                    <span className="text-base font-bold text-gray-600 " > {product.name} </span>
                    <p className="text-sm font-medium text-gray-500 leading-3 " > {product.description} </p>
                    <span className="text-xs font-semibold text-green-500 " > R$ {product.price} </span>
                </div>
            </div>
        </div>
    );
}
