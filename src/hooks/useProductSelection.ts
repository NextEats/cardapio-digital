import { ProductContext } from '@/src/contexts/ProductContext';
import { iProductsWithFKData } from '@/src/types/types';
import { useCallback, useContext } from 'react';

export const useProductSelection = () => {
  const { products, productSelected, setProductSelected } =
    useContext(ProductContext);

  const productsFiltered = products.filter(p => !p.is_deleted);

  const handleSelectProduct = useCallback(
    ({
      product,
      isSelectAll = false,
    }: {
      product?: iProductsWithFKData;
      isSelectAll?: boolean;
    }) => {
      if (isSelectAll) {
        if (productsFiltered.length === productSelected.length) {
          setProductSelected([]);
          return;
        }
        setProductSelected(productsFiltered);
        return;
      }
      if (productSelected.some(p => p.id === product!.id)) {
        setProductSelected(state => state.filter(p => p.id !== product!.id));
        return;
      }
      setProductSelected(state => [...state, product!]);
    },
    [productsFiltered, productSelected, setProductSelected]
  );

  return { productsFiltered, handleSelectProduct };
};
