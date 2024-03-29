import { TableContext } from '@/src/contexts/TableContext';
import { selectProductAction } from '@/src/reducers/tableReducer/action';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ChangeEvent, useContext, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';
import { TableProductListFormModal } from './TableProductListFormModal';
import ProductModal from './productModal';

interface iProductTableModalProps {}

export default function ProductsTableModal({}: iProductTableModalProps) {
  const { products, viewProductState, categories, tableState, tableDispatch } =
    useContext(TableContext);

  const [viewProduct, setViewProduct] = viewProductState;

  const [filter, setFilter] = useState<{
    name: string | null;
    category: number | null;
  }>({
    name: null,
    category: 0,
  });

  const [categoryId, setCategoryId] = useState(0);

  const filteredProducts = products.filter((product: any) => {
    if (filter.name !== null) {
      return product.name
        .toLocaleLowerCase()
        .includes(filter.name.toLocaleLowerCase());
    } else if (filter.category !== null) {
      if (categoryId === 0) {
        return true;
      }
      return product.category_id === filter.category;
    }
  });

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setFilter({
      name,
      category: null,
    });
  }

  function handleFilterByCategory(categoryId: number) {
    setFilter({
      name: null,
      category: categoryId,
    });
    setCategoryId(categoryId);
  }

  return (
    <div>
      {viewProduct ? <ProductModal /> : null}
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center gap-2">
          <BsCart3 size={24} />
          <div className="hidden lg:flex">Produtos</div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
          <Dialog.Content className="fixed top-[7vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] lg:w-[900px] h-[550px] bg-white shadow-md p-6">
            <Dialog.Title className="text-base w-full flex items-center text-center font-semibold mb-3">
              <input
                type="text"
                onChange={handleFilter}
                placeholder="pesquisar"
                className="mb-3 w-[50%]"
              />
            </Dialog.Title>
            <div className=" flex flex-col ">
              <div className="flex items-center gap-3 mb-7 max-w-full overflow-auto scrollbar-custom pb-2">
                <div
                  onClick={() => handleFilterByCategory(0)}
                  className={
                    `flex items-center justify-center px-6 border border-black cursor-pointer rounded-full text-lg font-semibold` +
                    `
                                    ${
                                      categoryId === 0
                                        ? 'bg-gray-800 text-white'
                                        : ''
                                    }`
                  }
                >
                  <span> Todos </span>
                </div>
                {categories.map((category: any) => {
                  return (
                    <div
                      key={category.id}
                      onClick={() => handleFilterByCategory(category.id)}
                      className={
                        `flex items-center justify-center px-6 border border-black cursor-pointer rounded-full text-lg font-semibold ` +
                        `
                                        ${
                                          categoryId === category.id
                                            ? 'bg-gray-800 text-white'
                                            : ''
                                        }`
                      }
                    >
                      <span className="truncate"> {category.name} </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 max-h-[305px] overflow-auto scrollbar-custom p-1 mb-3">
                {filteredProducts.map((product: any) => {
                  if (product.is_deleted) return null;
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        setViewProduct(product);
                        tableDispatch(selectProductAction(product));
                      }}
                      className="bg-white shadow-sm max-h-24 sm:h-24 flex flex-1 items-center rounded-md p-2 hover:shadow-md hover:transition-all ease-in-out cursor-pointer relative"
                    >
                      <Image
                        className="rounded-md h-full"
                        src={product.picture_url}
                        alt=""
                        width={85}
                        height={40}
                      />
                      <div className="flex flex-col h-full items-start justify-start gap-1 overflow-hidden px-3 pt-4">
                        <span className="text-base font-bold text-gray-600 ">
                          {product.name}{' '}
                        </span>
                        <p className="text-sm font-medium truncate w-full text-gray-500 leading-3 ">
                          {product.description}{' '}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-500 absolute top-2 right-3">
                        R$ {product.price}{' '}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex items-center justify-between gap-3">
                <TableProductListFormModal />
                <Dialog.Close className="">
                  <CardapioDigitalButton name="Cancelar" h="h-9" w="w-44" />
                </Dialog.Close>
              </div>
            </div>
            <Dialog.Close className="fixed top-3 right-3 text-gray-600">
              <FiX size={22} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
