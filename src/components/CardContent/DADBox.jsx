import { Form, Input } from "antd";

const DepartureAndDestinationBox = () => {
  const [form] = Form.useForm();
  return (
    <div className="departure-and-destination-box">
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
    </div>
  );
};

export default DepartureAndDestinationBox;
