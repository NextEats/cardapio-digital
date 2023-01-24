import { iProduct, iInsertProductOptions, iProductSelects, iInsertAdditionals, iInsertProductAdditionals } from "../../types/types"

export enum EditableProductActions {

    IS_VIEWING_UPDATING_OR_ADDING = "IS_VIEWING_UPDATING_OR_ADDING",
    VIEW_PRODUCT = "VIEW_PRODUCT",

    // PRODUCT INFORMATION
    IS_EDITING_INFORMATION = "IS_EDITING_INFORMATION",
    SET_PRODUCT_INFORMATION = "SET_PRODUCT_INFORMATION",
    IS_EDITING_PICTURE = "IS_EDITING_PICTURE",
    SET_PICTURE_URL = "SET_PICTURE_URL",

    // INGREDIENT
    // Add new ingredient
    ADD_NEW_INGREDIENT = "ADD_NEW_INGREDIENT",
    // Edit Ingredient

    UPDATE_INGREDIENT_NAME = "UPDATE_INGREDIENT_NAME",
    // Remove Ingredient
    REMOVE_INGREDIENT = "REMOVE_INGREDIENT",

    // OPTION TO INGREDIENT OPRIONS 
    // Add new option
    ADD_NEW_OPTION_TO_INGREDIENT = "ADD_NEW_OPTION_TO_INGREDIENT",
    IS_ADDING_NEW_OPTION_TO_INGREDIENT = "IS_ADDING_NEW_OPTION_TO_INGREDIENT",
    // Remove option
    REMOVE_OPTION_FROM_INGREDIENT = "REMOVE_OPTION_FROM_INGREDIENT",


    // ADDITIONAL 
    ADD_NEW_ADDITIONAL = "ADD_NEW_ADDITIONAL",
    UPDATE_ADDITIONAL = "UPDATE_ADDITIONAL",
    REMOVE_ADDITIONAL = "REMOVE_ADDITIONAL",

    // IS_EDITING_NEW_INGREDIENT = "IS_EDITING_NEW_INGREDIENT",
    // SET_INGREDIENT_NAME = "SET_INGREDIENT_NAME",
    // IS_EDITING_INGREDIENT = "IS_EDITING_INGREDIENT",
}

export function setViewpProductAction( 
    product: iProduct["data"], 
    productSelectsByProdctId: iProductSelects["data"], 
    productOptiosBySelectId: iInsertProductOptions["data"],
    productAdditionalsByProductId: iInsertProductAdditionals["data"],
    additionalsByProductAdditionalsId: iInsertAdditionals["data"],
    ) {
    return {
        type: EditableProductActions.VIEW_PRODUCT,
        payload: { 
            product: product,
            productSelects: productSelectsByProdctId,
            productOptions: productOptiosBySelectId,
            additionals: additionalsByProductAdditionalsId,
        }
    }
}

export function setProductPictureUrlAction(url: string) {
    return {
        type: EditableProductActions.SET_PICTURE_URL,
        payload: { picture_url: url }
    }
}

export function setProductInformationAction(name: string, description: string, price: number) {
    return {
        type: EditableProductActions.SET_PRODUCT_INFORMATION,
        payload: {
            productInformation: {
                description: description,
                price: price,
                name: name
            },
        }
    }
}
export function setIsUpdatingInformationAction(isUpdatig: boolean) {
    return {
            type: EditableProductActions.IS_EDITING_INFORMATION,
            payload: { isUpdatig }
    }
}