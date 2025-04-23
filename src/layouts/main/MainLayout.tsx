import { ReactNode } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const APP_BAR_HEIGHT = 64;

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({
  children,
  title = "Landing Page Generator",
}: MainLayoutProps) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      })}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        id="main-container"
        sx={{ width: "100%", height: `calc(100vh - ${APP_BAR_HEIGHT}px)` }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
