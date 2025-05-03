import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import {
  GROUP_BOX_BG,
  GROUP_BOX_RADIUS,
  GROUP_BOX_SHADOW,
} from "../../constants/constantPalette";

interface AiDescriptionProps {
  description: string;
}

export const AiDescription = ({ description }: AiDescriptionProps) => {
  return (
    <Box
      sx={{
        mb: 3,
        bgcolor: GROUP_BOX_BG,
        borderRadius: GROUP_BOX_RADIUS,
        p: 2,
        boxShadow: GROUP_BOX_SHADOW,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, color: "primary.main" }}>
        Summary
      </Typography>
      <Box
        sx={{
          "& p": {
            mb: 2,
            lineHeight: 1.6,
          },
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            mt: 3,
            mb: 2,
            fontWeight: 600,
          },
          "& ul, & ol": {
            pl: 3,
            mb: 2,
          },
          "& li": {
            mb: 1,
          },
          "& a": {
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "& blockquote": {
            borderLeft: "4px solid",
            borderColor: "primary.main",
            pl: 2,
            py: 1,
            my: 2,
            bgcolor: "rgba(0, 0, 0, 0.02)",
            fontStyle: "italic",
          },
          "& code": {
            bgcolor: "rgba(0, 0, 0, 0.05)",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontFamily: "monospace",
          },
          "& pre": {
            bgcolor: "rgba(0, 0, 0, 0.05)",
            p: 2,
            borderRadius: 1,
            overflowX: "auto",
            "& code": {
              bgcolor: "transparent",
              p: 0,
            },
          },
        }}
      >
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
    </Box>
  );
};
