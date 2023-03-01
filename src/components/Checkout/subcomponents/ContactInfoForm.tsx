import { useContext } from 'react';
import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import cep from 'cep-promise';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { SubmitForm } from './SubmitForm';

export default function ContactInfoForm({ setCurrentStep }: any) {
    type ContactFormValues = {
        cep: string;
        neighborhood: string;
        street: string;
        number: string;
        whatsapp: string;
        name: string;
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ContactFormValues>();

    const restaurant = useContext(DigitalMenuContext).restaurant;
    const products = useContext(DigitalMenuContext).productReducer!;

    const onSubmit: SubmitHandler<ContactFormValues> = async ({
        cep,
        name,
        number,
        whatsapp,
    }) => {
        SubmitForm({ cep, name, number, whatsapp, products, restaurant });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="w-full flex justify-center">
                <span className="text-center text-2xl font-semibold">
                    Digite seus Dados
                </span>
            </div>
            <div className="px-4 mt-12">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                    >
                        Nome
                    </label>
                    <input
                        {...register('name')}
                        id="name"
                        type="text"
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.name && 'border-red-500'
                        }`}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="whatsapp"
                    >
                        WhatsApp
                    </label>
                    <InputMask
                        {...register('whatsapp', { required: true })}
                        id="whatsapp"
                        type="text"
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.whatsapp && 'border-red-500'
                        }`}
                        mask="(99) 99999-9999"
                    />
                    {errors.cep && (
                        <p className="text-red-500 text-xs italic">
                            Digite seu número de WhatsApp
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="cep"
                    >
                        CEP
                    </label>
                    <InputMask
                        {...register('cep', { required: true })}
                        id="cep"
                        type="text"
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.cep && 'border-red-500'
                        }`}
                        mask="99999-999"
                        onBlur={async () => {
                            const values = getValues();
                            try {
                                const cepInfo = await cep(values.cep);
                                if (cepInfo) {
                                    setValue(
                                        'neighborhood',
                                        cepInfo.neighborhood
                                    );
                                    setValue('street', cepInfo.street);
                                }
                            } catch {
                                console.log('CEP não encontrado');
                            }
                        }}
                    />
                    {errors.cep && (
                        <p className="text-red-500 text-xs italic">
                            Digite seu CEP
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="neighborhood"
                    >
                        Bairro
                    </label>
                    <input
                        {...register('neighborhood')}
                        id="neighborhood"
                        type="text"
                        className={`bg-[#00000019] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.neighborhood && 'border-red-500'
                        }`}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="street"
                    >
                        Rua
                    </label>
                    <input
                        {...register('street')}
                        id="street"
                        type="text"
                        className={`bg-[#00000019] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.street && 'border-red-500'
                        }`}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="number"
                    >
                        Número
                    </label>
                    <input
                        {...register('number', { required: true })}
                        id="number"
                        type="text"
                        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.number && 'border-red-500'
                        }`}
                    />
                    {errors.number && (
                        <p className="text-red-500 text-xs italic">
                            Digite seu número
                        </p>
                    )}
                </div>
                <div className="flex w-full gap-x-2 mt-16">
                    <button
                        onClick={() => {
                            setCurrentStep('products_list');
                        }}
                        className="w-[50%] font-semibold text-sm uppercase shadow border border-indigo-600 bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 focus:shadow-outline focus:outline-none py-3 px-10 rounded"
                    >
                        voltar
                    </button>
                    <button
                        type="submit"
                        className="w-[50%] font-semibold text-sm uppercase shadow bg-indigo-800 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white py-3 px-10 rounded"
                    >
                        continuar
                    </button>
                </div>
            </div>
        </form>
    );
}
