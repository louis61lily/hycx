import React from "react";
import { Layout, Menu, theme, Collapse } from "antd";
import MapContent from "../../components/MapContent";
import hycxLogo from "../../static/hycxLogo.png";
import "./index.scss";
import useIsMobileDevice from "../../myHook/useIsMobileDevice";
const { Header, Content, Footer, Sider } = Layout;

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
  const isMobileDevice = useIsMobileDevice();
  return isMobileDevice ? (
    <>
      <p>这是移动设备</p>
    </>
  ) : (
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
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            style={{
              background: colorBgContainer
            }}
          ></Sider>
          <Layout
            style={{
              padding: "0 24px 24px"
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
              <div className="map-content">
                <MapContent></MapContent>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            >
              Copyright &copy; 2025 Louis. All rights reserved.
              使用过程中如有任何问题, 请邮箱至2809873625@qq.com.
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default HomePage;
