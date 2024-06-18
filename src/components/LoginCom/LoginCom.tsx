import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { loginRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

type FieldType = {
  username: string;
  password: string;
};
type TRes = {
  status?: string;
  message?: string;
};
// 登录组件
const LoginCom = (props: any) => {
  const { setActiveTabKey } = props;
  const navigate = useNavigate();
  //   const [remember, setRemember] = useState(true);

  //   useEffect(()=>{
  //     setRemember(localStorage.getItem('remember'))
  //   })

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
  const onLoginFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res: TRes = await loginRequest(values); //登录请求
    if (res?.status === "success") {
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
      errorMessage(res?.status || "");
    }
  };

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
      style={{ maxWidth: 600 }}
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
        name="username"
        rules={[{ required: true, message: "请输入你的用户名" }]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input placeholder="用户名" style={{ width: 350 }} />
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
          style={{ width: 350 }}
          //   value={localStorage.getItem("password") || ""}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 350, marginTop: 10 }}
        >
          登录
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 16 }}>
        <div className={styles["login-button"]}>
          没有帐户？
          <Button type="link" onClick={() => setActiveTabKey("tab2")}>
            点击注册
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginCom;
