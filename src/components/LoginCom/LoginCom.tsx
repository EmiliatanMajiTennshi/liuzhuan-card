import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { loginRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import { FieldType, TRes } from "./LoginComType";
// import styles from "./index.module.scss";

// 登录组件
const LoginCom = (props: any) => {
  // const { setActiveTabKey } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //   const [remember, setRemember] = useState(true);

  //   useEffect(()=>{
  //     setRemember(localStorage.getItem('remember'))
  //   })

  // 登陆成功的提示信息
  const successMessage = (_message: string) => {
    message.success({
      content: _message,
      className: "custom-class",
      duration: 2,
      style: {
        marginTop: "20vh",
        position: "relative",
        transform: "translateX(-25%)",
      },
    });
  };

  // 登陆失败的提示信息
  const errorMessage = (_message: string) => {
    message.error({
      content: _message,
      className: "custom-class",
      duration: 2,
      style: {
        marginTop: "20vh",
        position: "relative",
        transform: "translateX(-25%)",
      },
    });
  };

  // 点击登录校验成功
  const onLoginFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const res: TRes = await loginRequest(values); //登录请求
    setLoading(false);

    if (res?.code === 200) {
      //   if (remember) {
      //     localStorage.setItem("username", values.username);
      //     localStorage.setItem("password", values.password);
      //   } else {
      //     localStorage.removeItem("username");
      //     localStorage.removeItem("password");
      //   }
      successMessage("登录成功");
      navigate("/");
    } else {
      errorMessage(res?.msg || "登录失败");
    }
  };

  // 点击登录校验失败
  const onLoginFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
      }}
      onFinish={onLoginFinish}
      onFinishFailed={onLoginFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="account"
        rules={[{ required: true, message: "请输入你的用户名" }]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input placeholder="用户名" style={{ width: 300 }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入你的密码" }]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input.Password
          placeholder="密码"
          style={{ width: 300 }}
          autoComplete="off"
          //   value={localStorage.getItem("password") || ""}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "10px 0 30px", width: 300 }}
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>
      {/* <Form.Item wrapperCol={{ span: 16 }}>
        <div className={styles["login-button"]}>
          没有帐户？
          <Button type="link" onClick={() => setActiveTabKey("tab2")}>
            点击注册
          </Button>
        </div>
      </Form.Item> */}
    </Form>
  );
};

export default LoginCom;
