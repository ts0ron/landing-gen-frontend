import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
