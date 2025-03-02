import { Drawer } from "antd";
import "./index.scss";

// 路线详细数据的展示抽屉
const ContentDrawer = ({ open, data, onClose }) => {
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        title={data?.departure + " - " + data?.destination}
        // placement="bottom"
      >
        {data.content}
      </Drawer>
    </>
  );
};

export default ContentDrawer;
