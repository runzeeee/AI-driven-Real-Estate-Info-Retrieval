import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { validateAddress } from '../utils/validation';
import ErrorMessage from './ErrorMessage';

interface SearchBarProps {
  onSubmit: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get('address') as string;
    
    if (!validateAddress(address)) {
      setError('Please enter a valid address (must include street number and street type)');
      return;
    }
    
    setError(null);
    onSubmit(address);
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mb: error ? 1 : 3
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter property address..."
            name="address"
            inputProps={{ 'aria-label': 'search property address' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      {error && <ErrorMessage message={error} />}
    </Box>
  );
};

export default SearchBar; 