import { List } from "antd";
import { $request } from "../../tools";
import { useEffect, useState } from "react";

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

  const getExperience = async () => {
    const res = await $request.get("/experience");
    setExperienceData(res);
  };
  useEffect(() => {
    getExperience();
  }, []);
  return (
    <div>
      <h1
        onClick={async () => {
          const res = await $request.get("/experience");
          console.log(res);
        }}
      >
        RouteExperience
      </h1>
      <List
        itemLayout="horizontal"
        bordered
        dataSource={experienceList}
        renderItem={(item, index) => {
          return (
            <List.Item key={index}>
              {item?.departure} - {item.destination}
              <List.Item.Meta description={item?.content} />
              {item?.publisher} - {formatTimestamp(Number(item.publish_time))}
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};

export default RouteExperience;
