import { Box, Typography } from "@mui/material";

interface AiDescriptionProps {
  description: string;
}

export const AiDescription = ({ description }: AiDescriptionProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        AI-Generated Description
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};
