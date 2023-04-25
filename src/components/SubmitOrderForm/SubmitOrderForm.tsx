import { SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaMoneyBillAlt, FaRegUser, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { tTabs } from '../Cart/Cart';
import ModalTriggerButtons from '../ModalTriggerButtons';

interface iSubmitOrderForm {
  currentSelectedTab: tTabs;
  setCurrentSelectedTab: React.Dispatch<SetStateAction<tTabs>>;
}

export default function SubmitOrderForm({
  currentSelectedTab,
  setCurrentSelectedTab,
}: iSubmitOrderForm) {
  const { watch, register, setValue, getValues } = useFormContext();
  const formTabClassesInactive = `transition duration-300 flex justify-center text-xl font-semibold border-b-4 py-4 border-b-[#00000000] cursor-pointer `;

  // const formTabClassesActive =
  //     'transition duration-300 flex justify-center text-xl font-semibold border-b-4 py-4 border-b-[#FC3B1D]';

  const deliveryForm = watch('deliveryForm');
  console.log(deliveryForm);

  return (
    <div className="mt-5 mx-4 shadow-lg rounded border border-[#00000008]">
      <div
        className="grid grid-flow-row"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        <input
          type="radio"
          id={'entrega'}
          {...register('deliveryForm', {
            required: true,
            valueAsNumber: true,
          })}
          className="hidden"
          value={1}
          checked={watch('deliveryForm') == 1}
        />
        <label
          htmlFor={'entrega'}
          className={
            formTabClassesInactive +
            `${
              watch('deliveryForm') == 1
                ? 'border-b-[#FC3B1D]'
                : 'border-b-gray-400'
            }`
          }
        >
          Entrega
        </label>
        <input
          type="radio"
          id={'retirada'}
          {...register('deliveryForm', {
            required: true,
            valueAsNumber: true,
          })}
          className="hidden"
          value={2}
          checked={watch('deliveryForm') == 2}
        />
        <label
          htmlFor={'retirada'}
          className={
            formTabClassesInactive +
            `${
              watch('deliveryForm') == 2
                ? 'border-b-[#FC3B1D]'
                : 'border-b-gray-400'
            }`
          }
        >
          Retirada
        </label>
      </div>

      <div className="p-4">
        <ModalTriggerButtons
          Icon={FaRegUser}
          text="Nome"
          filled={watch('name') ? true : false}
        />
        <ModalTriggerButtons
          Icon={FaWhatsapp}
          text="Telefone"
          filled={
            watch('whatsappNumber') && watch('whatsappNumber') !== ''
              ? true
              : false
          }
        />
        <ModalTriggerButtons
          Icon={FaMoneyBillAlt}
          text="Método de Pagamento"
          filled={watch('paymentMethod') ? true : false}
        />
        {watch('deliveryForm') == '1' ? (
          <ModalTriggerButtons
            Icon={HiOutlineLocationMarker}
            text="Endereço de Entrega"
            filled={watch('cep') ? true : false}
          />
        ) : null}
      </div>
    </div>
  );
}
