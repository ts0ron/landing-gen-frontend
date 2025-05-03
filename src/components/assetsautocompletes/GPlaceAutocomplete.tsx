import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useCallback, useRef } from "react";
import {
  GoogleMapsService,
  PlaceSearchResult,
} from "../../services/google/GoogleMapsService";

interface GPlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  disabled?: boolean;
}

export const GPlaceAutocomplete = ({
  onPlaceSelect,
  disabled = false,
}: GPlaceAutocompleteProps) => {
  const [options, setOptions] = useState<PlaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const googleMapsService = useRef<GoogleMapsService>();

  const initGoogleMapsService = useCallback(() => {
    if (!googleMapsService.current) {
      googleMapsService.current = new GoogleMapsService();
    }
  }, []);

  const searchPlaces = useCallback(
    async (input: string) => {
      if (!input) return;
      setLoading(true);

      try {
        initGoogleMapsService();
        const results = await googleMapsService.current!.searchPlaces(input);
        setOptions(results);
      } catch (error) {
        console.error("Error searching places:", error);
      } finally {
        setLoading(false);
      }
    },
    [initGoogleMapsService]
  );

  const handlePlaceSelect = async (option: PlaceSearchResult | null) => {
    if (!option) {
      onPlaceSelect(null);
      return;
    }

    try {
      initGoogleMapsService();
      const placeDetails = await googleMapsService.current!.getPlaceDetails(
        option.place_id
      );
      onPlaceSelect(placeDetails);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <Autocomplete
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name || option.place_id}
      isOptionEqualToValue={(option, value) =>
        option.place_id === value.place_id
      }
      filterOptions={(x) => x}
      onChange={(_, value) => handlePlaceSelect(value)}
      onInputChange={(_, value) => {
        if (value) {
          searchPlaces(value);
        } else {
          setOptions([]);
        }
      }}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for your business"
          variant="outlined"
          sx={{ width: "100%" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.place_id}>
          <Box>
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {option.formatted_address}
            </Typography>
          </Box>
        </li>
      )}
      sx={{ flex: 1 }}
    />
  );
};
