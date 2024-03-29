import {
  iInsertAdditional,
  iInsertAdditionals,
  iInsertIngredients,
  iInsertSelect,
} from '@/src/types/iInsert';
import {
  iInsertProductCategory,
  iInsertProductOptions,
} from '@/src/types/iProducts';
import { EditableProductActions } from './actions';

export const defaultValues = {
  isViewingUpdatingOrAdding: '',
  isEditingInfo: true,
  picture_url: '',
  picture_file: undefined,
  productInformation: {
    name: '',
    description: '',
    price: '',
  },
  //INGREDIENT
  ingredients: [],

  //  CATEGORY
  category: {
    id: 0,
    name: '',
    category_order: 0,
    restaurant_id: 0,
  },

  // //  OPTIONS
  // ingredientIdToShowModalAddNewOption: '',
  options: [],

  // // ADDITIONAL
  additionals: [],
  showModalToUpdateAdditional: false,
};

export interface IEditableProductReducerData {
  isViewingUpdatingOrAdding: '' | 'VIEWING' | 'UPDATING' | 'ADDING';

  // PRODUCT INFORMATION
  isEditingInfo: boolean;
  picture_url: string;
  picture_file: File | undefined;
  productInformation: {
    name: string;
    description: string;
    price: string;
  };

  // // INGREDIENT
  ingredients: iInsertIngredients['data'];

  // // CATEGORY
  category: iInsertProductCategory['data'];

  // // OPTIONS
  // ingredientIdToShowModalAddNewOption: string,
  options: iInsertProductOptions['data'];

  // // ADDITIONAL
  // additional: iAdditionals,
  additionals: iInsertAdditionals['data'];
  showModalToUpdateAdditional: boolean;
}

export interface iPayloadProduct {
  isViewingUpdatingOrAdding?: '' | 'VIEWING' | 'UPDATING' | 'ADDING';

  isEditingInfo?: boolean;
  picture_url?: string;
  picture_file?: File | undefined;
  isEditingPicture?: boolean;
  productInformation?: {
    name: string;
    description: string;
    price: string;
  };
  additionalName?: string;
  additionalPrice?: number;
  additionalPicture_url?: string;
  isOpenAdditionalModal?: boolean;
  showModalToUpdadeAdditional?: boolean;
  showModalToUpdateAdditional?: boolean;

  ingredientId?: string;
  ingredientName?: string;
  newIngredientName?: string;
  oldIngredientName?: string;
  oldAdditionalId?: number;

  ingredientIdToAddNewOption?: string;
  optionName?: string;
  optionPicture_url?: string;

  select?: iInsertSelect['data'];
  additional?: iInsertAdditional['data'];
  category?: iInsertProductCategory['data'];
}

export interface iAction {
  type: string;
  payload: iPayloadProduct;
}

export function editableProductReducer(
  state: IEditableProductReducerData,
  action: any
) {
  switch (action.type) {
    case EditableProductActions.IS_VIEWING_UPDATING_OR_ADDING:
      return {
        ...state,
        isViewingUpdatingOrAdding: action.payload.isViewingUpdatingOrAdding,
      };
      break;
    case EditableProductActions.VIEW_PRODUCT:
      const { name, description, price, picture_url } = action.payload.product;
      const { additionals, category } = action.payload;
      return {
        ...state,
        productInformation: { name, description, price },
        picture_url,
        category,
        additionals,
        isEditingPicture: false,
        isEditingInfo: false,
        ingredients: action.payload.selects,
        options: action.payload.productOptions,
      };
      break;
    case EditableProductActions.SET_ADDING_PRDUCT:
      state.productInformation = { name: '', description: '', price: '' };
      state.picture_url = '';

      state.isEditingInfo = true;
      state.ingredients = [];
      state.options = [];
      state.additionals = [];

      return { ...state };
      break;
    case EditableProductActions.IS_EDITING_INFORMATION:
      return { ...state, isEditingInfo: action.payload.isEditingInfo };
      break;
    case EditableProductActions.SET_PRODUCT_INFORMATION:
      return {
        ...state,
        productInformation: {
          name: action.payload.productInformation?.name,
          description: action.payload.productInformation?.description,
          price: action.payload.productInformation?.price,
        },
      };
      break;

    case EditableProductActions.SET_PICTURE_FILE:
      return { ...state, picture_file: action.payload.picture_file };
      break;
    case EditableProductActions.SET_PICTURE_URL:
      return { ...state, picture_url: action.payload.picture_url };
      break;

    // CATEG0RY
    case EditableProductActions.SET_CATEGORY:
      return { ...state, category: action.payload.category };
      break;

    // INGREDIENT
    case EditableProductActions.ADD_NEW_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.select!],
        options: [...state.options, ...action.payload.productOptions],
      };
      break;
    case EditableProductActions.UPDATE_INGREDIENT_NAME:
      const ingredientIndexToUpdate = state.ingredients.findIndex(
        ingredient => ingredient.name === action.payload.oldIngredientName
      );
      state.ingredients[ingredientIndexToUpdate].name =
        action.payload.newIngredientName;
      return { ...state };
      break;
    // Remove ingredient
    case EditableProductActions.REMOVE_INGREDIENT:
      const ingredientsWithoutIngredientRemoved = state.ingredients.filter(
        ingredient => ingredient.name !== action.payload.ingredientName
      );
      const findIngredient = state.ingredients.find(
        ingredient => ingredient.name === action.payload.ingredientName
      );
      const optionsRemoved = state.options.filter(
        option => option.select_id !== findIngredient?.id
      );

      return {
        ...state,
        ingredients: ingredientsWithoutIngredientRemoved,
        options: optionsRemoved,
      };
      break;
    case EditableProductActions.ADD_NEW_OPTION_TO_INGREDIENT:
      state.options.push({
        name: action.payload.optionName,
        picture_url: action.payload.optionPicture_url,
        select_id: Number(action.payload.ingredientId),
      });
      return { ...state };
      break;
    case EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT:
      const selectOptions = state.options.filter(
        option => option.select_id === Number(action.payload.ingredientId)
      );
      const optionIndex = selectOptions.findIndex(
        option => action.payload.optionName === option.name
      );
      state.options.splice(optionIndex, 1);

      return { ...state };
      break;

    // ADDITIONAL
    case EditableProductActions.ADD_NEW_ADDITIONAL:
      return {
        ...state,
        additionals: [...state.additionals, action.payload.additional],
      };
      break;
    case EditableProductActions.UPDATE_ADDITIONAL:
      const {
        oldAdditionalId,
        additionalName,
        additionalPrice,
        additionalPicture_url,
      } = action.payload;
      const additionalFound = state.additionals.find(
        additional => additional.id === oldAdditionalId
      );
      additionalFound!.name = additionalName;
      additionalFound!.price = additionalPrice;
      additionalFound!.picture_url = additionalPicture_url;
      return { ...state };
      break;
    case EditableProductActions.REMOVE_ADDITIONAL:
      const additionalWithoutTheRemovedOne = state.additionals.filter(
        additional => additional.name !== action.payload.additionalName
      );
      return { ...state, additionals: additionalWithoutTheRemovedOne };
      break;
    // case EditableProductActions.EDIT_PRODUCT:
    //     // const additionalWithoutTheRemovedOne = state.additionals.filter(additional => additional.name !== action.payload.additionalName)
    //     return { ...state }
    //     break
    default:
      return state;
  }
}
