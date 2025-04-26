import { Paper, SxProps, Theme } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";

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
