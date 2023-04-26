// Refactored returnDistanceInMeters function
import axios from 'axios';

export async function returnDistanceInMeters(
  startAddress: string,
  destinationAddress: string
) {
  try {
    const { data } = await axios.post('/api/calculate_distance', {
      startAddress,
      destinationAddress,
    });

    console.log('response', data);

    return data.distance;
  } catch (err) {
    console.error(err);
  }
}
