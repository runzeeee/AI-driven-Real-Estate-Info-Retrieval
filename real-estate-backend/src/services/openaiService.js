const OpenAI = require('openai');
const config = require('../config/config');

const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

exports.generateDescription = async (address) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Generate a detailed description for the property at: ${address}`
    }]
  });

  return completion.choices[0].message.content;
};

exports.generateEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  return response.data[0].embedding;
};

exports.generateResponse = async (data) => {
  const prompt = `
    Generate a detailed response about the property at ${data.address}.
    Include information about:
    1. Property location and coordinates
    2. Similar properties in the area
    3. Nearby schools (within 5 miles) sorted by distance
    
    Data: ${JSON.stringify(data)}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  return {
    overview: completion.choices[0].message.content,
    details: data,
  };
}; 