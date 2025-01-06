const geocodingService = require('../services/geocodingService');
const openaiService = require('../services/openaiService');
const pineconeService = require('../services/pineconeService');
const addressValidator = require('../utils/addressValidator');
const distanceCalculator = require('../utils/distanceCalculator');

exports.getPropertyDetails = async (req, res) => {
  try {
    const { address } = req.body;

    // Validate address
    if (!addressValidator.isValid(address)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    // Get coordinates from Google Maps API
    const coordinates = await geocodingService.getCoordinates(address);
    if (!coordinates) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // Generate property description
    const description = await openaiService.generateDescription(address);

    // Generate embedding for the description
    const embedding = await openaiService.generateEmbedding(description);

    // Query Pinecone for similar properties and schools
    const similarData = await pineconeService.query(embedding);

    // Calculate distances to schools
    const schoolsWithDistance = similarData.schools.map(school => ({
      ...school,
      distance: distanceCalculator.calculate(
        coordinates.lat,
        coordinates.lng,
        school.latitude,
        school.longitude
      )
    }));

    // Generate final response using ChatGPT
    const finalResponse = await openaiService.generateResponse({
      address,
      coordinates,
      similarProperties: similarData.properties,
      schools: schoolsWithDistance
    });

    res.json(finalResponse);
  } catch (error) {
    console.error('Error in getPropertyDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 