import { Box, Typography, Grid, Button } from "@mui/material";
import { Phone, Place, Schedule, Language } from "@mui/icons-material";

interface LandingPageTemplateProps {
  placeData: google.maps.places.PlaceResult;
}

const LandingPageTemplate = ({ placeData }: LandingPageTemplateProps) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: 400,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          {placeData.name}
        </Typography>
        <Typography variant="h5">{placeData.formatted_address}</Typography>
      </Box>

      {/* Info Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {placeData.formatted_phone_number && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone color="primary" />
              <Typography>{placeData.formatted_phone_number}</Typography>
            </Box>
          </Grid>
        )}

        {placeData.formatted_address && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Place color="primary" />
              <Typography>{placeData.formatted_address}</Typography>
            </Box>
          </Grid>
        )}

        {placeData.opening_hours && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule color="primary" />
              <Typography>
                {placeData.opening_hours.isOpen?.() ? "Open Now" : "Closed"}
              </Typography>
            </Box>
          </Grid>
        )}

        {placeData.website && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Language color="primary" />
              <Typography
                component="a"
                href={placeData.website}
                target="_blank"
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                Visit Website
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* About Section */}
      {placeData.rating && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Rating: {placeData.rating} / 5 ({placeData.user_ratings_total}{" "}
            reviews)
          </Typography>
          {placeData.reviews?.slice(0, 3).map((review, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                "{review.text}"
              </Typography>
              <Typography variant="caption" color="text.secondary">
                - {review.author_name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Button
          variant="contained"
          size="large"
          href={`tel:${placeData.formatted_phone_number}`}
          sx={{ mr: 2 }}
        >
          Call Now
        </Button>
        {placeData.url && (
          <Button
            variant="outlined"
            size="large"
            href={placeData.url}
            target="_blank"
          >
            View on Google Maps
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default LandingPageTemplate;
