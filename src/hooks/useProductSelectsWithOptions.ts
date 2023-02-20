import { useEffect, useReducer } from 'react'
import { getProductSelectWithOptions } from '../fetch/productSelects/getProductSelectWithOptions'
import productSelectReducer, {
    initialState,
} from '../reducers/OptionsSelects/reducer'

export default function useProductSelectsWithOptions(product_id: number) {
    const [state, dispatch] = useReducer(productSelectReducer, initialState)

    const selectOption = (selectIndex: number, optionIndex: number) => {
        dispatch({
            type: 'SELECT_OPTION',
            payload: { selectIndex, optionIndex },
        })
    }

    useEffect(() => {
        let didCancel = false
        const fetchProductSelectsWithOptions = async () => {
            dispatch({ type: 'FETCH_INIT' })
            try {
                const response = await getProductSelectWithOptions(product_id)
                if (!didCancel && response) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: response })
                }
            } catch (error: any) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE', payload: error.message })
                }
            }
        }
        fetchProductSelectsWithOptions()
        return () => {
            didCancel = true
        }
    }, [product_id])

    return { productSelects: state.productSelects, selectOption }
}
