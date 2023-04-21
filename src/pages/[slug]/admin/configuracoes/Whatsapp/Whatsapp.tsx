import { AdminContext } from '@/src/contexts/adminContext';
import { whatsappRestApi, whatsappRestApiServerUrl } from '@/src/server/api';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import CurrentStatus from './components/CurrentStatus';

export type iWhatsappStatus = 'loading' | 'connected';

const Whatsapp: React.FC = () => {
  const { restaurant } = useContext(AdminContext);

  const [whatsappStatus, setWhatsappStatus] =
    useState<iWhatsappStatus>('loading');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    if (!socket) {
      const newSocket = io(whatsappRestApiServerUrl!);
      setSocket(newSocket);

      newSocket.on(
        'qrCode',
        ({ id, qrCode }: { id: string; qrCode: string }) => {
          if (id === restaurant.slug) {
            setQrCode(qrCode);
          }
        }
      );

      newSocket.on(
        'status',
        ({ id, status }: { id: string; status: string }) => {
          if (status === 'successChat') {
            if (id === restaurant.slug) {
              setWhatsappStatus('connected');
            }
          }
        }
      );
    }

    const socketCall = async () => {
      const response = await whatsappRestApi.post('/create', {
        id: restaurant.slug,
      });

      if (response.status === 202) {
        setWhatsappStatus('connected');
      }
    };

    socketCall();
  }, [socket, restaurant]);

  return (
    <div className="p-4">
      <h4 className="text-3xl p-4">Conexão WhatsApp</h4>
      <div className="p-4 bg-white rounded-md">
        {qrCode ? (
          <Image
            id="qrCode"
            src={qrCode}
            alt="QR Code"
            width={300}
            height={300}
          />
        ) : (
          <CurrentStatus status={whatsappStatus} />
        )}
      </div>
    </div>
  );
};

export default Whatsapp;
