import { Radio } from "antd";
import { CarOutlined, UserOutlined, TruckOutlined } from "@ant-design/icons";
import "./PersonalWayBoxStyle.scss";

const PersonalWayBox = () => {
  return (
    <div className="personal-way-box">
      <div className="policy">
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "12px",
            gap: 8
          }}
          options={[
            {
              value: 1,
              label: (
                <div className="radio-item">
                  <CarOutlined /> 驾车
                </div>
              )
            },
            {
              value: 2,
              label: (
                <div className="radio-item">
                  <UserOutlined /> 步行
                </div>
              )
            },
            {
              value: 3,
              label: (
                <div className="radio-item">
                  <TruckOutlined /> 公共交通
                </div>
              )
            }
          ]}
        />
      </div>
      <div className="strategy">
        <Radio.Group
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "12px",
            gap: 8
          }}
          options={[
            {
              value: 1,
              label: "速度优先"
            },
            {
              value: 2,
              label: "费用优先"
            },
            {
              value: 3,
              label: "综合考虑"
            }
          ]}
        ></Radio.Group>
      </div>
    </div>
  );
};

export default PersonalWayBox;
