import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as zod from 'zod';

const newOrderFormValidationSchema = zod.object({
  name: zod.string().min(1, 'O nome é obrigatório'),
  whatsappNumber: zod.number().min(11).max(11).nullable(),
  cep: zod.number().min(7).max(7).nullable(),
  complement: zod.string().nullable(),
  change_need: zod.boolean().nullable(),
  number: zod.string().min(1),
  paymentMethod: zod.number(),
  deliveryForm: zod.number(),
  change_value: zod.number(),
  neighborhood: zod.string(),
  street: zod.string(),
});

type NewOrderFormData = zod.infer<typeof newOrderFormValidationSchema>;

export type useFormReturnType = {
  form: UseFormReturn<NewOrderFormData>;
  isReadyToSubmit: boolean;
};

export default function useFormProvider(): useFormReturnType {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const newOrderForm = useForm<NewOrderFormData>({
    resolver: zodResolver(newOrderFormValidationSchema),
    defaultValues: {
      name: '',
      whatsappNumber: null,
      cep: null,
      change_need: false,
      complement: '',
      paymentMethod: 0,
      number: '',
      deliveryForm: 1,
      change_value: 0,
      neighborhood: '',
      street: '',
    },
  });

  const { getValues, setValue, watch } = newOrderForm;

  useEffect(() => {
    setValue('deliveryForm', 1);
  }, [setValue]);

  useEffect(() => {
    const checkRequiredFieldsFilled = () => {
      const doesNameInputIsFilled = !!getValues('name');
      const doesPaymentMethodInputIsFilled = !!getValues('paymentMethod');
      const doesWhatsAppNumberInputIsFilled = !!getValues('whatsappNumber');
      const doesCepInputIsFilled = !!getValues('cep');
      const doesNumberInputIsFilled = !!getValues('number');

      return getValues('deliveryForm') == 2
        ? doesNameInputIsFilled &&
            doesPaymentMethodInputIsFilled &&
            doesWhatsAppNumberInputIsFilled
        : doesNameInputIsFilled &&
            doesCepInputIsFilled &&
            doesPaymentMethodInputIsFilled &&
            doesNumberInputIsFilled &&
            doesWhatsAppNumberInputIsFilled;
    };

    setIsReadyToSubmit(checkRequiredFieldsFilled());
  }, [getValues, newOrderForm.formState]);

  return {
    form: newOrderForm,
    isReadyToSubmit,
  };
}
