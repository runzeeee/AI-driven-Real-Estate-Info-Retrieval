import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import AddressForm from '../components/AddressForm';
import LoadingIndicator from '../components/LoadingIndicator';
import PropertyDetails from '../components/PropertyDetails';
import ErrorMessage from '../components/ErrorMessage';
import { fetchPropertyDetails } from '../utils/api';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);

  const handleSubmit = async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPropertyDetails(address);
      setPropertyData(data);
    } catch (err) {
      setError('Failed to fetch property details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Real Estate Information
      </Typography>
      <AddressForm onSubmit={handleSubmit} />
      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      {propertyData && <PropertyDetails data={propertyData} />}
    </Container>
  );
};

export default Home; 