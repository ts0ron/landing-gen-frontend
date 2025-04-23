import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingGenerator from "./pages/LandingGenerator";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/main/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/gen"
        element={
          <MainLayout>
            <LandingGenerator />
          </MainLayout>
        }
      />
      <Route
        path="/land"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
