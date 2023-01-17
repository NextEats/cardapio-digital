import { randomUUID } from "crypto";
import { useId } from "react";
import { IIngredientOptionsData, option } from "../../types/product"
import { EditableProductActions } from "./actions";

interface iIngredientOptions {
    id: string;
    name: string;
    picture_url: string;
}

interface iIngredients {
    id: string;
    name: string;
    options: iIngredientOptions[];
}

export interface IEditableProductReducerData {

    // PRODUCT INFORMATION
    isEditingInfo: boolean,
    picture_url: string,
    isEditingPicture: boolean,
    // INGREDIENT
    productInformation: {
        name: string,
        description: string,
        price: string,
    },
    ingredients: iIngredients[],
    isEditingIngradientName: boolean,
    isAddingIngradientOption: boolean,
}

export function editableProductReducer(state: IEditableProductReducerData, action: any) {
    switch (action.type) {
        case EditableProductActions.IS_EDITING_INFORMATION:
            return { ...state, isEditingInfo: action.payload.isEditingInfo }
            break
        case EditableProductActions.SET_PRODUCT_INFORMATION:
            return { 
                ...state,
                productInformation: {
                    name: action.payload.name,
                    description: action.payload.description,
                    price: action.payload.price,
                } }
            break
        case EditableProductActions.IS_EDITING_PICTURE:
            return { ...state, isEditingPicture: action.payload.isEditingPicture }
            break
        case EditableProductActions.SET_PICTURE_URL:
            return { ...state, picture_url: action.payload.picture_url }
            break
            // INGREDIENT 
        case EditableProductActions.IS_EDITING_INGREDIENT_NAME:
            return { ...state, isEditingIngradientName: action.payload.isEditingIngradientName }
            break
        case EditableProductActions.SET_INGREDIENT_NAME:
            state.ingredients.push( {
                id: action.payload.ingredientId,
                name: action.payload.ingredientName,
                options: state.ingredients[0].options
            } )
            return { ...state }
            break
        default:
            return state
    }
}