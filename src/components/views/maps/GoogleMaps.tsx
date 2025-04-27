import { Paper, SxProps, Theme, Box, Typography } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMapsContext } from "../../../providers/MapsProvider";

interface GoogleMapsProps {
  center: {
    lat: number;
    lng: number;
  };
  hasMarker?: boolean;
  sx?: SxProps<Theme>;
}

export const GoogleMaps = ({
  center,
  hasMarker = false,
  sx,
}: GoogleMapsProps) => {
  const { isLoaded, loadError } = useMapsContext();

  if (loadError) {
    return (
      <Paper sx={sx}>
        <Typography color="error">Error loading map</Typography>
      </Paper>
    );
  }

  if (!isLoaded) {
    return (
      <Paper sx={sx}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Loading map...</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        overflow: "hidden",
        ...sx,
      }}
    >
      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {hasMarker && (
          <Marker
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
          />
        )}
      </GoogleMap>
    </Paper>
  );
};
