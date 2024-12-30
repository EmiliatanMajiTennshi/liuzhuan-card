import { emptyRender } from "@/utils/tableRender";
import { Button, Form, Input, Modal, Popconfirm, Select } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import * as Icon from "@ant-design/icons";
import { ITableConfigProps } from "./MenuManageType";
import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { deleteMenuById, updateMenuById } from "@/api";
import { IInsertMenu, insertMenu } from "@/api/insertMenu";
import React, { ReactNode } from "react";
import { ERROR_MESSAGE } from "@/constants";
import { message } from "@/utils";
import { CustomInput } from "@/components/CustomInput";

type FieldType = {
  icon: string;
  id: number;
  key: string;
  label: string;
  parentid: number;
};

interface IGetModalConfigProps {
  onCancel: (props: any) => void;
  onFinish: (props: any) => void;
  init?: any;
  isInsert?: boolean;
}
const iconKeys = Object.keys(Icon);
const antIcon: { [key: string]: any } = Icon;

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
  isInsert,
}: IGetModalConfigProps) => {
  const options: any[] = [];
  iconKeys?.forEach((item: string) => {
    const IconComponent = antIcon[item];
    if (typeof IconComponent === "object") {
      options.push({
        label: (
          <>
            {React.createElement(antIcon[item]) as ReactNode}
            {" " + item}
          </>
        ),
        value: item,
      });
    }
  });
  return {
    title: isInsert ? "新增菜单" : "编辑菜单",
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
        {!isInsert && (
          <Form.Item<FieldType>
            label="id"
            name="id"
            style={{ marginBottom: 10 }}
          >
            <Input placeholder="id" disabled style={{ width: 350 }} />
          </Form.Item>
        )}
        <Form.Item<FieldType>
          label="名称"
          name="label"
          rules={[
            { required: true, message: "请输入菜单名称" },
            { validator: validateSpace },
          ]}
          style={{ marginBottom: 10 }}
          required={true}
        >
          <Input placeholder="名称" style={{ width: 350 }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="图标"
          name="icon"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "请输入图标名称（来自antd）" }]}
        >
          <Select style={{ width: 350 }} showSearch options={options}></Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="路径"
          name="key"
          rules={[{ required: true, message: "请输入路径" }]}
          style={{ marginBottom: 10 }}
          required={true}
        >
          <Input placeholder="路径" style={{ width: 350 }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="父节点id"
          name="parentid"
          style={{ marginBottom: 10 }}
        >
          <Input placeholder="父节点id" style={{ width: 350 }} />
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
  span: 8,
  formTitle: "操作",
  formExtend: true,
  buttons: (props: IButtons) => {
    const { selectedRowKeys, setRefreshFlag, loading } = props;

    return [
      <Button
        type="primary"
        htmlType="submit"
        key="search"
        style={{ marginRight: 5 }}
        loading={loading}
      >
        <SearchOutlined />
        查询
      </Button>,
      <Popconfirm
        title="确认删除"
        description="你确定要删除选中菜单吗"
        onConfirm={() => {
          deleteMenuById(selectedRowKeys).then((res) => {
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
          const onFinish = (values: IInsertMenu) => {
            insertMenu(values).then((res) => {
              if (res?.data?.code === 601) {
                message.success(res?.data?.data);
                setRefreshFlag((flag) => !flag);
              } else {
                message.error(res?.response?.data?.msg || res?.data?.data);
              }
            });
          };

          Modal.info(getModalConfig({ onCancel, onFinish, isInsert: true }));
        }}
        key="insert"
      >
        <PlusOutlined />
        新增
      </Button>,
    ];
  },
  formItems: [
    {
      key: "search",
      name: "名称",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
  ],
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setSearchedData, setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryAllMenu",
    selectAble: true, // 是否可选择
    columns: [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        render: emptyRender,
      },
      {
        title: "名称",
        dataIndex: "label",
        key: "label",
        render: emptyRender,
      },
      {
        title: "图标",
        dataIndex: "icon",
        key: "icon",
        render: (text: string) => {
          const IconComponent = antIcon[text];

          return typeof IconComponent === "object" ? (
            <>
              {React.createElement(antIcon[text]) as ReactNode}
              {" " + text}
            </>
          ) : null;
        },
      },
      {
        title: "路径",
        dataIndex: "key",
        key: "key",
        render: emptyRender,
      },
      {
        title: "父节点id",
        dataIndex: "parentid",
        key: "parentid",
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

                // 点击更新按钮
                const onUpdateFinish = (value: any) => {
                  updateMenuById(value).then((res) => {
                    // 数据格式如下
                    // {
                    //   code: 20000;
                    //   data: "修改成功(Update successful.)";
                    //   success: true;
                    //   timestamp: 1720598915612;
                    // }
                    if (res?.data?.code === 604) {
                      message.success(res?.data?.data);
                      setRefreshFlag((flag) => !flag);
                      modal.destroy();
                    } else {
                      message.error(ERROR_MESSAGE);
                    }
                  });

                  //   updateUser({
                  //     ...value,
                  //     role: [value.role],
                  //     userId: record?.id,
                  //   }).then((res) => {
                  //     if (res?.data?.code === 200) {
                  //       message.success(res?.data?.msg);
                  //       setRefreshFlag((flag) => !flag);
                  //       modal.destroy();
                  //     } else {
                  //       message.error(ERROR_MESSAGE);
                  //     }
                  //   });
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
                };
                const modal = Modal.info(
                  getModalConfig({
                    onCancel,
                    onFinish: onUpdateFinish,
                    init,
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
