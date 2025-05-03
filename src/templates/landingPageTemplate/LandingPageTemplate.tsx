import { Box, Typography, Grid } from "@mui/material";
import { Place } from "@mui/icons-material";
import { Asset } from "../../services/api/AssetService";
import { useMemo } from "react";
import { ReviewsSection } from "../../components/reviews/ReviewsSection";
import { GoogleMaps } from "../../components/views/maps/GoogleMaps";
import { AssetMetadata } from "../../components/AssetMetadata";
import { PhotoGallery } from "../../components/gallery/PhotoGallery";
import { EditorialSummary } from "../../components/editorial/EditorialSummary";
import { FeaturesGrid } from "../../components/features/FeaturesGrid";
import { HeroSection } from "../../components/sections/HeroSection";
import { QuickInfoSection } from "../../components/sections/QuickInfoSection";
import { CallToAction } from "../../components/sections/CallToAction";
import { AiDescription } from "../../components/sections/AiDescription";

// Predefined gradient pairs that look good together
const gradientPairs = [
  ["#fdfbfb", "#ebedee"], // Clean Subtle
  ["#E0EAFC", "#CFDEF3"], // Gentle Blue
  ["#F5F7FA", "#E4E7EB"], // Light Grey
  ["#FFDEE9", "#B5FFFC"], // Soft Pink to Cyan
  ["#FFF1EB", "#E4EfE9"], // Peach to Mint
  ["#F3E7E9", "#E3EEFF"], // Pink to Blue
  ["#FFFEFF", "#D7FFFE"], // White to Light Cyan
  ["#FFF0F1", "#FAF8F9"], // Warm White
  ["#F4F4F4", "#DFEFFF"], // Grey to Blue
  ["#FCE4EC", "#FFF8E1"], // Pink to Cream
];

interface LandingPageTemplateProps {
  asset: Asset;
  googleMapsApiKey: string;
}

const LandingPageTemplate = ({
  asset,
  googleMapsApiKey,
}: LandingPageTemplateProps) => {
  // Select a random gradient pair on component mount
  const randomGradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradientPairs.length);
    const [color1, color2] = gradientPairs[randomIndex];
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
  }, []);

  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const currentDayIndex = new Date().getDay();

  // Function to get today's opening hours
  const getTodayHours = () => {
    if (!asset.regularOpeningHours?.weekdayDescriptions) return null;
    return asset.regularOpeningHours.weekdayDescriptions[currentDayIndex];
  };

  // Get just the hours part from the full day string
  const getTodayHoursOnly = () => {
    const todayFull = getTodayHours();
    if (!todayFull) return undefined;
    return todayFull.split(": ")[1];
  };

  const center = {
    lat: asset.location.latitude,
    lng: asset.location.longitude,
  };

  // Function to customize photo URLs by appending the Google Maps API key
  const customizePhotoUrl = (url: string) => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}key=${googleMapsApiKey}`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: randomGradient,
        py: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* Hero Section */}
        <HeroSection
          displayName={asset.displayName.text}
          address={asset.formattedAddress}
          rating={asset.rating}
          userRatingCount={asset.userRatingCount}
        />

        {/* Quick Info Section */}
        <QuickInfoSection
          openingHours={getTodayHoursOnly()}
          websiteUri={asset.websiteUri}
          googleMapsUri={asset.googleMapsUri}
        />

        {/* Photo Gallery */}
        {asset.photos && asset.photos.length > 0 && (
          <PhotoGallery
            photos={asset.photos}
            assetName={asset.displayName.text}
            customizeUrl={customizePhotoUrl}
          />
        )}

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Grid item xs={12} md={8} sx={{ height: "100%" }}>
            {/* Editorial Summary */}
            {asset.editorialSummary && (
              <EditorialSummary summary={asset.editorialSummary.text} />
            )}

            {/* AI Description */}
            {asset.aiDescription && (
              <AiDescription description={asset.aiDescription} />
            )}

            {/* Features Grid */}
            <FeaturesGrid
              accessibilityOptions={asset.accessibilityOptions}
              parkingOptions={asset.parkingOptions}
              paymentOptions={asset.paymentOptions}
              dineInOptions={asset.dineInOptions}
            />

            {/* Reviews Section */}
            {asset.reviews && asset.reviews.length > 0 && (
              <ReviewsSection
                reviews={asset.reviews.map((review) => ({
                  author_name: review.authorAttribution.displayName,
                  rating: review.rating,
                  relative_time_description:
                    review.relativePublishTimeDescription,
                  text: review.text.text,
                }))}
              />
            )}

            {/* Map Section */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Place /> Location
              </Typography>
              <Box
                sx={{
                  height: 400,
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <GoogleMaps
                  center={center}
                  hasMarker={true}
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4} sx={{ height: "100%" }}>
            <Box
              sx={{
                bgcolor: "rgba(255, 253, 250, 1)",
                borderRadius: 2,
                p: 2,
                boxShadow: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AssetMetadata asset={asset} />
            </Box>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <CallToAction
          websiteUri={asset.websiteUri}
          googleMapsUri={asset.googleMapsUri}
        />
      </Box>
    </Box>
  );
};

export default LandingPageTemplate;
