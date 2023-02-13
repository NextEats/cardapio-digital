import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dispatch, FormEvent, useEffect, useState } from "react";
import * as zod from "zod";

import { BiPencil } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineUpload, HiPlus } from "react-icons/hi";
import {
  EditableProductActions,
  setProductPictureFileAction,
  setProductPictureUrlAction,
} from "../../../../../reducers/aditableProduct/actions";
import {
  IEditableProductReducerData,
  iPayloadProduct,
} from "../../../../../reducers/aditableProduct/reducer";
import { supabase } from "../../../../../server/api";

interface IHeadersCardProps {
  state: IEditableProductReducerData;
  dispatch: Dispatch<{
    type: string;
    payload: iPayloadProduct;
  }>;
}

const newInformationFormValidationSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  price: zod.string(),
});
type NewInformationFormData = zod.infer<
  typeof newInformationFormValidationSchema
>;

export default function HeadersCard({ state, dispatch }: IHeadersCardProps) {
  const { register, handleSubmit } = useForm<NewInformationFormData>({
    resolver: zodResolver(newInformationFormValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  function setProductIsEditing(isEditingInfo: boolean) {
    dispatch({
      type: EditableProductActions.IS_EDITING_INFORMATION,
      payload: { isEditingInfo },
    });
  }

  function handleEditInfrmation(data: NewInformationFormData) {
    if (data.name === "" || data.description === "" || data.price === "") {
      return;
    }
    dispatch({
      type: EditableProductActions.SET_PRODUCT_INFORMATION,
      payload: {
        productInformation: {
          description: data.description,
          price: data.price,
          name: data.name,
        },
      },
    });
    setProductIsEditing(false);
  }

  return (
    <>
      <div className={`mb-10`}>
        <ProductImage state={state} dispatch={dispatch} />
        <form onSubmit={handleSubmit(handleEditInfrmation)}>
          <div className="flex items-center justify-between gap-6">
            <h1
              hidden={state.isEditingInfo}
              className="font-extrabold text-xl text-gray-800 leading-4"
            >
              {" "}
              {state.productInformation.name}{" "}
            </h1>
            <input
              type="text"
              placeholder="Pesquisar"
              hidden={!state.isEditingInfo}
              {...register("name", { required: true })}
              className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
            />
            {state.isViewingUpdatingOrAdding !== "VIEWING" ? (
              <BiPencil
                onClick={() => setProductIsEditing(true)}
                className={`text-2xl text-blue-500  cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingInfo ? "hidden" : ""}
                            `}
              />
            ) : null}
            <button
              type="submit"
              className={`${state.isEditingInfo ? "" : "hidden"} `}
            >
              <BsCheck2
                className={`text-2xl text-blue-500  cursor-p ointer hover:scale-125 hover:transition-all ease-in-out
                                ${state.isEditingInfo ? "" : "hidden"}
                                `}
              />
            </button>
          </div>
          <p
            hidden={state.isEditingInfo}
            className="font-medium text-base leading-5 text-gray-800 mt-1"
          >
            {state.productInformation.description}
          </p>

          <input
            type="text"
            placeholder="Descrição"
            hidden={!state.isEditingInfo}
            {...register("description")}
            className="w-full h-10 bg-red-50 pb-1 px-2 text-gray-600 text-sm font-semibold
                                placeholder:text-gray-400 rounded outline-none mt-1 whitespace-pre-line"
          />
          <div className="flex items-center justify-between mt-1">
            <span
              hidden={state.isEditingInfo}
              className="font-medium text-sm text-green-300 leading-4"
            >
              {" "}
              R$ {state.productInformation.price}{" "}
            </span>
            <input
              type="text"
              placeholder="Preço"
              hidden={!state.isEditingInfo}
              {...register("price")}
              className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
            />
          </div>
        </form>
      </div>
    </>
  );
}

interface iProductImagePros {
  state: IEditableProductReducerData;
  dispatch: Dispatch<any>;
}

function ProductImage({ state, dispatch }: iProductImagePros) {
  const [productPictureIsEditing, setProductPictureIsEditing] = useState(true);

  useEffect(() => {
    if (state.isViewingUpdatingOrAdding === "VIEWING")
      setProductPictureIsEditing(false);
  }, [state.isViewingUpdatingOrAdding]);

  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    if (!file) {
      return;
    }
    async function handleUploadFile() {
      if (!file) {
        return;
      }
      dispatch(setProductPictureFileAction(file));
      dispatch(setProductPictureUrlAction(URL.createObjectURL(file)));
      setProductPictureIsEditing(false);
    }
    handleUploadFile();
  }, [file, dispatch]);

  return (
    <form className="w-full mb-4">
      {!state.picture_url || productPictureIsEditing === true ? (
        <>
          <label
            htmlFor="product_picture"
            className="rounded-2xl w-full h-[400px] flex items-center justify-center border border-solid border-gray-400"
          >
            <HiOutlineUpload className="w-20 h-20" />
          </label>
          <input
            type="file"
            id="product_picture"
            onChange={(e) => setFile(e.target.files![0])}
            hidden
          />
        </>
      ) : null}

      {state.picture_url && (
        <div className="relative">
          {state.isViewingUpdatingOrAdding !== "VIEWING" && (
            <label htmlFor="product_picture" className={``}>
              <BiPencil
                className={`text-2xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out absolute top-3 right-3 z-10 ${
                  productPictureIsEditing ? "hidden" : ""
                }`}
              />
            </label>
          )}

          <Image
            className="rounded-2xl w-full"
            src={state.picture_url}
            alt=""
            width={500}
            height={500}
          />
        </div>
      )}
    </form>
  );
}
