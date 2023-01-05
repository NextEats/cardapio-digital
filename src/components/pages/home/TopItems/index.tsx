import Image from "next/image";
import Link from "next/link";

export default function TopItems() {


    type itemType = {
        picture: string;
        name: string;
        description: string;
        price: number;
    };

    const topItemsData: itemType[] = [
        {
            picture:
                "https://i.ibb.co/PwDK3Xn/208c90f0-5596-48a4-a1ce-aebb38cf789d.jpg",
            name: "Combo X-Bacon + Fritas",
            description: "Molho da casa, hambúrguer 150g, bacon queijo prato.",
            price: 28,
        },
        {
            picture:
                "https://i.ibb.co/zFY95cV/d3a83eba-4052-48e5-963a-56f0ef52bf85.jpg",
            name: "Combo X-Salada + Fritas",
            description:
                "Molho da casa, hambúrguer 150g, cebola roxa, picles, tomate, alface e queijo prato.",
            price: 28,
        },
        {
            picture:
                "https://i.ibb.co/XZ8pbQq/ac748309-cf8d-47df-829c-0c31512de298.jpg",
            name: "Combo X-Duplo Cheddar + Fritas",
            description: "2 Hambúrguer 150g, cebola caramelizada e cheddar",
            price: 35,
        },
    ];

    return (
        <div className="px-4">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Destaques</h2>
            {topItemsData.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-row mb-5 border shadow-lg bg-white p-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300 hover:brightness-90"
                    >
                        <Link href={`/product/${item.price}`}>
                            
                                <Image
                                    src={item.picture}
                                    className="rounded-xl"
                                    alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                                    width={120}
                                    height={120}
                                />
                            
                        </Link>
                        <div className="flex flex-col ml-3 justify-center">
                            <span className="text-lg font-medium">{item.name}</span>
                            <span className="text-sm">{item.description}</span>
                            <span className="text-normal font-semibold mt-2 before:content-['R$']">
                                {" "}
                                {item.price}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}