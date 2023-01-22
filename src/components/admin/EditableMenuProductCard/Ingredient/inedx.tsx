import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { BsCheck2 } from "react-icons/bs";
import { IEditableProductReducerData } from "../../../../reducers/aditableProduct/reducer";
import { Dispatch, useId } from "react";
import { EditableProductActions } from "../../../../reducers/aditableProduct/actions";
import { FiTrash2 } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

interface iIgradientsCardProps {
  state: IEditableProductReducerData;
  dispatch: Dispatch<any>;
}

const newIngredientFormValidationSchema = zod.object({
  ingredientName: zod.string(),
  optionName: zod.string(),
  option_url: zod.string(),
});

type NewIngredientFormData = zod.infer<
  typeof newIngredientFormValidationSchema
>;

export function Igredient({ state, dispatch }: iIgradientsCardProps) {
  const { register, handleSubmit, watch } = useForm<NewIngredientFormData>({
    resolver: zodResolver(newIngredientFormValidationSchema),
    defaultValues: {
      ingredientName: "",
      optionName: "",
      option_url: "",
    },
  });

  function setIsEditingIngradientName(isEditingIngradientName: boolean) {
    dispatch({
      type: EditableProductActions.IS_EDITING_INGREDIENT_NAME,
      payload: { isEditingIngradientName },
    });
  }

  const id = useId();
  function handleIngredient(data: NewIngredientFormData) {
    dispatch({
      type: EditableProductActions.SET_INGREDIENT_NAME,
      payload: {
        ingredientId: id,
        ingredientName: data.ingredientName,
      },
    });
    setIsEditingIngradientName(false);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleIngredient)}
        className="w-full flex items-center justify-between"
      >
        {!state.isEditingIngradientName ? (
          <>
            <h3> state.ingredients.name </h3>
            <div className="flex items-center gap-2">
              <BiPencil
                onClick={() => setIsEditingIngradientName(true)}
                className="text-xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
              />
              <FiTrash2 className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
            </div>
          </>
        ) : null}
        {state.isEditingIngradientName ? (
          <>
            <input
              type="text"
              placeholder="Pesquisar"
              {...register("ingredientName")}
              className=" flex flex-1 h-7 pb-1 max-w-64 px-2 
                        text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                        outline-none border border-solid border-gray-300 rounded mr-3 pt-1"
            />
            <button
              type="submit"
              className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-blue-500 "
            >
              <BsCheck2 className="text-xl text-white" />
            </button>
          </>
        ) : null}
      </form>
    </div>
  );
}
