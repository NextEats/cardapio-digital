import { ReducerWithoutAction, useReducer } from "react";
import { editableProductReducer, IEditableProductReducerData } from "../../../reducers/aditableProduct/reducer";
import HeadersCard from "./HeadersCard";


export default function EditableMenuProductCard() {

    const [state, dispatch] = useReducer(editableProductReducer, {
        name: '',
        description: '',
        price: '',
        isEditingName: true,
        isEditingPrice: true,
    });

    return (
        <div className="w-[360px] fixed right-0 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] p-4 2md:sticky 2md:h-auto">
            <HeadersCard state={state} dispatch={dispatch} />
        </div>
    )
}