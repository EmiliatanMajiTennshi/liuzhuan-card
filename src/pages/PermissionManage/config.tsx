import { emptyRender } from "@/utils/tableRender";
import { Button, Form, Input, Modal, Popconfirm, Select, message } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";

import { ITableConfigProps } from "./PermissionType";
import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  deletePermissionById,
  insertPermission,
  updatePermissionById,
} from "@/api";

import { ADD_SUCCESS, ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";

type FieldType = {
  name: string;
  perCode: string;
  id?: string;
};

interface IGetModalConfigProps {
  onCancel: (props: any) => void;
  onFinish: (props: any) => void;
  init?: any;

  isInsert?: boolean;
}

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
  return {
    title: isInsert ? "新增权限" : "编辑权限",
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
            <Input placeholder="id" style={{ width: 350 }} disabled />
          </Form.Item>
        )}
        <Form.Item<FieldType>
          label="权限名"
          name="name"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "请输入权限名" },
            { validator: validateSpace },
          ]}
        >
          <Input placeholder="权限名" style={{ width: 350 }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="权限代码"
          name="perCode"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "请输入权限代码" },
            { validator: validateSpace },
          ]}
        >
          <Input placeholder="权权限代码" style={{ width: 350 }} />
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
        loading={loading}
        style={{ marginRight: 5 }}
      >
        <SearchOutlined />
        查询
      </Button>,
      <Popconfirm
        title="确认删除"
        description="你确定要删除选中权限吗"
        onConfirm={() => {
          deletePermissionById(selectedRowKeys).then((res) => {
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
          const onFinish = (values: any) => {
            insertPermission(values).then((res) => {
              if (res?.data?.code === SUCCESS_CODE) {
                message.success(res?.data?.data || ADD_SUCCESS);
                setRefreshFlag((flag) => !flag);
              } else {
                message.error(res?.response?.data?.msg || res?.data?.msg);
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
      key: "name",
      name: "权限名",
      children: <Input></Input>,
      rules: [],
    },
  ],
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setSearchedData, setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryPermission",
    selectAble: true, // 是否可选择
    columns: [
      {
        title: "权限",
        dataIndex: "name",
        key: "name",
        render: emptyRender,
      },
      {
        title: "权限代码",
        dataIndex: "perCode",
        key: "perCode",
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
                  updatePermissionById({
                    ...value,
                  }).then((res) => {
                    if (res?.data?.code === SUCCESS_CODE) {
                      message.success(res?.data?.data);
                      setRefreshFlag((flag) => !flag);
                      modal.destroy();
                    } else {
                      message.error(res?.data?.data || ERROR_MESSAGE);
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
