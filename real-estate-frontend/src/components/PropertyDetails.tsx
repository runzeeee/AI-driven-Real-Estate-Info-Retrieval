import { Typography, Box } from '@mui/material';

interface PropertyDetailsProps {
  data: any;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data }) => (
  <Box my={2}>
    <Typography variant="h6">Property Overview</Typography>
    <Typography variant="body1">{data.overview}</Typography>
    <Typography variant="h6" mt={2}>Details</Typography>
    <Typography variant="body1">{data.details}</Typography>
    <Typography variant="h6" mt={2}>Nearby Schools</Typography>
    <ul>
      {data.schools.map((school: string, index: number) => (
        <li key={index}>{school}</li>
      ))}
    </ul>
  </Box>
);

export default PropertyDetails; 