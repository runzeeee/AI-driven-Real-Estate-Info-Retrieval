const pineconeService = require('./src/services/pineconeService');

async function testPineconeConnection() {
  try {
    const isConnected = await pineconeService.testConnection();
    if (isConnected) {
      console.log('Successfully connected to Pinecone');
    } else {
      console.log('Failed to connect to Pinecone');
    }
  } catch (error) {
    console.error('Error testing Pinecone connection:', error);
  }
}

testPineconeConnection(); 