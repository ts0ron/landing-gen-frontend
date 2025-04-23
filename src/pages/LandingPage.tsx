import { useLocation } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import LandingPageTemplate from "../templates/landingPageTemplate/LandingPageTemplate";

const LandingPage = () => {
  const location = useLocation();
  const placeData = location.state?.placeData as google.maps.places.PlaceResult;

  if (!placeData) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" color="text.secondary">
          No business data available. Please select a business first.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <LandingPageTemplate placeData={placeData} />
    </Paper>
  );
};

export default LandingPage;
