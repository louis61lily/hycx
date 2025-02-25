import React, { useState, useEffect, useRef } from "react";
import { Button, notification } from "antd";
import axios from "axios";

const requestUrl = "http://localhost:8080/verify";
// 验证码按钮组件
const VerifyBtn = ({
  getEmail,
  countdownTime = 60 // 默认倒计时时间为 60 秒
}) => {
  const [isDisabled, setIsDisabled] = useState(false); // 按钮是否禁用
  const [countdown, setCountdown] = useState(0); // 倒计时
  const timerRef = useRef(null); // 定时器引用

  const handleClick = async () => {
    const email = await getEmail();
    console.log(email);
    if (!email) return;
    setIsDisabled(true);
    setCountdown(countdownTime);

    try {
      await axios.post(requestUrl, {
        mail: email
      });
      notification.success({
        message: "验证码发送成功",
        description: "验证码3分钟内有效，请尽快查收！",
        duration: 0
      });
    } catch (error) {
      notification.error({
        message: "验证码发送失败",
        description: "请检查邮箱或联系管理员！"
      });
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
