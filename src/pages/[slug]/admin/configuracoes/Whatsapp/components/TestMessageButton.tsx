import { AdminContext } from '@/src/contexts/adminContext';
import { whatsappRestApi } from '@/src/server/api';
import { Button } from '@/src/stories/Button';
import React, { useContext } from 'react';

const TestMessageButton: React.FC = () => {
  const { restaurant } = useContext(AdminContext);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    await whatsappRestApi.post('/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: restaurant?.slug,
        number: restaurant?.whatsapp_number,
        message: '',
      }),
    });
  };

  return <Button label="Enviar Mensagem de Teste" primary />;
};

export default TestMessageButton;
