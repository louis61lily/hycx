import { Button, Modal, notification, List, Row, Tooltip } from "antd";
import React, { useState, useRef, useEffect } from "react";
import PublishForm from "../OperateForm/PublishForm";
import DeleteForm from "../OperateForm/DeleteForm";
import { $request, formatTimestamp } from "../../tools/index";
import "./index.scss";

// 发布攻略
const ExperiencePublish = () => {
  const [publishModalShow, setPublishModalShow] = useState(false); // 发布攻略模态框是否显示
  const [deleteModalShow, setDeleteModalShow] = useState(false); // 删除攻略模态框是否显示
  const [updateModalShow, setUpdateModalShow] = useState(false); // 更新攻略模态框是否显示
  const publishFormRef = useRef(null); // 发布攻略表单ref
  const deleteFormRef = useRef(null); // 删除攻略表单ref
  const updateFormRef = useRef(null); // 更新攻略表单ref

  const [experienceList, setExperienceData] = useState([]); // 攻略列表
  const experienceItemRef = useRef({}); // 暂存单个攻略详情

  // 获取所有攻略
  const getExperience = async () => {
    const res = await $request.get("/experience");
    console.log(res);
    setExperienceData(res);
  };

  useEffect(() => {
    getExperience();
  }, []);

  // 发布攻略
  const handlePublish = async (type) => {
    if (type === "publish") {
      try {
        const values = await publishFormRef.current?.getFormData();
        const res = await $request.post("/experience", values);
        notification.success({
          message: res.message
        });
        setPublishModalShow(false);
        getExperience();
      } catch (error) {
        console.error("发布攻略时出现错误:", error);
      }
    } else if (type === "update") {
      try {
        const values = await updateFormRef.current?.getFormData();
        const res = await $request.put(
          `/experience/${experienceItemRef?.current?.id}`,
          values
        );
        notification.success({
          message: res.message
        });
        setUpdateModalShow(false);
        getExperience();
      } catch (error) {
        console.error("发布攻略时出现错误:", error);
      }
    }
  };

  // 删除攻略
  const handleDelete = async () => {
    try {
      const values = await deleteFormRef.current?.getFormData();

      const res = await $request.post(`/experience/${values?.id}`);
      notification.success({
        message: res.message,
        description: "攻略删除成功！"
      });
      setDeleteModalShow(false);
      getExperience();
    } catch (error) {
      notification.error({
        message: "操作失败",
        description: error.message || "未知错误"
      });
    }

    console.log("删除攻略");
  };

  return (
    <div className="experience-operate">
      <div className="sider">
        <Button
          onClick={() => {
            setPublishModalShow(true);
          }}
          type="primary"
          style={{ marginBottom: "10px" }}
        >
          发布攻略
        </Button>
        <Button
          onClick={() => {
            setDeleteModalShow(true);
          }}
          type="primary"
          style={{ marginBottom: "10px" }}
        >
          删除攻略
        </Button>
        <Tooltip title="更新操作请直接点击攻略详情！">
          <Button>更新攻略</Button>
        </Tooltip>
      </div>
      <div className="content">
        <h1 style={{ marginBottom: "10px", color: "#2fb4ff" }}>攻略列表</h1>
        <List
          itemLayout="horizontal"
          bordered
          dataSource={experienceList}
          renderItem={(item, index) => {
            return (
              <List.Item
                key={index}
                className="list-item"
                onClick={(e) => {
                  experienceItemRef.current = item;
                  setUpdateModalShow(true);
                }}
              >
                {item?.id} - {item?.departure} - {item.destination}
                <List.Item.Meta description={item?.summary} />
                <Row>
                  <div className="publish-info">
                    <div className="publisher">发布人：{item?.publisher}</div>
                    <div className="publish-time">
                      发布时间：{formatTimestamp(Number(item.publish_time))}
                    </div>
                  </div>
                </Row>
              </List.Item>
            );
          }}
        ></List>
      </div>
      <Modal
        centered
        title="删除攻略"
        open={deleteModalShow}
        okText="删除"
        cancelText="取消"
        onCancel={() => {
          setDeleteModalShow(false);
        }}
        onOk={handleDelete}
      >
        <DeleteForm ref={deleteFormRef} />
      </Modal>
      <Modal
        centered
        title="发布攻略"
        open={publishModalShow}
        okText="发布"
        cancelText="取消"
        onCancel={() => {
          setPublishModalShow(false);
        }}
        onOk={() => handlePublish("publish")}
      >
        <PublishForm ref={publishFormRef} />
      </Modal>
      <Modal
        centered
        title="更新攻略"
        okText="发布"
        cancelText="取消"
        open={updateModalShow}
        onCancel={() => {
          setUpdateModalShow(false);
        }}
        onOk={() => handlePublish("update")}
      >
        <PublishForm ref={updateFormRef} data={experienceItemRef.current} />
      </Modal>
    </div>
  );
};
export default ExperiencePublish;
