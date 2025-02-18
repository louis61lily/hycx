import React from "react";
import { Button, Form, Input, Row, Col, Divider } from "antd";
import "./index.scss"; // 引入自定义样式
import { $request } from "../../tools";
import VerifyBtn from "../../components/VerifyBtn";
import videoFilePath from "../../static/bgcVideo.mp4";
import iconImg from "../../static/hycxIcon.png";

const LoginPage = () => {
  // 表单验证成功的回调函数
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // 表单验证失败的回调函数
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 登录请求
  const handleLogin = async () => {
    const res = await $request.post("/login", {
      username: "admin",
      password: "password"
    });
    console.log(res);
  };

  // 获取验证码成功的回调函数
  const handleGetCodeSuccess = (data) => {
    console.log("获取验证码成功:", data);
  };

  // 获取验证码失败的回调函数
  const handleGetCodeError = (error) => {
    console.error("获取验证码失败:", error);
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="background-video">
        <source src={videoFilePath} />
      </video>
      <div className="login-box">
        <div className="hycx-icon">
          <img src={iconImg} alt="" />
        </div>
        <Divider
          style={{
            borderColor: "rgba(45, 43, 43, 0.3)"
          }}
        >
          <p className="instruction">智慧出行路径规划专家</p>
        </Divider>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="邮箱"
            name="username"
            wrapperCol={{ span: 23 }}
            rules={[
              { required: true, message: "请输入邮箱!" },
              { type: "email", message: "请输入有效的邮箱地址!" }
            ]}
          >
            <Input placeholder="请输入您的邮箱" />
          </Form.Item>
          <Form.Item
            label="验证码"
            name="authCode"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Row gutter={8}>
              <Col span={16}>
                <Input placeholder="请输入邮箱内的验证码" />
              </Col>
              <Col span={8}>
                <VerifyBtn
                  requestUrl="http://localhost:8080/verify"
                  requestData={{ mail: "1095235717@qq.com" }}
                  onSuccess={handleGetCodeSuccess}
                  onError={handleGetCodeError}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              className="login-btn"
              type="primary"
              onClick={handleLogin}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
