// import { Button } from "antd";
// import React from "react";
// import { $request } from "../../tools";
// import axios from "axios";
// import MapContent from "../../components/MapContent";
// import { useSelector } from "react-redux";

// const HomePage = () => {
//   const type = useSelector((state) => state.type.type);
//   return (
//     <>
//       <h2>home - useType is {type}</h2>
//       <Button
//         onClick={() => {
//           axios.get("http://jsonplaceholder.typicode.com/posts").then((res) => {
//             console.log("axios 请求成功", res.data);
//           });

//           $request
//             .get("http://jsonplaceholder.typicode.com/posts")
//             .then((res) => {
//               console.log("$request 请求成功", res);
//             });
//         }}
//       >
//         发送请求
//       </Button>
//       <MapContent></MapContent>
//     </>
//   );
// };

import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import MapContent from "../../components/MapContent";
const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`
}));
const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px"
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0"
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
    </>
  );
};
export default HomePage;
