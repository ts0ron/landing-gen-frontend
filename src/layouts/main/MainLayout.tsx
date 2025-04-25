import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginDialog } from "../../components/auth/LoginDialog";
import { IconFactory, IconID } from "../../icons/IconFactory";

const APP_BAR_HEIGHT = 64;

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "Pagenerate" }: MainLayoutProps) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      setLoginDialogOpen(true);
    }
  };

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
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
              gap: 1,
            }}
          >
            {IconFactory.renderIcon(IconID.PAGENERATE, {
              sx: { fontSize: 40 },
            })}
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleAuthAction}
            startIcon={
              user ? (
                <Avatar
                  src={user.photoURL || undefined}
                  sx={{ width: 24, height: 24 }}
                />
              ) : undefined
            }
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        id="main-container"
        sx={{ width: "100%", height: `calc(100vh - ${APP_BAR_HEIGHT}px)` }}
      >
        {children}
      </Box>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </Box>
  );
};

export default MainLayout;
