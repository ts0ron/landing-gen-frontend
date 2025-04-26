import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { IconFactory, IconID } from "../../icons/IconFactory";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export const LoginDialog = ({
  open,
  onClose,
  redirectTo,
}: LoginDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const handleSuccess = () => {
    onClose();
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      handleSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
      handleSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {isSignUp ? "Create Account" : "Sign In"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={IconFactory.renderIcon(IconID.GOOGLE)}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{
              backgroundColor: "#ffffff",
              borderColor: "#dadce0",
              color: "#3c4043",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              padding: "8px 16px",
              height: "40px",
              "&:hover": {
                backgroundColor: "#f8f9fa",
                borderColor: "#dadce0",
                boxShadow:
                  "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
              },
            }}
          >
            Continue with Google
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Typography variant="body2">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <Button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};
