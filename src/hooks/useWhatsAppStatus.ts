// import { useEffect, useState } from 'react';
// import { tVenomStatus } from '../pages/[slug]/admin/configuracoes/Whatsapp/Whatsapp';
// import { whatsappRestApi } from '../server/api';

// export const useWhatsAppStatus = (restaurantSlug: string | undefined) => {
//   const [whatsappStatus, setWhatsappStatus] = useState<tVenomStatus>(undefined);

//   useEffect(() => {
//     async function checkStatus() {
//       const { data: currentStatus } = await whatsappRestApi.post(
//         '/check-status',
//         {
//           id: restaurantSlug,
//         }
//       );

//       console.log(currentStatus.status);
//       setWhatsappStatus(currentStatus.status as tVenomStatus);
//     }

//     checkStatus();
//   }, [restaurantSlug]);

//   return whatsappStatus;
// };
