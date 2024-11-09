import { emptyRender } from "@/utils/tableRender";
import { Button, Form, Input, Modal, Popconfirm, Select, Tag } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";

import { IInsertUser, IRole } from "./UserManageType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { deleteUsers, insertUser, queryRole, updateUser } from "@/api";
import { RuleObject } from "antd/es/form";
import { ADD_SUCCESS, ERROR_MESSAGE } from "@/constants";

type FieldType = {
  username: string;
  password: string;
  remember?: string;
  account: string;
  confirmPassword?: string;
  role: string[];
  sex?: 0 | 1;
  department: string;
};

interface IGetModalConfigProps {
  onCancel: (props: any) => void;
  onFinish: (props: any) => void;
  init?: any;
  roles: any;
  isInsert?: boolean;
}
const accounts = [
  { name: "孙成龙", number: 11770 },
  { name: "蔡新", number: 10689 },
  { name: "范士林", number: 10015 },
  { name: "王杰", number: 11914 },
  { name: "徐庆", number: 14391 },
  { name: "曹宏文", number: 12942 },
  { name: "朱丽琴", number: 14724 },
  { name: "卓士涛", number: 11176 },
  { name: "王长宽", number: 13655 },
];

const validatePassword = (rule: any, value: string) => {
  if (!value) {
    return Promise.resolve();
  }
  if (/\s/.test(value)) {
    return Promise.reject("密码不能包含空格");
  }
  if (value.length < 6 || value.length > 8) {
    return Promise.reject("密码长度必须是 6 到 8 位");
  }
  return Promise.resolve();
};
const validateSpace = (rule: any, value: string) => {
  if (!value) {
    return Promise.resolve();
  }
  if (/\s/.test(value)) {
    return Promise.reject("不能包含空格");
  }

  return Promise.resolve();
};

