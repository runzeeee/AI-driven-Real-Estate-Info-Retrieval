import { Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { validateAddress } from "../utils/validation";
import ErrorMessage from "./ErrorMessage";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSubmit: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google?.maps) {
      console.error("Google Maps API not loaded");
    }
  }, []);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place?.formatted_address) {
        setAddress(place.formatted_address);
        setError(null);
      } else {
        setError("Please enter a valid address");
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateAddress(address)) {
      setError("Please enter a valid address");
      return;
    }
    setError(null);
    onSubmit(address);
  };

  const debouncedValidate = useCallback(
    debounce((value: string) => {
      if (!validateAddress(value)) {
        setError("Please enter a valid address");
      } else {
        setError(null);
      }
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    debouncedValidate(inputValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: error ? 1 : 3,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              types: ["address"],
              componentRestrictions: { country: "us" },
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                width: "100%",
                "& input": {
                  width: "100%",
                  padding: "8px 0",
                },
              }}
              placeholder="Enter property address..."
              name="address"
              value={address}
              onChange={handleInputChange}
              inputProps={{ "aria-label": "search property address" }}
            />
          </Autocomplete>
        </Box>
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {error && <ErrorMessage message={error} />}
    </Box>
  );
};

export default SearchBar;
