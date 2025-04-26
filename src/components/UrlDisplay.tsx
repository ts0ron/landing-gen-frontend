import { Box, Paper, Typography, IconButton, Link } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface UrlDisplayProps {
  url: string;
  displayName: string;
  address: string;
  width?: string | number;
  onCopyUrl: () => void;
}

export const UrlDisplay = ({
  url,
  displayName,
  address,
  width = "800px",
  onCopyUrl,
}: UrlDisplayProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: width,
        minWidth: 300,
        p: 3,
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        alignSelf: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        {displayName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          color: "text.secondary",
        }}
      >
        <LocationOnIcon sx={{ fontSize: "1rem" }} />
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
          }}
        >
          {address}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.08)",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.04)",
          },
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
              color: "#1976d2",
            }}
          >
            {url}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <IconButton
            size="small"
            onClick={onCopyUrl}
            sx={{
              color: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.04)",
              borderRadius: 1.5,
              padding: "8px",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.12)",
              },
              transition: "all 0.2s ease-in-out",
            }}
            title="Copy URL"
          >
            <ContentCopyIcon sx={{ fontSize: "1.1rem" }} />
          </IconButton>
          <IconButton
            size="small"
            component={Link}
            href={url}
            target="_blank"
            sx={{
              color: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.04)",
              borderRadius: 1.5,
              padding: "8px",
              "&:hover": {
                backgroundColor: "rgba(6, 182, 212, 0.12)",
              },
              transition: "all 0.2s ease-in-out",
            }}
            title="Open in new tab"
          >
            <OpenInNewIcon sx={{ fontSize: "1.1rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
