import { IFormConfig } from "@/components/AdvancedSearchForm/AdvancedSearchFormType";
import {
  ITableConfig,
  ITableConfigProps,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { Button, DatePicker, Input, message, Select, Tag } from "antd";
import { RuleObject } from "antd/es/form";
import dayjs from "dayjs";
const formConfig: (form: any) => IFormConfig = (form) => {
  return {
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
        key: "barCode",
        name: "生产订单条码",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "transferCardCode",
        name: "流转卡编号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "partNumber",
        name: "零件料号",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "name",
        name: "品名",
        children: <Input></Input>,
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
        key: "specs",
        name: "规格",
        children: <Input></Input>,
        rules: [],
      },
      {
        key: "finishTimeStart",
        name: "完成时间开始",
        children: (
          <DatePicker
            style={{ width: "100%" }}
            onChange={() => {
              if (form) {
                form.validateFields(["finishTimeEnd"]);
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
              if (form) {
                form.validateFields(["finishTimeStart"]);
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
    ],
    handleDate: true,
    initValues: {
      finishTimeStart: dayjs(),
      finishTimeEnd: dayjs(),
    },
  };
};

const tableConfig: (props: ITableConfigProps) => ITableConfig = (props) => {
  const { setIssueID, setFinishedParams, setPrintModalOpen } = props;
  return {
    api: "querytransferCardRelation",
    queryFlowCardApi: "queryTransferCardInfoByCardIdNew",
    flowCardType: "flowCard",
    // 下发成品
    // rowKey: "transferCardCode",
    needIssueFinished: true,
    defaultParam: {
      printPage: "1",
      finishTimeStart: dayjs().format("YYYY-MM-DD"),
      finishTimeEnd: dayjs().format("YYYY-MM-DD"),
    },
    noPaging: true,
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
                <Button
                  type="primary"
                  size="small"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    setPrintModalOpen(true);
                    setIssueID({ transferCardCode: record?.transferCardCode });
                    setFinishedParams({
                      transferCardCode: record?.children?.[0]?.transferCardCode,
                    });
                    // const type = record?.type;
                    // const handleRes = (res: any) => {
                    //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                    //     res?.data?.data && setFinishedParams(res?.data?.data);
                    //   } else {
                    //     setFinishedParams([{ partNumber: "", barCode: "" }]);
                    //     message.error(ERROR_UNFINISHED_ISSUE_FINISHED);
                    //   }
                    // };
                    // if (type === "非标零件") {
                    //   queryPartNumberByHalf({
                    //     barCode: record?.barCode,
                    //     partNumber: record?.partNumber,
                    //   })
                    //     .then(handleRes)
                    //     .catch((err) =>
                    //       message.error(ERROR_UNFINISHED_ISSUE_FINISHED, err)
                    //     );
                    // }
                    // if (type === "标准零件") {
                    //   queryStandPartNumberByHalf({
                    //     barCode: record?.barCode,
                    //     partNumber: record?.partNumber,
                    //   })
                    //     .then(handleRes)
                    //     .catch((err) => message.error(ERROR_MESSAGE, err));
                    // }
                  }}
                  disabled={Boolean(record?.pCardID)}
                >
                  {Boolean(record?.pCardID) ? "已打印" : "打印流转卡"}
                </Button>
              ) : (
                <></>
              )}
            </>
          );
        },
        width: 140,
        fixed: "right",
      },
    ],
  };
};

export { formConfig, tableConfig };
