import { useFormReturnType } from '@/src/hooks/useFormProvider';
import { createContext } from 'react';

const NewOrderFormContext = createContext<useFormReturnType | null>(null);

export { NewOrderFormContext };
