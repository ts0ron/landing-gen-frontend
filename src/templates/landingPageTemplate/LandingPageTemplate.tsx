import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Collapse,
  IconButton,
  Popover,
} from "@mui/material";
import {
  Phone,
  Place,
  Language,
  AccessTime,
  Star,
  AccessibleForward,
  Business,
  LocalOffer,
  ZoomIn,
  ExpandMore,
  Schedule,
} from "@mui/icons-material";
import { Asset } from "../../services/api/AssetService";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState, useMemo } from "react";
import { red, teal, grey } from "@mui/material/colors";

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
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const LandingPageTemplate = ({ asset }: LandingPageTemplateProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [hoursAnchorEl, setHoursAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  // Select a random gradient pair on component mount
  const randomGradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradientPairs.length);
    const [color1, color2] = gradientPairs[randomIndex];
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const currentDayIndex = new Date().getDay();

  // Function to get today's opening hours
  const getTodayHours = () => {
    if (!asset.openingHours?.weekday_text) return null;
    // Adjust index because Google's weekday_text starts with Monday (0 = Monday)
    const adjustedIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    return asset.openingHours.weekday_text[adjustedIndex];
  };

  // Get just the hours part from the full day string
  const getTodayHoursOnly = () => {
    const todayFull = getTodayHours();
    if (!todayFull) return null;
    return todayFull.split(": ")[1];
  };

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

  // Function to get the ordered weekday text starting from tomorrow
  const getOrderedWeekDays = () => {
    if (!asset.openingHours?.weekday_text) return [];

    // Get tomorrow's index (Google's weekday_text starts with Monday as 0)
    const tomorrowIndex = currentDayIndex === 0 ? 0 : currentDayIndex; // If today is Sunday, tomorrow is Monday (0)
    const days = [...asset.openingHours.weekday_text];

    // Rotate array to start from tomorrow
    const daysFromTomorrow = [
      ...days.slice(tomorrowIndex),
      ...days.slice(0, tomorrowIndex),
    ];

    return daysFromTomorrow;
  };

  const handleHoursClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHoursAnchorEl(event.currentTarget);
  };

  const handleHoursClose = () => {
    setHoursAnchorEl(null);
  };

  const hoursOpen = Boolean(hoursAnchorEl);

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
        <Box
          sx={{
            height: 350,
            bgcolor: "background.paper",
            color: "text.primary",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mb: 3,
            position: "relative",
            borderRadius: 2,
            boxShadow: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              bgcolor: "primary.main",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 500,
            }}
          >
            {asset.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Place fontSize="small" />
            {asset.formattedAddress}
          </Typography>
          {asset.businessStatus && (
            <Box sx={{ mt: 2 }}>
              {asset.businessStatus === "OPERATIONAL" ? (
                <Chip
                  label="Open for Business"
                  color="success"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              ) : asset.businessStatus === "CLOSED_TEMPORARILY" ? (
                <Chip
                  label="Temporarily Closed"
                  color="warning"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              ) : (
                <Chip
                  label="Permanently Closed"
                  color="error"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              )}
            </Box>
          )}
        </Box>

        {/* Quick Info Section */}
        {(asset.formattedPhoneNumber ||
          asset.openingHours?.open_now !== undefined ||
          (asset.openingHours?.weekday_text &&
            asset.openingHours.weekday_text.length > 0)) && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {asset.formattedPhoneNumber && (
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
                  <Phone color="primary" />
                  <Typography>{asset.formattedPhoneNumber}</Typography>
                </Box>
              </Grid>
            )}

            {asset.openingHours?.open_now !== undefined && (
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
                  <Schedule
                    sx={{
                      color: asset.openingHours?.open_now
                        ? teal[700]
                        : red[300],
                    }}
                  />
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: grey[800],
                      fontWeight: 600,
                    }}
                  >
                    {asset.openingHours.open_now ? "Open Now" : "Closed"}
                  </Typography>
                  {asset.openingHours.open_now && (
                    <Chip
                      label="Open"
                      size="small"
                      sx={{
                        ml: "auto",
                        bgcolor: teal[700],
                        color: "#fff",
                        "& .MuiChip-label": {
                          fontStyle: "italic",
                          fontWeight: 600,
                        },
                      }}
                    />
                  )}
                </Box>
              </Grid>
            )}

            {asset.openingHours?.weekday_text &&
              asset.openingHours.weekday_text.length > 0 && (
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime color="primary" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Today's Hours
                        </Typography>
                        <Typography variant="body2">
                          {getTodayHoursOnly()}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={handleHoursClick}
                      size="small"
                      sx={{
                        ml: "auto",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </Box>
                  <Popover
                    open={hoursOpen}
                    anchorEl={hoursAnchorEl}
                    onClose={handleHoursClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        width: 280,
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 2,
                          pb: 1,
                          borderBottom: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        Opening Hours
                      </Typography>
                      <Stack spacing={1}>
                        {getOrderedWeekDays().map((day, index) => {
                          const [dayName, hours] = day.split(": ");
                          return (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                p: 1,
                                borderRadius: 1,
                                "&:hover": {
                                  bgcolor: "action.hover",
                                },
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "text.primary" }}
                              >
                                {dayName}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                {hours}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  </Popover>
                </Grid>
              )}
          </Grid>
        )}

        {/* Photos Section */}
        {asset.photos && asset.photos.length > 0 && (
          <Box
            sx={{
              mb: 3,
              bgcolor: "rgba(255, 253, 250, 1)",
              borderRadius: 2,
              p: 2,
              boxShadow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Photo Gallery
              </Typography>
              {asset.photos.length > 4 && (
                <IconButton
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: showAllPhotos ? "rotate(-180deg)" : "none",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  <ExpandMore />
                </IconButton>
              )}
            </Box>
            <Box sx={{ position: "relative" }}>
              {/* First 4 photos - always visible */}
              <Grid container spacing={2}>
                {asset.photos.slice(0, 4).map((photo, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 250,
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
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
                              console.log(
                                "Failed image URL:",
                                e.currentTarget.src
                              );
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
                              transition: "opacity 0.3s ease",
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

              {/* Remaining photos - collapsible */}
              {asset.photos.length > 4 && (
                <Box sx={{ mt: 2, overflow: "hidden" }}>
                  <Collapse
                    in={showAllPhotos}
                    timeout={300}
                    sx={{
                      "& .MuiCollapse-wrapper": { display: "block !important" },
                    }}
                  >
                    <Grid container spacing={2}>
                      {asset.photos.slice(4).map((photo, index) => (
                        <Grid item xs={3} key={index + 4}>
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: 250,
                              borderRadius: 2,
                              overflow: "hidden",
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.02)",
                                "& .zoom-overlay": {
                                  opacity: 1,
                                },
                              },
                            }}
                            onClick={() => {
                              setLightboxIndex(index + 4);
                              setLightboxOpen(true);
                            }}
                          >
                            {photo.photoUri && (
                              <>
                                <img
                                  src={`${photo.photoUri}&key=${
                                    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                                  }`}
                                  alt={`${asset.name} - Photo ${index + 5}`}
                                  loading="lazy"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    console.error("Image failed to load:", e);
                                    console.log(
                                      "Failed image URL:",
                                      e.currentTarget.src
                                    );
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
                                    transition: "opacity 0.3s ease",
                                  }}
                                >
                                  <ZoomIn
                                    sx={{ color: "white", fontSize: 40 }}
                                  />
                                </Box>
                              </>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Box>
              )}
            </Box>
          </Box>
        )}

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

        {/* Business Details */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Left Column */}
          <Grid item xs={12} md={8} sx={{ height: "100%" }}>
            {/* AI Description if available */}
            {asset.aiDescription && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  About
                </Typography>
                <Typography variant="body1">{asset.aiDescription}</Typography>
              </Box>
            )}

            {/* Reviews Section */}
            {asset.reviews && asset.reviews.length > 0 && (
              <Box
                sx={{
                  bgcolor: "rgba(255, 253, 250, 1)",
                  borderRadius: 2,
                  p: 2,
                  boxShadow: 1,
                  height: asset.aiDescription ? "calc(100% - 140px)" : "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    borderBottom: "2px solid",
                    borderColor: "primary.main",
                    pb: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "primary.main",
                      fontWeight: 600,
                    }}
                  >
                    Customer Reviews
                  </Typography>
                  {asset.reviews.length > 2 && (
                    <IconButton
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      sx={{
                        transition: "transform 0.3s ease",
                        transform: showAllReviews ? "rotate(-180deg)" : "none",
                        "&:hover": {
                          bgcolor: "transparent",
                          color: "primary.main",
                        },
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  )}
                </Box>

                {/* Initial Reviews */}
                <Stack spacing={2}>
                  {asset.reviews.slice(0, 2).map((review, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          {review.author_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.relative_time_description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Star sx={{ color: "gold", fontSize: 20 }} />
                          <Typography variant="body2">
                            {review.rating}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2">{review.text}</Typography>
                    </Box>
                  ))}
                </Stack>

                {/* Collapsible Reviews */}
                {asset.reviews.length > 2 && (
                  <Box sx={{ mt: 2, overflow: "hidden" }}>
                    <Collapse
                      in={showAllReviews}
                      timeout={300}
                      sx={{
                        "& .MuiCollapse-wrapper": {
                          display: "block !important",
                        },
                      }}
                    >
                      <Stack spacing={2}>
                        {asset.reviews.slice(2).map((review, index) => (
                          <Box
                            key={index + 2}
                            sx={{
                              p: 2,
                              bgcolor: "background.paper",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight="bold">
                                {review.author_name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {review.relative_time_description}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <Star sx={{ color: "gold", fontSize: 20 }} />
                                <Typography variant="body2">
                                  {review.rating}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2">
                              {review.text}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Collapse>
                  </Box>
                )}
              </Box>
            )}
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4} sx={{ height: "100%" }}>
            <Box
              sx={{
                bgcolor: "rgba(255, 253, 250, 1)",
                borderRadius: 2,
                p: 2,
                boxShadow: 1,
                height: asset.aiDescription ? "calc(100% - 140px)" : "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Business Info Card */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Business /> Business Info
                  </Typography>

                  {asset.priceLevel && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Price Level
                      </Typography>
                      <Typography>
                        {renderPriceLevel(asset.priceLevel)}
                      </Typography>
                    </Box>
                  )}

                  {asset.rating && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Rating
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
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
            </Box>
          </Grid>
        </Grid>

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
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {asset.formattedPhoneNumber && (
            <Button
              variant="contained"
              size="large"
              href={`tel:${asset.formattedPhoneNumber}`}
              startIcon={<Phone />}
            >
              Call Now
            </Button>
          )}
          {asset.website && (
            <Button
              variant="contained"
              size="large"
              href={asset.website}
              target="_blank"
              startIcon={<Language />}
            >
              Visit Website
            </Button>
          )}
          {asset.url && (
            <Button
              variant="outlined"
              size="large"
              href={asset.url}
              target="_blank"
              startIcon={<Place />}
            >
              View on Google Maps
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPageTemplate;
