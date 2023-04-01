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
                                    'border hover:bg-gray-300 inline-block rounded-md' +
                                    (product.active
                                        ? 'bg-gray-100 cursor-pointer'
                                        : 'bg-gray-300 cursor-not-allowed grayscale')
                                }
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-4 bg-white h-full">
                                    {/* flex flex-col border-b sm:border-b-0 h-full sm:justify-center */}
                                    <div className="flex flex-col sm:justify-center items-center">
                                        <Image
                                            src={product.picture_url}
                                            width={100}
                                            height={100}
                                            alt={product.name}
                                            className="rounded-md max-h-28"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:border-l col-span-3">
                                        <div className="flex flex-col pl-4 py-4 text-gray-600">
                                            <div className="flex flex-row text-sm">
                                                <p className="text-md truncate">
                                                    {product.name}
                                                </p>
                                            </div>
                                            <div className="flex flex-row text-sm">
                                                <span className="block text-md font-semibold truncate ">
                                                    {product.description}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row text-md pl-4">
                                            <span className="block before:content-['R$'] text-md font-semibold">
                                                {product.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="w-full mt-1 rounded-md">
                                    <Image
                                        src={product.picture_url}
                                        width={100}
                                        height={50}
                                        alt={product.name}
                                        className="rounded-md h-15"
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
                                </div> */}
                            </div>
                        );
                    })
                : null}
            </div>
        </div>
    );
}
