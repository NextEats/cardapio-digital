import { ProductContext } from '@/src/contexts/ProductContext';
import { supabase } from '@/src/server/api';
import * as Switch from '@radix-ui/react-switch';
import Image from 'next/image';
import { useContext } from 'react';

import { iProductsWithFKData } from '../../../types/types';

const ProductTableRow = ({
  product,
  handleSelectProduct,
}: {
  product: iProductsWithFKData;
  handleSelectProduct: ({ product }: { product: iProductsWithFKData }) => void;
}) => {
  const { products, setProducts, productSelected, hanleViewProduct } =
    useContext(ProductContext);

  const tdDefaultStyle = ' px-2 py-3 h-[70px]';

  const handleChangeProductStatus = async ({
    checked,
    productId,
  }: {
    checked: boolean;
    productId: number;
  }) => {
    const updatedProducts = await Promise.all(
      products.map(async product => {
        if (product.id === productId) {
          await supabase
            .from('products')
            .update({
              active: checked,
            })
            .eq('id', productId);
          return { ...product, active: checked };
        }
        return product;
      })
    );

    setProducts(updatedProducts);
  };

  if (!product) return null;

  return (
    <tr
      key={product.id}
      className="border-t-[1px] border-t-gray-300 cursor-pointer hover:bg-[#00000008] transition"
    >
      <td className={`` + tdDefaultStyle}>
        <input
          type="checkbox"
          checked={productSelected.some(p => product.id === p.id)}
          className="h-5 w-5  cursor-pointer transition"
          onChange={e => handleSelectProduct({ product })}
        />
      </td>
      <td
        onClick={() => hanleViewProduct(product)}
        className={` w-12 max-h-12` + tdDefaultStyle}
      >
        <div className="w-[40px]  max-h-[40px] object-cover">
          <Image
            className="w-[40px]  max-h-[42px] object-cover rounded-sm"
            src={product.picture_url}
            alt={product.name}
            width={480}
            height={480}
          />
        </div>
      </td>
      <td
        onClick={() => hanleViewProduct(product)}
        className={` w-80 ` + tdDefaultStyle}
      >
        <span className="w-full truncate">{product.name}</span>
      </td>
      <td
        onClick={() => hanleViewProduct(product)}
        className={`` + tdDefaultStyle}
      >
        <span className="w-full truncate">{product.category_id.name}</span>
      </td>
      <td
        onClick={() => hanleViewProduct(product)}
        className={`` + tdDefaultStyle}
      >
        <span className="w-full truncate">
          R${' '}
          {product.price.toLocaleString('pt-Br', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </td>
      <td className={` max-w-28` + tdDefaultStyle}>
        <Switch.Root
          className="cursor-pointer w-[42px] h-6 bg-gray-400 rounded-full relative data-[state=checked]:bg-brand-dark-orange outline-none"
          id="airplane-mode"
          checked={product.active}
          onCheckedChange={(checked: boolean) => {
            handleChangeProductStatus({
              checked,
              productId: product.id,
            });
          }}
          value={product.id}
        >
          <Switch.Thumb
            className="block w-[18px] h-[18px] bg-white rounded-full transition-transform
                  duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[20px]"
          />
        </Switch.Root>
      </td>
    </tr>
  );
};

export default ProductTableRow;
