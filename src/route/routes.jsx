import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import { isAccessible } from "../tools";

const routes = [
  {
    _name: "root",
    path: "/",
    element: <Navigate to="/login" /> // 登录页面
  },
  {
    _name: "login",
    path: "/login",
    element: <LoginPage></LoginPage> // 登录页面
  },
  {
    _name: "home",
    path: "/home",
    element: isAccessible() ? (
      <HomePage></HomePage>
    ) : (
      <Navigate to={"/login"}></Navigate>
    ), // 前往首页 或 返回登录页
    meta: { requiresAuth: true }
  },
  {
    _name: "404",
    path: "*",
    element: <NotFoundPage></NotFoundPage> // 404页面
  }
];

export default routes;
