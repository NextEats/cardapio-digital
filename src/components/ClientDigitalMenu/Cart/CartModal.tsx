import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext } from 'react';
import Cart from './Cart';

const CartModal = () => {
  const { restaurant, modals } = useContext(DigitalMenuContext);

  const handleCloseModal = () => {
    modals?.set(prev => {
      return {
        ...prev,
        checkout: false,
      };
    });
  };

  if (!restaurant) {
    handleCloseModal();
    return null;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center fixed z-[2000]">
      <div
        onClick={handleCloseModal}
        className="bg-black opacity-90 h-full fixed w-screen cursor-pointer"
      ></div>
      <Cart handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default CartModal;
