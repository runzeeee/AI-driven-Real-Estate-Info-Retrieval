require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
    indexName: process.env.PINECONE_INDEX_NAME
  },
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY
}; 