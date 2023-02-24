import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Dispatch, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { EditableProductActions } from '../../../../../reducers/EditableProductReducer/actions';
import {
    IEditableProductReducerData,
    iPayloadProduct,
} from '../../../../../reducers/EditableProductReducer/reducer';
import {
    createAdditionalsAndIsertIntoProductAdditionalsIfIsUpdatingProduct,
    deleteProductAdditionalsIfIsUpdatingProduct,
    updateAdditional,
} from '../../../../../server/api';
import {
    iInsertAdditional,
    iRestaurant,
    iRestaurants,
} from '../../../../../types/types';
import { CardapioDigitalButton } from '../../CardapioDigitalButton';

interface IAdditionalProps {
    state: IEditableProductReducerData;
    dispatch: Dispatch<{
        type: string;
        payload: iPayloadProduct;
    }>;
    productId: number;
    restaurantData: iRestaurant['data'];
}

const newAdditionalFormValidationSchema = zod.object({
    id: zod.number(),
    additionalName: zod.string(),
    additionalPrice: zod.string(),
    additionalPicture_url: zod.string(),
});

type NewAdditionlFormData = zod.infer<typeof newAdditionalFormValidationSchema>;

export function Additional({
    state,
    dispatch,
    productId,
    restaurantData,
}: IAdditionalProps) {
    const [restaurant, setRestaurantId] = useState<iRestaurants['data']>([]);

    const [showAdditionalModal, setShowAdditionalModal] = useState<
        'UPDATE' | 'ADD' | ''
    >('');
    const [oldAdditionalId, setOldAdditionalId] = useState<number | undefined>(
        undefined
    );

    const { register, setValue, reset, getValues } =
        useForm<NewAdditionlFormData>({
            resolver: zodResolver(newAdditionalFormValidationSchema),
            defaultValues: {
                additionalName: '',
                additionalPrice: '',
                additionalPicture_url: '',
            },
        });

    function handleNewAdditionl() {
        const additionalName = getValues('additionalName');
        const additionalPrice = Number(getValues('additionalPrice'));
        const additionalPicture_url = getValues('additionalPicture_url');

        if (state.isViewingUpdatingOrAdding === 'UPDATING') {
            createAdditionalsAndIsertIntoProductAdditionalsIfIsUpdatingProduct(
                additionalName,
                additionalPrice,
                productId!,
                restaurantData
            );
        }

        dispatch({
            type: EditableProductActions.ADD_NEW_ADDITIONAL,
            payload: {
                additional: {
                    name: additionalName,
                    price: Number(additionalPrice),
                    picture_url: additionalPicture_url,
                },
            },
        });
        reset();
        setShowAdditionalModal('');
    }

    function removeAdditional(additionalName: string, additionalId: number) {
        if (state.isViewingUpdatingOrAdding === 'UPDATING') {
            deleteProductAdditionalsIfIsUpdatingProduct(
                additionalId,
                productId
            );
        }
        dispatch({
            type: EditableProductActions.REMOVE_ADDITIONAL,
            payload: {
                additionalName,
            },
        });
    }

    function showModalToUpdateAdditional(
        additional: iInsertAdditional['data']
    ) {
        setValue('additionalName', additional.name);
        setValue('additionalPrice', additional.price.toString());
        setValue('additionalPicture_url', additional.picture_url);
        setOldAdditionalId(additional.id);
        setShowAdditionalModal('UPDATE');
    }

    async function setUpdateAdditional() {
        const additionalName = getValues('additionalName');
        const additionalPrice = Number(getValues('additionalPrice'));
        const additionalPicture_url = getValues('additionalPicture_url');

        if (
            state.additionals.some(
                (additional) => additional.name === additionalName
            )
        ) {
            return;
        }

        dispatch({
            type: EditableProductActions.UPDATE_ADDITIONAL,
            payload: {
                additionalName,
                additionalPrice,
                additionalPicture_url,
                oldAdditionalId,
            },
        });

        updateAdditional(
            oldAdditionalId!,
            additionalPicture_url,
            additionalPrice,
            additionalName
        );

        setShowAdditionalModal('');

        reset();
    }

    return (
        <div className="mb-24">
            {state.isViewingUpdatingOrAdding !== 'VIEWING' ||
            state.additionals.length !== 0 ? (
                <h2 className="mb-5 font-semibold text-sm">Adicionais</h2>
            ) : null}

            <div className="flex flex-col mb-3 relative">
                <div className="flex flex-col gap-2">
                    {state.additionals?.map((additional) => {
                        if (
                            additional?.name === '' &&
                            additional?.picture_url === ''
                        ) {
                            return;
                        }
                        return (
                            <div
                                key={additional?.id}
                                className="flex flex-1 items-center pr-4 shadow-md rounded-md relative bg-white-300"
                            >
                                <div className="flex items-center gap-3 h-[60px]">
                                    <Image
                                        src={additional?.picture_url}
                                        className="rounded-tl-md rounded-bl-md h-full"
                                        alt={additional?.name}
                                        width={91}
                                        height={50}
                                    />
                                    <div className="">
                                        <p className="font-bold text-black text-sm ">
                                            {additional?.name}
                                        </p>
                                        <p className="font-medium text-xs text-black ">
                                            R$ {additional?.price}
                                        </p>
                                    </div>
                                </div>
                                {state.isViewingUpdatingOrAdding !==
                                'VIEWING' ? (
                                    <div className="flex items-center gap-2 absolute top-1 right-1">
                                        <BiPencil
                                            onClick={() =>
                                                showModalToUpdateAdditional(
                                                    additional!
                                                )
                                            }
                                            className="text-xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
                                        />
                                        <FiTrash2
                                            onClick={() =>
                                                removeAdditional(
                                                    additional?.name,
                                                    additional?.id!
                                                )
                                            }
                                            className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
                {showAdditionalModal === 'ADD' ||
                showAdditionalModal === 'UPDATE' ? (
                    <div className="w-72 h-auto p-4 absolute z-50 bottom-0 right-1/2 translate-x-1/2 rounded-md bg-white shadow-md">
                        <h3 className="text-base font-semibold mb-6">
                            Adicional
                        </h3>
                        <input
                            type="text"
                            placeholder="Nome"
                            {...register('additionalName')}
                            className="flex flex-1 h-10 w-full text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                    outline-none border border-solid border-gray-300 rounded px-3 mb-3"
                        />
                        <input
                            type="text"
                            placeholder="Preço"
                            {...register('additionalPrice', {
                                valueAsNumber: true,
                            })}
                            className="flex flex-1 h-10 w-full ptext-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                outline-none border border-solid border-gray-300 rounded px-3 mb-3"
                        />
                        <input
                            type="text"
                            placeholder="Link"
                            {...register('additionalPicture_url')}
                            className="flex flex-1 h-10 w-full text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                outline-none border border-solid border-gray-300 rounded px-3 mb-3"
                        />
                        <div className="w-full flex items-center gap-2 mt-6">
                            <CardapioDigitalButton
                                onClick={() => setShowAdditionalModal('')}
                                name="Cancelar"
                                h="h-7"
                                w="flex-1"
                            />
                            {showAdditionalModal === 'UPDATE' && (
                                <CardapioDigitalButton
                                    onClick={() => setUpdateAdditional()}
                                    name="Editar"
                                    h="h-7"
                                    w="flex-1"
                                />
                            )}
                            {showAdditionalModal === 'ADD' && (
                                <CardapioDigitalButton
                                    onClick={() => handleNewAdditionl()}
                                    name={'Adicionar'}
                                    h="h-7"
                                    w="flex-1"
                                />
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
            {state.isViewingUpdatingOrAdding !== 'VIEWING' ? (
                <div className="w-full flex items-center justify-end mt-6">
                    <CardapioDigitalButton
                        w="w-28"
                        h="h-8"
                        name="Adicionar"
                        onClick={() => setShowAdditionalModal('ADD')}
                    />
                </div>
            ) : null}
        </div>
    );
}
