import { useReducer } from "react";
import { editableProductReducer } from "../../../../reducers/aditableProduct/reducer";
import { Additional } from "./Additional";
import HeadersCard from "./HeadersCard";
import { Igredient } from "./Ingredients";


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
                name: '',
                // options: [
                //     {
                //         name: '',
                //         picture_url: '',
                //     }
                // ],
            }
        ],

        //  OPTIONS
        ingredientIdToShowModalAddNewOption: '',

        // ADDITIONAL
        additional: [
            {
                name: '',
                price: 0,
                picture_url: '',
            }
        ],
        showModalToUpdateAdditional: false,
    });

    return (
        <div className="w-[360px] 2xl:w-[468px] fixed right-0 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] p-4 2md:sticky 2md:h-auto">
            {/* <div
            className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
            // onClick={() => setShowProduct(false)}
          ></div> */}

            <HeadersCard state={state} dispatch={dispatch} />
            <Igredient state={state} dispatch={dispatch} />
            <Additional state={state} dispatch={dispatch} />
            <button
                disabled={!state.productInformation.name}
                className={`h-10 w-full flex items-center justify-center text-lg text-white font-semibold rounded-md transition-all ease-in-out
                duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-green-600 bg-green-300 cursor-pointer `}>
                Adicionar novo item
            </button>
        </div>
    )
}