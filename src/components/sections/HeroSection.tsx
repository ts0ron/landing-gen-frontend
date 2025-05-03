import { Box, Typography } from "@mui/material";
import { Place } from "@mui/icons-material";

interface HeroSectionProps {
  displayName: string;
  address: string;
  rating?: number;
  userRatingCount?: number;
}

export const HeroSection = ({
  displayName,
  address,
  rating,
  userRatingCount,
}: HeroSectionProps) => {
  return (
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
        {displayName}
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
        {address}
      </Typography>
      {rating && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h6" color="primary">
            {rating.toFixed(1)}
          </Typography>
          {userRatingCount && (
            <Typography variant="body2" color="text.secondary">
              ({userRatingCount} reviews)
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
