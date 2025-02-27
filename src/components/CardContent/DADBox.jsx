import React, { useState } from "react";
import { Form, Input, Button, Radio, Select, notification } from "antd";
// eslint-disable-next-line no-unused-vars
import { CarOutlined, UserOutlined, TruckOutlined } from "@ant-design/icons";
import { $request } from "../../tools";

import "./DADStyle.scss";

const strategyOptions = {
  driving: [
    {
      label: "速度优先",
      value: "0"
    },
    {
      label: "费用优先",
      value: "1"
    },
    {
      label: "综合考虑",
      value: "2"
    }
  ],
  transit: [
    {
      label: "最快捷",
      value: "0"
    },
    {
      label: "最经济",
      value: "1"
    },
    {
      label: "最少步行",
      value: "3"
    }
  ]
};

const DepartureAndDestinationBox = ({ setPolyline, setRouteData }) => {
  const [form] = Form.useForm();
  const [strategy, setStrategy] = useState("driving");

  const handleSearch = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res = await $request.post("/getRoute", values);
        if (res.status !== "0") {
          const polyline = res.route?.paths[0]?.steps.flatMap((item) => {
            return item?.polyline ? item.polyline.split(";") : [];
          });
          setPolyline(polyline);
          setRouteData(res?.route);
          return;
        } else {
          notification.error({
            message: "查询失败",
            description: "路径不存在或请联系管理员！"
          });
        }
      })
      .catch((errorInfo) => {
        console.log("表单验证失败:", errorInfo);
        // 这里可以添加更多的错误处理逻辑，比如显示错误提示信息
      });
  };

  const handleFormValueChange = (changedValue, allValue) => {
    if (changedValue?.wayCode) {
      form.setFieldsValue({
        ...allValue,
        strategy: "0"
      });
    }
    if (changedValue?.wayCode === 0) {
      setStrategy("driving");
    } else if (changedValue?.wayCode === 2) {
      setStrategy("transit");
    } else if (changedValue?.wayCode === 1) {
      setStrategy("walking");
    }
  };

  return (
    <div className="departure-and-destination-box">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          wayCode: 0,
          strategy: "0"
        }}
        onValuesChange={handleFormValueChange}
      >
        <Form.Item
          label="出发地"
          name="origin"
          rules={[
            {
              required: true,
              message: "出发地不能为空！"
            }
          ]}
        >
          <Input placeholder="请输入出发地" />
        </Form.Item>
        <Form.Item
          label="目的地"
          name="destination"
          rules={[
            {
              required: true,
              message: "目的地不能为空！"
            }
          ]}
        >
          <Input placeholder="请输入目的地" />
        </Form.Item>
        <Form.Item
          label="出行方式"
          name="wayCode"
          rules={[
            {
              required: true,
              message: " "
            }
          ]}
        >
          <Radio.Group
            options={[
              {
                value: 0,
                label: (
                  <>
                    <CarOutlined /> 驾车
                  </>
                )
              },
              // {
              //   value: 2,
              //   label: (
              //     <>
              //       <TruckOutlined /> 公共交通
              //     </>
              //   )
              // },
              {
                value: 1,
                label: (
                  <>
                    <UserOutlined /> 步行
                  </>
                )
              }
            ]}
          />
        </Form.Item>
        {strategy !== "walking" && (
          <Form.Item
            label="出行策略"
            name="strategy"
            rules={[
              {
                required: true,
                message: " "
              }
            ]}
          >
            <Select
              placeholder="请选择出行策略"
              options={strategyOptions[strategy]}
            />
          </Form.Item>
        )}
      </Form>
      <div className="operator">
        <div className="clear">
          <Button
            onClick={() => {
              form.setFieldsValue({
                wayCode: 0,
                strategy: "0"
              });
              setStrategy("driving");
            }}
          >
            清空 / 重置
          </Button>
        </div>
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </div>
    </div>
  );
};

export default DepartureAndDestinationBox;
