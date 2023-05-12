import { iOrders, iOrdersProducts } from '@/src/types/iOrders';
import { iProductCategories, iProducts } from '@/src/types/iProducts';

interface iHorizontalGraphicsProps {
  globalValuesData: {
    orders: iOrders['data'];
    products: iProducts['data'];
    productCategories: iProductCategories['data'];
    ordersProducts: iOrdersProducts['data'];
  };
}

export function HorizontalGraphics({
  globalValuesData,
}: iHorizontalGraphicsProps) {
  const { productCategories, products, ordersProducts } = globalValuesData;

  const allProductsIdPurchased = ordersProducts.map(orderProduct => {
    return orderProduct.product_id;
  });
  const productsPurchased = allProductsIdPurchased.map(productId => {
    return products[products.findIndex(product => productId === product.id)];
  });

  let numberOfProductsSoldInEachCategory: {
    [key: string]: { name: string; count: number };
  } = {};
  for (let i = 0; i < productsPurchased.length; i++) {
    var category_id = productsPurchased[i]?.category_id;

    for (let j = 0; j < productCategories.length; j++) {
      if (productCategories[j].id === category_id) {
        if (
          numberOfProductsSoldInEachCategory[productCategories[j].name] ===
          undefined
        ) {
          numberOfProductsSoldInEachCategory[productCategories[j].name] = {
            name: productCategories[j].name,
            count: 0,
          };
        }

        numberOfProductsSoldInEachCategory[productCategories[j].name].count++;
        break;
      }
    }
  }

  const colors = [
    'bg-red-500',
    'bg-green-300',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-gray-400',

    'bg-red-500',
    'bg-green-300',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-gray-400',
  ];
  return (
    <div className="flex flex-col flex-1 shadow-sm bg-white rounded-md px-4 pt-3 pb-4">
      <h2 className="text-xl font-bold text-blue-500 mb-3">
        {' '}
        Produtos vendidos em relação às categorias{' '}
      </h2>
      <div className=" flex flex-col xl:grid xl:grid-cols-2 gap-4">
        {productCategories.map((category, index) => {
          const percentage =
            numberOfProductsSoldInEachCategory[category.name] !== undefined
              ? (numberOfProductsSoldInEachCategory[category.name].count *
                  100) /
                productsPurchased.length
              : 0;

          const selectColorIndex =
            Math.floor(Math.random() * colors.length) + 0;

          return (
            <div key={category.name} className="w-full ml-2">
              <div className="w-full flex items-center justify-between gap-3 mb-1">
                <span className="text-sm font-semibold text-gray-600">
                  {' '}
                  {category.name}{' '}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {' '}
                  {percentage.toFixed(2)} %{' '}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-white shadow-sm">
                <div
                  style={{ width: `${Math.round(percentage)}%` }}
                  className={`h-full transition-all ease-out duration-500 rounded-full ${colors[selectColorIndex]}`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
