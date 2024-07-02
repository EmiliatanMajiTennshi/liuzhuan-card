import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { registerRequest } from "@/api";
import styles from "./index.module.scss";
import { RuleObject } from "antd/es/form";
import { FieldType } from "./RegisterComType";

// 注册组件
const RegisterCom = (props: any) => {
  const { setActiveTabKey } = props;
  const onRegisterFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    delete values?.confirmPassword;
    await registerRequest(values); //注册请求
  };

  const onRegisterFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
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
      initialValues={{ remember: true }}
      onFinish={onRegisterFinish}
      onFinishFailed={onRegisterFinishFailed}
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
        label="昵称"
        name="nickName"
        rules={[{ required: true, message: "请输入你的昵称" }]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input placeholder="昵称" style={{ width: 350 }} />
      </Form.Item>
      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入你的密码" }]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input.Password placeholder="密码" style={{ width: 350 }} />
      </Form.Item>
      <Form.Item<FieldType>
        label="确认密码"
        name="confirmPassword"
        rules={[
          { required: true, message: "请再次输入密码" },
          (form) => {
            const password = form.getFieldValue("password");
            const confirmPassword = form.getFieldValue("confirmPassword");
            return {
              validator: confirmPassword !== "" && confirmPassword !== password,
              message: "两次密码不一致",
            } as unknown as RuleObject;
          },
        ]}
        style={{ marginBottom: 10 }}
        required={false}
      >
        <Input.Password placeholder="确认密码" style={{ width: 350 }} />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 350, marginTop: 10 }}
        >
          注册
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 16 }}>
        <div className={styles["login-button"]}>
          已有账户？
          <Button type="link" onClick={() => setActiveTabKey("tab1")}>
            点击登录
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
export default RegisterCom;
