import Image from 'next/image';

import { FaSearch } from 'react-icons/fa';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import toNormalForm from '@/src/helpers/stringToNormalForm';
import { useContext, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function ProductList() {
  const { products } = useContext(DigitalMenuContext);

  const groupedProductsData = Object.values(products);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div>
      <CategoriesNavbar groupedProductsData={groupedProductsData} />
      {/* <SearchInput /> */}
      <div className="mx-3 ">
        {groupedProductsData.map((category, index) => {
          return <ProductsHorizontalList key={index} category={category} />;
        })}
      </div>
    </div>
  );
}

function CategoriesNavbar({ groupedProductsData }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 400; // Change this value to the desired scroll threshold

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY >= scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (groupedProductsData.length === 0 || !groupedProductsData) {
    return null;
  }

  return (
    <div
      className={`lg:w-8/12 px-4 lg:px-0 m-auto flex flex-row lg:justify-center scrollbar-custom fixed py-2 left-0 right-0 top-0 whitespace-nowrap overflow-auto bg-gray-100 z-10 touch-auto transition-all ease-in-out duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {groupedProductsData.map((category: any, index: number) => {
        const formatedCategoryName = toNormalForm(category.name);
        const encodedCategoryName = encodeURIComponent(formatedCategoryName);

        return (
          <AnchorLink href={`#${encodedCategoryName}`} key={index}>
            <button
              className="mr-3 px-12 py-3 rounded-lg text-md font-semibold bg-gray-700 text-white hover:bg-gray-500"
              key={index}
            >
              {category.name}
            </button>
          </AnchorLink>
        );
      })}
    </div>
  );
}

function SearchInput() {
  return (
    <div className="relative text-gray-600 mt-4 mx-3">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
        <FaSearch className="ml-2" />
      </span>
      <input
        type="search"
        className="p-3 w-full text-md text-gray-800 bg-white rounded-md pl-12 outline outline-1 outline-gray-300 focus:outline-gray-200"
        placeholder="Pesquise por um produto..."
        autoComplete="off"
      />
    </div>
  );
}

function ProductsHorizontalList({ category }: { category: any }) {
  const selectedProduct = useContext(DigitalMenuContext).selectedProduct;

  if (category.length === 0) {
    return null;
  }

  const formatedCategoryName = toNormalForm(category.name);
  const encodedCategoryName = encodeURIComponent(formatedCategoryName);

  return (
    <div id={encodedCategoryName} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl mt-16 mb-4 text-gray-800">{category.name}</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3  gap-3 ">
        {category.products
          ? category.products.map((product: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (product.id && product.active) {
                      selectedProduct?.set(undefined);
                      selectedProduct?.set(product.id);
                    }
                  }}
                  className={
                    'hover:bg-gray-300 inline-block rounded-md' +
                    (product.active
                      ? 'bg-gray-100 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed grayscale')
                  }
                >
                  <div className="grid  grid-cols-4 bg-white hover:bg-gray-200 h-full rounded-md">
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        src={product.picture_url}
                        width={100}
                        height={100}
                        alt={product.name}
                        className="rounded-md max-h-28 -ml-1"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className="flex flex-col col-span-3 my-auto">
                      <div className="flex flex-col pl-4 mb-3 text-gray-600">
                        <div className="flex flex-row text-sm font-bold">
                          <p className="text-md truncate">{product.name}</p>
                        </div>
                        <div className="flex flex-row text-sm w-56">
                          <span className="block text-md truncate ">
                            {product.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row text-md pl-4">
                        <span className="block before:content-['R$'] text-sm font-semibold">
                          &nbsp;{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
