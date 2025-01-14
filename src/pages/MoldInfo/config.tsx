import {
  IButtons,
  IFormConfig,
} from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { PlusOutlined } from "@ant-design/icons";
import { CustomInput } from "@/components/CustomInput";
import { Button, Form, Input } from "antd";
import { addMoldInfo } from "@/api";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import { message } from "@/utils";

const formConfig: (props?: any) => IFormConfig = ({ form }) => {
  return {
    formExtend: true,
    extraButtons: (props: IButtons) => {
      const { modal, setRefreshFlag } = props;

      return [
        <Button
          icon={<PlusOutlined />}
          type="dashed"
          danger
          onClick={() => {
            modal.info({
              title: "新增模具信息",
              footer: null,
              closable: true,
              content: (
                <>
                  <Form
                    onFinish={(values) => {
                      addMoldInfo(values)
                        .then((res) => {
                          if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                            message.success(res?.data?.data);
                            setRefreshFlag((flag) => !flag);
                          } else {
                            message.error(res?.data?.data || ERROR_MESSAGE);
                          }
                        })
                        .catch(() => {
                          message.error(ERROR_MESSAGE);
                        });
                    }}
                    labelAlign="right"
                    labelCol={{ span: 9 }}
                  >
                    <Form.Item
                      name="productName"
                      label="产品名称"
                      rules={[{ required: true }]}
                    >
                      <Input></Input>
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="产品描述"
                      rules={[{ required: true }]}
                    >
                      <Input></Input>
                    </Form.Item>
                    <Form.Item
                      name="createdBy"
                      label="新品开发申请人"
                      rules={[{ required: true }]}
                    >
                      <Input></Input>
                    </Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      添加
                    </Button>
                  </Form>
                </>
              ),
            });
          }}
        >
          新增
        </Button>,
      ];
    },

    formItems: [
      {
        key: "productName",
        name: "产品名称",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "quantity",
        name: "数量",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "createdBy",
        name: "申请人",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
    ],
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  // const { setMultiDetailModalOpen, setIssueID } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "findMoldInfo",
    columns: [
      {
        title: "id",
        dataIndex: "id",
      },

      {
        title: "产品名称",
        dataIndex: "productName",
      },
      {
        title: "数量",
        dataIndex: "quantity",
      },
      {
        title: "申请人",
        dataIndex: "createdBy",
      },
      {
        title: "产品描述",
        dataIndex: "description",
      },
      {
        title: "需求数量申请人",
        dataIndex: "prodReqSub",
      },
      {
        title: "生产提交需求描述",
        dataIndex: "prodReqDesc",
      },
      {
        title: "创建日期",
        dataIndex: "createdAt",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
    ],
  };
};

export { formConfig, tableConfig };
