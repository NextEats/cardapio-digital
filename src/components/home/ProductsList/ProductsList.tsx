import Image from 'next/image';

import { FaSearch } from 'react-icons/fa';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import scrollTo from '@/src/helpers/scrollTo';
import toNormalForm from '@/src/helpers/stringToNormalForm';
import { useContext } from 'react';

export default function ProductList() {
    const { products } = useContext(DigitalMenuContext);

    const groupedProductsData = Object.values(products);

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div>
            <CategoriesNavbar groupedProductsData={groupedProductsData} />
            <SearchInput />
            <div className="mx-3 ">
                {groupedProductsData.map((category, index) => {
                    return (
                        <ProductsHorizontalList
                            key={index}
                            category={category}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function CategoriesNavbar({ groupedProductsData }: any) {
    if (groupedProductsData.length === 0 || !groupedProductsData) {
        return null;
    }

    return (
        <div className="scrollbar-custom sticky pl-3 py-2 left-0 top-0 mt-3 whitespace-nowrap overflow-auto bg-gray-100 z-10 touch-auto">
            {groupedProductsData.map((category: any, index: number) => {
                return (
                    <button
                        className="mr-3 px-12 py-3 rounded-lg text-md font-semibold bg-gray-700 text-white hover:bg-gray-500"
                        onClick={() => {
                            scrollTo(toNormalForm(category.name));
                        }}
                        key={index}
                    >
                        {category.name}
                    </button>
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

    return (
        <div id={toNormalForm(category.name)} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl mb-3 mt-5 font-semibold text-gray-700 ">
                {category.name}
            </h2>
            <div className="whitespace-nowrap overflow-auto scrollbar-custom">
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
                                      'border hover:bg-gray-300 w-44 px-3 py-6 mr-3 inline-block rounded-md ' +
                                      (product.active
                                          ? 'bg-gray-100 cursor-pointer'
                                          : 'bg-gray-300 cursor-not-allowed grayscale')
                                  }
                              >
                                  <div className="w-full mt-1 rounded-md">
                                      <Image
                                          src={product.picture_url}
                                          width={180}
                                          height={180}
                                          alt={product.name}
                                          className="rounded-md h-44"
                                      />
                                  </div>
                                  <div className="mt-3">
                                      <p className="text-md truncate">
                                          {product.name}
                                      </p>
                                  </div>

                                  <div className="mt-2">
                                      <span className="block before:content-['R$'] text-md font-semibold">
                                          {product.price}
                                      </span>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
