import { useEffect, useReducer } from 'react';
import AdditionalsReducer, {
    initialState,
} from '../reducers/AdditionalsReducer/reducer';
import { supabase } from '../server/api';
import { iAdditional } from '../types/types';

export default function useAdditionals(product_id: string) {
    const [state, dispatch] = useReducer(AdditionalsReducer, initialState);

    useEffect(() => {
        let didCancel = false;
        const fetchProductSelectsWithOptions = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const response = await getAdditionalsByProductId(product_id);
                if (!didCancel && response) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: response });
                }
            } catch (error: any) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE', payload: error.message });
                }
            }
        };
        fetchProductSelectsWithOptions();
        return () => {
            didCancel = true;
        };
    }, [product_id]);

    return { state, dispatch };
}

async function getAdditionalsByProductId(product_id: string) {
    try {
        const { data, error } = await supabase
            .from('product_additionals')
            .select('*, additionals (*)')
            .eq('product_id', product_id);

        const formatedData = data?.map((item) => {
            return {
                ...item.additionals,
            };
        });

        return formatedData as unknown as Array<iAdditional['data']>;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
