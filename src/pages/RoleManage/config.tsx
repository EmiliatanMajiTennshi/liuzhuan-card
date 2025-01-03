import { emptyRender } from "@/utils/tableRender";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
  TreeSelect,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  IButtonLoadingChildren,
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";

import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  queryAllMenu,
  queryPermission,
  queryRole,
  insertRole,
  updateRoleInfoPermission,
  deleteRoleInfoByRoleId,
} from "@/api";
import { IMenuItem } from "@/constants/constantsType";

import {
  FieldType,
  IGetModalConfigProps,
  IProcessedMenuItem,
  IRole,
  IRoleItem,
} from "./RoleManageType";
import {
  ADD_SUCCESS,
  ERROR_MESSAGE,
  GET_MENU_OR_PERMISSION_FAILED,
} from "@/constants";
import { UPDATE_SUCCESS } from "@/constants/constants";
import { message } from "@/utils";
import styles from "./index.module.scss";
import { CustomInput } from "@/components/CustomInput";
const validateSpace = (rule: any, value: string) => {
  if (!value) {
    return Promise.resolve();
  }
  if (/\s/.test(value)) {
    return Promise.reject("不能包含空格");
  }

  return Promise.resolve();
};
/**
 * 把后端传来的menu改成符合TreeSelect选择器的格式
 * @param menu
 * @returns
 */
const handleMenu = (menu: IMenuItem[]): IProcessedMenuItem[] => {
  return menu?.map((item: IMenuItem) => {
    return {
      value: item.label,
      title: item.label,
      children: handleMenu(item?.children || []),
    };
  });
};
/**
 * 获取modal配置
 * @param param0
 * @returns
 */
const getModalConfig = ({
  onCancel,
  onFinish,
  init,
  allPermission,
  allMenu,
  isInsert,
}: IGetModalConfigProps) => {
  const handledMenu = handleMenu(allMenu);

  /**
   * 把后端传来的permission改成符合Select选择器的格式
   */
  const handledPermission = allPermission?.map((item: IRole) => {
    return {
      value: item?.name,
      label: item?.name,
    };
  });

  return {
    title: isInsert ? "新增角色" : "编辑角色",
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
          label="角色名称"
          name="name"
          style={{ marginBottom: 10 }}
          rules={[
            { required: true, message: "请输入角色名" },
            { validator: validateSpace },
          ]}
        >
          <Input
            placeholder="角色名称"
            style={{ width: 350 }}
            disabled={!isInsert}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="权限"
          name="permissionDto"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "请选择权限" }]}
        >
          <Select
            mode="multiple"
            style={{ width: 350 }}
            options={handledPermission}
            tagRender={({ label, onClose }) => {
              return (
                <Tag
                  color="blue"
                  closable={true}
                  onClose={onClose}
                  style={{ marginBottom: 3, marginTop: 3 }}
                >
                  {label}
                </Tag>
              );
            }}
          ></Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="菜单"
          name="menu"
          style={{ marginBottom: 10 }}
          rules={[{ required: true, message: "请选择菜单" }]}
        >
          <TreeSelect
            multiple
            treeData={handledMenu}
            treeDefaultExpandAll
            style={{ width: 350 }}
            tagRender={({ label, onClose }) => {
              return (
                <Tag
                  color="green"
                  closable={true}
                  onClose={onClose}
                  style={{ marginBottom: 3, marginTop: 3 }}
                >
                  {label}
                </Tag>
              );
            }}
          ></TreeSelect>
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

/**
 * 表单配置
 */
