import { useState, useCallback } from "react";
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
import { LandingPageService } from "../services/api/LandingPageService";

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

interface PlaceOption {
  place_id: string;
  name: string;
  formatted_address: string;
}

const libraries: Libraries = ["places"];
const landingPageService = new LandingPageService("http://localhost:3000");

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
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const searchPlaces = useCallback(async (input: string) => {
    if (!input) return;
    setLoading(true);

    try {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        query: input,
        fields: ["place_id", "name", "formatted_address", "geometry"],
      };

      service.textSearch(
        request,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setOptions(
              results.map((result) => ({
                place_id: result.place_id!,
                name: result.name!,
                formatted_address: result.formatted_address!,
              }))
            );
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error searching places:", error);
      setLoading(false);
    }
  }, []);

  const handlePlaceSelect = async (option: PlaceOption | null) => {
    if (!option) {
      setPlace(null);
      return;
    }

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId: option.place_id,
        fields: [
          "place_id",
          "name",
          "formatted_address",
          "geometry",
          "website",
          "formatted_phone_number",
          "opening_hours",
          "rating",
          "reviews",
          "url",
        ],
      },
      (
        result: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          result &&
          result.geometry?.location
        ) {
          setPlace(result);
          setCenter({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          });
        }
      }
    );
  };

  const handleGenerateLandingPage = () => {
    if (!place || !place.place_id || !place.name || !place.formatted_address)
      return;

    setSubmitting(true);
    const landingPageData = {
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number,
      website: place.website,
      rating: place.rating,
      reviews: place.reviews?.map((review) => ({
        text: review.text || "",
        rating: review.rating || 0,
        author: review.author_name || "",
      })),
    };

    landingPageService
      .createLandingPage(landingPageData)
      .then(() => {
        console.log(`Created landing page for ${place.name}`);
        navigate("/land", { state: { placeData: place } });
      })
      .catch((error) => {
        console.error("Error creating landing page:", error);
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
            {submitting ? "Generating..." : "Generate Landing Page"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LandingGenerator;
