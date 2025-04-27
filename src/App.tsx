import { BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapsProvider } from "./providers/MapsProvider";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

const globalStyles = {
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  html: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    height: "100%",
    width: "100%",
  },
  body: {
    height: "100%",
    width: "100%",
  },
  "#root": {
    height: "100%",
    width: "100%",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <AuthProvider>
        <MapsProvider>
          <BrowserRouter basename="/pagenerate">
            <AppRoutes />
          </BrowserRouter>
        </MapsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
