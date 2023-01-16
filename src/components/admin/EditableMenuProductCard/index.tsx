import { useReducer } from "react";
import { editableProductReducer } from "../../../reducers/aditableProduct/reducer";
import HeadersCard from "./HeadersCard";


export default function EditableMenuProductCard() {

    const [state, dispatch] = useReducer(editableProductReducer, {
        productInformation: {
            name: '',
            description: '',
            price: '',
        },
        isEditingInfo: true,
        picture_url: '',
        isEditingPicture: true,
    });

    return (
        <div className="w-[360px] 2xl:w-[440px] fixed right-0 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] p-4 2md:sticky 2md:h-auto">
            {/* <div
            className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
            // onClick={() => setShowProduct(false)}
          ></div> */}

            <HeadersCard state={state} dispatch={dispatch} />
        </div>
    )
}