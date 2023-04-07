import React from 'react';

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <div className="p-6 space-y-4 space">{children}</div>;
};

export default ModalBody;