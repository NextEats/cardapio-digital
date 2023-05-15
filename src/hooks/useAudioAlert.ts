import { useEffect } from 'react';
import { iOrdersWithStatusFKData } from '../types/iOrders';

export const useAudioAlert = (
  ordersGroupedByStatus: Array<{
    status_name: string;
    orders: iOrdersWithStatusFKData[];
  }>
) => {
  useEffect(() => {
    const audioRef = new Audio('/alertAudio.mp3');

    function checkPendingOrders() {
      const pendingOrders = ordersGroupedByStatus.find(
        orderGroup => orderGroup.status_name === 'em análise'
      );

      if (!pendingOrders) {
        stopAudio();
        return;
      }

      if (pendingOrders.orders.length === 0) {
        stopAudio();
        return;
      }

      playAudio();
    }

    function playAudio() {
      if (audioRef.paused) {
        audioRef.loop = true;
        audioRef.play();
      }
    }

    function stopAudio() {
      if (!audioRef.paused) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    }

    checkPendingOrders();

    return () => {
      stopAudio();
    };
  }, [ordersGroupedByStatus]);
};
