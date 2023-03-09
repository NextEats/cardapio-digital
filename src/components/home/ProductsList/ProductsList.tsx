import Image from 'next/image';

import { FaSearch } from 'react-icons/fa';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import scrollTo from '@/src/helpers/scrollTo';
import toNormalForm from '@/src/helpers/stringToNormalForm';
import { useContext } from 'react';

export default function ProductList() {
    const { products } = useContext(DigitalMenuContext);

    const groupedProductsData = Object.values(products);

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
            <div className="h-[300px]"></div>
        </div>
    );
}

function CategoriesNavbar({ groupedProductsData }: any) {
    const buttonClasses =
        'mr-3 px-12 py-3 rounded-lg border-2 text-md font-semibold bg-gray-100 hover:bg-gray-200';

    return (
        <div className="scrollbar-custom sticky pl-3 py-2 left-0 top-0 mt-3 whitespace-nowrap overflow-auto bg-gray-100 shadow border z-10 touch-auto">
            {groupedProductsData.map((category: any, index: number) => {
                return (
                    <button
                        className={buttonClasses}
                        onClick={() => {
                            scrollTo(toNormalForm(category.category_name));
                        }}
                        key={index}
                    >
                        {category.category_name}
                    </button>
                );
            })}
        </div>
    );
}

function SearchInput() {
    return (
        <div className="relative text-gray-600 mt-4 mx-3 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
                <FaSearch className="ml-2" />
            </span>
            <input
                type="search"
                className="p-3 w-full text-md text-gray-800 bg-gray-100 rounded-md pl-12 outline outline-1 outline-gray-300 focus:outline-gray-500"
                placeholder="Pesquise por um produto..."
                autoComplete="off"
            />
        </div>
    );
}

function ProductsHorizontalList({ category }: { category: any }) {
    const selectedProduct = useContext(DigitalMenuContext).selectedProduct;

    return (
        <div
            id={toNormalForm(category.category_name)}
            className="mb-12 scroll-mt-24"
        >
            <h2 className="text-2xl mb-3 mt-5 font-semibold text-gray-700">
                {category.category_name}
            </h2>
            <div className="whitespace-nowrap overflow-auto scrollbar-custom">
                {category.products.map((product: any, index: any) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if (product.id) {
                                    selectedProduct?.set(undefined);
                                    selectedProduct?.set(product.id);
                                }
                            }}
                            className="border bg-gray-100 hover:bg-gray-300 w-44 px-3 py-6 mr-3 inline-block rounded-md cursor-pointer"
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
                })}
            </div>
        </div>
    );
}
