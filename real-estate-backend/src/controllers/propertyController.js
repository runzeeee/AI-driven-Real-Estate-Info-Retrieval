const geocodingService = require("../services/geocodingService");
const openaiService = require("../services/openaiService");
const pineconeService = require("../services/pineconeService");
const addressValidator = require("../utils/addressValidator");
const distanceCalculator = require("../utils/distanceCalculator");

exports.getPropertyDetails = async (req, res) => {
  try {
    const { address } = req.body;

    // Validate address
    if (!addressValidator.isValid(address)) {
      return res.status(400).json({ error: "Invalid address format" });
    }

    // Get coordinates from Google Maps API
    const coordinates = await geocodingService.getCoordinates(address);
    if (!coordinates) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Generate property description
    const description = await openaiService.generateDescription(address);

    // Generate embedding for the description
    const embedding = await openaiService.generateEmbedding(description);

    // Query Pinecone for similar properties and schools
    const similarData = await pineconeService.query(embedding);

    // Calculate distances to schools
    const schoolsWithDistance = similarData.schools
      .map((school) => ({
        ...school,
        distance: distanceCalculator.calculate(
          coordinates.lat,
          coordinates.lng,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    // Generate final response using ChatGPT
    const messages = [
      {
        role: 'system',
        content: 'You are a real estate assistant that generates detailed property and nearby school information based on the provided data.',
      },
      {
        role: 'user',
        content: `
          The user has provided the following address: ${address}, located at Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}.

          Here are the relevant property listings retrieved from Pinecone:
          ${similarData.properties
            .map(
              (prop, idx) =>
                `${idx + 1}. Price: $${prop.price}, Bedrooms: ${prop.bed}, Bathrooms: ${prop.bath}, City: ${prop.city}, State: ${prop.state}, ZIP Code: ${prop.zip_code}, House Size: ${prop.house_size} sq ft, Description: ${prop.description}`
            )
            .join('\n')}

          Additionally, here are the nearby schools:
          ${schoolsWithDistance
            .map(
              (school, idx) =>
                `${idx + 1}. Name: ${school.name}, City: ${school.city}, State: ${school.state}, ZIP Code: ${school.zip_code}, Distance: ${school.distance.toFixed(
                  2
                )} km, Description: ${school.description}`
            )
            .join('\n')}

          Based on the above information, please provide:
          1. **Property Overview**: A brief summary of the property's market status, including average prices and types of houses available.
          2. **Detailed Property Information**: A list of the most relevant properties with detailed information such as price, number of bedrooms and bathrooms, house size, etc.
          3. **Nearby Schools**: A list of the nearest 5 schools, including their names, types (public or private), distance, and ratings (if available).

          Please respond in English, ensuring the content is clear, concise, and well-structured, highlighting key information.
        `,
      },
    ];
    const finalResponse = await openaiService.generateResponse(messages);

    res.json(finalResponse);
  } catch (error) {
    console.error("Error in getPropertyDetails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
