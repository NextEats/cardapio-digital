import { randomUUID } from "crypto";
import { startTransition, useId } from "react";
import { IIngredientOptionsData, option } from "../../types/product"
import { EditableProductActions } from "./actions";

// interface iIngredientOptionsReducer {
//     id: string;
//     name: string;
//     picture_url: string;
// }

// interface iIngredientsReducer {
//     id: string;
//     name: string;
//     options: option[];
// }

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
    ingredients: IIngredientOptionsData[],
    isEditingIngradientNameId: string,
    isAddingNewIngradient: boolean,

    // OPTIONS
    ingredientIdToShowModalAddNewOption: string,
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
        case EditableProductActions.IS_ADDING_NEW_INGREDIENT:
            return { ...state, isAddingNewIngradient: action.payload.isAddingNewIngradient }
            break
            case EditableProductActions.ADD_NEW_INGREDIENT:
                state.ingredients.push( {
                    id: action.payload.ingredientId,
                    name: action.payload.ingredientName,
                    options: []
                } )
                return { ...state }
                break
        case EditableProductActions.IS_EDITING_INGREDIENT_NAME:
            return { ...state, isEditingIngradientNameId: action.payload.isEditingIngradientNameId }
            break
        case EditableProductActions.EDIT_INGREDIENT_NAME:
            const ingredient = state.ingredients.map( ( ingredient ) => {
                if (ingredient.id == action.payload.ingredientId) {
                    ingredient.name = action.payload.ingredientName
                    return ingredient
                }
            } )
            return { ...state, ingredient }
            break
            // Remove ingredient
        case EditableProductActions.REMOVE_INGREDIENT:
            const ingredientsWithoutIngredientRemoved = state.ingredients.filter( ingredient  => ingredient.id !== action.payload.ingredientId)
            return { ...state, ingredients: ingredientsWithoutIngredientRemoved }
            break
        //  ADD OPTION TO INGREDIENT OPRIONS 
        case EditableProductActions.IS_ADDING_NEW_OPTION_TO_INGREDIENT:
            return { ...state, ingredientIdToShowModalAddNewOption: action.payload.ingredientIdToShowModalAddNewOption }
            break
        case EditableProductActions.ADD_NEW_OPTION_TO_INGREDIENT:
            const ingredientIndex = state.ingredients.findIndex( ingredient => ingredient.id == action.payload.ingredientIdToAddNewOption  )
            state.ingredients[ingredientIndex].options.push( { 
                    id: action.payload.id,
                    name: action.payload.optionName,
                    picture_url: action.payload.optionPicture_url,
                })
            return { ...state  }
            break
        case EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT:
            const ingredientIndexToRemoveOption = state.ingredients.findIndex( ingredient => ingredient.id === action.payload.ingredientId )
            const optionIndex = state.ingredients[ingredientIndexToRemoveOption].options.findIndex( option => option.id === action.payload.optionId)
            state.ingredients[ingredientIndexToRemoveOption].options.splice(optionIndex, 1)
            return { ...state }
            break
        default:
            return state
    }
}