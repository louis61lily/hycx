import { Form, Input } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";

// 删除操作的表单
const DeleteForm = forwardRef((_, ref) => {
  const [form] = Form.useForm(); // 获取表单实例

  // 获取表单数据(id)
  const getFormData = () => {
    return form
      .validateFields()
      .then((values) => {
        return values;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => {
    return {
      getFormData
    };
  });
  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          label="攻略id"
          name="id"
          rules={[
            {
              required: true,
              message: "攻略id不能为空！"
            }
          ]}
        >
          <Input placeholder="请输入攻略id" />
        </Form.Item>
      </Form>
    </>
  );
});

export default DeleteForm;
