import { useEffect, useState } from 'react';
import { tVenomStatus } from '../pages/[slug]/admin/configuracoes/Whatsapp/Whatsapp';

export const useWhatsAppStatus = (
  restaurantSlug: string | undefined
): [tVenomStatus, React.Dispatch<React.SetStateAction<tVenomStatus>>] => {
  const [whatsappStatus, setWhatsappStatus] = useState<tVenomStatus>(undefined);

  useEffect(() => {
    async function checkStatus() {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: restaurantSlug,
          }),
        };

        const response = await fetch(
          'https://www.nexteats.com.br/api/whatsapp/check-status',
          options
        );

        if (response.ok) {
          const data = await response.json();
          setWhatsappStatus(data.status);
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    checkStatus();
  }, [restaurantSlug]);

  return [whatsappStatus, setWhatsappStatus];
};