const getModalConfig = ({
  onCancel,
  onFinish,
  init,
  roles,
  isInsert,
}: IGetModalConfigProps) => {
  return {
    title: isInsert ? "新增用户" : "编辑用户",
    footer: null,
    width: 400,
    closable: true,
    icon: null,
    onCancel,
    content: (
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={init}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="account"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "请输入你的用户名" },
            { validator: validateSpace },
          ]}
        >
          <Input
            placeholder="用户名"
            style={{ width: 350 }}
            disabled={!isInsert}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="昵称"
          name="username"
          rules={[
            { required: true, message: "请输入你的昵称" },
            { validator: validateSpace },
          ]}
          style={{ marginBottom: 10 }}
          required={true}
        >
          <Input placeholder="昵称" style={{ width: 350 }} />
        </Form.Item>
        {/* <Form.Item<FieldType>
          label="部门"
          name="department"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "请输入所属部门" }]}
        >
          <Select style={{ width: 350 }}>
            <Select.Option value={"热处理事业部"}>热处理事业部</Select.Option>
            <Select.Option value={"冲压事业部"}>冲压事业部</Select.Option>
            <Select.Option value={"扶梯链事业部"}>扶梯链事业部</Select.Option>
            <Select.Option value={"零件事业部"}>零件事业部</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={
            isInsert
              ? [
                  { required: true, message: "请输入你的密码" },
                  { validator: validatePassword },
                ]
              : []
          }
          style={{ marginBottom: 10 }}
        >
          <Input placeholder="密码" style={{ width: 350 }} />
        </Form.Item>
        {isInsert && (
          <Form.Item<FieldType>
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: "请再次输入密码" },
              (form) => {
                const password = form.getFieldValue("password");
                const confirmPassword = form.getFieldValue("confirmPassword");
                return {
                  validator:
                    confirmPassword !== "" && confirmPassword !== password,
                  message: "两次密码不一致",
                } as unknown as RuleObject;
              },
            ]}
            style={{ marginBottom: 10 }}
            required={true}
          >
            <Input
              placeholder="确认密码"
              autoComplete="off"
              style={{ width: 350 }}
            />
          </Form.Item>
        )}
        <Form.Item<FieldType>
          label="角色"
          name="role"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "请选择角色" }]}
          required={true}
        >
          <Select style={{ width: 350 }}>
            {roles?.map((item: any) => {
              return (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="性别"
          name="sex"
          style={{ marginBottom: 10 }}
        >
          <Select style={{ width: 350 }}>
            <Select.Option value={0}>女</Select.Option>
            <Select.Option value={1}>男</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }} style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 350, marginTop: 10 }}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    ),
  };
};

const formConfig: IFormConfig = {
  span: 4,
  formTitle: "操作",
  formExtend: true,
  buttons: (props: IButtons) => {
    const { selectedRowKeys, setRefreshFlag, loading, message } = props;

    return [
      <Button
        type="primary"
        htmlType="submit"
        key="search"
        loading={loading}
        style={{ marginRight: 5 }}
      >
        <SearchOutlined />
        查询
      </Button>,
      <Popconfirm
        title="确认删除"
        description="你确定要删除选中用户吗"
        onConfirm={() => {
          deleteUsers(selectedRowKeys).then((res) => {
            setRefreshFlag((flag) => !flag);
          });
        }}
        onCancel={() => {}}
        okText="确认"
        cancelText="取消"
      >
        <Button
          style={{ marginRight: 5 }}
          type="primary"
          key="delete"
          danger
          disabled={selectedRowKeys.length === 0}
        >
          <DeleteOutlined />
          删除
        </Button>
      </Popconfirm>,

      <Button
        style={{ marginRight: 5 }}
        type="dashed"
        onClick={async () => {
          const onCancel = () => {};
          const onFinish = (values: IInsertUser) => {
            delete values?.confirmPassword;
            values.role = [values.role] as unknown as string[];
            insertUser(values).then((res) => {
              if (res?.data?.code === 200) {
                message.success(res?.data?.msg || ADD_SUCCESS);
                setRefreshFlag((flag) => !flag);
              } else {
                message.error(res?.data?.msg || res?.data?.msg);
              }
            });
          };
          const res = await queryRole();
          // 获取所有角色
          const roles = res?.data?.data;
          if (!roles) {
            message.error(ERROR_MESSAGE);
          }
          Modal.info(
            getModalConfig({ onCancel, onFinish, roles, isInsert: true })
          );
        }}
        key="insert"
      >
        <PlusOutlined />
        新增
      </Button>,
      // <Button
      //   onClick={() => {
      //     accounts.forEach((item) => {
      //       insertUser({
      //         account: item.number.toString(),
      //         username: item.name,
      //         password: "123456",
      //         role: ["冲压事业部"],
      //       });
      //     });
      //   }}
      // >
      //   批量注册
      // </Button>,
    ];
  },
  formItems: [
    {
      key: "account",
      name: "用户账号",
      children: <Input></Input>,
      rules: [],
    },
    {
      key: "username",
      name: "昵称",
      children: <Input></Input>,
      rules: [],
    },
  ],
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setSearchedData, setRefreshFlag, message } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "getUserList",
    selectAble: true, // 是否可选择
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
      // {
      //   title: "部门",
      //   dataIndex: "department",
      //   key: "department",
      //   render: emptyRender,
      // },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        render: (text: number) => {
          return text === 1 ? "男" : text === 0 ? "女" : emptyRender(text);
        },
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
        render: (rolesArr: IRole[]) => {
          return (
            <span>
              {rolesArr.map((item) => {
                return (
                  <Tag
                    color="blue"
                    key={item?.name}
                    style={{ marginBottom: 3, marginTop: 3 }}
                  >
                    {item?.name}
                  </Tag>
                );
              })}
            </span>
          );
        },
      },
      {
        title: "注册时间",
        dataIndex: "regTime",
        key: "regTime",
        render: emptyRender,
      },
      {
        title: "上次登录",
        dataIndex: "loginTime",
        key: "loginTime",
        render: emptyRender,
      },

      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",

        render: (text, record) => {
          return (
            <Button
              type="primary"
              size="small"
              loading={record.loading}
              onClick={async () => {
                setSearchedData((prevData: any[]) =>
                  prevData.map((item) =>
                    item.id === record.id ? { ...item, loading: true } : item
                  )
                );

                const res = await queryRole();
                // 获取所有角色
                const roles = res?.data?.data;
                if (!roles) {
                  message.error(ERROR_MESSAGE);
                  setSearchedData((prevData: any[]) =>
                    prevData.map((item) =>
                      item.id === record.id ? { ...item, loading: false } : item
                    )
                  );
                  return;
                }
                // 点击更新按钮
                const onUpdateFinish = (value: any) => {
                  updateUser({
                    ...value,
                    role: [value.role],
                    userId: record?.id,
                  }).then((res) => {
                    if (res?.data?.code === 200) {
                      message.success(res?.data?.msg);
                      setRefreshFlag((flag) => !flag);
                      modal.destroy();
                    } else {
                      message.error(ERROR_MESSAGE);
                    }
                  });
                };
                // 取消
                const onCancel = () => {
                  setSearchedData((prevData: any[]) =>
                    prevData.map((item) =>
                      item.id === record.id ? { ...item, loading: false } : item
                    )
                  );
                };
                // 初始值
                const init = {
                  ...record,
                  role: record?.roles?.[0]?.name,
                };
                const modal = Modal.info(
                  getModalConfig({
                    onCancel,
                    onFinish: onUpdateFinish,
                    init,
                    roles,
                  })
                );
              }}
            >
              编辑
            </Button>
          );
        },
      },
    ],
  };
};

export { formConfig, tableConfig };
