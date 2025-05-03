import { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

interface MapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const MapsContext = createContext<MapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

// Define libraries as a constant outside the component
const GOOGLE_MAPS_LIBRARIES = ["places"] as "places"[];

export const MapsProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  return (
    <MapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapsContext.Provider>
  );
};

export const useMapsContext = () => {
  const context = useContext(MapsContext);
  if (context === undefined) {
    throw new Error("useMapsContext must be used within a MapsProvider");
  }
  return context;
};
