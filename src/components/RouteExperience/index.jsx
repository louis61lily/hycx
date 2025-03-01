import { List, Row } from "antd";
import { $request } from "../../tools";
import { useEffect, useState, useRef } from "react";
import ContentDrawer from "../ContentDrawer";
import AIBox from "../AIBox";
import "./index.scss";

// 辅助函数：将13位时间戳转换为YYYY-MM-dd hh:mm格式
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const RouteExperience = () => {
  const [experienceList, setExperienceData] = useState([]);
  const [experienceDrawerShow, setExperienceDrawerShow] = useState(false);
  const experienceItemRef = useRef({});

  const getExperience = async () => {
    const res = await $request.get("/experience");
    console.log(res);

    setExperienceData(res);
  };
  useEffect(() => {
    getExperience();
  }, []);

  return (
    <div className="route-experience-box">
      <div className="sider">
        <AIBox></AIBox>
      </div>
      <div className="content">
        <h1 style={{ marginBottom: "10px", color: "#2fb4ff" }}>
          热门出行攻略大推荐
        </h1>
        <List
          itemLayout="horizontal"
          bordered
          dataSource={experienceList}
          renderItem={(item, index) => {
            return (
              <List.Item
                key={index}
                className="list-item"
                onClick={(e) => {
                  experienceItemRef.current = item;
                  setExperienceDrawerShow(true);
                }}
              >
                {item?.departure} - {item.destination}
                <List.Item.Meta description={item?.summary} />
                <Row>
                  <div className="publish-info">
                    <div className="publisher">发布人：{item?.publisher}</div>
                    <div className="publish-time">
                      发布时间：{formatTimestamp(Number(item.publish_time))}
                    </div>
                  </div>
                </Row>
              </List.Item>
            );
          }}
        ></List>
      </div>
      <ContentDrawer
        open={experienceDrawerShow}
        data={experienceItemRef.current}
        onClose={() => {
          setExperienceDrawerShow(false);
        }}
      ></ContentDrawer>
    </div>
  );
};

export default RouteExperience;
