import React, { useState } from "react";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Card, Popover } from "antd";
import $request from "../../tools/request";
import "./index.scss";

const AIBox = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 添加 loading 状态

  const handleSearch = () => {
    setLoading(true); // 开始请求时设置 loading 为 true
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        try {
          const res = await $request.post("/ai", values);
          console.log(res);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // 请求结束后设置 loading 为 false
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // 验证失败时设置 loading 为 false
      });
  };
  return (
    <>
      <div className="ai-box">
        <Card
          title={
            <>
              AI攻略查询{" "}
              <Popover content={"内容由AI生成，结果仅供参考"}>
                <QuestionCircleTwoTone />
              </Popover>
            </>
          }
        >
          <Form form={form} layout="vertical">
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
          </Form>
          <div className="operator">
            <div className="clear">
              <Button
                onClick={() => {
                  form.setFieldsValue({
                    origin: "",
                    destination: ""
                  });
                }}
              >
                清空 / 重置
              </Button>
            </div>
            <Button type="primary" onClick={handleSearch} loading={loading}>
              查询
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AIBox;
