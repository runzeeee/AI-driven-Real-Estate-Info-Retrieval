import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PropertyResponse {
  overview: string;
  details: Array<{
    role: string;
    content: string;
  }>;
}

export const fetchPropertyDetails = async (address: string): Promise<PropertyResponse> => {
  try {
    const response = await api.post('/property-details', { address });
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw new Error('Failed to fetch property details');
  }
}; 