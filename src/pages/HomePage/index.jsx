import { Button } from "antd";
import React from "react";
import { $request } from "../../tools";
import axios from "axios";
import MapContent from "../../components/MapContent";
import { useSelector } from "react-redux";

const HomePage = () => {
  const type = useSelector((state) => state.type.value);
  return (
    <>
      <h2>home - useType is {type}</h2>
      <Button
        onClick={() => {
          axios.get("http://jsonplaceholder.typicode.com/posts").then((res) => {
            console.log("axios 请求成功", res.data);
          });

          $request
            .get("http://jsonplaceholder.typicode.com/posts")
            .then((res) => {
              console.log("$request 请求成功", res);
            });
        }}
      >
        发送请求
      </Button>
      <MapContent></MapContent>
    </>
  );
};

export default HomePage;
