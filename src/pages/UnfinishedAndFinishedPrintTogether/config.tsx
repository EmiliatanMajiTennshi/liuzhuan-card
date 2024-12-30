import { updatePrintTransferCard } from "@/api";
import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { CustomInput } from "@/components/CustomInput";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import { allowRecoverPrintState } from "@/constants/config";
import { Button, DatePicker, Input, message, Popconfirm, Select } from "antd";
import { RuleObject } from "antd/es/form";
const formConfig: (form: any) => IFormConfig = (form) => {
  return {
    span: 4,
    formExtend: true,
    formItems: [
      {
        key: "type",
        name: "零件类型",
        children: (
          <Select
            allowClear
            options={[
              { value: "标准零件", label: "标准零件" },
              { value: "非标零件", label: "非标零件" },
            ]}
          ></Select>
        ),
        rules: [],
      },
      {
        key: "orderid",
        name: "生产订单条码",
        children: <CustomInput allowScanner></CustomInput>,
        rules: [],
      },
      {
        key: "transferCardCode",
        name: "流转卡编号",
        children: <CustomInput allowScanner></CustomInput>,
        rules: [],
      },
      {
        key: "itmid",
        name: "零件料号",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "name2",
        name: "品名",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      // {
      //   key: "ishand",
      //   name: "零件类型",
      //   children: (
      //     <Select
      //       allowClear
      //       options={[
      //         { value: "盘点", label: "盘点" },
      //         { value: "", label: "全部" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
      // {
      //   key: "category",
      //   name: "类别",
      //   children: (
      //     <Select
      //       allowClear
      //       options={[
      //         { value: SEMI_FINISHED_CODE, label: "半成品" },
      //         { value: FINISHED_CODE, label: "成品" },
      //       ]}
      //     ></Select>
      //   ),
      //   rules: [],
      // },
      {
        key: "spec",
        name: "规格",
        children: <CustomInput></CustomInput>,
        rules: [],
      },
      {
        key: "finishTimeStart",
        name: "完成时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form?.validateFields) {
                form?.validateFields(["finishTimeEnd"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const finishTimeStart = form.getFieldValue("finishTimeStart");
            const finishTimeEnd = form.getFieldValue("finishTimeEnd");

            if (
              finishTimeEnd &&
              finishTimeStart &&
              finishTimeEnd < finishTimeStart
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
        key: "finishTimeEnd",
        name: "完成时间结束",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form?.validateFields) {
                form?.validateFields(["finishTimeStart"]);
              }
            }}
          ></DatePicker>
        ),
        rules: [
          (form: any) => {
            const finishTimeStart = form.getFieldValue("finishTimeStart");
            const finishTimeEnd = form.getFieldValue("finishTimeEnd");

            if (
              finishTimeEnd &&
              finishTimeStart &&
              finishTimeEnd < finishTimeStart
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
      {
        key: "printStatus",
        name: "打印状态",
        children: (
          <Select
            allowClear
            options={[
              { value: "PR", label: "已打印" },
              { value: "NO", label: "未打印" },
            ]}
          ></Select>
        ),
        rules: [],
      },
    ],
    handleDate: true,
    initValues: {
      // finishTimeStart: dayjs(),
      // finishTimeEnd: dayjs(),
      printStatus: "NO",
    },
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueID, setFinishedParams, setPrintModalOpen, setRefreshFlag } =
    props;
  return {
    api: "querytransferCardRelation",
    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
    flowCardType: "flowCard",
    // 下发成品
    rowKey: "transferCardCode",
    needIssueFinished: true,
    defaultParam: {
      // printPage: "1",
      // finishTimeStart: formatDate(),
      // finishTimeEnd: formatDate(),
      printStatus: "NO",
    },
    // noPaging: true,
    defaultPageSize: 50,
    columns: [
      {
        title: "流转卡类型",
        dataIndex: "category",
        key: "category",
        width: 100,
      },
      {
        title: "零件类型",
        dataIndex: "type",
        key: "type",
        width: 100,
      },

      {
        title: "流转卡编号",
        dataIndex: "transferCardCode",
        key: "transferCardCode",
        width: 260,
      },
      {
        title: "追溯单号",
        dataIndex: "traceabilityNumber",
        key: "traceabilityNumber",
        width: 110,
      },
      {
        title: "生产订单条码",
        dataIndex: "orderid",
        key: "orderid",
        width: 160,
      },
      {
        title: "入库料号",
        dataIndex: "itmid",
        key: "itmid",
        width: 180,
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        width: 150,
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100,
      },
      {
        title: "单位",
        dataIndex: "unit",
        key: "unit",
        width: 100,
      },
      //   {
      //     title: "商标",
      //     dataIndex: "trademark",
      //     key: "trademark",
      //     width: 80,
      //   },
      {
        title: "创建(流转)时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
        render: (text: string) => text?.slice(0, 19),
      },
      {
        title: "完成时间",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
        width: 100,
      },

      // {
      //   title: "热处理炉台",
      //   dataIndex: "heatTreatmentFurnacePlatforms",
      //   key: "heatTreatmentFurnacePlatforms",
      //   width: 120,
      // },
      // {
      //   title: "优先顺序",
      //   dataIndex: "priority",
      //   key: "priority",
      //   width: 120,
      // },

      // {
      //   title: "生产数量总量",
      //   dataIndex: "newsupcount",
      //   key: "newsupcount",
      //   width: 110,
      //   // render: (text, record) => {
      //   //   const isKg = kgArr.indexOf(record?.unit) !== -1;
      //   //   return isKg ? record?.productionKg : record?.productionPcs;
      //   // },
      // },
      // {
      //   title: "流转数量累积",
      //   dataIndex: "transferNumber",
      //   key: "transferNumber",
      //   // render: sumTransferNumberRender,
      //   width: 120,
      // },
      // {
      //   title: "流转桶数",
      //   dataIndex: "barrelageNumebr",
      //   key: "barrelageNumebr",
      //   width: 120,
      //   // render: (barrelCount: any) => {
      //   //   return barrelCount?.countBarrel;
      //   // },
      // },
      // {
      //   title: "单桶流转数量",
      //   dataIndex: "singleBarrelageNumebr",
      //   key: "singleBarrelageNumebr",
      //   width: 110,
      // },
      // {
      //   title: "当前工艺",
      //   dataIndex: "currentProcess",
      //   key: "currentProcess",
      //   width: 120,
      // },
      // {
      //   title: "完工状态",
      //   dataIndex: "finishStatus",
      //   key: "finishStatus",
      //   width: 100,
      //   fixed: "right",
      //   render: (text: string) => {
      //     if (text === "完工") {
      //       return <Tag color="green">完工</Tag>;
      //     }
      //     return <Tag color="red">未完工</Tag>;
      //   },
      // },
      {
        title: "操作",
        dataIndex: "processList",
        key: "processList",
        render: (data: any, record: any, index: number) => {
          console.log(record, 1122);
          return (
            <>
              {record?.category === "半品" ? (
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
                        transferCardCode: record?.transferCardCode,
                      });
                      setFinishedParams({
                        transferCardCode:
                          record?.children?.[0]?.transferCardCode,
                      });
                    }}
                    disabled={Boolean(record?.pCardID)}
                  >
                    {Boolean(record?.pCardID) ? "已打印" : "打印"}
                  </Button>
                  {allowRecoverPrintState && (
                    <Popconfirm
                      title="确认恢复"
                      description="你确定要恢复打印状态吗"
                      onConfirm={() => {
                        updatePrintTransferCard({
                          transferCardCode: record?.transferCardCode,
                        })
                          .then((res) => {
                            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                              message.success(`32:${res?.data?.data}`);
                              setRefreshFlag((flag) => !flag);
                            } else {
                              message.error(res?.data?.data);
                            }
                          })
                          .catch(() => {
                            message.error(ERROR_MESSAGE);
                          });
                        updatePrintTransferCard({
                          transferCardCode:
                            record?.children?.[0]?.transferCardCode,
                        })
                          .then((res) => {
                            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                              message.success(`31:${res?.data?.data}`);
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
                        disabled={!Boolean(record?.pCardID)}
                      >
                        恢复
                      </Button>
                    </Popconfirm>
                  )}
                </span>
              ) : (
                <></>
              )}
            </>
          );
        },
        width: allowRecoverPrintState ? 140 : 100,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
