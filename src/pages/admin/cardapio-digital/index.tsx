import AdminWrapper from "../../../components/AdminWrapper";

import Image from "next/image";

type IngredientData = {
  id: number;
  name: string;
};

const Ingredients: IngredientData[] = [
  {
    id: 1,
    name: "Queijo Muçarela",
  },
  {
    id: 2,
    name: "Pão",
  },
];

type ProductData = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  profitMargin: number;
  ingredients: number[];
};

const products: ProductData[] = [
  {
    id: 0,
    imageUrl:
      "https://i.ibb.co/PwDK3Xn/208c90f0-5596-48a4-a1ce-aebb38cf789d.jpg",
    name: "Combo X-Bacon + Fritas",
    description:
      "Molho da casa, hambúrguer 150g, cebola roxa, picles, tomate, alface e queijo prato.",
    price: 22,
    profitMargin: 2,
    ingredients: [1, 2, 3],
  },
];

export default function AdminHomepage() {
  const tdClasses = "[&:not(:last-child)]:p-4";

  return (
    <AdminWrapper>
      <div>
        <div>Cardapio Digital</div>

        <div className="mt-12 ">
          <span className="font-bold text-2xl m-3">Lanches</span>
          <table className="m-3">
            <thead>
              <tr>
                <td className={tdClasses}>ID</td>
                <td className={tdClasses}>Imagem</td>
                <td className={tdClasses}>Nome do Produto</td>
                <td className={tdClasses}>Descrição</td>
                <td className={tdClasses}>Preço</td>
                <td className={tdClasses}>Margem de Lucro</td>
                <td className={tdClasses}>Ingredientes</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product: ProductData) => {
                const tdClasses = "p-4";

                return (
                  <tr
                    key={product.id}
                    className=" hover:bg-gray-300 transition-all duration-200 ease-in-out product.imageUrl cursor-pointer"
                  >
                    <td className={tdClasses}>{product.id}</td>
                    <td>
                      <Image
                        className="rounded-lg"
                        src={product.imageUrl}
                        width={78}
                        height={78}
                        alt={product.name}
                      />
                    </td>
                    <td className={tdClasses}>{product.name}</td>
                    <td className={tdClasses}>{product.description}</td>
                    <td className={tdClasses}>{product.price}</td>
                    <td className={tdClasses}>{product.profitMargin}</td>
                    <td className={tdClasses}>{product.ingredients}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminWrapper>
  );
}
