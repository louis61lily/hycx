import React from "react";
import { Button, Form, Input, Row, Col, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setToken, removeToken } from "../../store/tokenStore";
import "./index.scss"; // 引入自定义样式
import { $request } from "../../tools";

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(setToken("token_test"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async () => {
    const res = await $request.post("http://localhost:3001/login", {
      username: "admin",
      password: "password"
    });
    console.log(res);
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={24} sm={16} md={12} lg={8}>
        <div className="login-box">
          <Title level={2}>登录</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入邮箱!" }]}
            >
              <Input placeholder="邮箱" />
            </Form.Item>

            <Form.Item
              name="authCode"
              rules={[{ required: true, message: "请输入验证码!" }]}
            >
              <Input.Password placeholder="验证码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleLogin} block>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className="token-info">
            <p>当前 token: {token}</p>
            <Button
              onClick={() => {
                dispatch(removeToken());
              }}
            >
              移除 token
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
