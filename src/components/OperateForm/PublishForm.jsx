import { Form, Input } from "antd";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";

// 发布操作的表单
const PublishForm = forwardRef((props, ref) => {
  const [form] = Form.useForm(); // 获取表单实例
  const { data = {} } = props;

  // 获取表单数据
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          label="攻略出发地"
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
          label="攻略目的地"
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
          label="发布人"
          name="publisher"
          rules={[
            {
              required: true,
              message: "发布人不能为空！"
            }
          ]}
        >
          <Input placeholder="请输入发布人" />
        </Form.Item>
        <Form.Item
          label="摘要"
          name="summary"
          rules={[
            {
              required: true,
              message: "摘要不能为空！"
            }
          ]}
        >
          <Input placeholder="请输入摘要" />
        </Form.Item>
        <Form.Item
          label="攻略内容"
          name="content"
          rules={[
            {
              required: true,
              message: "攻略内容不能为空！"
            }
          ]}
        >
          <Input.TextArea
            showCount
            autoSize={{
              minRows: 3,
              maxRows: 5
            }}
            placeholder="请输入攻略内容"
          />
        </Form.Item>
      </Form>
    </>
  );
});

export default PublishForm;
