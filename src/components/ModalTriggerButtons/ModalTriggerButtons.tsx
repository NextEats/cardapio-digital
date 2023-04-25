import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { getPaymentMethodsRestaurantsByRestaurantIdFetch } from '@/src/fetch/paymentMethodsRestaurants/getPaymentMethodsRestaurantsByRestaurantId';
import { iPaymentMethodsRestaurantsWithFKData } from '@/src/types/types';
import cep from 'cep-promise';
import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { AiFillCheckCircle } from 'react-icons/ai';
import ReactInputMask from 'react-input-mask';
import Button from '../Button';
import CloseModalButton from '../CloseModalButton';

interface iModalTriggerButtons {
  Icon: IconType;
  text: string;
  filled: boolean;
}

export default function ModalTriggerButtons({
  Icon,
  text,
  filled,
}: iModalTriggerButtons) {
  const { restaurant } = useContext(DigitalMenuContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paymentMethodsRestaurant, setPaymentMethodsRestaurant] = useState<
    iPaymentMethodsRestaurantsWithFKData[]
  >([]);

  const {
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  const isButtonPhoneDisabled =
    text === 'Telefone' &&
    String(watch('whatsappNumber')).replace(/\D/g, '').length < 11;
  const isButtonCepDisabled =
    text === 'Endereço de Entrega' &&
    String(watch('cep')).replace(/\D/g, '').length < 8;

  const handleToggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const cepFromStorage = localStorage.getItem('cep')
      ? localStorage.getItem('cep')
      : null;
    const neighborhoodFromStorage = localStorage.getItem('neighborhood')
      ? localStorage.getItem('neighborhood')
      : null;
    const streetFromStorage = localStorage.getItem('street')
      ? localStorage.getItem('street')
      : null;
    const complementFromStorage = localStorage.getItem('complement')
      ? localStorage.getItem('complement')
      : null;
    const numberFromStorage = localStorage.getItem('number')
      ? localStorage.getItem('number')
      : null;

    if (
      streetFromStorage ||
      complementFromStorage ||
      numberFromStorage ||
      neighborhoodFromStorage ||
      cepFromStorage
    ) {
      setValue('cep', cepFromStorage);
      setValue('neighborhood', neighborhoodFromStorage);
      setValue('street', streetFromStorage);
      setValue('complement', complementFromStorage);
      setValue('number', numberFromStorage);
    }
  }, []);

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const neighborhoodInput: any = document.getElementById('neighborhood');
    const streetInput: any = document.getElementById('street');

    try {
      if (!e.target) {
        return;
      }
      const cepInfo = await cep(e.target.value);
      if (cepInfo) {
        if (neighborhoodInput) {
          neighborhoodInput.value = cepInfo.neighborhood;
          setValue('neighborhood', cepInfo.neighborhood);
        }
        if (streetInput) {
          streetInput.value = cepInfo.street;
          setValue('street', cepInfo.street);
        }
      } else {
        neighborhoodInput.value = '';
        streetInput.value = '';
      }
    } catch {
      neighborhoodInput.value = '';
      streetInput.value = '';
    }
  };

  useEffect(() => {
    const getPaymentMethodsRestaurants = async () => {
      const paymentMethodsRestaurant =
        await getPaymentMethodsRestaurantsByRestaurantIdFetch(restaurant?.id);
      if (!paymentMethodsRestaurant) return;
      setPaymentMethodsRestaurant(paymentMethodsRestaurant);
    };
    getPaymentMethodsRestaurants();
  }, [restaurant?.id]);

  const watchingPaymentMethod = Number(watch('paymentMethod'));
  const watchingChangeNeed = watch('change_need');

  return (
    <>
      <div
        onClick={handleToggleModal}
        className="border-b-not-fist-child p-5 hover:bg-[#00000005] cursor-pointer flex flex-row items-center content-between"
      >
        <div className="flex flex-row">
          <Icon className="text-[2.5rem] text-[#000000]" />
          <span className="ml-3 text-lg flex flex-row items-center">
            {text}
          </span>
        </div>
        {filled ? (
          <div className="ml-auto text-[1.7rem] text-[#47b140]">
            <AiFillCheckCircle />
          </div>
        ) : null}
      </div>
      {isModalOpen ? (
        <div className="top-0 left-0 fixed w-screen h-screen flex justify-center items-center z-[5000]">
          <div className="bg-white z-[6000] w-[450px] py-8 px-6 rounded-xl">
            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold text-lg text-[#000000aa]">
                Preencha suas Informações
              </span>
              <CloseModalButton
                className="ml-auto"
                handleCloseModal={handleToggleModal}
              />
            </div>

            <div className="mt-6">
              <div className="mb-8">
                {text === 'Nome' ? (
                  <>
                    <label className="text-sm font-semibold text-[#000000aa]">
                      <span className="text-red-500 text-lg">*</span>Nome
                    </label>
                    <input
                      {...register('name', {
                        required: true,
                      })}
                      value={watch('name')}
                      type="text"
                      className="text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                      placeholder="Carlos da Silva Costa"
                    />
                  </>
                ) : null}
                {text === 'Telefone' ? (
                  <>
                    <div>
                      <span className="text-sm font-semibold text-[#000000aa]">
                        Digite seu número de telefone (com DDD)
                      </span>
                      <ReactInputMask
                        {...register('whatsappNumber', {
                          required: true,
                        })}
                        value={watch('whatsappNumber')}
                        mask="(99) 99999-9999"
                        type="text"
                        className="text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="(99) 99999-9999"
                      />
                    </div>
                  </>
                ) : null}
                {text === 'Método de Pagamento' ? (
                  <>
                    {paymentMethodsRestaurant.map(
                      (paymentMethod, index: number) => {
                        if (!paymentMethod.enabled) return null;
                        return (
                          <div key={index} className="flex items-center mb-4">
                            <input
                              type="radio"
                              id={paymentMethod.id.toString()}
                              {...register('paymentMethod', {
                                required: true,
                                valueAsNumber: true,
                              })}
                              className="hidden"
                              onChange={e =>
                                setValue(
                                  'paymentMethod',
                                  Number(e.target.value)
                                )
                              }
                              value={paymentMethod.payment_methods.id}
                              checked={
                                watch('paymentMethod') ===
                                paymentMethod.payment_methods.id
                              }
                            />
                            <label
                              htmlFor={paymentMethod.id.toString()}
                              className={`cursor-pointer w-full text-center ${
                                getValues('paymentMethod') ===
                                paymentMethod.payment_methods.id
                                  ? 'bg-orange-500 text-white'
                                  : ''
                              }`}
                            >
                              {paymentMethod.payment_methods.name}
                            </label>
                          </div>
                        );
                      }
                    )}

                    {watchingPaymentMethod === 5 ? (
                      <div className="flex items-center gap-1 mb-2">
                        <input
                          className="h-5 w-5"
                          {...register('change_need')}
                          type="checkbox"
                        />
                        <label className="text-lg">Preciso de troco</label>
                      </div>
                    ) : null}

                    {watchingChangeNeed && watchingPaymentMethod === 5 ? (
                      <div>
                        <label
                          htmlFor="change_value"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Valor Total das Cédulas?
                        </label>
                        <input
                          {...register('change_value')}
                          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                          id="change_value"
                          min={1}
                          type="number"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}
                {text === 'Endereço de Entrega' ? (
                  <>
                    <div className="mb-4">
                      <label className="flex items-center text-sm font-semibold text-[#000000aa]">
                        <span className="text-red-500 text-lg">*</span> CEP
                      </label>

                      <ReactInputMask
                        {...register('cep', {
                          required: 'Campo obrigatório',
                          pattern: {
                            value: /^\d{5}-?\d{3}$/i,
                            message: 'CEP inválido',
                          },
                        })}
                        mask="99999-999"
                        type="text"
                        className="pl-2 text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="99999-999"
                        onBlur={e => handleCepBlur(e)}
                        defaultValue={getValues('cep')}
                      />
                      {errors.cep && <span>This field is required</span>}
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-[#000000aa]">
                        <span className="text-red-500 text-lg">*</span>Bairro
                      </label>
                      <input
                        id="neighborhood"
                        {...register('neighborhood')}
                        type="text"
                        className="pl-2 bg-[#00000015] text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="Parque das Rosas"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-[#000000aa]">
                        <span className="text-red-500 text-lg">*</span>Rua
                      </label>
                      <input
                        id="street"
                        type="text"
                        {...register('street')}
                        className="pl-2 bg-[#00000015] text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="Rua das Flores Vermelhas"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-[#000000aa]">
                        Complemento
                      </label>
                      <input
                        {...register('complement', {
                          required: true,
                        })}
                        type="text"
                        className="pl-2 text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="Apartamento 23 - Bloco 2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-semibold text-[#000000aa]">
                        <span className="text-red-500 text-lg">*</span>Número
                      </label>
                      <input
                        {...register('number', {
                          required: true,
                        })}
                        type="text"
                        className="pl-2 text-lg h-10 w-full  focus:outline-none border-b-2 border-[#3d3d3d] focus:border-[#FC3B1D]"
                        placeholder="334"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="mt-12">
              <Button
                text="salvar"
                onClick={handleToggleModal}
                disabled={isButtonPhoneDisabled || isButtonCepDisabled}
              />
            </div>
          </div>
          <div
            onClick={handleToggleModal}
            className="absolute w-screen h-screen opacity-80 bg-black cursor-pointer"
          ></div>
        </div>
      ) : null}
    </>
  );
}
