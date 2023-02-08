import { GetServerSideProps } from "next";
import { useEffect, useReducer, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { supabase } from "../../../../server/api";
import AdminWrapper from "../../../../components/admin/AdminWrapper";
import Categories from "../../../../components/admin/cardapio-digital/Categories";
import MenuProduct from "../../../../components/admin/cardapio-digital/MenuProduct";
import { defaultValues, editableProductReducer } from "../../../../reducers/aditableProduct/reducer";
import {
  iInsertProductCategory,
  iProductCategories,
  iInsertProductOptions,
  iProducts,
  iInsertAdditionals,
  iInsertProductAdditionals,
  iInsertSelects,
  iInsertProductSelects,
} from "../../../../types/types";
import { CategoryModal } from "../../../../components/admin/cardapio-digital/CategoryModal";
import EditableMenuProductCard from "../../../../components/admin/cardapio-digital/EditableMenuProductCard";
import { setAddingProductAction, setIsViewingAddingOrOpdatingProductAction, setViewpProductAction } from "../../../../reducers/aditableProduct/actions";
import { CardapioDigitalButton } from "../../../../components/admin/cardapio-digital/CardapioDigitalButton";
import { getOrdersByRestaurantIdFetch } from "src/fetch/orders/getOrdersByRestaurantId";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";
import { getOrderStatusFetch } from "src/fetch/orderStatus/getOrdersStatus";
import { getProductsByRestaurantIdFetch } from "src/fetch/products/getProductsByRestaurantId";
import { getProductsCategoriesByRestaurantIdFetch } from "src/fetch/productsCategories/getProductsCategoriesByRestaurantId";
import { getRestaurantBySlugFetch } from "src/fetch/restaurant/getRestaurantBySlug";
import { getAdditionalsByRestaurantIdFetch } from "src/fetch/additionals/getAdditionals";
import { getSelectsByRestaurantIdFetch } from "src/fetch/selects/getSelectsByRestaurantId";
import { getProductSelectsFetch } from "src/fetch/productSelects/getProductSelects";
import { getProductOptionsFetch } from "src/fetch/productOptions/getProductOptions";
import { getProductAdditionalsFetch } from "src/fetch/productAdditionals/getProductAdditionals";

interface iCardapioDigitalProps {
  productCategories: iProductCategories["data"];
  products: iProducts["data"];
  selects: iInsertSelects["data"];
  productSelects: iInsertProductSelects["data"];
  productOptions: iInsertProductOptions["data"];
  productAdditionals: iInsertProductAdditionals["data"];
  additionals: iInsertAdditionals["data"];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const restaurant = await getRestaurantBySlugFetch(context.query.slug)
  const productCategories = await getProductsCategoriesByRestaurantIdFetch(restaurant[0].id)
  const products = await getProductsByRestaurantIdFetch(restaurant[0].id)
  const additionals = await getAdditionalsByRestaurantIdFetch(restaurant[0].id)
  const selects = await getSelectsByRestaurantIdFetch(restaurant[0].id);
  const productSelects = await getProductSelectsFetch()
  const productOptions = await getProductOptionsFetch()
  const productAdditionals = await getProductAdditionalsFetch()

  return {
    props: {
      products,
      productCategories,
      productSelects,
      productOptions,
      productAdditionals,
      additionals,
      selects,
    },
  };
};

export default function CardapioDigital({
  productCategories,
  products,
  productSelects,
  productOptions,
  productAdditionals,
  additionals,
  selects,
}: iCardapioDigitalProps) {

  const [productId, setProductId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [productsState, setProductsState] = useState<iProducts["data"]>([]);
  const [productsFilteredState, setProductsFilteredState] = useState<
    iProducts["data"]
  >([]);
  const [viewCategory, setViewCategory] = useState<{
    isViewing: boolean;
    categoryId: number;
    categoryName: string;
  }>({
    isViewing: false,
    categoryId: 0,
    categoryName: "",
  });
  const [editCategory, setEditCategory] = useState<{
    isEditing: boolean;
    categoryData: iInsertProductCategory["data"];
  }>({
    isEditing: false,
    categoryData: {
      name: "",
      restaurant_id: 0,
      id: 0,
    },
  });

  const [state, dispatch] = useReducer(editableProductReducer, defaultValues);

  // const tdClasses = "[&:not(:last-child)]:p-4";

  useEffect(() => {
    setProductsState(products);
    async function setProtoduct() {
      const product = products.find((p) => p.id === productId);

      // filtering the ingredinets ones
      const productSelectsByProdctId = productSelects.filter(
        (select) => select.product_id === product?.id
      );

      let selectsByProductSelect: Array<{
        created_at?: string | null | undefined;
        id?: number | undefined;
        name: string;
      }> = [];
      for (let i = 0; i < productSelectsByProdctId.length; i++) {
        const selectsIndex = selects.findIndex(
          (select) => select.id === productSelectsByProdctId[i].select_id
        );
        if (selectsIndex <= -1) {
          return;
        }
        selectsByProductSelect = [
          ...selectsByProductSelect,
          selects[selectsIndex],
        ];
      }

      // finding the category
      const categoryFound = productCategories.find(
        (c) => c.id === product?.category_id
      );

      // filtering the options ones
      const productOptiosBySelectId = productOptions.filter((option) => {
        return selectsByProductSelect.map(
          (select) => select?.id === option.select_id && option
        );
      });

      // filtering the additional ones
      const productAdditionalsByProductId = productAdditionals.filter(
        (productAdditional) => productAdditional.product_id === productId
      );

      const additionalsByProductAdditionalsId =
        productAdditionalsByProductId?.map((productAdditional) => {
          return additionals[
            additionals.findIndex(
              (additional) => productAdditional.additional_id === additional.id
            )
          ];
        });
      dispatch(
        setViewpProductAction(
          product!,
          selectsByProductSelect,
          productOptiosBySelectId,
          additionalsByProductAdditionalsId,
          categoryFound!
        )
      );
    }

    if (state.isViewingUpdatingOrAdding === "VIEWING") {
      setProtoduct();
    }
  }, [
    state.isViewingUpdatingOrAdding,
    products,
    productId,
    productSelects,
    productOptions,
    productAdditionals,
    additionals,
    selects,
    productCategories,
  ]);

  function filterProducts(name: string) {
    let productsFiltered: iProducts["data"] = [];
    productsFiltered = productsState.filter((product) => {
      return product.name
        .toLocaleLowerCase()
        .includes(name.toLocaleLowerCase());
    });
    setProductsFilteredState(productsFiltered);
  }

  return (
    <AdminWrapper>
      <>
        <div className="flex gap-10">
          <div className="flex flex-col flex-1 ">
            <h2 className="text-xl font-bold text-gray-700"> 5 itens mais vendidos </h2>

            <div className="flex items-center justify-between mb-5 mt-7">
              <h2 className="text-xl font-bold text-gray-700 "> Categorias </h2>
              {/* <input type="text" placeholder="Pesquisar"
                className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" /> */}
              {/* <select name="" id=""
                  onChange={(e) => filterProductCategories(e.target.value)}
                  className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" >
                  <option value="Selecione">Selecione</option>
                  {productCateriesData.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
              })
              }
            </select> */}
              <CardapioDigitalButton
                onClick={() => setModalIsOpen(true)}
                name="Novo"
                h="h-7"
                w="w-24"
                Icon={<AiOutlinePlus />}
              />
            </div>
            <CategoryModal
              modalIsOpen={modalIsOpen}
              products={products}
              setViewCategory={setViewCategory}
              viewCategory={viewCategory}
              editCategory={editCategory}
              setEditCategory={setEditCategory}
              setModalIsOpen={setModalIsOpen}
            />
            <Categories
              productCategories={productCategories}
              products={products}
              setViewCategory={setViewCategory}
              setEditCategory={setEditCategory}
            />

            {/* <MenuProduct  /> */}
            <div className="flex items-center justify-between mb-5 mt-7">
              <h2 className="text-xl font-bold text-gray-700 ">
                {" "}
                Itens do cardápio{" "}
              </h2>
              <input
                type="text"
                placeholder="Pesquisar"
                onChange={(e) => filterProducts(e.target.value)}
                className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400"
              />
              <CardapioDigitalButton
                onClick={() => {
                  dispatch(setAddingProductAction());
                  dispatch(setIsViewingAddingOrOpdatingProductAction("ADDING"));
                  setProductModal(true);
                }}
                name="Novo"
                h="h-7"
                w="w-24"
                Icon={<AiOutlinePlus />}
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {productsFilteredState.length > 0 ? (
                <>
                  {productsFilteredState.map((product) => {
                    return (
                      <MenuProduct
                        dispatch={dispatch}
                        setProductModal={setProductModal}
                        setProductId={setProductId}
                        key={product.id}
                        product={product}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {productsState.map((product) => {
                    return (
                      <MenuProduct
                        dispatch={dispatch}
                        setProductModal={setProductModal}
                        setProductId={setProductId}
                        key={product.id}
                        product={product}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <EditableMenuProductCard
            state={state}
            dispatch={dispatch}
            productModal={productModal}
            productId={productId}
            productOptions={productOptions}
            selects={selects}
            setProductModal={setProductModal}
            additionals={additionals}
            productCategories={productCategories}
          />
        </div>
      </>
    </AdminWrapper>
  );
}
