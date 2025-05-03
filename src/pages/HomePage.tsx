import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginDialog } from "../components/auth/LoginDialog";
import useCustomTheme from "../hooks/useTheme";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setTheme } = useCustomTheme();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Set default theme
  useEffect(() => {
    setTheme("Default");
  }, [setTheme]);

  const handleRegisterClick = () => {
    if (user) {
      navigate("/gen");
    } else {
      setLoginDialogOpen(true);
    }
  };

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
        onClick={handleRegisterClick}
        sx={{ mt: 2 }}
      >
        Register a location
      </Button>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        redirectTo="/gen"
      />
    </Box>
  );
};

export default HomePage;
