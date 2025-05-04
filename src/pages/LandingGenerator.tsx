import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import { GooglePlaceService } from "../services/api/GooglePlaceService";
import { UrlDisplay } from "../components/UrlDisplay";
import { GPlaceAutocomplete } from "../components/assetsautocompletes/GPlaceAutocomplete";
import { GoogleMaps } from "../components/views/maps/GoogleMaps";
import useCustomTheme from "../hooks/useTheme";

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const libraries: Libraries = ["places"];
const googlePlaceService = new GooglePlaceService(
  import.meta.env.VITE_APP_API_URL
);

interface Location {
  id: string;
  url: string;
  displayName: string;
  address: string;
}

const LandingGenerator = () => {
  const { setTheme } = useCustomTheme();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Set default theme
  useEffect(() => {
    setTheme("Default");
  }, [setTheme]);

  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [center, setCenter] = useState(defaultCenter);
  const [submitting, setSubmitting] = useState(false);
  const [generatedLocations, setGeneratedLocations] = useState<Location[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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

    // Check if place_id already exists in generatedLocations
    const isDuplicate = generatedLocations.some(
      (location) => location.id === place.place_id
    );
    if (isDuplicate) {
      setNotification({
        message: "This location has already been registered",
        type: "error",
      });
      return;
    }

    setSubmitting(true);

    const placeData = {
      placeId: place.place_id,
    };

    googlePlaceService
      .registerPlace(placeData)
      .then((response) => {
        console.log(`Registered place with response:`, response);
        const url = `${import.meta.env.VITE_APP_HOSTNAME}/land/${
          response.externalId
        }`;
        setGeneratedLocations([
          ...generatedLocations,
          {
            id: response.externalId,
            url: url,
            displayName: place.name || "New Location",
            address: place.formatted_address || "Address not available",
          },
        ]);
      })
      .catch((error: Error) => {
        console.error("Error registering place:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCopyUrl = async (url: string): Promise<void> => {
    await navigator.clipboard.writeText(url);
    setNotification({
      message: "URL copied to clipboard!",
      type: "success",
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

          {isSmallScreen && generatedLocations.length > 0 && (
            <Box
              sx={{
                maxHeight: "min(300px, 100%)",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                mt: 2,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "4px",
                },
              }}
            >
              <Stack spacing={2} sx={{ width: "100%" }}>
                {generatedLocations.map((location) => (
                  <UrlDisplay
                    key={location.id}
                    url={location.url}
                    displayName={location.displayName}
                    address={location.address}
                    width={"100%"}
                    onCopyUrl={() => handleCopyUrl(location.url)}
                  />
                ))}
              </Stack>
            </Box>
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

        {!isSmallScreen && generatedLocations.length > 0 && (
          <Box
            sx={{
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              overflowX: "hidden",
              flex: "1",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
            }}
          >
            <Stack
              id="url-display-stack"
              spacing={2}
              sx={{ width: "100%", p: "20px", pt: 0 }}
            >
              {generatedLocations.map((location) => {
                console.log("location", location);
                return (
                  <UrlDisplay
                    key={location.id}
                    url={location.url}
                    displayName={location.displayName}
                    address={location.address}
                    width={"100%"}
                    onCopyUrl={() => handleCopyUrl(location.url)}
                  />
                );
              })}
            </Stack>
          </Box>
        )}
      </Box>

      <Snackbar
        open={!!notification}
        autoHideDuration={2000}
        onClose={() => setNotification(null)}
        message={notification?.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor:
              notification?.type === "error" ? "error.main" : "success.main",
          },
        }}
      />
    </Box>
  );
};

export default LandingGenerator;
