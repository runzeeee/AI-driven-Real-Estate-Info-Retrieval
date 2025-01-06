const { Pinecone } = require("@pinecone-database/pinecone");
const config = require("../config/config");

try {
  pinecone = new Pinecone({
    apiKey: config.pinecone.apiKey,
  });

  index = pinecone.index(config.pinecone.indexName);

  console.log("Pinecone initialized successfully");
} catch (error) {
  console.warn("Pinecone initialization error:", error.message);
}

exports.query = async (embedding) => {
  try {
    if (!index) {
      throw new Error("Pinecone index not initialized");
    }

    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    console.log("Pinecone query response:", queryResponse);

    const properties = queryResponse.matches
      .filter((match) => match.id.startsWith("re_"))
      .map((match) => match.metadata);

    const schools = queryResponse.matches
      .filter(
        (match) => match.id.startsWith("pub_") || match.id.startsWith("pri_")
      )
      .map((match) => match.metadata);

    return {
      properties,
      schools,
    };
  } catch (error) {
    console.warn("Pinecone query error:", error.message);
  }
};

exports.testConnection = async () => {
  try {
    if (!index) {
      throw new Error("Pinecone index not initialized");
    }

    const stats = await index.describeIndexStats();
    console.log("Pinecone connection test successful:", stats);
    return true;
  } catch (error) {
    console.error("Pinecone connection test failed:", error);
    return false;
  }
};
