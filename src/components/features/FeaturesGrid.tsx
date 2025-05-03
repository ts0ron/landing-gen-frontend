import { Box, Typography, Grid, Stack } from "@mui/material";
import {
  AccessibleForward,
  LocalParking,
  Payment,
  Restaurant,
} from "@mui/icons-material";
import {
  AccessibilityOptions,
  ParkingOptions,
  PaymentOptions,
  DineInOptions,
} from "../../services/api/AssetService";
import {
  GROUP_BOX_BG,
  GROUP_BOX_RADIUS,
  GROUP_BOX_SHADOW,
} from "../../constants/constantPalette";

interface FeaturesGridProps {
  accessibilityOptions?: AccessibilityOptions;
  parkingOptions?: ParkingOptions;
  paymentOptions?: PaymentOptions;
  dineInOptions?: DineInOptions;
}

export const FeaturesGrid = ({
  accessibilityOptions,
  parkingOptions,
  paymentOptions,
  dineInOptions,
}: FeaturesGridProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Accessibility Options */}
      {accessibilityOptions && (
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              bgcolor: GROUP_BOX_BG,
              borderRadius: GROUP_BOX_RADIUS,
              boxShadow: GROUP_BOX_SHADOW,
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
              <AccessibleForward /> Accessibility
            </Typography>
            <Stack spacing={1}>
              {accessibilityOptions.wheelchairAccessibleEntrance && (
                <Typography>✓ Wheelchair Accessible Entrance</Typography>
              )}
              {accessibilityOptions.wheelchairAccessibleParking && (
                <Typography>✓ Wheelchair Accessible Parking</Typography>
              )}
              {accessibilityOptions.wheelchairAccessibleRestroom && (
                <Typography>✓ Wheelchair Accessible Restroom</Typography>
              )}
              {accessibilityOptions.wheelchairAccessibleSeating && (
                <Typography>✓ Wheelchair Accessible Seating</Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      )}

      {/* Parking Options */}
      {parkingOptions && (
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              bgcolor: GROUP_BOX_BG,
              borderRadius: GROUP_BOX_RADIUS,
              boxShadow: GROUP_BOX_SHADOW,
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
              <LocalParking /> Parking
            </Typography>
            <Stack spacing={1}>
              {parkingOptions.freeParkingLot && (
                <Typography>✓ Free Parking Lot</Typography>
              )}
              {parkingOptions.paidParkingLot && (
                <Typography>✓ Paid Parking Lot</Typography>
              )}
              {parkingOptions.freeStreetParking && (
                <Typography>✓ Free Street Parking</Typography>
              )}
              {parkingOptions.valetParking && (
                <Typography>✓ Valet Parking</Typography>
              )}
              {parkingOptions.freeGarageParking && (
                <Typography>✓ Free Garage Parking</Typography>
              )}
              {parkingOptions.paidGarageParking && (
                <Typography>✓ Paid Garage Parking</Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      )}

      {/* Payment Options */}
      {paymentOptions && (
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              bgcolor: GROUP_BOX_BG,
              borderRadius: GROUP_BOX_RADIUS,
              boxShadow: GROUP_BOX_SHADOW,
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
              <Payment /> Payment Methods
            </Typography>
            <Stack spacing={1}>
              {paymentOptions.acceptsCreditCards && (
                <Typography>✓ Credit Cards</Typography>
              )}
              {paymentOptions.acceptsDebitCards && (
                <Typography>✓ Debit Cards</Typography>
              )}
              {paymentOptions.acceptsCashOnly && (
                <Typography>✓ Cash Only</Typography>
              )}
              {paymentOptions.acceptsNfc && (
                <Typography>✓ NFC Payments</Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      )}

      {/* Dine-in Options */}
      {dineInOptions && (
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              p: 2,
              bgcolor: GROUP_BOX_BG,
              borderRadius: GROUP_BOX_RADIUS,
              boxShadow: GROUP_BOX_SHADOW,
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
              <Restaurant /> Features
            </Typography>
            <Stack spacing={1}>
              {dineInOptions.reservable && (
                <Typography>✓ Reservations Available</Typography>
              )}
              {dineInOptions.servesCocktails && (
                <Typography>✓ Serves Cocktails</Typography>
              )}
              {dineInOptions.servesDessert && (
                <Typography>✓ Serves Dessert</Typography>
              )}
              {dineInOptions.servesCoffee && (
                <Typography>✓ Serves Coffee</Typography>
              )}
              {dineInOptions.outdoorSeating && (
                <Typography>✓ Outdoor Seating</Typography>
              )}
              {dineInOptions.liveMusic && <Typography>✓ Live Music</Typography>}
              {dineInOptions.menuForChildren && (
                <Typography>✓ Children's Menu</Typography>
              )}
              {dineInOptions.goodForChildren && (
                <Typography>✓ Good for Children</Typography>
              )}
              {dineInOptions.goodForGroups && (
                <Typography>✓ Good for Groups</Typography>
              )}
              {dineInOptions.goodForWatchingSports && (
                <Typography>✓ Good for Watching Sports</Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
