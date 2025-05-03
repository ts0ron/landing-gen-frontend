import { Grid, Button } from "@mui/material";
import { Place, Language } from "@mui/icons-material";
import { OpeningHoursDisplay } from "../OpeningHoursDisplay";

interface QuickInfoSectionProps {
  openingHours?: string;
  allOpeningHours?: string[];
  websiteUri?: string;
  googleMapsUri?: string;
}

export const QuickInfoSection = ({
  openingHours,
  allOpeningHours,
  websiteUri,
  googleMapsUri,
}: QuickInfoSectionProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {openingHours && (
        <Grid item xs={12} sm={6} md={4}>
          <OpeningHoursDisplay
            openingHours={openingHours}
            allOpeningHours={allOpeningHours}
          />
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
