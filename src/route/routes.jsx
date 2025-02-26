import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MapContainer from "../components/MapContent";

const routes = [
  {
    _name: "root",
    path: "/",
    needToken: false,
    noTokenElement: <Navigate to="/login" /> // 登录页面
  },
  {
    _name: "login",
    path: "/login",
    needToken: false,
    noTokenElement: <LoginPage></LoginPage> // 登录页面
  },
  {
    _name: "home",
    path: "/home",
    element: <HomePage></HomePage>,
    noTokenElement: <Navigate to={"/login"}></Navigate>,
    needToken: true,
    meta: { requiresAuth: true },
    children: [
      {
        _name: "child1",
        path: "",
        needToken: true,
        element: <MapContainer />
      },
      {
        _name: "child2",
        path: "squery",
        needToken: true,
        element: <p>线路查询</p>
      }
    ]
  },
  {
    _name: "404",
    path: "*",
    noTokenElement: <NotFoundPage></NotFoundPage> // 404页面
  }
];

export default routes;
