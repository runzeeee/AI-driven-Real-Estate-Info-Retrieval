import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PropertyResponse {
  propertyOverview: {
    marketStatus: string;
    averagePrices: string;
    houseTypes: string;
  };
  detailedProperties: Array<{
    propertyName: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    houseSizeSqFt: number;
    description: string;
    location: {
      city: string;
      state: string;
      zipCode: string;
    };
  }>;
  nearbySchools: Array<{
    name: string;
    type: string;
    distanceMiles: number;
    rating: number;
  }>;
}

export const fetchPropertyDetails = async (address: string): Promise<PropertyResponse> => {
  try {
    const response = await api.post('/property-details', { address });
    const parsedData = JSON.parse(response.data);
    return parsedData;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw new Error('Failed to fetch property details');
  }
}; 