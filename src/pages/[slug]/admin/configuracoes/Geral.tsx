import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiEditAlt } from 'react-icons/bi';
import InputMask from 'react-input-mask';

export default function Geral() {

    type uploadedFile = {
        path: string
    }
    type imagePublicUrl = {
        data: {
            publicUrl: string
        }
    }
    
    const [inputChangeLogo, setInputChangeLogo] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { restaurant } = useContext(AdminContext);

    const onSubmit = async (data: any, e: any) => {
        let imagePublicUrl : imagePublicUrl = {
            data: {
                publicUrl: ''
            }
        }
        let uploadedFile : uploadedFile = {
            path: ''
        }

        const file = data.restaurantLogo[0];

        const { data: imageList } = await supabase
        .storage.
        from('restaurant-pictures').
        list();

        const imageAlreadySaved = imageList!.find((image) => image.name === file.name);

        if (!imageAlreadySaved) { 
            console.log("não existe")
            const { data, error: uploadError } = await supabase
            .storage.
            from('restaurant-pictures').
            upload(`${file.name}`, file);

            if (uploadError) {
                console.log(uploadError);
                return;
            }
            uploadedFile = data;
            imagePublicUrl = await supabase
            .storage
            .from('restaurant-pictures')
            .getPublicUrl(uploadedFile.path);
        }else{
            imagePublicUrl = await supabase
            .storage
            .from('restaurant-pictures')
            .getPublicUrl(imageAlreadySaved!.name);
        }

        async function updateRestaurant() {
            await supabase
                .from('restaurants')
                .update({
                    name: data.name,
                    slug: data.slug,
                    picture_url: imagePublicUrl.data.publicUrl,
                })
                .eq('id', restaurant?.id);
        }
        updateRestaurant();
    };

    const handleRestaurantLogoChange = () => {
        setInputChangeLogo(!inputChangeLogo)
    }

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

                    <BiEditAlt className='cursor-pointer m-2' onClick={handleRestaurantLogoChange}/>

                    {inputChangeLogo ? (
                        <input {...register('restaurantLogo')} type="file" />
                    ) : null}

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
