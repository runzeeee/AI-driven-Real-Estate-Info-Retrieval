const axios = require('axios');

async function testAPI() {
  try {

    const healthCheck = await axios.get('http://localhost:3001/api/health');
    console.log('Health Check Response:', healthCheck.data);

    const propertyResponse = await axios.post('http://localhost:3001/api/property-details', {
      address: "2700 W El Camino Real, Mountain View, CA 94040"
    });
    console.log('Property Details Response:', JSON.stringify(propertyResponse.data, null, 2));

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testAPI(); 