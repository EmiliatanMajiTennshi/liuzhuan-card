// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  ConfigProvider,
  Form,
  Skeleton,
  Spin,
  Table,
  message,
  Input,
} from "antd";
import logo from "@/assets/images/logo.png";
import getApi, { TApi, insertSaveTransferCard } from "@/api";

import { RenderQRCode } from "@/utils";
import { IData, IFormFields } from "./indexType";
import CommonForm from "./CommonForm";
import OutsourcingForm from "./OutsourcingForm";
import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { kgArr } from "@/constants";
import { getParams, getTableColumns } from "./config";
import FlowCardForm from "./FlowCardForm";

import { AnyObject } from "antd/es/_util/type";
import { insertSaveCard } from "@/api/insertSaveCard";
import PrintFlowCardForm from "./PrintFlowCardForm";
import { useReactToPrint } from "react-to-print";
import PrintFlowCardFormOutsourcing from "./PrintFlowCardFormOutsourcing";
import FlowCardFormOutsourcing from "./FlowCardFormOutsourcing";

const ProductionProcessFlowCardAndDispatchList = (props: {
  issueID: number;
  queryFlowCardApi?: TApi;
  flowCardType: ITableConfig["flowCardType"];
}) => {
  const { issueID, queryFlowCardApi, flowCardType } = props;
  // 数据
  const [data, setData] = useState<IData>({});
  // loading
  const [loading, setLoading] = useState(false);
  // 材料id
  const [mItmID, setMItemId] = useState<string>("");
  // table Data
  const [tableData, setTableData] = useState<any>();
  // table选项
  const [options, setOptions] = useState<AnyObject>({});
  // 检验员
  const [currentInspector, setCurrentInspector] = useState<AnyObject[]>([]);
  // 操作员
  const [currentOperator, setCurrentOperator] = useState<AnyObject[]>([]);
  // 设备
  const [currentEquipment, setCurrentEquipment] = useState<AnyObject[]>([]);
  // 校验
  const [errors, setErrors] = useState<AnyObject>({});

  const [form] = Form.useForm();
  // const [formFooter] = Form.useForm();
  // 用来打印
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "",
  });
  /**
   * 获取工序列表
   * @param flowCardType
   * @returns
   */
  const getProcessesList = (
    flowCardType: ITableConfig["flowCardType"],
    data: IData
  ) => {
    switch (flowCardType) {
      case "flowCard":
        return data?.detailProcessesList;
      default:
        return data?.processList;
    }
  };

  // 请求数据
  const fetchData = async () => {
    try {
      setLoading(true);
      if (!queryFlowCardApi) return;
      const currentRequest = getApi(queryFlowCardApi);
      const res: any = await currentRequest({ id: issueID });
      if (res?.status === 200 && res?.data?.data) {
        const formData = res?.data?.data[0];
        form.setFieldsValue(formData);
        setData(formData);
        setMItemId(formData?.mItemId);
        const _tableData = getProcessesList(flowCardType, formData);
        setTableData(_tableData);
      } else {
        throw new Error("请求数据时发生错误");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("请求数据时发生错误", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    /**加载数据 */

    if (issueID) {
      fetchData();
    }
  }, [issueID]);
  // useEffect(() => {
  //   formFooter.setFieldValue("remark", data?.remark);
  // }, [data]);
  const isOutsourcing = useMemo(() => {
    return data?.barCode?.startsWith("2PO") || data?.barCode?.startsWith("240");
  }, [data]);

  /** 主要尺寸(孔径,片厚等)*/
  const mainsize: any = useMemo(() => {
    if (data?.mainsizeList) {
      return data?.mainsizeList[0];
    }
    return {};
  }, [data]);

  const unit = data?.uomname || "";
  const isKg = kgArr.indexOf(unit) !== -1;

  const onFinish = (values: IFormFields) => {
    const params = getParams({
      form,
      data,
      values,
      mainsize,
      isKg,
      flowCardType,
    });

    insertSaveCard(params).then((res) => {
      if (res?.data?.code === 20000) {
        message.success(res?.data?.data);
        fetchData();
      } else {
        message.error("保存失败");
      }
    });
    console.log("Received values of form: ", values, params);
  };

  // 零件流转卡保存
  const onFlowCardFormFinish = (values: IFormFields) => {
    const params = getParams({
      form,
      data,
      values,
      mainsize,
      isKg,
      flowCardType,
    });

    insertSaveTransferCard(params).then((res) => {
      if (res?.data?.code === 20000) {
        message.success(res?.data?.data);
        fetchData();
      } else {
        message.error("插入失败");
      }
    });
    console.log("Received values of form: ", values, params);
  };
  // common 表单
  const commonFormProps = {
    data,
    isKg,
    form,
    mItmID,
    setMItemId,
    mainsize,
  };
  // 外协外购
  const outsourcingFormProps = {
    data,
    isKg,
    form,
    mainsize,
  };
  // 流转卡
  const flowCardFormProps = {
    data,
    isKg,
    form,
  };

  // const components = {
  //   body: {
  //     row: EditableRow,
  //     cell: EditableCell,
  //   },
  // };

  const columns = getTableColumns({
    flowCardType,
    options,
    setOptions,
    currentInspector,
    setCurrentInspector,
    currentOperator,
    setCurrentOperator,
    currentEquipment,
    setCurrentEquipment,
    errors,
    setErrors,
  });

  // const handleSave = (row: Item) => {
  //   const newData = [...tableData];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   setTableData(newData);
  // };

  // const mergedColumns = columns.map((col: any) => {
  //   if (!col?.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record: Item) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });

  return (
    <>
      <div className={styles["flow-card"]} ref={printRef}>
        <Spin spinning={loading}>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  /* 这里是你的组件 token */
                  activeShadow: "0 0 0 0px rgba(5, 145, 255, 0.1)",
                },
                Table: {
                  headerBorderRadius: 0,
                  headerBg: "#accbe9",
                  borderColor: "#000",
                },
              },
            }}
          >
            <Form
              onFinish={
                flowCardType === "flowCard" ? onFlowCardFormFinish : onFinish
              }
              form={form}
              className={styles["form"]}
            >
              <div className={styles["form-title"]}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={logo} width={128}></img>
                <h2>生产工序流转卡暨派工单</h2>
                <RenderQRCode
                  title="流转卡编号"
                  name="transferCardCode"
                  value={data?.transferCardCode || data?.transferCard || ""}
                  noTd={true}
                  size={88}
                />
              </div>
              <table>
                {/* 标品/非标 */}
                {flowCardType === "common" && (
                  <CommonForm {...commonFormProps} />
                )}
                {/* 外协外购 */}
                {flowCardType === "outsourcing" && (
                  <OutsourcingForm {...outsourcingFormProps} />
                )}
                {/* 零件流转卡 骨架图*/}
                {flowCardType === "flowCard" &&
                  typeof isOutsourcing !== "boolean" && (
                    <Skeleton active style={{ height: 200 }} />
                  )}
                {/* 零件流转卡 标品/非标*/}
                {flowCardType === "flowCard" && isOutsourcing === false && (
                  <FlowCardForm {...flowCardFormProps} />
                )}
                {/* 零件流转卡 外协外购/苏州/五金*/}
                {flowCardType === "flowCard" && isOutsourcing && (
                  <FlowCardFormOutsourcing {...flowCardFormProps} />
                )}
                {/* 打印 骨架图*/}
                {flowCardType === "print" &&
                  typeof isOutsourcing !== "boolean" && (
                    <Skeleton active style={{ height: 500 }} />
                  )}
                {/* 打印 标品/非标*/}
                {flowCardType === "print" && isOutsourcing === false && (
                  <PrintFlowCardForm {...flowCardFormProps} />
                )}
                {/* 打印 外协外购/苏州/五金*/}
                {flowCardType === "print" && isOutsourcing && (
                  <PrintFlowCardFormOutsourcing {...flowCardFormProps} />
                )}
              </table>
            </Form>
            {flowCardType !== "print" && (
              <Table
                rowKey={tableData?.[0]?.id ? "id" : "hid"}
                columns={columns}
                style={{
                  borderRight: "1px solid #000",
                  borderLeft: "1px solid #000",
                  marginBottom: 10,
                }}
                pagination={false}
                dataSource={tableData}
              ></Table>
            )}

            <div className={styles.footer}>
              {flowCardType === "flowCard" && (
                <div className={styles.footerTips}>
                  <h4>备注:</h4>
                  <Form
                    className={styles.footerForm}
                    form={form}
                    onFinish={
                      flowCardType === "flowCard"
                        ? onFlowCardFormFinish
                        : onFinish
                    }
                  >
                    <Form.Item name="remark">
                      <Input.TextArea
                        className={styles.footerTextArea}
                      ></Input.TextArea>
                    </Form.Item>
                  </Form>
                </div>
              )}
              {flowCardType !== "print" && (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    form.submit();
                  }}
                  className={styles.footerSaveBtn}
                >
                  保存
                </Button>
              )}
            </div>
          </ConfigProvider>
        </Spin>
      </div>
      {flowCardType === "print" && (
        <div style={{ marginTop: 10, width: "100%" }}>
          <Button
            type="primary"
            size="large"
            style={{ width: "100%" }}
            onClick={() => {
              handlePrint();
            }}
          >
            打印
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductionProcessFlowCardAndDispatchList;
