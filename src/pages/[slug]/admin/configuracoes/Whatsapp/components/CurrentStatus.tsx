import { tVenomStatus } from '../Whatsapp';

interface iCurrentStatus {
  status: tVenomStatus;
}

const CurrentStatus: React.FC<iCurrentStatus> = props => {
  const { status } = props;

  const StatusText = () => {
    switch (status) {
      case 'successChat':
        return <>Conectado</>;
      default:
        return <>Carregando...</>;
    }
  };

  const returnBackgroundColor = () => {
    switch (status) {
      case 'successChat':
        return 'bg-green-600';
      default:
        return 'bg-orange-600';
    }
  };

  return (
    <div
      className={`rounded max-w-[400px] p-4 text-center uppercase font-semibold text-white ${returnBackgroundColor()}`}
    >
      <StatusText />
    </div>
  );
};

export default CurrentStatus;
