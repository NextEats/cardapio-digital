import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import Image from 'next/image';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

export default function Geral() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { restaurant } = useContext(AdminContext);

    const onSubmit = (data: any, e: any) => {
        async function updateRestaurant() {
            await supabase
                .from('restaurants')
                .update({
                    name: data.name,
                    slug: data.slug,
                })
                .eq('id', restaurant?.id);
        }
        updateRestaurant();
    };

    if (!restaurant) {
        return <></>;
    }

    return (
        <div className="w-full max-w-[600px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-5">
                    <Image
                        src={restaurant.picture_url}
                        alt={restaurant.picture_url}
                        width={100}
                        height={100}
                    />
                    <label className="w-full">
                        <span className="text-sm font-semibold text-[#4b4b4b]">
                            Nome do Estabelecimento
                        </span>
                        <input
                            className="mt-2 w-full focus:outline-none border border-[#d1d1d1] rounded-sm py-2 pl-4"
                            placeholder="Escreva aqui o nome do seu estabelecimento..."
                            type="text"
                            defaultValue={restaurant.name}
                            {...register('name')}
                        />
                    </label>
                    <label className="w-full">
                        <span className="text-sm font-semibold text-[#4b4b4b]">
                            Slug
                        </span>
                        <input
                            className="mt-2 w-full focus:outline-none border border-[#d1d1d1] rounded-sm py-2 pl-4"
                            placeholder="Escreva aqui o slug do seu estabelecimento..."
                            type="text"
                            defaultValue={restaurant.slug}
                            {...register('slug')}
                        />
                    </label>
                    <label className="w-full">
                        <span className="text-sm font-semibold text-[#4b4b4b]">
                            CEP
                        </span>
                        <InputMask
                            mask="99999-999"
                            className="mt-2 w-full focus:outline-none border border-[#d1d1d1] rounded-sm py-2 pl-4"
                            placeholder="Escreva aqui o cep do seu estabelecimento..."
                            type="text"
                            defaultValue={restaurant.addresses.cep}
                            {...register('cep')}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="px-14 py-2 text-sm rounded-sm mt-12 font-semibold text-[white] 
                        uppercase bg-[#de6114eb] hover:bg-[#9e3b14]
                        border-none transition-colors duration-300"
                >
                    SALVAR
                </button>
            </form>
        </div>
    );
}
