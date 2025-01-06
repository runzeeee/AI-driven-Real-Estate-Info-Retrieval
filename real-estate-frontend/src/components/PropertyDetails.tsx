import { Typography, Box, Paper, Divider, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropertyResponse } from '../utils/api';

interface PropertyDetailsProps {
  data: PropertyResponse;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Property Analysis Report
      </Typography>

      <ContentSection>
        <Typography variant="h6" color="primary" gutterBottom>
          Market Overview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>{data.propertyOverview.marketStatus}</Typography>
        <Typography variant="body1" paragraph>{data.propertyOverview.averagePrices}</Typography>
        <Typography variant="body1" paragraph>{data.propertyOverview.houseTypes}</Typography>
      </ContentSection>

      <ContentSection>
        <Typography variant="h6" color="primary" gutterBottom>
          Detailed Properties
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {data.detailedProperties.map((property, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{property.propertyName}</Typography>
                  <Typography variant="body1">Price: ${property.price.toLocaleString()}</Typography>
                  <Typography variant="body1">{property.bedrooms} beds, {property.bathrooms} baths</Typography>
                  <Typography variant="body1">{property.houseSizeSqFt} sq ft</Typography>
                  <Typography variant="body2" color="text.secondary">{property.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ContentSection>

      <ContentSection>
        <Typography variant="h6" color="primary" gutterBottom>
          Nearby Schools
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {data.nearbySchools.map((school, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{school.name}</Typography>
                  <Typography variant="body1">Type: {school.type}</Typography>
                  <Typography variant="body1">Distance: {school.distanceMiles} miles</Typography>
                  <Typography variant="body1">Rating: {school.rating}/10</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ContentSection>
    </StyledPaper>
  );
};

export default PropertyDetails; 