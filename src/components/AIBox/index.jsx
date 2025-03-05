import React, { useState } from "react";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { Button, Form, Modal, Input, Card, Popover, Radio } from "antd";
import $request from "../../tools/request";
import "./index.scss";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm"; // 支持 GitHub Flavored Markdown
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// AI攻略部分
const AIBox = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 添加 loading 状态
  const [modalVisible, setModalVisible] = useState(false); // 添加 modal 状态
  const [result, setResult] = useState(""); // 添加 result 状态

  // 查询攻略
  const handleSearch = () => {
    setLoading(true); // 开始请求时设置 loading 为 true
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        try {
          const res = await $request.post("/ai", values);
          console.log(res);
          if (res.length > 0) {
            setModalVisible(true);
            setResult(res[0].message?.content);
          }
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

  // 导出为 PDF
  const exportToPDF = async () => {
    const modalContent = document.querySelector(".result");
    if (modalContent) {
      const canvas = await html2canvas(modalContent);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("AI攻略查询结果.pdf");
    }
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
            <Form.Item
              label="攻略类别"
              name="type"
              rules={[
                {
                  required: true,
                  message: "类别不能为空！"
                }
              ]}
            >
              <Radio.Group
                options={[
                  {
                    value: "交通",
                    label: <>交通攻略</>
                  },
                  {
                    value: "旅游",
                    label: <>旅游攻略</>
                  }
                ]}
              />
            </Form.Item>
          </Form>
          <div className="operator">
            <div className="clear">
              <Button
                onClick={() => {
                  form.setFieldsValue({
                    departure: "",
                    destination: "",
                    type: ""
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
        <Modal
          open={modalVisible}
          title="AI攻略查询结果"
          okText="导出"
          cancelText="关闭"
          onCancel={() => setModalVisible(false)}
          onOk={exportToPDF}
        >
          <div className="result">
            <ReactMarkdown
              remarkPlugins={[gfm]}
              components={{
                h1: ({ children }) => (
                  <h1
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "10px"
                    }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "8px"
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "6px"
                    }}
                  >
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul
                    style={{
                      listStyleType: "disc",
                      marginLeft: "20px",
                      marginBottom: "10px"
                    }}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol
                    style={{
                      listStyleType: "decimal",
                      marginLeft: "20px",
                      marginBottom: "10px"
                    }}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li style={{ marginBottom: "5px" }}>{children}</li>
                )
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AIBox;
