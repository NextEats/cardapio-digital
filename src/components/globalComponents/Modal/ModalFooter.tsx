import React from 'react';

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="flex space-x-2 justify-end p-6 border-gray-200 rounded-b dark:border-gray-600">
      {children}
    </div>
  );
};

export default ModalFooter;
