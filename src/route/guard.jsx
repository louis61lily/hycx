import { useLocation, Navigate } from "react-router-dom";
import routes from "./routes";
import { isAuthenticated } from "../tools";

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);
  if (currentRoute?.meta?.requiresAuth && !isAuthenticated("admin")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RouteGuard;
