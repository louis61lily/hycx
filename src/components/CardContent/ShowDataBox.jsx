import { Statistic, Col, Row } from "antd";
import "./ShowDataBox.scss";
const ShowDataBox = () => {
  return (
    <div className="show-data-box">
      <Row>
        <Col span={12}>
          <Statistic title="预估耗时" value={100} />
        </Col>
        <Col span={12}>
          <Statistic title="预估费用" />
        </Col>
        <Col span={12}>
          <Statistic title="路线距离" />
        </Col>
        <Col span={12}>
          <Statistic title="预估耗时" />
        </Col>
        <Col span={12}>
          <Statistic title="预估费用" />
        </Col>
        <Col span={12}>
          <Statistic title="路线距离" />
        </Col>
      </Row>
    </div>
  );
};

export default ShowDataBox;
