import { iProduct, iInsertProductOptions, iInsertAdditionals, iInsertProductAdditionals, iInsertProductSelects, iInsertSelects, iInsertSelect, iInsertAdditional, iInsertProductCategory } from "../../types/types"

export enum EditableProductActions {

    IS_VIEWING_UPDATING_OR_ADDING = "IS_VIEWING_UPDATING_OR_ADDING",
    VIEW_PRODUCT = "VIEW_PRODUCT",

    SET_ADDING_PRDUCT = "SET_ADDING_PRDUCT",

    SET_CATEGORY = "SET_CATEGORY",
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
    selectsByProdctId: iInsertSelects["data"],
    productOptiosBySelectId: iInsertProductOptions["data"],
    productAdditionalsByProductId: iInsertProductAdditionals["data"],
    additionalsByProductAdditionalsId: iInsertAdditionals["data"],
) {
    return {
        type: EditableProductActions.VIEW_PRODUCT,
        payload: {
            product: product,
            selects: selectsByProdctId,
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
export function setAddingProductAction() {
    return {
        type: EditableProductActions.SET_ADDING_PRDUCT,
    }
}
export function setIsUpdatingInformationAction(isUpdatig: boolean) {
    return {
        type: EditableProductActions.IS_EDITING_INFORMATION,
        payload: { isUpdatig }
    }
}
export function setAddIngredientAction(select: iInsertSelect["data"], optionsFilteredBySelectId: iInsertProductOptions["data"]) {
    return {
        type: EditableProductActions.ADD_NEW_INGREDIENT,
        payload: { select, productOptions: optionsFilteredBySelectId }
    }
}
export function setAddAdditionalAction(additional: iInsertAdditional["data"]) {
    return {
        type: EditableProductActions.ADD_NEW_ADDITIONAL,
        payload: { additional }
    }
}
export function setCategoryAction(category: iInsertProductCategory["data"]) {
    return {
        type: EditableProductActions.SET_CATEGORY,
        payload: { category }
    }
}