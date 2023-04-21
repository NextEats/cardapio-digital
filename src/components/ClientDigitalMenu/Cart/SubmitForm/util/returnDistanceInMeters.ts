import { distanceFeeApi } from '@/src/server/api';

export async function returnDistanceInMeters(start: string, end: string) {
  try {
    const { data } = await distanceFeeApi.post('/calcular-distancia', {
      start,
      end,
    });

    return data.distance / 1000;
  } catch (err) {
    console.log(err);
  }
}
