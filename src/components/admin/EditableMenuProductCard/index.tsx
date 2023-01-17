import { useReducer } from "react";
import { editableProductReducer } from "../../../reducers/aditableProduct/reducer";
import HeadersCard from "./HeadersCard";
import { Igredient } from "./Ingredient";


export default function EditableMenuProductCard() {

    const [state, dispatch] = useReducer(editableProductReducer, {
        isEditingInfo: true,
        picture_url: '',
        isEditingPicture: true,
        productInformation: {
            name: '',
            description: '',
            price: '',
        },
        //INGREDIENT
        ingredients: [
            {   
                id: '',
                name: '',
                options: [
                    {
                        id: '',
                        name: '',
                        picture_url: '',
                    }
                ],
            }
        ],
        isEditingIngradientNameId: '',
        isAddingNewIngradient: false,

        //  OPTIONS
        ingredientIdToShowModalAddNewOption: '',
    });

    return (
        <div className="w-[360px] 2xl:w-[468px] fixed right-0 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] p-4 2md:sticky 2md:h-auto">
            {/* <div
            className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
            // onClick={() => setShowProduct(false)}
          ></div> */}

            <HeadersCard state={state} dispatch={dispatch} />
            <Igredient state={state} dispatch={dispatch} />

        </div>
    )
}