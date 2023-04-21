import { AdminContext } from '@/src/contexts/adminContext';
import { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { whatsappRestApi } from '@/src/server/api';

export default function Whatsapp() {
  const { restaurant } = useContext(AdminContext);

  const [qrCode, setQrCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getResponse() {
      try {
        const res = await whatsappRestApi({
          method: 'post',
          url: '/create',
          data: {
            id: restaurant!.slug,
          },
        });

        if (res.data.qrcode) {
          setQrCode(res.data.qrcode);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getResponse();
  }, [restaurant]);

  const handleSendMessage = async () => {
    console.log(restaurant!.whatsapp_number);

    try {
      console.log({
        id: restaurant!.slug,
        number: restaurant!.whatsapp_number,
        message:
          'O sistema de cardápio digital da NextEats foi configurado com sucesso para este número.',
      });

      const res = await whatsappRestApi({
        method: 'post',
        url: '/send-message',
        data: {
          id: restaurant!.slug,
          number: restaurant!.whatsapp_number,
          message:
            '😎 O sistema de cardápio digital da NextEats foi configurado com sucesso para este número.',
        },
      });

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {qrCode && <QRCode value={qrCode} />}
      <button
        onClick={() => handleSendMessage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar Mensagem de Teste
      </button>
    </>
  );
}
