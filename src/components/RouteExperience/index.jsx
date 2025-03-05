import { List, Row, Input, Pagination } from "antd";
import { $request } from "../../tools";
import { useEffect, useState, useRef } from "react";
import ContentDrawer from "../ContentDrawer";
import AIBox from "../AIBox";
import "./index.scss";
const { Search } = Input;

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

// 攻略部分
const RouteExperience = () => {
  const [experienceList, setExperienceData] = useState([]);
  const [experienceDrawerShow, setExperienceDrawerShow] = useState(false);
  const experienceItemRef = useRef({});

  // 分页处理
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // 分页查询接口
  const getExperienceByPage = async (page, pageSize) => {
    const res = await $request.post("/experience/page", {
      page: page,
      pageSize: pageSize
    });

    setExperienceData(res?.data);
    // 更新总页数
    setPage((pre) => {
      return {
        ...pre,
        total: res?.total
      };
    });
    console.log(res);
  };

  //  页码变化时的回调
  const onChange = (cur, pageSize) => {
    setPage((pre) => {
      return {
        ...pre,
        current: cur
      };
    });
    getExperienceByPage(cur, pageSize);
  };

  // 查询接口
  const onSearch = async (value, _e, info) => {
    const res = await $request.post("/experience/search", {
      keyword: value
    });
    setExperienceData(res);
  };

  //  初始化调用
  useEffect(() => {
    getExperienceByPage(page.current, page.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="route-experience-box">
      <div className="sider">
        <AIBox></AIBox>
      </div>
      <div className="content">
        <div className="toolbar">
          <span
            style={{
              marginBottom: "10px",
              color: "#2fb4ff",
              fontSize: "28px",
              fontWeight: 800
            }}
          >
            热门攻略大推荐
          </span>
          <div className="tool-zone">
            <Search
              placeholder="输入关键字搜索相关攻略"
              onSearch={onSearch}
              style={{
                width: 250
              }}
            />
            <Pagination
              onChange={onChange}
              current={page.current}
              pageSize={page.pageSize}
              total={page.total}
              responsive={true}
            />
          </div>
        </div>
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
