import { updatePrintTransferCard } from "@/api";
import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import { allowRecoverPrintState } from "@/constants/config";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  message,
  Popconfirm,
} from "antd";
import { RuleObject } from "antd/es/form";

const formConfig: (form?: any) => IFormConfig = (form) => {
  return {
    formExtend: true,
    name: "QueryRollChain",
    formItems: [
      {
        key: "rollChainTraceabilityNumber",
        name: "追溯号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "name",
        name: "品名",
        children: <CustomInput></CustomInput>,
        rules: [],
      },

      {
        key: "spec",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "rollTime",
        name: "卷装日期",
        children: <DatePicker style={{ width: "100%" }}></DatePicker>,
        rules: [],
      },

      {
        key: "createTimeStart",
        name: "下发时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["createTimeEnd"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const createTimeStart = form.getFieldValue("createTimeStart");
            const createTimeEnd = form.getFieldValue("createTimeEnd");

            if (
              createTimeEnd &&
              createTimeStart &&
              createTimeEnd < createTimeStart
            ) {
              return {
                validator: true,
                message: "开始日期不能晚于结束",
              } as unknown as RuleObject;
            }
            return undefined as unknown as RuleObject;
          },
        ],
      },
      {
        key: "createTimeEnd",
        name: "下发时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["createTimeStart"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const createTimeStart = form.getFieldValue("createTimeStart");
            const createTimeEnd = form.getFieldValue("createTimeEnd");

            if (
              createTimeEnd &&
              createTimeStart &&
              createTimeEnd < createTimeStart
            ) {
              return {
                validator: true,
                message: "结束日期不能早于开始",
              } as unknown as RuleObject;
            }

            return undefined as unknown as RuleObject;
          },
        ],
      },
    ],
    handleDate: true,
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setRefreshFlag, setPrintModalOpen, setIssueID } = props;
  return {
    rowKey: "id", // 唯一标识
    api: "queryRollChain",
    flowCardType: "print",
    columns: [
      {
        title: "卷装链条追溯条码",
        dataIndex: "rollChainTraceabilityNumber",
        key: "rollChainTraceabilityNumber",
      },

      {
        title: "品名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
      },
      {
        title: "开单人",
        dataIndex: "drawer",
        key: "drawer",
      },
      {
        title: "卷装日期",
        dataIndex: "rollTime",
        key: "rollTime",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
      },

      {
        title: "预览打印",
        dataIndex: "count",
        key: "count",
        width: allowRecoverPrintState ? 150 : 100,
        render: (data: any, record: any, index: number) => {
          // 这里后面要

          return (
            <>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#87d068",
                  },
                }}
              >
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      setPrintModalOpen(true);
                      setIssueID({
                        // transferCardCode: record?.transferCardCode,
                        ...record,
                        // 不需要请求数据
                        noQuery: true,
                      });
                    }}
                    disabled={record?.printStatus !== 0}
                  >
                    {record?.printStatus !== 0 ? "已打印" : "打印"}
                  </Button>
                  {allowRecoverPrintState && (
                    <Popconfirm
                      title="确认恢复"
                      description="你确定要恢复打印状态吗"
                      onConfirm={() => {
                        updatePrintTransferCard({
                          transferCardCode: record?.rollChainTraceabilityNumber,
                        })
                          .then((res) => {
                            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                              message.success(res?.data?.data);
                              setRefreshFlag((flag) => !flag);
                            } else {
                              message.error(res?.data?.data);
                            }
                          })
                          .catch(() => {
                            message.error(ERROR_MESSAGE);
                          });
                      }}
                      onCancel={() => {}}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button
                        type="link"
                        size="small"
                        style={{ marginLeft: 10 }}
                        disabled={record?.printStatus === 0}
                      >
                        恢复
                      </Button>
                    </Popconfirm>
                  )}
                </span>
              </ConfigProvider>
            </>
          );
        },
      },
    ],
  };
};

export { formConfig, tableConfig };
