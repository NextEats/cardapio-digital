import { FaSearch } from "react-icons/fa";

function scrollTo(id: string) {
  const element = document.getElementById(id) as HTMLElement;
  element.scrollIntoView({ behavior: "smooth" });
}

export default function ProductList() {
  return (
    <div>
      <CategoriesNavbar />
      <SearchInput />
      <div className="mx-3">
        <ProductsHorizontalList name="Promoção" />
        <ProductsHorizontalList name="Bebidas" />
        <ProductsHorizontalList name="Drinks" />
      </div>
      <div className="h-[1000px]"></div>
    </div>
  );
}

function CategoriesNavbar() {
  const buttonClasses =
    "mr-3 px-12 py-3 rounded-lg border-2 text-md font-semibold bg-gray-100 hover:bg-gray-200";

  return (
    <div className="sticky pl-3 py-2 left-0 top-0 mt-3 whitespace-nowrap overflow-auto bg-gray-700 z-20 touch-auto">
      <button className={buttonClasses} onClick={() => scrollTo("Promoção")}>
        Promoção
      </button>
      <button className={buttonClasses} onClick={() => scrollTo("Bebidas")}>
        Bebidas
      </button>
      <button className={buttonClasses} onClick={() => scrollTo("Drinks")}>
        Drinks
      </button>
      <button className={buttonClasses}>Porções</button>
      <button className={buttonClasses}>Cervejas</button>
      <button className={buttonClasses}>Kids</button>
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

function ProductsHorizontalList({ name }: { name: string }) {
  const productsOnSaleData = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div id={name} className="pt-16 first:pt-0">
      <h2 className="text-2xl mb-3 mt-5 text-gray-500">{name}</h2>
      <div className="whitespace-nowrap overflow-auto">
        {productsOnSaleData.map((id) => {
          return (
            <div
              key={id}
              className="border bg-gray-100 hover:bg-gray-300 w-44 h-72 p-3 mr-3 inline-block rounded-md cursor-pointer"
            >
              <div className="h-36 w-full bg-red-400 mt-1 rounded-md"></div>
              <div className="mt-3">
                <p className="text-md truncate">X-Bacon Gourmet Maravilhoso</p>
              </div>
              <div className="mt-3 flex flex-row items-center">
                <span className="px-2 py-1 rounded-sm text-white bg-green-500 text-sm">
                  {100 - (45 * 100) / 50}%
                </span>
                <span className="ml-2 before:content-['R$'] line-through text-sm">
                  &nbsp;50,00
                </span>
              </div>
              <div className="mt-2">
                <span className="block before:content-['R$'] text-md font-semibold">
                  &nbsp;45,00
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
