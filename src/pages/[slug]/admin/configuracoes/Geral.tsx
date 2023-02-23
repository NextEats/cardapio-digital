import InputWithLabel from '@/src/components/InputWithLabel';
import { AdminContext } from '@/src/contexts/adminContext';
import Image from 'next/image';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function Geral() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { restaurant } = useContext(AdminContext);

    const onSubmit = (data: any) => {
        console.log(data);
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
                    <InputWithLabel
                        label="Alterar foto do estabelecimento"
                        placeholder="Escreva aqui o nome do seu estabelecimento..."
                        defaultValue={restaurant.name}
                        type="file"
                        {...register('name')}
                    />
                    <InputWithLabel
                        label="Nome do Estabelecimento"
                        placeholder="Escreva aqui o nome do seu estabelecimento..."
                        defaultValue={restaurant.name}
                        {...register('name')}
                    />
                    <InputWithLabel
                        label="Slug"
                        {...register('slug')}
                        defaultValue={restaurant.slug}
                    />
                    <InputWithLabel
                        label="CEP"
                        {...register('cep')}
                        mask="99999-999"
                        defaultValue={restaurant.addresses.cep}
                    />
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
