import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingGenerator from "./pages/LandingGenerator";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/main/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ApiDocs from "./pages/ApiDocs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/gen"
        element={
          <MainLayout>
            <ProtectedRoute>
              <LandingGenerator />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/land/:assetId"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
      <Route
        path="/docs"
        element={
          <MainLayout>
            <ApiDocs />
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
