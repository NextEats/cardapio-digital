import { useEffect } from 'react';
import { iOrdersWithFKData } from '../types/types';

export const useAudioAlert = (
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] },
    audioPath: string
) => {
    useEffect(() => {
        const audio = new Audio(audioPath);
        let intervalId: number | undefined | any;

        if (ordersGroupedByOrderStatus['em análise']) {
            intervalId = setInterval(() => {
                if (ordersGroupedByOrderStatus['em análise'] === undefined) {
                    clearInterval(intervalId);
                    return;
                }
                if (audio.paused === true) audio.pause();
                audio.play();
            }, 1000 * 14);
        }

        if (ordersGroupedByOrderStatus['em análise'] === undefined) {
            clearInterval(intervalId);
            audio.pause();
        }

        return () => clearInterval(intervalId);
    }, [ordersGroupedByOrderStatus, audioPath]);
};
