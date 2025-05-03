import { Box, Typography, Grid, IconButton, Collapse } from "@mui/material";
import { ZoomIn, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { AssetPhoto } from "../../services/api/AssetService";

interface PhotoGalleryProps {
  photos: AssetPhoto[];
  assetName: string;
  customizeUrl?: (url: string) => string;
}

export const PhotoGallery = ({
  photos,
  assetName,
  customizeUrl = (url) => url, // Default implementation just returns the URL as is
}: PhotoGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const slides = photos
    .filter((photo) => photo.photoUrl)
    .map((photo) => ({
      src: customizeUrl(photo.photoUrl!),
      width: photo.widthPx,
      height: photo.heightPx,
    }));

  return (
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
        {photos.length > 4 && (
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
          {photos.slice(0, 4).map((photo, index) => (
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
                {photo.photoUrl && (
                  <>
                    <img
                      src={customizeUrl(photo.photoUrl)}
                      alt={`${assetName} - Photo ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
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
        {photos.length > 4 && (
          <Box sx={{ mt: 2, overflow: "hidden" }}>
            <Collapse
              in={showAllPhotos}
              timeout={300}
              sx={{
                "& .MuiCollapse-wrapper": { display: "block !important" },
              }}
            >
              <Grid container spacing={2}>
                {photos.slice(4).map((photo, index) => (
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
                      {photo.photoUrl && (
                        <>
                          <img
                            src={customizeUrl(photo.photoUrl)}
                            alt={`${assetName} - Photo ${index + 5}`}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
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
            </Collapse>
          </Box>
        )}
      </Box>

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
    </Box>
  );
};
