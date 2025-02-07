import { Button } from "antd";
import React from "react";
import { $request } from "../../tools";
import axios from "axios";

const HomePage = () => {
  return (
    <>
      <h2>home</h2>
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
    </>
  );
};

export default HomePage;
