import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import RouteGuard from "./guard";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const token = useSelector((state) => state.token.token);
  return (
    <Router>
      <RouteGuard>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route._name}
                path={route.path}
                // 需要token并且有token那么渲染element，否则渲染noTokenElement
                element={
                  route?.needToken && token
                    ? route.element
                    : route.noTokenElement
                }
              />
            );
          })}
        </Routes>
      </RouteGuard>
    </Router>
  );
};

export default AppRoutes;
