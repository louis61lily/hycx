import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import routes from "./routes";

const AppRoutes = () => {
  return (
    <Router>
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
