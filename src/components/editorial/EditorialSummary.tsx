import { Box, Typography, Paper, Divider } from "@mui/material";
import { Article } from "@mui/icons-material";
import {
  GROUP_BOX_BG,
  GROUP_BOX_RADIUS,
} from "../../constants/constantPalette";

interface EditorialSummaryProps {
  summary: string;
}

export const EditorialSummary = ({ summary }: EditorialSummaryProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        bgcolor: GROUP_BOX_BG,
        borderRadius: GROUP_BOX_RADIUS,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Article color="primary" />
        <Typography variant="h6" component="h2">
          Editorial Summary
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-line",
          lineHeight: 1.6,
        }}
      >
        {summary}
      </Typography>
    </Paper>
  );
};
