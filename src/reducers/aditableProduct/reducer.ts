import { IAdditionalData, IIngredientOptionsData } from "../../types/product"
import { iAdditionals } from "../../types/types";
import { EditableProductActions } from "./actions";

export interface IEditableProductReducerData {

    // PRODUCT INFORMATION
    isEditingInfo: boolean,
    picture_url: string,
    isEditingPicture: boolean,
    productInformation: {
        name: string,
        description: string,
        price: string,
    },

    // INGREDIENT
    ingredients: IIngredientOptionsData[],
    isEditingIngradientNameId: string,
    isAddingNewIngradient: boolean,
    
    // OPTIONS
    ingredientIdToShowModalAddNewOption: string,
    
    // ADDITIONAL
    additional: iAdditionals,
    showModalToUpdateAdditional: boolean,
    isOpenAdditionalModal: boolean,
}

export interface iPayloadProduct {
    isEditingInfo?: boolean,
    picture_url?: string,
    isEditingPicture?: boolean,
    productInformation?: {
        name: string,
        description: string,
        price: string,
    },
    additionalName?: string,
    additionalPrice?: number,
    additionalPicture_url?: string,
    isOpenAdditionalModal?: boolean,
    showModalToUpdadeAdditional?: boolean,
    additionalId?: string,
    showModalToUpdateAdditional?: boolean,

    ingredientId?: string,
    ingredientName?: string,
    isEditingIngradientNameId?: string,
    isAddingNewIngradient?: boolean,
    ingredientIdToShowModalAddNewOption?: string,
    ingredientIdToAddNewOption?: string,
    optionName?: string,
    optionPicture_url?: string,
    id?: string,
    optionId?: string,

}

export interface iAction {
    type: string;
    payload: iPayloadProduct
}

export function editableProductReducer(state: IEditableProductReducerData, action: iAction) {
    switch (action.type) {
        case EditableProductActions.IS_EDITING_INFORMATION:
            return { ...state, isEditingInfo: action.payload.isEditingInfo }
            break
        case EditableProductActions.SET_PRODUCT_INFORMATION:
            return { 
                ...state,
                productInformation: {
                    name: action.payload.productInformation?.name,
                    description: action.payload.productInformation?.description,
                    price: action.payload.productInformation?.price,
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
                    id: action.payload.ingredientId!,
                    name: action.payload.ingredientName!,
                    options: []
                } )
                return { ...state }
                break
        case EditableProductActions.IS_UPDATING_INGREDIENT_NAME:
            return { ...state, isEditingIngradientNameId: action.payload.isEditingIngradientNameId }
            break
        case EditableProductActions.EDIT_INGREDIENT_NAME:
            const ingredient = state.ingredients.map( ( ingredient ) => {
                if (ingredient.id == action.payload.ingredientId) {
                    ingredient.name = action.payload.ingredientName!
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
                    id: action.payload.id!,
                    name: action.payload.optionName!,
                    picture_url: action.payload.optionPicture_url!,
                })
            return { ...state  }
            break
        case EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT:
            const ingredientIndexToRemoveOption = state.ingredients.findIndex( ingredient => ingredient.id === action.payload.ingredientId )
            const optionIndex = state.ingredients[ingredientIndexToRemoveOption].options.findIndex( option => option.id === action.payload.optionId)
            state.ingredients[ingredientIndexToRemoveOption].options.splice(optionIndex, 1)
            return { ...state }
            break
        case EditableProductActions.SHOW_MODAL_TO_ADD_NEW_ADDITIONAL:
            return { ...state, isOpenAdditionalModal: action.payload.isOpenAdditionalModal }
            break
        case EditableProductActions.ADD_NEW_ADDITIONAL:
        //     state.additional.data = [ ...state.additional.data,  additional.data: {
        //         name: action.payload.additionalName!,
        //         price: action.payload.additionalPrice!,
        //         picture_url:action.payload.additionalPicture_url!,
            
        // } ] 
        console.log(state.additional.data)
        //     return { ...state, additional: { ...state.additional.data, data: {
        //         name: action.payload.additionalName!,
        //         price: action.payload.additionalPrice!,
        //         picture_url:action.payload.additionalPicture_url!,
            
        // }  }}
        return { ...state }
            break
        case EditableProductActions.SHOW_MODAL_TO_UPDADE_THE_ADDITIONAL:
            return { ...state, showModalToUpdateAdditional: action.payload.showModalToUpdateAdditional}
            break
        case EditableProductActions.UPDATE_ADDITIONAL:
            const additionalIndex = state.additional.data.findIndex( additional => additional.data.id === Number(action.payload.id!))
            state.additional.data[additionalIndex].data.name = action.payload.additionalName!;
            state.additional.data[additionalIndex].data.price = action.payload.additionalPrice!;
            state.additional.data[additionalIndex].data.picture_url = action.payload.additionalPicture_url!;
            return { ...state }
            break
        case EditableProductActions.REMOVE_ADDITIONAL:
            const additionalWithoutTheRemovedOne = state.additional.data.filter( additional =>  additional.data.id !== Number(action.payload.additionalId) )
            return { ...state, additional:  additionalWithoutTheRemovedOne}
            break
        default:
            return state
    }
}