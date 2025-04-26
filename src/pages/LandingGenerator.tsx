import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import { GooglePlaceService } from "../services/api/GooglePlaceService";
import { UrlDisplay } from "../components/UrlDisplay";
import { GPlaceAutocomplete } from "../components/assetsautocompletes/GPlaceAutocomplete";
import { GoogleMaps } from "../components/views/maps/GoogleMaps";

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const libraries: Libraries = ["places"];
const googlePlaceService = new GooglePlaceService(
  import.meta.env.VITE_APP_API_URL
);

const LandingGenerator = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [center, setCenter] = useState(defaultCenter);
  const [submitting, setSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handlePlaceSelect = (
    placeDetails: google.maps.places.PlaceResult | null
  ) => {
    setPlace(placeDetails);
    if (placeDetails?.geometry?.location) {
      setCenter({
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng(),
      });
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
        console.log(`Registered place with response:`, response);
        const url = `${import.meta.env.VITE_APP_HOSTNAME}/pagenerate/land/${
          response.placeId
        }`;
        setGeneratedUrl(url);
      })
      .catch((error: Error) => {
        console.error("Error registering place:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCopyUrl = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setShowCopySuccess(true);
    }
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
    <Box sx={{ height: "100%", p: 4, pl: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "left",
          mb: 3,
          mt: 1,
        }}
      >
        Find Your Location
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Box
          sx={{
            flex: isSmallScreen ? "1" : "0 1 600px",
            minWidth: isSmallScreen ? "100%" : "300px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: 2,
              mb: 2,
            }}
          >
            <GPlaceAutocomplete
              onPlaceSelect={handlePlaceSelect}
              disabled={submitting}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleGenerateLandingPage}
              disabled={!place || submitting}
              sx={{
                height: 56,
                width: isSmallScreen ? "100%" : "auto",
              }}
            >
              {submitting ? "Generating..." : "Register Location"}
            </Button>
          </Box>

          {isSmallScreen && generatedUrl && (
            <UrlDisplay
              url={generatedUrl}
              isSmallScreen={isSmallScreen}
              onCopyUrl={handleCopyUrl}
            />
          )}

          <GoogleMaps
            center={center}
            hasMarker={!!place}
            sx={{
              height: "calc(100vh - 200px)",
              width: "100%",
              minWidth: isSmallScreen ? "100px" : "600px",
              maxHeight: isSmallScreen
                ? "min(calc(100vw - 32px), 100vh - 360px)"
                : "560px",
            }}
          />
        </Box>

        {!isSmallScreen && generatedUrl && (
          <UrlDisplay
            url={generatedUrl}
            isSmallScreen={isSmallScreen}
            onCopyUrl={handleCopyUrl}
          />
        )}
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={() => setShowCopySuccess(false)}
        message="URL copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default LandingGenerator;
