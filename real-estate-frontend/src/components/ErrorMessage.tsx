import { Typography, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Box my={2}>
    <Typography variant="body1" color="error">
      {message}
    </Typography>
  </Box>
);

export default ErrorMessage; 