import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator = () => (
  <Box display="flex" justifyContent="center" my={2}>
    <CircularProgress />
  </Box>
);

export default LoadingIndicator; 