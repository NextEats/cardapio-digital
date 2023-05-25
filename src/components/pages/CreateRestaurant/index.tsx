import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { Input } from './input';
import Image from 'next/image';

const createRestaurantValidationSchema = zod.object({
  restaurantName: zod
    .string()
    .min(1, { message: 'Nome do restaurante é obrigatório' }),
  slug: zod.string().min(1, { message: 'Slug do restaurante é obrigatório' }),
  whatsapp: zod.string().min(11, { message: 'Insira um número válido' }),
  restaurantType: zod.enum(['Buffet', 'Hamburgueria'])
});

type CreateRestaurantFormData = zod.infer<typeof createRestaurantValidationSchema>;

export function CreateRestaurant() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CreateRestaurantFormData>({
    resolver: zodResolver(createRestaurantValidationSchema),
    defaultValues: {
      restaurantName: '',
      slug: '',
      whatsapp: '',
      restaurantType: 'Buffet'
    },
  });

  async function handleCreateRestaurant(data: CreateRestaurantFormData) {
    // await api.post('api/cash_boxes/open', {
    //   restaurant_id: restaurantId,
    //   initial_value: data.initialValue,
    // });
    console.log({ data })
    // location.reload();
  }

  return (
    <>
      <div className='w-screen h-screen pt-[74px] bg-bg-page-light px-6'>
        <div className='mx-auto max-w-[960px] grid grid-cols-1 md:grid-cols-2 bg-white justify-center rounded-md shadow-md p-10'>
          <div className='h-full items-center md:flex hidden'>
            <Image className='w-[340px] h-[310px]' src='https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/next-images/create_reastaurant_vector' alt='teste' width={800} height={800} />
          </div>
          <div>
            <h1 className='text-2xl mb-9'>Falta muito pouco!</h1>
            <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleCreateRestaurant)}>
              <Input
                {...register('restaurantName')}
                label='Nome do restaurante'
                placeholder="Restaurante teste"
              />
              <Input
                {...register('slug')}
                label='Slug do restaurante'
                placeholder="restaurante-teste"
              />
              <Input
                {...register('whatsapp')}
                label='WhatsApp'
                placeholder="(11) 99999-9999"
              />
              <Input
                {...register('restaurantType')}
                label='Tipo de restaurante'
                placeholder="Adega"
              />
              <button type='submit' className='w-full h-[36px] bg-white border-2 border-brand-dark-orange text-brand-dark-orange rounded-3xl mt-4 cursor-pointer hover:bg-brand-dark-orange hover:text-white transition-all duration-300'>CADASTRAR RESTAURANTE</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
