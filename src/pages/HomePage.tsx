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
        Welcome to Pagenerate
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Create landing pages for your asset of choice in minutes
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/gen")}
        sx={{ mt: 2 }}
      >
        Register a location
      </Button>
    </Box>
  );
};

export default HomePage;
