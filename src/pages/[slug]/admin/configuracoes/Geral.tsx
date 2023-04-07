import { AdminContext } from '@/src/contexts/adminContext';
import { updateRestaurant } from '@/src/fetch/restaurant/updateRestaurant';
import { deleteOldRestaurantImageFromBucket } from '@/src/helpers/deleteOldRestaurantImageFromBucket';
import { getImagePublicUrl } from '@/src/helpers/getImagePublicUrl';
import { serverURL, supabase } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiEditAlt } from 'react-icons/bi';
import InputMask from 'react-input-mask';
import * as zod from "zod"

const restaurantDataSchema = zod.object({
    cep: zod.string(),
    name: zod.string(),
    slug: zod.string(),
    restaurantLogo: zod.any()
})

type iRestaurantData = zod.infer<typeof restaurantDataSchema>

export default function Geral() {

    const { restaurant } = useContext(AdminContext);
    const [imageSrc, setImageSrc] = useState(restaurant?.picture_url);
    const [imageBlob, setImageBlob] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, 
        setValue
    } = useForm<iRestaurantData>({
        resolver: zodResolver(restaurantDataSchema),
        defaultValues: {
        }
    });

    useEffect(() => {
        setImageSrc(restaurant?.picture_url)
    }, [restaurant?.picture_url])

    const handleImageChange = (data: any) => {
        const file = data[0];
        setImageBlob(URL.createObjectURL(file));
        setValue('restaurantLogo', file)
    }

    const onSubmit = async (data: iRestaurantData) => {

        const oldImageUrl = restaurant?.picture_url 
        const oldImageUrlArray = oldImageUrl!.split('/');  
        const oldImageName = oldImageUrlArray.at(-1)
        const file = data?.restaurantLogo;

        const { data: imageList } = await supabase
        .storage.
        from('restaurant-pictures').
        list(); 

        const imageAlreadySaved = imageList!.find((image) => image?.name === file?.name);
        
        if(imageAlreadySaved) {
            deleteOldRestaurantImageFromBucket(imageAlreadySaved.name)
        }

        const { data: savedFile, error: uploadError } = await supabase
        .storage.
        from('restaurant-pictures').
        upload(`${file?.name}`, file);

        if (uploadError) {
            console.log(uploadError);
        }

        const publicUrl = getImagePublicUrl(savedFile?.path as string)

        if(publicUrl){
            setImageSrc(publicUrl.data.publicUrl);
            const newImageUrl = await updateRestaurant(publicUrl.data.publicUrl, data, restaurant?.id)
            restaurant!.picture_url = newImageUrl;
            setImageSrc(newImageUrl)
        }

        if(!imageAlreadySaved) {
            deleteOldRestaurantImageFromBucket(oldImageName)
        }
    };

    if (!restaurant) {
        return <p>Carregando Restaurante</p>;
    }

    return (
        <div className="w-full max-w-[600px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-5">
                    <div className='flex justify-start'>
                        <Image
                            src={imageBlob ? imageBlob : (imageSrc ? imageSrc : restaurant.picture_url)}
                            alt={restaurant?.picture_url}
                            width={100}
                            height={100}
                        />

                        <label htmlFor="editImage" className="cursor-pointer w-fit">
                            <BiEditAlt className='cursor-pointer m-2' fontSize={'1.5em'}/>
                        </label>
                    
                        <input id='editImage' {...register('restaurantLogo')} onChange={(e) => handleImageChange(e.target.files)} className="hidden" type="file" />
                    </div>
                    

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
                            defaultValue={restaurant?.addresses?.cep}
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
