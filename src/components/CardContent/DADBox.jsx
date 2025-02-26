import React from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { CarOutlined, UserOutlined, TruckOutlined } from "@ant-design/icons";

import "./DADStyle.scss";

const DepartureAndDestinationBox = () => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("搜索条件：", values);
      })
      .catch((errorInfo) => {
        console.log("表单验证失败:", errorInfo);
        // 这里可以添加更多的错误处理逻辑，比如显示错误提示信息
      });
  };

  return (
    <div className="departure-and-destination-box">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          strategy: "1",
          way: "1"
        }}
      >
        <Form.Item
          label="出发地"
          name="departure"
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
          name="way"
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
                value: "1",
                label: (
                  <>
                    <CarOutlined /> 驾车
                  </>
                )
              },
              {
                value: "2",
                label: (
                  <>
                    <UserOutlined /> 步行
                  </>
                )
              },
              {
                value: "3",
                label: (
                  <>
                    <TruckOutlined /> 公共交通
                  </>
                )
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          label="策略"
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
            options={[
              {
                value: "1",
                label: "速度优先"
              },
              {
                value: "2",
                label: "费用最低"
              },
              {
                value: "3",
                label: "综合考虑"
              }
            ]}
          />
        </Form.Item>
      </Form>
      <div className="operator">
        <div className="clear">
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            清空
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
