import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Theme,
  createTheme,
} from "@mui/material";
import { Category } from "../services/api/AssetService";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (category: Category) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const categoryThemes: Record<Category, Theme> = {
  Cultural: createTheme({
    palette: {
      primary: { main: "#8B4513" },
      secondary: { main: "#D2691E" },
      background: { default: "#FFF8DC", paper: "#FFFFFF" },
    },
  }),
  Entertainment: createTheme({
    palette: {
      primary: { main: "#FF1493" },
      secondary: { main: "#4B0082" },
      background: { default: "#F0F8FF", paper: "#FFFFFF" },
    },
  }),
  Commerce: createTheme({
    palette: {
      primary: { main: "#006400" },
      secondary: { main: "#FFD700" },
      background: { default: "#F5F5F5", paper: "#FFFFFF" },
    },
  }),
  Transportation: createTheme({
    palette: {
      primary: { main: "#1E90FF" },
      secondary: { main: "#FF4500" },
      background: { default: "#F0F8FF", paper: "#FFFFFF" },
    },
  }),
  PublicServices: createTheme({
    palette: {
      primary: { main: "#2F4F4F" },
      secondary: { main: "#708090" },
      background: { default: "#F5F5F5", paper: "#FFFFFF" },
    },
  }),
  Default: createTheme({
    palette: {
      primary: { main: "#1976d2" },
      secondary: { main: "#dc004e" },
      background: { default: "#f5f5f5", paper: "#ffffff" },
    },
  }),
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within a CustomThemeContextProvider"
    );
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeContextProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    categoryThemes.Default
  );

  const setTheme = useCallback((category: Category) => {
    setCurrentTheme(categoryThemes[category]);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export const CustomThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CustomThemeContextProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </CustomThemeContextProvider>
  );
};
