import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        textAlign: "center",
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h2" component="h1">
        Welcome to Landing Page Generator
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Create beautiful landing pages for your business in minutes
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/gen")}
        sx={{ mt: 2 }}
      >
        Start Creating
      </Button>
    </Box>
  );
};

export default HomePage;
