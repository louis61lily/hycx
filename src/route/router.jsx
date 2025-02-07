import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import RouteGuard from "./guard";

const AppRoutes = () => {
  return (
    <Router>
      <RouteGuard>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route._name}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </RouteGuard>
    </Router>
  );
};

export default AppRoutes;