const formConfig: IFormConfig = {
  span: 8,
  formTitle: "操作",
  formExtend: true,
  buttons: (props: IButtons) => {
    const {
      selectedRowKeys,
      setRefreshFlag,
      buttonLoading,
      setButtonLoading,
      loading,
      modal,
    } = props;

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
        description="你确定要删除选中角色吗?"
        onConfirm={() => {
          deleteRoleInfoByRoleId(selectedRowKeys).then((res) => {
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
        loading={buttonLoading.insertButton}
        onClick={async () => {
          setButtonLoading((prevData: IButtonLoadingChildren) => {
            const _temp = JSON.parse(JSON.stringify(prevData));
            _temp.insertButton = true;
            return _temp;
          });
          const onCancel = () => {
            setButtonLoading((prevData: IButtonLoadingChildren) => {
              const _temp = JSON.parse(JSON.stringify(prevData));
              _temp.insertButton = false;
              return _temp;
            });
          };
          const onFinish = (values: IRoleItem) => {
            insertRole({
              menus: values.menu,
              name: values.name,
              permission: values.permissionDto,
            }).then((res) => {
              if (res?.data.code === 601) {
                message.success(res?.data?.data || ADD_SUCCESS);
                setRefreshFlag((flag) => !flag);
              } else {
                message.error(res?.data?.data || ERROR_MESSAGE);
              }
            });
          };

          const allPermission = await queryPermission().then((res) => {
            if (res?.data?.data) {
              return res?.data?.data;
            }
          });
          const allMenu = await queryAllMenu().then((res) => {
            if (res?.data?.data) {
              return res?.data?.data;
            }
          });
          if (!allPermission || !allMenu) {
            message.error(GET_MENU_OR_PERMISSION_FAILED);
            return;
          }

          Modal.info(
            getModalConfig({
              onCancel,
              onFinish,
              allPermission,
              allMenu,
              isInsert: true,
            })
          );
        }}
        key="insert"
      >
        <PlusOutlined />
        新增
      </Button>,
      <Button
        style={{ marginRight: 5 }}
        type="link"
        key="add_menu"
        loading={buttonLoading.insertMenuButton}
        onClick={async () => {
          setButtonLoading((prevData: IButtonLoadingChildren) => {
            const _temp = JSON.parse(JSON.stringify(prevData));
            _temp.insertMenuButton = true;
            return _temp;
          });
          const [res1, res2] = await Promise.all([queryAllMenu(), queryRole()]);
          const menuData = res1?.data?.data;
          const roleData = res2?.data?.data;
          modal.info({
            title: "批量添加菜单",
            className: styles.insertModal,
            footer: null,
            closable: true,
            width: 400,
            onCancel: () => {
              setButtonLoading((prevData: IButtonLoadingChildren) => {
                const _temp = JSON.parse(JSON.stringify(prevData));
                _temp.insertMenuButton = false;
                return _temp;
              });
            },
            content: (
              <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{
                  roles: roleData?.map((item: any) => item.id),
                }}
                onFinish={(values) => {
                  console.log(res1, res2, 1124);
                  values?.roles?.forEach((item: any) => {
                    const _temp = roleData?.find((_item: any) => {
                      return item === _item.id;
                    });
                    if (_temp) {
                      const handledMenu = _temp?.menu?.map(
                        (item: IMenuItem) => item.label
                      );
                      const handledPermission =
                        _temp?.permissionDto?.map((item: any) => item.name) ||
                        [];
                      if (handledMenu.indexOf(values.menu) === -1) {
                        updateRoleInfoPermission({
                          name: _temp.name,
                          menus: [...handledMenu, values.menu],
                          id: _temp?.id,
                          permission: handledPermission || [],
                        }).then(() => {
                          message.success(`${_temp.name + UPDATE_SUCCESS}`);
                        });
                      }
                    }
                  });
                  console.log(values, 123);
                }}
              >
                <Form.Item<FieldType>
                  label="角色名称"
                  name="roles"
                  style={{ marginBottom: 10 }}
                  rules={[{ required: true, message: "请选择角色" }]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: 350 }}
                    options={
                      roleData?.map((item: any) => {
                        return {
                          value: item.id,
                          label: item.name,
                        };
                      }) || []
                    }
                    tagRender={({ label, onClose }) => {
                      return (
                        <Tag
                          color="blue"
                          closable={true}
                          onClose={onClose}
                          style={{ marginBottom: 3, marginTop: 3 }}
                        >
                          {label}
                        </Tag>
                      );
                    }}
                  ></Select>
                </Form.Item>

                <Form.Item<FieldType>
                  label="菜单"
                  name="menu"
                  style={{ marginBottom: 10 }}
                  rules={[{ required: true, message: "请选择菜单" }]}
                >
                  <TreeSelect
                    treeDefaultExpandAll
                    treeData={handleMenu(menuData || [])}
                    style={{ width: 350 }}
                    tagRender={({ label, onClose }) => {
                      return (
                        <Tag
                          color="green"
                          closable={true}
                          onClose={onClose}
                          style={{ marginBottom: 3, marginTop: 3 }}
                        >
                          {label}
                        </Tag>
                      );
                    }}
                  ></TreeSelect>
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 16 }}
                  style={{ marginBottom: 0 }}
                >
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
          });
        }}
      >
        <PlusOutlined />
        批量添加菜单
      </Button>,
    ];
  },
  formItems: [
    {
      key: "name",
      name: "角色名称",
      children: <CustomInput></CustomInput>,
      rules: [],
    },
  ],
};

