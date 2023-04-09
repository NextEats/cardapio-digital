import { ProductContext } from '@/src/contexts/ProductContext';
import { supabase } from '@/src/server/api';
import { useContext } from 'react';

const useHandleDeleteProducts = () => {
  const { productSelected, setProducts, setFilter } =
    useContext(ProductContext);

  const handleDeleteProducts = async () => {
    productSelected.forEach(async product => {
      await Promise.all([
        supabase
          .from('product_additionals')
          .delete()
          .eq('product_id', product.id),
        supabase.from('product_selects').delete().eq('product_id', product.id),
      ]);
      await supabase
        .from('products')
        .update({ is_deleted: true })
        .eq('id', product.id);
      setProducts(state => {
        state.splice(
          state.findIndex(p => p.id === product.id),
          1
        );
        return [...state];
      });
    });
  };

  const handleFilter = (e: any) => {
    const name = e.target.value;
    setFilter({
      name,
      category: null,
    });
  };

  return { handleDeleteProducts, handleFilter };
};

export default useHandleDeleteProducts;
