import { useState } from "react";
import { Box, Typography, Stack, IconButton, Collapse } from "@mui/material";
import { ExpandMore, Star } from "@mui/icons-material";
import {
  GROUP_BOX_BG,
  GROUP_BOX_RADIUS,
  GROUP_BOX_SHADOW,
} from "../../constants/constantPalette";

interface Review {
  author_name: string;
  relative_time_description: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: GROUP_BOX_BG,
        borderRadius: GROUP_BOX_RADIUS,
        p: 2,
        boxShadow: GROUP_BOX_SHADOW,
        height: "100%",
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
        {reviews.length > 2 && (
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
        {reviews.slice(0, 2).map((review, index) => (
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Star sx={{ color: "gold", fontSize: 20 }} />
                <Typography variant="body2">{review.rating}</Typography>
              </Box>
            </Box>
            <Typography variant="body2">{review.text}</Typography>
          </Box>
        ))}
      </Stack>

      {/* Collapsible Reviews */}
      {reviews.length > 2 && (
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
              {reviews.slice(2).map((review, index) => (
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
                    <Typography variant="caption" color="text.secondary">
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
                      <Typography variant="body2">{review.rating}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">{review.text}</Typography>
                </Box>
              ))}
            </Stack>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};
