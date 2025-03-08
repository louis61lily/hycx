import { useEffect, useState } from "react";
import { Card, Col, Row, Drawer, Timeline, Space, Button } from "antd";
import { HomeTwoTone, ScheduleTwoTone } from "@ant-design/icons";
import "./index.scss";
import AMapLoader from "@amap/amap-jsapi-loader";
import DepartureAndDestinationBox from "../CardContent/DADBox";
import ShowDataBox from "../CardContent/ShowDataBox";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

window._AMapSecurityConfig = {
  securityJsCode: "a6454be0dcd13c50c2a4857ee4c5f987"
};

// 首页地图容器
const MapContainer = () => {
  const [polyline, setPolyline] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [routeData, setRouteData] = useState({
    paths: [
      {
        duration: 0,
        distance: 0,
        tolls: 0
      }
    ]
  });

  let map = null;

  useEffect(() => {
    AMapLoader.load({
      key: "816b14012e975c486ef2f87d6cab1a1d", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale"] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "2D", // 是否为3D地图模式
          zoom: 15 // 初始化地图级别
        });
        AMap.plugin("AMap.AutoComplete", function () {
          var autoDepartureOptions = {
            input: "departure_input"
          };
          new AMap.AutoComplete(autoDepartureOptions);
        });
        AMap.plugin("AMap.AutoComplete", function () {
          var autoDestinationOptions = {
            input: "destination_input"
          };
          new AMap.AutoComplete(autoDestinationOptions);
        });

        if (polyline.length > 0) {
          const path = polyline.map((item) => {
            const [lng, lat] = item.split(",");
            return new AMap.LngLat(lng, lat);
          });

          map.add(
            new AMap.Polyline({
              path: path,
              strokeColor: "blue",
              strokeOpacity: 1,
              strokeWeight: 6
            })
          );
          const originMarker = new AMap.Marker({
            position: path[0]
          });
          const destinationMarker = new AMap.Marker({
            position: path[path.length - 1]
          });
          map.setCenter(path[0]);
          map.add([originMarker, destinationMarker]);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, [polyline]);

  // 导出PDF
  const exportToPDF = async () => {
    const drawerContent = document.querySelector(".ant-drawer-content");
    if (drawerContent) {
      const canvas = await html2canvas(drawerContent);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = pdfHeight;
      let position = 0;

      // 添加第一页
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      // 如果内容超出一页，添加更多页
      while (heightLeft > 0) {
        pdf.addPage();
        position -= pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("路径详情.pdf");
    }
  };
  return (
    <div className="content-box">
      <div className="tools" style={{ height: "80vh" }}>
        <div className="step">
          <Card
            title={
              <>
                <HomeTwoTone twoToneColor="#2fb4ff" /> 出发地与目的地
              </>
            }
            variant="borderless"
          >
            <DepartureAndDestinationBox
              setPolyline={setPolyline}
              setRouteData={setRouteData}
            ></DepartureAndDestinationBox>
          </Card>
        </div>
        <div className="step">
          <Card
            title={
              <>
                <Row>
                  <Col span={20}>
                    <ScheduleTwoTone twoToneColor="#2fb4ff" /> 路径信息总览
                  </Col>
                  <Col>
                    <div
                      className="detail"
                      onClick={() => {
                        setDetailShow(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      详情
                    </div>
                  </Col>
                </Row>
              </>
            }
            variant="borderless"
          >
            <ShowDataBox routeData={routeData}></ShowDataBox>
          </Card>
        </div>
      </div>
      <Drawer
        open={detailShow}
        onClose={() => setDetailShow(false)}
        title="路径详情"
        extra={
          routeData.paths[0]?.steps && (
            <Space>
              <Button onClick={exportToPDF}>导出</Button>
            </Space>
          )
        }
      >
        <Timeline
          items={
            routeData.paths[0]?.steps
              ? routeData.paths[0]?.steps.map((item, index) => {
                  return {
                    children: (
                      <>
                        <div key={index}>{item?.instruction}</div>
                      </>
                    )
                  };
                })
              : []
          }
        />
      </Drawer>
      <div id="container" style={{ height: "80vh" }}></div>
    </div>
  );
};

export default MapContainer;
