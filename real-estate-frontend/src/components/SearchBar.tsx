import { Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { validateAddress } from "../utils/validation";
import ErrorMessage from "./ErrorMessage";

interface SearchBarProps {
  onSubmit: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google?.maps) {
      console.log("Google Maps API loaded successfully");
      setIsLoaded(true);
    } else {
      console.error("Google Maps API not loaded");
    }
  }, []);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    console.log("Autocomplete component loaded");
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    console.log("Place changed event triggered");
    if (autocomplete) {
      const place = autocomplete.getPlace();
      console.log("Selected place:", place);
      if (place?.formatted_address) {
        setAddress(place.formatted_address);
        onSubmit(place.formatted_address);
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
              onChange={(e) => setAddress(e.target.value)}
              inputProps={{ "aria-label": "search property address" }}
            />
          </Autocomplete>
        </Box>
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
