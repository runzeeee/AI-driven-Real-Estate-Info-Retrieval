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
        role: "system",
        content: `
          You are a real estate assistant. Your task is to generate a structured JSON response containing property and nearby school information based on the provided data. 
          Ensure the JSON structure is consistent, easy to parse, and includes all necessary fields for frontend display.
        `,
      },
      {
        role: "user",
        content: `
          The user has provided the following address: ${address}, located at Latitude: ${
          coordinates.lat
        }, Longitude: ${coordinates.lng}.
    
          Here are the relevant property listings retrieved from Pinecone:
          ${similarData.properties
            .map(
              (prop, idx) =>
                `${idx + 1}. Price: $${prop.price}, Bedrooms: ${
                  prop.bed
                }, Bathrooms: ${prop.bath}, City: ${prop.city}, State: ${
                  prop.state
                }, ZIP Code: ${prop.zip_code}, House Size: ${
                  prop.house_size
                } sq ft, Description: ${prop.description}`
            )
            .join("\n")}
    
          Additionally, here are the nearby schools:
          ${schoolsWithDistance
            .map(
              (school, idx) =>
                `${idx + 1}. Name: ${school.name}, City: ${
                  school.city
                }, State: ${school.state}, ZIP Code: ${
                  school.zip_code
                }, Distance: ${school.distance.toFixed(2)} km, Description: ${
                  school.description
                }`
            )
            .join("\n")}
    
          Based on the above information, generate a JSON response in the following format:
    
          {
            "propertyOverview": {
              "marketStatus": "<brief summary of the property market>",
              "averagePrices": "<average property prices in the area>",
              "houseTypes": "<types of houses available>"
            },
            "detailedProperties": [
              {
                "propertyName": "<name or description of the property>",
                "price": <price>,
                "bedrooms": <number of bedrooms>,
                "bathrooms": <number of bathrooms>,
                "houseSizeSqFt": <size of the house in square feet>,
                "description": "<short description of the property>",
                "location": {
                  "city": "<city>",
                  "state": "<state>",
                  "zipCode": "<ZIP code>"
                }
              }
              // Additional properties...
            ],
            "nearbySchools": [
              {
                "name": "<name of the school>",
                "type": "<public or private>",
                "distanceMiles": <distance in miles>,
                "rating": <rating if available>
              }
              // Additional schools...
            ]
          }
          Here is a sample output:
            {
              "propertyOverview": {
                "marketStatus": "The market around 2656 W El Camino Real is active with a diverse range of housing options.",
                "averagePrices": "Average property prices in neighboring areas range from $728,000 to $2,850,000.",
                "houseTypes": "Houses typically feature 2 to 4 bedrooms and 2 to 3 bathrooms."
              },
              "detailedProperties": [
                {
                  "propertyName": "Property 1 - Mountain View, CA",
                  "price": 728000,
                  "bedrooms": 2,
                  "bathrooms": 2,
                  "houseSizeSqFt": 960,
                  "description": "2-bed, 2-bath property in Mountain View, CA, ZIP 94043.",
                  "location": {
                    "city": "Mountain View",
                    "state": "CA",
                    "zipCode": "94043"
                  }
                },
                {
                  "propertyName": "Property 2 - Santa Clara, CA",
                  "price": 1399950,
                  "bedrooms": 3,
                  "bathrooms": 2,
                  "houseSizeSqFt": 1390,
                  "description": "3-bed, 2-bath property in Santa Clara, CA, ZIP 95050.",
                  "location": {
                    "city": "Santa Clara",
                    "state": "CA",
                    "zipCode": "95050"
                  }
                }
                // ... other properties
              ],
              "nearbySchools": [
                {
                  "name": "Castro Elementary School",
                  "type": "Public",
                  "distanceMiles": 1.2,
                  "rating": 8
                },
                {
                  "name": "Los Altos High School",
                  "type": "Public",
                  "distanceMiles": 1.4,
                  "rating": 9
                }
                // ... other schools
              ]
            }
          Ensure the response is formatted correctly for a JSON parser and only includes fields relevant to the provided data.
        `,
      },
    ];

    const finalResponse = await openaiService.generateResponse(messages);
    console.log("Final response:", finalResponse);
    res.json(finalResponse);
  } catch (error) {
    console.error("Error in getPropertyDetails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
