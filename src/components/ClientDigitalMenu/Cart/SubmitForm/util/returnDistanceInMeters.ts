// Refactored returnDistanceInMeters function
import axios from 'axios';

export async function returnDistanceInMeters(start: string, end: string) {
  try {
    const { data } = await axios.post(
      'https://www.nexteats.com.br/api/distance',
      {
        start,
        end,
      }
    );

    return data.distanceInKm;
  } catch (err) {
    console.error(err);
  }
}
