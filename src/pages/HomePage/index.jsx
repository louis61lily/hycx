import React from "react";
import { Layout, Menu, theme } from "antd";
// import MapContent from "../../components/MapContent";
import hycxLogo from "../../static/hycxLogo.png";
import "./index.scss";
import useIsMobileDevice from "../../myHook/useIsMobileDevice";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Content, Footer } = Layout;

const footerText =
  "Copyright © 2025 Louis. All rights reserved. 使用过程中如有任何问题, 请邮箱至2809873625@qq.com.";

// 主页
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, headerBg }
  } = theme.useToken();
  const email = useSelector((state) => state.user.email) || "";
  const isMobileDevice = useIsMobileDevice();

  const items = [
    {
      label: <Link to="">线路查询</Link>,
      key: "home1"
    },
    {
      label: <Link to="squery">攻略查询</Link>,
      key: "home2"
    },
    {
      label: "个人中心",
      key: "home3",
      children: [
        {
          label: "退出登录",
          key: "home31"
        },
        {
          label: email,
          key: "home32",
          disabled: "true"
        }
      ]
    }
  ];
  return isMobileDevice ? (
    <>
      <p>这是移动设备</p>
    </>
  ) : (
    <div className="home-page">
      <Layout className="layout">
        <Header
          className="header"
          style={{
            backgroundColor: headerBg
          }}
        >
          <div className="logo">
            <img className="logo-img" src={hycxLogo} alt="logo" />
          </div>
          <div className="menuBox">
            <Menu
              className="menu"
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["home1"]}
              items={items}
              style={{
                justifyContent: "space-between"
              }}
            />
          </div>
        </Header>
        <Layout
          style={{
            padding: "0px 24px"
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <div className="content">
              <Outlet></Outlet>
            </div>
          </Content>
          <Footer className="footer">
            <p className="text">{footerText}</p>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default HomePage;
