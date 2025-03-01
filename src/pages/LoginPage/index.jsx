import React from "react";
import { Button, Form, Input, Row, Col, Divider, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss"; // 引入自定义样式
import { $request } from "../../tools";
import VerifyBtn from "../../components/VerifyBtn";
import videoFilePath from "../../static/bgcVideo.mp4";
import iconImg from "../../static/hycxIcon.png";
import { useDispatch } from "react-redux";
import { setType, setEmail } from "../../store/userStore";
import { setToken } from "../../store/tokenStore";

// 登录页面
const LoginPage = () => {
  const [form] = Form.useForm(); // form实例
  const navigate = useNavigate(); // 路由导航对象
  const dispatch = useDispatch(); // dispatch函数
  // 登录请求处理函数
  const handleLogin = async () => {
    try {
      // 校验表单
      await form.validateFields();
    } catch (error) {
      return;
    }
    // 检查 sessionStorage 中是否存在 token，如果存在则清除
    if (sessionStorage.getItem("token")) {
      sessionStorage.clear();
    }
    // 登录请求
    try {
      const res = await $request.post("/login", {
        email: form.getFieldValue("email"),
        code: form.getFieldValue("authCode")
      });
      notification.success({
        message: "登录成功",
        description: "欢迎使用慧引出行!"
      });
      dispatch(setType(res?._type));
      dispatch(setEmail(form.getFieldValue("email")));
      dispatch(setToken(res?.token));
      navigate("/home");
    } catch (error) {
      notification.error({
        message: "登录失败",
        description: "请检查邮箱和验证码是否正确!"
      });
    }
  };

  // 获取邮箱值
  const getEmail = async () => {
    try {
      await form.validateFields(["email"]);
      const email = form.getFieldValue("email");
      return email;
    } catch (error) {
      notification.error({
        message: "邮箱验证失败",
        description: "请输入有效的邮箱地址或联系管理员!"
      });
      return null;
    }
  };

  return (
    <>
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
              // TODO: 验证码暴露在了前端网络请求中
            >
              <Row gutter={8}>
                <Col span={16}>
                  <Input placeholder="请输入邮箱内的验证码" />
                </Col>
                <Col span={8}>
                  <VerifyBtn getEmail={getEmail} />
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
      <div>
        <p className="copyright">
          Copyright &copy; 2025 Louis. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
