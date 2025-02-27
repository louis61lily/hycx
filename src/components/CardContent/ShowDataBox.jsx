import { Statistic, Col, Row } from "antd";
import "./ShowDataBox.scss";
const ShowDataBox = ({ routeData }) => {
  console.log(routeData, "routeData");
  const { duration = " ", distance = " ", tolls = " " } = routeData?.paths[0];

  const formatDuration = (seconds) => {
    const totalMinutes = Math.ceil(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours} 时 ${minutes} 分`;
    }
    return `${minutes} 分钟`;
  };

  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${meters} 米`;
    }
    return `${(meters / 1000).toFixed(2)} 千米`;
  };

  return (
    <div className="show-data-box">
      <Row>
        <Col span={8}>
          <Statistic
            title="预估耗时"
            value={duration ? formatDuration(Number(duration)) : "-"}
          />
        </Col>
        <Col span={8}>
          <Statistic title="预估费用" value={tolls + "元" || "-"} />
        </Col>
        <Col span={8}>
          <Statistic
            title="路线距离"
            value={distance ? formatDistance(Number(distance)) : "-"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ShowDataBox;
