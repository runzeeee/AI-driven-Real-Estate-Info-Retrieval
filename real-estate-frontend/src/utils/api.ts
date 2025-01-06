import axios from 'axios';

export const fetchPropertyDetails = async (address: string) => {
  // Replace with backend API endpoint
  const response = await axios.post('/api/property-details', { address });
  return response.data;
}; 