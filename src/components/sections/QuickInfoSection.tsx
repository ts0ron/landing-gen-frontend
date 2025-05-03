import { Box, Typography, Grid, Button } from "@mui/material";
import { Place, Language, AccessTime } from "@mui/icons-material";

interface QuickInfoSectionProps {
  openingHours?: string;
  websiteUri?: string;
  googleMapsUri?: string;
}

export const QuickInfoSection = ({
  openingHours,
  websiteUri,
  googleMapsUri,
}: QuickInfoSectionProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {openingHours && (
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: 48,
              px: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
              transition: "box-shadow 0.2s",
              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            <AccessTime color="primary" />
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                Today's Hours
              </Typography>
              <Typography variant="body2">{openingHours}</Typography>
            </Box>
          </Box>
        </Grid>
      )}

      {websiteUri && (
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            href={websiteUri}
            target="_blank"
            startIcon={<Language />}
            sx={{ height: 48 }}
          >
            Visit Website
          </Button>
        </Grid>
      )}

      {googleMapsUri && (
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            href={googleMapsUri}
            target="_blank"
            startIcon={<Place />}
            sx={{ height: 48 }}
          >
            View on Google Maps
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
