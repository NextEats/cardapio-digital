import { ProductContext } from '@/src/contexts/ProductContext';
import useHandleDeleteProducts from '@/src/hooks/useDeleteProduct';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChangeEvent, useContext, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsFillPencilFill, BsPlusLg } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import { ChangeProductsPrice } from '../ChangeProductsPrice';
import { AdditionalsModal } from './AdditionalsModal';
import CategoriesHorizontalListMenu from './CategoriesHorizontalListMenu';
import { CategoriesModal } from './CategoriesModal';
import { SelectsModal } from './SelectsModal';

const ProductsAction = () => {
  const [isChangingProductPrice, setIsChangingProductPrice] = useState(false);
  const styleD = 'text-blue-400 cursor-pointer';

  const { productSelected, setProducts, setFilter, isCreatingProductState } =
    useContext(ProductContext);

  const [isCreatingProduct, setIsCreatingProduct] = isCreatingProductState;

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setFilter({
      name,
      category: null,
    });
  }

  const { handleDeleteProducts } = useHandleDeleteProducts();

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={handleFilter}
          className="flex w-full lg:w-80 placeholder:text-gray-400 font-medium px-3 py-[6px] shadow-sm
                    border focus:border-brand-light-orange outline-none rounded-sm"
        />

        <div className="flex  items-center gap-2 mt-3">
          {productSelected.length === 0 ? (
            <div className="flex items-center transition flex-col md:flex-row">
              <div className="w-full lg:w-auto">
                <span className={`` + styleD}>
                  <CategoriesModal categoryType="product_category" />
                </span>
              </div>
              <div className="w-full  lg:w-auto">
                <span className={`` + styleD}>
                  <AdditionalsModal type="list" />
                </span>
              </div>
              <div className="w-full  lg:w-auto">
                <span className={`` + styleD}>
                  <SelectsModal type="list" />
                </span>
              </div>
            </div>
          ) : (
            <div className="flex mr-3 transition">
              {isChangingProductPrice ? (
                <ChangeProductsPrice
                  isChangingProductPrice={isChangingProductPrice}
                  setIsChangingProductPrice={setIsChangingProductPrice}
                />
              ) : null}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button className="text-brand-dark-orange hover:bg-brand-dark-orange hover:text-white flex items-center gap-4 pl-8 pr-2 py-1 rounded border-2 border-brand-dark-orange transition">
                    <span className="leading-none font-semibold"> Ações </span>{' '}
                    <RiArrowDownSLine className="" size={24} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[220px] bg-white rounded-md p-[5px] z-30 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item
                      onClick={() => setIsChangingProductPrice(true)}
                      className="group hover:text-text-brand-light-orange text-[13px] leading-none text-violet11 items-center rounded-[3px] flex pl-5 gap-3 hover:bg-white-blue cursor-pointer h-9 pr-[5px] relative"
                    >
                      <BsFillPencilFill size={16} className="" />
                      <span className="text-base">Alterar Preço</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => handleDeleteProducts()}
                      className="group hover:text-text-brand-light-orange text-[13px] leading-none text-violet11 items-center rounded-[3px] flex pl-5 gap-3 hover:bg-white-blue cursor-pointer h-9 pr-[5px] relative"
                    >
                      <BiTrash size={20} className="" />
                      <span className="text-base"> Excluir </span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-white" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          )}

          <button
            onClick={() => setIsCreatingProduct(true)}
            className="bg-brand-dark-orange px-8 py-2 rounded"
          >
            <BsPlusLg size={16} className="text-white" />
          </button>
        </div>
      </div>
      <CategoriesHorizontalListMenu />
    </>
  );
};

export default ProductsAction;
