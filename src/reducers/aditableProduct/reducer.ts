import { iInsertAdditional, iInsertAdditionals, iInsertIngredients, iInsertProductCategory, iInsertProductOptions, iInsertSelect } from "../../types/types";
import { EditableProductActions } from "./actions";

export const defaultValues = {
    isViewingUpdatingOrAdding: '',
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
            picture_url: '',
        }
    ],

    //  CATEGORY
    category: {
        name: '',
        restaurant_id: 0,
    },


    // //  OPTIONS
    // ingredientIdToShowModalAddNewOption: '',
    options: [{
        name: '',
        picture_url: '',
        select_id: 0,
    }],

    // // ADDITIONAL
    additionals: [
        {
            name: '',
            price: 0,
            picture_url: '',
        }
    ],
    showModalToUpdateAdditional: false,
}

export interface IEditableProductReducerData {

    isViewingUpdatingOrAdding: '' | 'VIEWING' | 'UPDATING' | 'ADDING';

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

    // // CATEGORY
    category: iInsertProductCategory["data"],

    // // OPTIONS
    // ingredientIdToShowModalAddNewOption: string,
    options: iInsertProductOptions["data"]

    // // ADDITIONAL
    // additional: iAdditionals,
    additionals: iInsertAdditionals["data"],
    showModalToUpdateAdditional: boolean,
}

export interface iPayloadProduct {
    isViewingUpdatingOrAdding?: '' | 'VIEWING' | 'UPDATING' | 'ADDING';

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

    select?: iInsertSelect["data"],
    additional?: iInsertAdditional["data"],
    category?: iInsertProductCategory["data"]
}

export interface iAction {
    type: string;
    payload: iPayloadProduct
}

export function editableProductReducer(state: IEditableProductReducerData, action: any) {
    switch (action.type) {
        case EditableProductActions.IS_VIEWING_UPDATING_OR_ADDING:
            return { ...state, isViewingUpdatingOrAdding: action.payload.isViewingUpdatingOrAdding }
            break
        case EditableProductActions.VIEW_PRODUCT:
            return {
                ...state,
                productInformation: {
                    name: action.payload.product?.name,
                    description: action.payload.product?.description,
                    price: action.payload.product?.price,
                },
                picture_url: action.payload.product?.picture_url,
                isEditingPicture: false,
                isEditingInfo: false,
                ingredients: action.payload.selects,
                options: action.payload.productOptions,
                additionals: action.payload.additionals,

            }
            break
        case EditableProductActions.SET_ADDING_PRDUCT:
            state.productInformation = {
                name: '',
                description: '',
                price: '',
            };
            state.picture_url = '';
            state.isEditingPicture = true;
            state.isEditingInfo = true;
            state.ingredients = [];
            state.options = [];
            state.additionals = [];

            return { ...state }
            break
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
        // CATEG0RY  
        case EditableProductActions.SET_CATEGORY:
            return { ...state, category: action.payload.category }
            break

        // INGREDIENT  
        case EditableProductActions.ADD_NEW_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload.select!],
                options: [...state.options, ...action.payload.productOptions]
            }
            break
        case EditableProductActions.UPDATE_INGREDIENT_NAME:
            const ingredientIndexToUpdate = state.ingredients.findIndex((ingredient) => ingredient.name === action.payload.ingredientName)
            console.log(state.ingredients[ingredientIndexToUpdate])
            state.ingredients[ingredientIndexToUpdate].name = action.payload.ingredientName
            return { ...state }
            break
        // Remove ingredient
        case EditableProductActions.REMOVE_INGREDIENT:
            const ingredientsWithoutIngredientRemoved = state.ingredients.filter(ingredient => ingredient.name !== action.payload.ingredientName)
            return { ...state, ingredients: ingredientsWithoutIngredientRemoved }
            break


        //  ADD OPTION TO INGREDIENT OPRIONS 
        // case EditableProductActions.IS_ADDING_NEW_OPTION_TO_INGREDIENT:
        //     return { ...state, ingredientIdToShowModalAddNewOption: action.payload.ingredientIdToShowModalAddNewOption }
        //     break
        case EditableProductActions.ADD_NEW_OPTION_TO_INGREDIENT:
            console.log(action.payload.optionName)
            // const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient.id == action.payload.ingredientIdToAddNewOption)
            // state.ingredients[ingredientIndex].options.push( { 
            //         id: action.payload.id!,
            //         name: action.payload.optionName!,
            //         picture_url: action.payload.optionPicture_url!,
            //     })
            state.options.push({
                name: action.payload.optionName,
                picture_url: action.payload.optionPicture_url,
                select_id: Number(action.payload.ingredientId),
            })
            console.log(state.options)
            return { ...state }
            break
        // case EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT:
        //     const ingredientIndexToRemoveOption = state.ingredients.findIndex( ingredient => ingredient.id === action.payload.ingredientId )
        //     const optionIndex = state.ingredients[ingredientIndexToRemoveOption].options.findIndex( option => option.id === action.payload.optionId)
        //     state.ingredients[ingredientIndexToRemoveOption].options.splice(optionIndex, 1)
        //     return { ...state }

        //     break
        // ADDITIONAL
        case EditableProductActions.ADD_NEW_ADDITIONAL:
            return { ...state, additionals: [...state.additionals, action.payload.additional] }
            break
        case EditableProductActions.UPDATE_ADDITIONAL:
            const undateAdditionalState = { ...state }
            const additionalIndex = undateAdditionalState.additionals.find(additional => additional.name === action.payload.additionalName)
            console.log(action.payload.additionalName, state.additionals, additionalIndex)
            // if (additionalIndex!.name === undefined) {
            //     return
            // }
            additionalIndex!.name = action.payload.additionalName;
            additionalIndex!.price = action.payload.additionalPrice;
            additionalIndex!.picture_url = action.payload.additionalPicture_url;
            return undateAdditionalState
            break
        case EditableProductActions.REMOVE_ADDITIONAL:
            console.log(action.payload.additionalName)
            console.log(state.additionals)
            const additionalWithoutTheRemovedOne = state.additionals.filter(additional => additional.name !== action.payload.additionalName)
            console.log(additionalWithoutTheRemovedOne)

            return { ...state, additionals: additionalWithoutTheRemovedOne }
            break
        default:
            return state
    }
}

