import { BsX } from 'react-icons/bs';

interface iCloseModalButton extends React.SVGAttributes<HTMLOrSVGElement> {
  handleCloseModal?: () => void;
}

export default function CloseModalButton(props: iCloseModalButton) {
  const { handleCloseModal, className } = props;

  return (
    <BsX
      onClick={handleCloseModal}
      fontSize={40}
      style={{
        cursor: 'pointer',
      }}
      {...props}
    ></BsX>
  );
}
