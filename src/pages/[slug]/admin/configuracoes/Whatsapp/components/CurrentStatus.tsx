import { iWhatsappStatus } from '../Whatsapp';

interface iCurrentStatus {
  status: iWhatsappStatus;
}

const CurrentStatus: React.FC<iCurrentStatus> = props => {
  const { status } = props;

  const StatusText = () => {
    switch (status) {
      case 'connected':
        return <>Conectado</>;
      case 'loading':
        return <>Carregando...</>;
    }
  };

  const returnBackgroundColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-600';
      case 'loading':
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
