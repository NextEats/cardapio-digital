import { createBoard } from '@wixc3/react-board';
import Cart from '../../../components/Cart/Cart';

export default createBoard({
  name: 'Cart',
  Board: () => <Cart />,
});
