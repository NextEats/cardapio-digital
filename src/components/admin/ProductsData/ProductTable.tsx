import { ProductContext } from '@/src/contexts/ProductContext';
import { useProductSelection } from '@/src/hooks/useProductSelection';
import { useContext } from 'react';
import ProductTableRow from './ProductTableRow';

const thDefaultStyle = 'text-left px-2 py-4';

export function ProductTable() {
  const { productSelected } = useContext(ProductContext);
  const { productsFiltered, handleSelectProduct } = useProductSelection();

  return (
    <div className={`bg-white`}>
      <div className="h-full overflow-auto">
        <table className="p-2 w-full">
          <thead>
            <tr>
              <th className={thDefaultStyle}>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={productsFiltered.length === productSelected.length}
                  onChange={() => handleSelectProduct({ isSelectAll: true })}
                />
              </th>
              <th className={`w-12 ${thDefaultStyle}`}> </th>
              <th className={`w-80 ${thDefaultStyle}`}> Nome </th>
              <th className={thDefaultStyle}> Categoria </th>
              <th className={thDefaultStyle}> Preço</th>
              <th className={`max-w-28 ${thDefaultStyle}`}> Status </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {productsFiltered.map((product, index) => (
              <ProductTableRow
                key={product.id}
                product={product}
                handleSelectProduct={handleSelectProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
