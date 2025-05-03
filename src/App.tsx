import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { MapsProvider } from "./providers/MapsProvider";
import { CustomThemeProviderWrapper } from "./providers/CustomThemeProvider";

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
    <CustomThemeProviderWrapper>
      <GlobalStyles styles={globalStyles} />
      <AuthProvider>
        <MapsProvider>
          <BrowserRouter basename="/pagenerate">
            <AppRoutes />
          </BrowserRouter>
        </MapsProvider>
      </AuthProvider>
    </CustomThemeProviderWrapper>
  );
}

export default App;
