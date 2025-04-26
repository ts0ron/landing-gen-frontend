import { Box, Paper, Alert, Typography, IconButton, Link } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface UrlDisplayProps {
  url: string;
  isSmallScreen?: boolean;
  onCopyUrl: () => void;
}

export const UrlDisplay = ({
  url,
  isSmallScreen = false,
  onCopyUrl,
}: UrlDisplayProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: isSmallScreen ? "100%" : "800px",
        minWidth: 300,
        p: 3,
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        alignSelf: "flex-start",
      }}
    >
      <Alert
        severity="success"
        sx={{
          mb: 2,
          "& .MuiAlert-message": {
            width: "100%",
          },
        }}
      >
        Your landing page has been generated successfully!
      </Alert>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          backgroundColor: "#fff",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            mr: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.9rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {url}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexShrink: 0,
          }}
        >
          <IconButton
            size="small"
            onClick={onCopyUrl}
            sx={{ color: "primary.main" }}
            title="Copy URL"
          >
            <ContentCopyIcon />
          </IconButton>
          <IconButton
            size="small"
            component={Link}
            href={url}
            target="_blank"
            sx={{ color: "primary.main" }}
            title="Open in new tab"
          >
            <OpenInNewIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
