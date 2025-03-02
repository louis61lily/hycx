import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import hycxLogo from "../../static/hycxLogo.png";
import "./index.scss";
import useIsMobileDevice from "../../myHook/useIsMobileDevice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../store/tokenStore";
import { removeEmail } from "../../store/userStore";
const { Header, Content, Footer } = Layout;

const footerText =
  "Copyright © 2025 Louis. All rights reserved. 使用过程中如有任何问题, 请邮箱至2809873625@qq.com.";

// 主页
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, headerBg }
  } = theme.useToken();
  const email = useSelector((state) => state.user.email) || ""; // 获取用户邮箱
  const type = useSelector((state) => state.user.type) || 0; // 获取用户类型
  const isMobileDevice = useIsMobileDevice(); // 判断是否为移动设备
  const dispatch = useDispatch(); // 获取dispatch
  const navigate = useNavigate(); // 获取navigate

  const [selectedKey, setSelectedKey] = useState(() => {
    return sessionStorage.getItem("selectedMenuKey") || "home1";
  }); // 获取选中的菜单键避免用户刷新页面menu更新

  //  菜单点击事件
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    sessionStorage.setItem("selectedMenuKey", e.key);
  };

  // 菜单项
  const items = [
    {
      label: <Link to="publish">操作攻略</Link>,
      key: "home-admin"
    },
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
          label: (
            <div
              onClick={() => {
                dispatch(removeEmail());
                dispatch(removeToken());
                window.sessionStorage.removeItem("selectedMenuKey");
                navigate("/login");
              }}
            >
              退出登录
            </div>
          ),
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
              defaultSelectedKeys={[selectedKey]}
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={type === 1 ? items : items.slice(1)}
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
