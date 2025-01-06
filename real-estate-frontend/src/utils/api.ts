import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ai-driven-real-estate-info-retrieval.onrender.com/api',
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