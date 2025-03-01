import { Drawer } from "antd";
import "./index.scss";
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
