import add from './actions/add';
import addQuantity from './actions/addQuantity';
import deleteProduct from './actions/deleteProduct';
import subtractQuantity from './actions/subtractQuantity';

export function ProductsReducer(state: Array<any>, action: any) {
    switch (action.type) {
        case 'add':
            return add(state, action);
        case 'deleteProduct':
            return deleteProduct(state, action);
        case 'addQuantity':
            return addQuantity(state, action);
        case 'subtractQuantity':
            return subtractQuantity(state, action);
    }
}
