import { IAdditionalData, IIngredientOptionsData } from "../../types/product"
import { iAdditionals, iInsertAdditionals, iInsertIngredients } from "../../types/types";
import { EditableProductActions } from "./actions";

export interface IEditableProductReducerData {

    isViewingUpdatingOrAdding: '' | 'viewing' | 'updationg' | 'adding';

    // PRODUCT INFORMATION
    isEditingInfo: boolean,
    picture_url: string,
    isEditingPicture: boolean,
    productInformation: {
        name: string,
        description: string,
        price: string,
    },

    // // INGREDIENT
    ingredients: iInsertIngredients["data"], 

    // // OPTIONS
    // ingredientIdToShowModalAddNewOption: string,

    // // ADDITIONAL
    // additional: iAdditionals,
    additional: iInsertAdditionals["data"],  
    showModalToUpdateAdditional: boolean,
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
    showModalToUpdateAdditional?: boolean,

    ingredientId?: string,
    ingredientName?: string,

    ingredientIdToAddNewOption?: string,
    optionName?: string,
    optionPicture_url?: string,
}

export interface iAction {
    type: string;
    payload: iPayloadProduct
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
                    name: action.payload.productInformation?.name,
                    description: action.payload.productInformation?.description,
                    price: action.payload.productInformation?.price,
                }
            }
            break
        case EditableProductActions.IS_EDITING_PICTURE:
            return { ...state, isEditingPicture: action.payload.isEditingPicture }
            break
        case EditableProductActions.SET_PICTURE_URL:
            return { ...state, picture_url: action.payload.picture_url }
            break
        // INGREDIENT  
        // case EditableProductActions.ADD_NEW_INGREDIENT:
        //     state.ingredients.push({
        //         name: action.payload.ingredientName,
        //     })
            // return { ...state }
            // break
        // case EditableProductActions.UPDATE_INGREDIENT_NAME:
        //     const ingredientIndexToUpdate = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload.ingredientName )
        //     state.ingredients[ingredientIndexToUpdate].name! = action.payload.ingredientName
        //     return { ...state }
        //     break
        // // Remove ingredient
        // case EditableProductActions.REMOVE_INGREDIENT:
        //     const ingredientsWithoutIngredientRemoved = state.ingredients.filter(ingredient => ingredient.name !== action.payload.ingredientName)
        //     return { ...state, ingredients: ingredientsWithoutIngredientRemoved }
        //     break


        // //  ADD OPTION TO INGREDIENT OPRIONS 
        // case EditableProductActions.IS_ADDING_NEW_OPTION_TO_INGREDIENT:
        //     return { ...state, ingredientIdToShowModalAddNewOption: action.payload.ingredientIdToShowModalAddNewOption }
        //     break
        // case EditableProductActions.ADD_NEW_OPTION_TO_INGREDIENT:
        //     const ingredientIndex = state.ingredients.findIndex( ingredient => ingredient.id == action.payload.ingredientIdToAddNewOption  )
        //     state.ingredients[ingredientIndex].options.push( { 
        //             id: action.payload.id!,
        //             name: action.payload.optionName!,
        //             picture_url: action.payload.optionPicture_url!,
        //         })
        //     return { ...state  }
        //     break
        // case EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT:
        //     const ingredientIndexToRemoveOption = state.ingredients.findIndex( ingredient => ingredient.id === action.payload.ingredientId )
        //     const optionIndex = state.ingredients[ingredientIndexToRemoveOption].options.findIndex( option => option.id === action.payload.optionId)
        //     state.ingredients[ingredientIndexToRemoveOption].options.splice(optionIndex, 1)
        //     return { ...state }

        //     break
        // ADDITIONAL
        // case EditableProductActions.ADD_NEW_ADDITIONAL:
        //     return { ...state, additional: [ ...state.additional, {
        //             name: action.payload.additionalName,
        //             picture_url: action.payload.additionalPicture_url,
        //             price: action.payload.additionalPrice,
        //     }] }
        //     break
        // case EditableProductActions.UPDATE_ADDITIONAL:
        //     const additionalIndex = state.additional.findIndex( additional => additional.name === action.payload.additionalName)
        //     state.additional[additionalIndex].name = action.payload.additionalName;
        //     state.additional[additionalIndex].price = action.payload.additionalPrice;
        //     state.additional[additionalIndex].picture_url = action.payload.additionalPicture_url;
        //     return { ...state }
        //     break
        // case EditableProductActions.REMOVE_ADDITIONAL:
        //     const additionalWithoutTheRemovedOne = state.additional.filter( additional =>  additional.name !== action.payload.additionalName )
        //     return { ...state, additional:  additionalWithoutTheRemovedOne}
        //     break
        default:
            return state
    }
}