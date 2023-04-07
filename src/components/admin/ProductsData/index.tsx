import { ProductContext } from '@/src/contexts/ProductContext';
import { useContext } from 'react';
import { CreateProduct } from './CreateProduct';
import ProductsAction from './ProductsAction/ProductsAction';
import { ProductTable } from './ProductTable';
import { UpdateProduct } from './UpdateProduct';

interface iProductsDataProps {}

export function ProductsData({}: iProductsDataProps) {
  const { products, isCreatingProductState, updateProductState } =
    useContext(ProductContext);
  const [isCreatingProduct, setIsCreatingProduct] = isCreatingProductState;
  const [updateProduct, setUpdateProduct] = updateProductState;

  return (
    <div className="h-full">
      {updateProduct === null && !isCreatingProduct ? (
        <div
          className={`min-h-[400px] h-full bg-white shadow-md rounded-md p-4`}
        >
          <ProductsAction />
          <ProductTable />
        </div>
      ) : null}
      {isCreatingProduct ? <CreateProduct /> : null}
      {updateProduct !== null ? <UpdateProduct /> : null}
    </div>
  );
}
