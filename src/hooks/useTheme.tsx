import { useContext } from "react";
import {
  ThemeContext,
  ThemeContextType,
} from "../providers/CustomThemeProvider";

const useCustomTheme = (): Omit<ThemeContextType, "theme"> => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider");
  }
  return { setTheme: context.setTheme };
};

export default useCustomTheme;
