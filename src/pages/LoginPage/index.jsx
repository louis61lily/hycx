import React from "react";
import { Button, Form, Input, Row, Col, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss"; // 引入自定义样式
import { $request } from "../../tools";
import VerifyBtn from "../../components/VerifyBtn";
import videoFilePath from "../../static/bgcVideo.mp4";
import iconImg from "../../static/hycxIcon.png";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // 表单验证成功的回调函数
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  // 表单验证失败的回调函数
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 获取验证码成功的回调函数
  const handleGetCodeSuccess = (data) => {
    console.log("获取验证码成功:", data);
  };

  // 获取验证码失败的回调函数
  const handleGetCodeError = (error) => {
    console.error("获取验证码失败:", error);
  };

  // 登录请求
  const handleLogin = async () => {
    try {
      await $request.post("/login", {
        email: form.getFieldValue("email"),
        code: form.getFieldValue("authCode")
      });
      alert("登录成功!");
      navigate("/home");
    } catch (error) {
      alert("登录失败!");
      console.error("登录请求失败:", error);
    }
  };

  // 获取邮箱值
  const getEmail = async () => {
    try {
      await form.validateFields(["email"]);
      const email = form.getFieldValue("email");
      return email;
    } catch (error) {
      console.error("邮箱验证失败:", error);
      return null;
    }
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
          form={form}
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="邮箱"
            name="email"
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
                  getEmail={getEmail}
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
