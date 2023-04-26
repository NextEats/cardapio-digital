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

    return data.distanceInKm;
  } catch (err) {
    console.error(err);
  }
}
