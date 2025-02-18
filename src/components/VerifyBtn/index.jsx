import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import axios from "axios";

// 验证码按钮组件
const VerifyBtn = ({
  requestUrl,
  requestData,
  countdownTime = 60, // 默认倒计时时间为 60 秒
  onSuccess, // 请求成功回调函数
  onError // 请求失败回调函数
}) => {
  const [isDisabled, setIsDisabled] = useState(false); // 按钮是否禁用
  const [countdown, setCountdown] = useState(0); // 倒计时
  const timerRef = useRef(null); // 定时器引用

  const handleClick = async () => {
    if (!requestData?.mail) return; // 邮箱为空时不发送请求
    setIsDisabled(true);
    setCountdown(countdownTime);

    try {
      const response = await axios.post(requestUrl, requestData);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("请求验证码失败:", error);
      if (onError) {
        onError(error);
      }
      setIsDisabled(false);
      setCountdown(0);
      return;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(timerRef.current);
          setIsDisabled(false);
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const buttonText = countdown > 0 ? `${countdown}s 后重试` : "获取验证码";

  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      {buttonText}
    </Button>
  );
};

export default VerifyBtn;
