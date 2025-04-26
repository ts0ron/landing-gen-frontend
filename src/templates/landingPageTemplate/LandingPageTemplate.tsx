import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  ClickAwayListener,
} from "@mui/material";
import {
  Phone,
  Place,
  Schedule,
  Language,
  AccessTime,
  Star,
  AccessibleForward,
  Business,
  LocalOffer,
  PhotoLibrary,
  ZoomIn,
} from "@mui/icons-material";
import { Asset } from "../../services/api/AssetService";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

interface LandingPageTemplateProps {
  asset: Asset;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const LandingPageTemplate = ({ asset }: LandingPageTemplateProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Helper function to render price level
  const renderPriceLevel = (level?: number) => {
    if (!level) return null;
    return "💰".repeat(level);
  };

  const center = {
    lat: asset.geometry.location.lat,
    lng: asset.geometry.location.lng,
  };

  // Calculate zoom based on viewport if available
  const zoom = asset.geometry.viewport ? 14 : 16;

  const slides = asset.photos
    .filter((photo) => photo.photoUri)
    .map((photo) => {
      const photoUrl = `${photo.photoUri!}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`;
      return {
        src: photoUrl,
        width: photo.width,
        height: photo.height,
      };
    });

  // Debug log for asset photos
  console.log("Asset photos:", asset.photos);

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
          {asset.name}
        </Typography>
        <Typography variant="h5">{asset.formattedAddress}</Typography>
        {asset.businessStatus && (
          <Chip
            label={asset.businessStatus}
            color={asset.businessStatus === "OPERATIONAL" ? "success" : "error"}
            sx={{ mt: 2 }}
          />
        )}
      </Box>

      {/* Quick Info Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {asset.formattedPhoneNumber && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone color="primary" />
              <Typography>{asset.formattedPhoneNumber}</Typography>
            </Box>
          </Grid>
        )}

        {asset.formattedAddress && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Place color="primary" />
              <Typography>{asset.formattedAddress}</Typography>
            </Box>
          </Grid>
        )}

        {asset.openingHours && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Schedule color="primary" />
              <Typography>
                {asset.openingHours.open_now ? "Open Now" : "Closed"}
              </Typography>
            </Box>
          </Grid>
        )}

        {asset.website && (
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Language color="primary" />
              <Typography
                component="a"
                href={asset.website}
                target="_blank"
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                Visit Website
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Photos Section */}
      {asset.photos && asset.photos.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <PhotoLibrary /> Photos
          </Typography>
          <Grid container spacing={2}>
            {asset.photos.map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 250,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    "&:hover": {
                      "& .zoom-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  {photo.photoUri && (
                    <>
                      <img
                        src={`${photo.photoUri}&key=${
                          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                        }`}
                        alt={`${asset.name} - Photo ${index + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          console.error("Image failed to load:", e);
                          console.log("Failed image URL:", e.currentTarget.src);
                        }}
                      />
                      <Box
                        className="zoom-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: "rgba(0, 0, 0, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.2s ease-in-out",
                        }}
                      >
                        <ZoomIn sx={{ color: "white", fontSize: 40 }} />
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {lightboxOpen && (
        <Box>
          <ClickAwayListener onClickAway={() => setLightboxOpen(false)}>
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={lightboxIndex}
              slides={slides}
              render={{
                buttonPrev: slides.length <= 1 ? () => null : undefined,
                buttonNext: slides.length <= 1 ? () => null : undefined,
              }}
              styles={{
                container: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
              }}
            />
          </ClickAwayListener>
        </Box>
      )}

      {/* Business Details */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Opening Hours */}
          {asset.openingHours?.weekday_text && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccessTime /> Opening Hours
              </Typography>
              {asset.openingHours.weekday_text.map((day, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  {day}
                </Typography>
              ))}
            </Box>
          )}

          {/* AI Description if available */}
          {asset.aiDescription && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About
              </Typography>
              <Typography variant="body1">{asset.aiDescription}</Typography>
            </Box>
          )}

          {/* Reviews Section */}
          {asset.reviews && asset.reviews.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Star /> Reviews
              </Typography>
              {asset.reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2">
                      {review.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.relative_time_description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Star sx={{ color: "gold", mr: 0.5 }} />
                    <Typography variant="body2">{review.rating}</Typography>
                  </Box>
                  <Typography variant="body2">{review.text}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Business Info Card */}
            <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Business /> Business Info
              </Typography>

              {asset.priceLevel && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Price Level
                  </Typography>
                  <Typography>{renderPriceLevel(asset.priceLevel)}</Typography>
                </Box>
              )}

              {asset.rating && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Rating
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Star sx={{ color: "gold" }} />
                    <Typography>{asset.rating} / 5</Typography>
                    {asset.userRatingsTotal && (
                      <Typography variant="caption">
                        ({asset.userRatingsTotal} reviews)
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}

              {asset.wheelchairAccessibleEntrance && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessibleForward color="primary" />
                  <Typography>Wheelchair Accessible</Typography>
                </Box>
              )}
            </Box>

            {/* Tags/Types */}
            {((asset.types?.length ?? 0) > 0 ||
              (asset.aiTags?.length ?? 0) > 0) && (
              <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocalOffer /> Categories & Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {asset.types?.map((type, index) => (
                    <Chip
                      key={index}
                      label={type.replace(/_/g, " ").toLowerCase()}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                  {asset.aiTags?.map((tag, index) => (
                    <Chip
                      key={`ai-${index}`}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mb: 4 }}>
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
          {loadError && (
            <Typography color="error">Error loading map</Typography>
          )}
          {!isLoaded ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
              }}
            >
              <Typography>Loading map...</Typography>
            </Box>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoom}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              <MarkerF position={center} title={asset.name} />
            </GoogleMap>
          )}
        </Box>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 4 }}>
        {asset.formattedPhoneNumber && (
          <Button
            variant="contained"
            size="large"
            href={`tel:${asset.formattedPhoneNumber}`}
            sx={{ mr: 2 }}
          >
            Call Now
          </Button>
        )}
        {asset.url && (
          <Button
            variant="outlined"
            size="large"
            href={asset.url}
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
