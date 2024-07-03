import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import { emptyRender } from "@/utils/tableRender";
import { Select } from "antd";

const formConfig: IFormConfig = {
  formTitle: "操作",
  api: "getUserList",
  formItems: [
    {
      key: "type1",
      name: "零件类型",
      children: (
        <Select
          options={[
            { value: "标准", label: "标准零件" },
            { value: "非标", label: "非标零件" },
          ]}
        ></Select>
      ),
      rules: [],
    },
  ],
};

const tableConfig = {
  columns: [
    {
      title: "用户账号",
      dataIndex: "account",
      key: "account",
      render: emptyRender,
    },
    {
      title: "昵称",
      dataIndex: "username",
      key: "username",
      render: emptyRender,
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render: (text: number) => {
        return !text ? emptyRender(text) : text === 1 ? "男" : "女";
      },
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: emptyRender,
    },
    {
      title: "注册时间",
      dataIndex: "reg_time",
      key: "reg_time",
      render: emptyRender,
    },
    {
      title: "上次登录",
      dataIndex: "loginTime",
      key: "loginTime",
      render: emptyRender,
    },
  ],
};

export { formConfig, tableConfig };
