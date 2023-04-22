import { AdminContext } from '@/src/contexts/adminContext';
import { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export default function Whatsapp() {
  const { restaurant } = useContext(AdminContext);

  const [qrCode, setQrCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function createClient() {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: restaurant?.slug,
          }),
        };

        const response = await fetch(
          'https://www.nexteats.com.br/api/whatsapp/create',
          options
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    createClient();
  }, [restaurant]);

  return <>{qrCode && <QRCode value={qrCode} />}</>;
}