/**
 * table配置
 */
const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setSearchedData, setRefreshFlag } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryRole",
    selectAble: true, // 是否可选择
    columns: [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
        render: emptyRender,
      },

      {
        title: "权限",
        dataIndex: "permissionDto",
        key: "permissionDto",
        render: (data: IRole[]) => {
          if (!data) {
            return emptyRender(data);
          }
          return data?.map((item) => {
            return (
              <Tag color="blue" style={{ marginBottom: 3, marginTop: 3 }}>
                {item.name}
              </Tag>
            );
          });
        },
      },

      {
        title: "菜单",
        dataIndex: "menu",
        key: "menu",
        render: (data: { label: string }[]) => {
          if (!data) {
            return emptyRender(data);
          }
          return data?.map((item) => {
            return (
              <Tag color="green" style={{ marginBottom: 3, marginTop: 3 }}>
                {item.label}
              </Tag>
            );
          });
        },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
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

                const roles = res?.data?.data;
                const allPermission = await queryPermission().then((res) => {
                  if (res?.data?.data) {
                    return res?.data?.data;
                  }
                });
                const allMenu = await queryAllMenu().then((res) => {
                  if (res?.data?.data) {
                    return res?.data?.data;
                  }
                });
                if (!roles || !allPermission || !allMenu) {
                  message.error(res?.message || ERROR_MESSAGE);
                  setSearchedData((prevData: any[]) =>
                    prevData.map((item) =>
                      item.id === record.id ? { ...item, loading: false } : item
                    )
                  );
                  return;
                }

                // 保存编辑
                const onUpdateFinish = (value: IRoleItem) => {
                  const { name, menu, permissionDto } = value;
                  updateRoleInfoPermission({
                    name,
                    menus: menu,
                    id: record?.id,
                    permission: permissionDto || [],
                  }).then((res) => {
                    if (res?.status === 200) {
                      message.success(UPDATE_SUCCESS);
                      setRefreshFlag((flag) => !flag);
                    } else {
                      message.error(res?.message || ERROR_MESSAGE);
                    }
                  });
                };

                // 初始值
                const init = {
                  ...record,
                  role: record?.roles?.[0]?.name,
                  menu: record?.menu?.map((item: IMenuItem) => item.label),
                  permissionDto: record?.permissionDto?.map(
                    (item: IRole) => item?.name
                  ),
                };
                const onCancel = () => {
                  setSearchedData((prevData: any[]) =>
                    prevData.map((item) =>
                      item.id === record.id ? { ...item, loading: false } : item
                    )
                  );
                };
                Modal.info(
                  getModalConfig({
                    onCancel,
                    onFinish: onUpdateFinish,
                    allPermission,
                    allMenu,
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
