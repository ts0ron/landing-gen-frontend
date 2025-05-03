import { Box, Button } from "@mui/material";
import { Place, Language } from "@mui/icons-material";

interface CallToActionProps {
  websiteUri?: string;
  googleMapsUri?: string;
}

export const CallToAction = ({
  websiteUri,
  googleMapsUri,
}: CallToActionProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 3,
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {websiteUri && (
        <Button
          variant="contained"
          size="large"
          href={websiteUri}
          target="_blank"
          startIcon={<Language />}
        >
          Visit Website
        </Button>
      )}
      {googleMapsUri && (
        <Button
          variant="outlined"
          size="large"
          href={googleMapsUri}
          target="_blank"
          startIcon={<Place />}
        >
          View on Google Maps
        </Button>
      )}
    </Box>
  );
};
