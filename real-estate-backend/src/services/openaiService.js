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

exports.generateResponse = async (messages) => {

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages
  });

  return {
    overview: completion.choices[0].message.content,
    details: messages,
  };
}; 