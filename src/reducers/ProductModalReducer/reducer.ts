import { iProductAdditional } from '@/src/types/iProducts';

export type tProductModalReducer = React.Reducer<iProductModalReducer, any>;

export interface iProductModalReducer {
  id: string;
  additionals?: iProductAdditional[];
  price?: number;
  quantity?: number;
  observation?: string | null;
}

export function ProductModalReducer(
  state: iProductModalReducer,
  action: any
): iProductModalReducer {
  switch (action.type) {
    case 'SET':
      return state;
    default:
      return state;
  }
}
