import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MapContainer from "../components/MapContent";
import RouteExperience from "../components/RouteExperience";
import ExperiencePublish from "../components/ExperiencePublish";

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
    element: <HomePage></HomePage>, // 首页
    noTokenElement: <Navigate to={"/login"}></Navigate>,
    needToken: true,
    meta: { requiresAuth: true },
    children: [
      {
        _name: "child1",
        path: "",
        needToken: true,
        element: <MapContainer /> // 地图容器
      },
      {
        _name: "child2",
        path: "squery",
        needToken: true,
        element: <RouteExperience></RouteExperience> // 路线查询
      },
      {
        _name: "child3",
        path: "publish",
        needToken: true,
        element: <ExperiencePublish></ExperiencePublish> // 路线发布
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
