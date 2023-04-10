import React, { ReactNode } from 'react';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  title: string;
  closeFunction: Function;
  onSubmitFunction: Function;
}

const Modal: React.FC<ModalProps> & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({ children, title, showModal, closeFunction, onSubmitFunction }) => {
  function submitFunc() {
    if (onSubmitFunction) {
      onSubmitFunction();
    }
  }
  return (
    // <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
    //   <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">{children}</div>
    // </div>

    <div
      id="default-modal"
      data-modal-show={showModal}
      aria-hidden={!showModal}
      className={`${
        showModal ? '' : 'hidden'
      } overflow-x-hidden overflow-y-auto fixed h-modal inset-0 z-50 justify-center items-center flex bg-black bg-opacity-20`}
    >
      <div className=" w-full max-w-2xl px-4 h-auto">
        <form
          action=""
          onSubmit={e => {
            e.preventDefault();
            submitFunc();
          }}
        >
          <div className="bg-white rounded-lg shadow relative">
            <div className="flex items-start justify-between p-5 rounded-t dark:border-gray-600">
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold">
                {title}
                {/* Taxas de entrega por distância */}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => closeFunction()}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
