import { useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { GooglePlaceService } from "../services/api/GooglePlaceService";
import {
  GoogleMapsService,
  PlaceSearchResult,
} from "../services/google/GoogleMapsService";

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const libraries: Libraries = ["places"];
const googlePlaceService = new GooglePlaceService(
  import.meta.env.VITE_APP_API_URL
);

const LandingGenerator = () => {
  const navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [center, setCenter] = useState(defaultCenter);
  const [options, setOptions] = useState<PlaceSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      setPlace(null);
      return;
    }

    try {
      initGoogleMapsService();
      const placeDetails = await googleMapsService.current!.getPlaceDetails(
        option.place_id
      );
      setPlace(placeDetails);
      if (placeDetails.geometry?.location) {
        setCenter({
          lat: placeDetails.geometry.location.lat(),
          lng: placeDetails.geometry.location.lng(),
        });
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleGenerateLandingPage = () => {
    if (!place || !place.place_id) return;

    setSubmitting(true);

    const placeData = {
      placeId: place.place_id,
    };

    googlePlaceService
      .registerPlace(placeData)
      .then((response) => {
        console.log(`Registered place with ID: ${response.id}`);
        navigate(`/land/${response.id}`);
      })
      .catch((error: Error) => {
        console.error("Error registering place:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography color="error">
          Error loading Google Maps. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        px: 20,
        height: "100%",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        Find Your Location
      </Typography>

      <Paper sx={{ p: 2, maxWidth: "600px", margin: "0 auto", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Autocomplete
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            filterOptions={(x) => x}
            onChange={(_, value) => handlePlaceSelect(value)}
            onInputChange={(_, value) => {
              if (value) {
                searchPlaces(value);
              } else {
                setOptions([]);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for your business"
                variant="outlined"
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
              <li {...props}>
                <Box>
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.formatted_address}
                  </Typography>
                </Box>
              </li>
            )}
          />

          <Box sx={{ height: 400, width: "100%" }}>
            <GoogleMap
              center={center}
              zoom={13}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {place && (
                <Marker
                  position={{
                    lat: center.lat,
                    lng: center.lng,
                  }}
                />
              )}
            </GoogleMap>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleGenerateLandingPage}
            disabled={!place || submitting}
          >
            {submitting ? "Generating..." : "Register Location"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LandingGenerator;
