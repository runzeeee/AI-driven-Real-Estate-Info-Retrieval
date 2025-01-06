# AI-Driven Real Estate Information Retrieval

## Project Overview

This project is an application designed to accept a home address as input and leverage artificial intelligence to provide detailed real estate information. The program retrieves the following information:

- **Overview of the Property**: A general summary of the property's market status.
- **Detailed Property Information**: Specifics such as size, number of rooms, and estimated value.
- **List of Nearby Schools**: Relevant details including names, distances, and ratings of nearby educational institutions.

## Getting Started

### Prerequisites
To set up and run the project locally, ensure you have the following:
- **Node.js** (v18.18.0 or higher)
- **npm** or **yarn**
- **Google Maps API key**
- **OpenAI API key**
- **Pinecone API key**

> **Note**: All `.env` files containing API keys can be obtained by contacting the repository author.

### How to Run

#### Frontend
1. Navigate to the `real-estate-frontend` directory:
   ```bash
   cd real-estate-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

4. Run Jest tests for the frontend:
   ```bash
   npm run test
   ```

#### Backend
1. Navigate to the `real-estate-backend` directory:
   ```bash
   cd real-estate-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:3001`.

## Technology Stack

### Frontend
- **Next.js** 15.1.3 with React 19
- **Material-UI** v6 for UI components
- **TypeScript** for type safety
- **Google Maps Places API** for address autocomplete
- **Axios** for API requests
- **Lodash** for utility functions

### Backend
- **Node.js** with Express
- **OpenAI API** (GPT-3.5 Turbo & `text-embedding-ada-002`)
- **Pinecone Vector Database**
- **Google Maps Services** for geocoding
- **CORS** for cross-origin resource sharing

### Data Processing
- **Python** for data preprocessing
- **Pandas** for dataset manipulation
- **OpenAI's embedding models** for vector generation
- Coordinate transformation utilities

## Data Infrastructure

### Vector Database Setup
The project uses **Pinecone** as its vector database, storing embeddings for:
- Property listings with detailed metadata
- Public and private school information
- Geographic coordinates for spatial queries

### Data Processing Pipeline
1. **Data Cleaning and Standardization**:
   - Standardize ZIP code formats.
   - Generate descriptive fields necessary for embedding generation.
2. **Embedding Generation**:
   - Use OpenAI's `text-embedding-ada-002` model to create semantic embeddings from property descriptions.
3. **Batch Upload to Pinecone**:
   - Upload embeddings along with metadata in batches.
4. **Query Optimization**:
   - Conduct sample queries to ensure accuracy and reliability of vector data.

## API Endpoints

### Backend Routes
- **`POST /api/property-details`**: Retrieves property and school information based on the input address.
- **`GET /api/health`**: Health check endpoint.

## Testing

- **Frontend Testing**:
  - Run Jest tests:
    ```bash
    cd real-estate-frontend
    npm run test
    ```

- **API Endpoint Testing**:
  - Test API routes using Postman or custom test utilities.

## Deployment

The application is deployed on Render:
- **Frontend**: [Live Demo](https://ai-driven-real-estate-info-retrieval-k51s.onrender.com/)
- **Backend**: Deployed as a separate service on Render.

## Assumptions and Limitations

- **Sampled Dataset**: The original dataset is too large to process; sampling methods are used for demonstration purposes.
- **US Addresses Only**: Currently supports addresses within the United States.
- **API Reliability**: Relies on the consistent performance of external APIs (Google Maps, OpenAI) for geocoding and AI functionalities.
- **Rate Limits**: External APIs are subject to rate limits.

## Project Architecture

```plaintext
[ React + Next.js ] (Material-UI)
         |
         | HTTP / REST
         |
+---------------------+
|    Node.js (Express)|
|  - API Gateway      |
|  - Logging & Monitoring |
+----------+----------+
           |
+----------+----------+
|  AI Knowledge Hub   |
|        (GPT)        |
+----------+----------+
           |
+---------------------------+
|    Data Infrastructure    |
|                           |
|  +---------------------+  |
|  |    Vector Store     |  |
|  |      (Pinecone)     |  |
|  +---------------------+  |
+---------------------------+
```

## Component Breakdown

### Frontend (React + Next.js)
- Provides a user-friendly interface for inputting addresses and displaying retrieved information.

### Backend (Node.js + Express)
- Handles API requests, interacts with external services (Google Maps, Pinecone, OpenAI), and manages data processing.

### AI Knowledge Hub (GPT)
- Processes the retrieved data to generate coherent and informative responses.

### Data Infrastructure (Pinecone)
- Stores and manages vector embeddings for efficient similarity searches and data retrieval.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- **USA Real Estate Dataset** from Kaggle
- **US Schools Dataset** from Kaggle
- **OpenAI** for AI capabilities
- **Google Maps** for geocoding services

## Repository
GitHub: [AI-Driven Real Estate Info Retrieval](https://github.com/runzeeee/AI-driven-Real-Estate-Info-Realty)
