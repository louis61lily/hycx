import React from "react";
import { Layout, Menu, theme } from "antd";
import MapContent from "../../components/MapContent";
import hycxLogo from "../../static/hycxLogo.png";
import "./index.scss";
const { Header, Content, Footer } = Layout;

const items = [
  { key: 999, label: "线路查询" },
  { key: 998, label: "攻略查询" },
  { key: 997, label: "个人中心" }
];

// 主页
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, headerBg }
  } = theme.useToken();
  return (
    <div className="home-page">
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: headerBg,
            borderBottom: "1px solid #f3f3f3" // TODO：需要做设备兼容性处理
          }}
        >
          <div className="logo">
            <img className="logo-img" src={hycxLogo} alt="logo" />
          </div>
          <div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["999"]}
              items={items}
              style={{
                flex: 1,
                minWidth: 0
              }}
            />
          </div>
        </Header>
        <Content
          style={{
            padding: "0 48px"
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG
            }}
          >
            <MapContent></MapContent>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};
export default HomePage;
