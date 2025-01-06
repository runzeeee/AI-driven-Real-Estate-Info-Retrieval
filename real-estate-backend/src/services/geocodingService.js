const { Client } = require('@googlemaps/google-maps-services-js');
const config = require('../config/config');

const client = new Client({});

exports.getCoordinates = async (address) => {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: config.googleMapsApiKey
      }
    });
    
    if (response.data.results.length === 0) {
      return null;
    }

    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
      formattedAddress: response.data.results[0].formatted_address
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}; 