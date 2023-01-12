import { GetServerSideProps } from "next";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import Header from "../../components/home/Header";
import { api } from "../../server/api";
import { IRestaurant } from "../../types/home";

interface IFinishedProps {
    restaurant: IRestaurant
}

export default function Finished({ restaurant }: IFinishedProps) {
    return (
        <div>
            <Header restaurant={restaurant} withStars={false} />
            <div className="flex flex-col gap-3 px-4 mt-7">
                <h2 className="font-extrabold text-2xl text-yellow-500" >Opaa! Pedido confirmado</h2>
                <span className="font-medium text-sm text-gray-400">Agora é só aguardar a entrega </span>
                <span className="font-light text-xs text-gray-400" >
                    O status do seu pedido será informado gradualmente através do seu WhasApp
                </span>
            </div>
            <div className="w-full absolute bottom-0 left-0 px-4 pb-8 pt-4 bg-white ">
                <p className="text-base font-light text-black mb-3">Acompanhe o seu pedido.</p>

                <button className="w-full h-10 flex items-center justify-center gap-2 mb-3 bg-gray-700 rounded-md text-sm uppercase text-white-300 font-medium">
                    Criar minha conta
                </button>
                <button className="w-full h-10 flex items-center justify-center gap-2 border border-black rounded text-sm uppercase text-gray-600 font-medium">
                    Fazer login
                </button>
            </div> 
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const restaurant = await api.get("restaurants/2");
    return {
        props: {
            restaurant: restaurant.data,
        },
    };
};
