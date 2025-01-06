import { Container, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';
import PropertyDetails from '../components/PropertyDetails';
import ErrorMessage from '../components/ErrorMessage';
import { fetchPropertyDetails } from '../utils/api';
import { useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);

  const handleSearch = async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPropertyDetails(address);
      setPropertyData(data);
    } catch (err) {
      setError('Unable to fetch property details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Real Estate Information Retrieval
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Enter an address to get detailed property information and nearby schools
        </Typography>
        
        <Box mt={4}>
          <SearchBar onSubmit={handleSearch} />
        </Box>

        {loading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        {propertyData && <PropertyDetails data={propertyData} />}
      </Box>
    </Container>
  );
};

export default Home; 