import React from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setToken, removeToken } from "../../store/tokenStore";

const LoginPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <h2>login - token is {token}</h2>
      <Button
        onClick={() => {
          console.log(111);
          dispatch(setToken("token_test"));
        }}
      >
        设置token
      </Button>
      <Button
        onClick={() => {
          dispatch(removeToken());
        }}
      >
        移除token
      </Button>
    </>
  );
};

export default LoginPage;
