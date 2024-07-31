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
import { PlusOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.png";
import getApi, {
  TApi,
  insertRework,
  insertSaveTransferCard,
  updateReworkInfoById,
} from "@/api";
import { RenderQRCode, validateField } from "@/utils";
import { IData, IFormFields } from "./indexType";
import CommonForm from "./CommonForm";
import OutsourcingForm from "./OutsourcingForm";
import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  SAVE_FAILED,
  SUCCESS_CODE,
  VALIDATION_FAILED,
  kgArr,
} from "@/constants";
import { getParams, getTableColumns } from "./config";
import FlowCardForm from "./FlowCardForm";
import { AnyObject } from "antd/es/_util/type";
import PrintFlowCardForm from "./PrintFlowCardForm";
import { useReactToPrint } from "react-to-print";
import PrintFlowCardFormOutsourcing from "./PrintFlowCardFormOutsourcing";
import FlowCardFormOutsourcing from "./FlowCardFormOutsourcing";
import ReworkCardForm from "./ReworkCardForm";
import { cloneDeep } from "lodash";
import { insertSaveCard } from "@/api/insertSaveCard";
import PrintFlowCardFormRework from "./PrintFlowCardFormRework";

const ProductionProcessFlowCardAndDispatchList = (props: {
  issueID?: number;
  queryFlowCardApi?: TApi;
  flowCardType: ITableConfig["flowCardType"];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { issueID, queryFlowCardApi, flowCardType, setRefreshFlag } = props;
  // 数据
  const [data, setData] = useState<IData>({});
  const [dataString, setDataString] = useState<string>("");
  // loading
  const [loading, setLoading] = useState(false);
  // 材料id
  const [mItmID, setMItemId] = useState<string>("");
  // table Data
  const [tableData, setTableData] = useState<any[]>([]);
  // 选项合集
  const [options, setOptions] = useState<AnyObject>({});

  // 校验
  const [errors, setErrors] = useState<any>([]);

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
      case "rework":
        return data?.detailProcesses;
      default:
        return data?.processList || data?.detailProcesses;
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
        const _data = res?.data?.data;
        //
        if (typeof _data === "string") {
          setDataString(_data);
        } else {
          const isArray = Array.isArray(_data);
          const formData = isArray ? _data[0] : _data;
          form.setFieldsValue(formData);
          setData(formData);
          setMItemId(formData?.mItemId);
          const _tableData = getProcessesList(flowCardType, formData);
          setTableData(_tableData || []);
        }
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

    if (issueID || queryFlowCardApi) {
      fetchData();
    }
  }, [issueID, queryFlowCardApi]);
  // useEffect(() => {
  //   formFooter.setFieldValue("remark", data?.remark);
  // }, [data]);
  const isOutsourcing = useMemo(() => {
    return data?.barCode?.startsWith("2PO") || data?.barCode?.startsWith("240");
  }, [data]);

  const isRework = useMemo(() => {
    return (
      queryFlowCardApi === "queryQR" ||
      queryFlowCardApi === "queryReworkInfoById"
    );
  }, []);

  const isViewRework = queryFlowCardApi === "queryReworkInfoById";

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
    const params: any = getParams({
      form,
      data,
      values,
      mainsize,
      isKg,
      flowCardType,
      dataString,
      tableData,
    });
    if (flowCardType === "rework" && isViewRework) {
      if (params?.detailProcesses) delete params?.detailProcesses;
      params.id = data?.id;
      updateReworkInfoById(params).then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          message.success(res?.data?.data);

          setRefreshFlag((flag) => !flag);
        } else {
          message.error(SAVE_FAILED);
        }
      });
    }
    if (flowCardType === "rework" && !isViewRework) {
      const cloneErrors = cloneDeep(errors);
      let errorFlag = false;
      // 对table进行校验
      tableData.forEach((item, index: number) => {
        if (!cloneErrors[index]) {
          cloneErrors[index] = {};
        }
        columns.forEach((subItem: any) => {
          if (subItem.needValidate) {
            const error = validateField(subItem.title, item[subItem.key]);
            if (!error) {
              delete cloneErrors[index][subItem.key];
            } else {
              cloneErrors[index][subItem.key] = error;
              if (errorFlag === false) {
                errorFlag = true;
              }
            }
          }
        });
      });
      setErrors(cloneErrors);
      if (errorFlag) {
        message.error(VALIDATION_FAILED);
        return;
      } else {
        insertRework(params as any).then((res) => {
          if (res?.data?.code === SUCCESS_CODE) {
            message.success(res?.data?.data);
            setRefreshFlag((flag) => !flag);
          } else {
            message.error(SAVE_FAILED);
          }
        });
      }
    }
    if (flowCardType === "flowCard") {
      insertSaveTransferCard(params).then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          message.success(res?.data?.data);
          fetchData();
          setRefreshFlag((flag) => !flag);
        } else {
          message.error(res?.data?.data || SAVE_FAILED);
        }
      });
    }

    if (flowCardType === "common" || flowCardType === "outsourcing") {
      insertSaveCard(params).then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          message.success(res?.data?.data);
          // 添加完刷新数据
          fetchData();
          setRefreshFlag((flag) => !flag);
        } else {
          message.error(SAVE_FAILED);
        }
      });
    }

    console.log("Received values of form: ", values, params, tableData);
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
  // 流转卡
  const reworkCardFormProps = {
    dataString,
    form,
    options,
    setOptions,
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
    errors,
    setErrors,
    tableData,
    setTableData,
    queryFlowCardApi,
    data,
  });

  // useEffect(() => {
  //   const handleBeforePrint = () => {
  //     debugger;
  //     console.log("打印预览已打开");
  //     // 在这里添加打开打印预览时需要执行的逻辑
  //   };

  //   const handleAfterPrint = () => {
  //     console.log("打印预览已关闭");
  //     // 在这里添加关闭打印预览时需要执行的逻辑
  //   };

  //   window.addEventListener("beforeprint", handleBeforePrint);
  //   window.addEventListener("afterprint", handleAfterPrint);

  //   // 清理事件监听器
  //   return () => {
  //     window.removeEventListener("beforeprint", handleBeforePrint);
  //     window.removeEventListener("afterprint", handleAfterPrint);
  //   };
  // }, []);
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
            <Form onFinish={onFinish} form={form} className={styles["form"]}>
              <div className={styles["form-title"]}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={logo} width={128}></img>
                {(flowCardType === "rework" || isRework) && (
                  <>
                    <h2 style={{ textAlign: "center" }}>物料返工流程卡</h2>
                    <RenderQRCode
                      title="返工卡编号"
                      name="reworkTransferCardCode"
                      value={dataString || data?.reworkTransferCardCode || ""}
                      noTd={true}
                      size={88}
                    />
                  </>
                )}

                {flowCardType !== "rework" && !isRework && (
                  <>
                    <h2 style={{ textAlign: "center" }}>
                      生产工序流转卡暨派工单
                    </h2>
                    <RenderQRCode
                      title="流转卡编号"
                      name="transferCardCode"
                      value={data?.transferCardCode || data?.transferCard || ""}
                      noTd={true}
                      size={88}
                    />
                  </>
                )}
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
                  typeof isOutsourcing !== "boolean" &&
                  typeof isRework !== "boolean" && (
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
                {/* 打印 返工*/}
                {flowCardType === "print" && isRework && (
                  <PrintFlowCardFormRework {...flowCardFormProps} />
                )}
                {/** 添加返工流转卡 */}
                {flowCardType === "rework" && (
                  <ReworkCardForm {...reworkCardFormProps} />
                )}
              </table>
            </Form>
            {flowCardType !== "print" && (
              <>
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
                  className={styles.flowCardTable}
                ></Table>
                {flowCardType === "rework" &&
                  queryFlowCardApi === "queryQR" && (
                    <Button
                      type="dashed"
                      style={{ width: "100%", marginBottom: 10 }}
                      onClick={() => {
                        setTableData([...tableData, {}]);
                      }}
                    >
                      <PlusOutlined />
                      添加一行数据
                    </Button>
                  )}
              </>
            )}

            <div className={styles.footer}>
              {flowCardType === "flowCard" && (
                <div className={styles.footerTips}>
                  <h4>备注:</h4>
                  <Form
                    className={styles.footerForm}
                    form={form}
                    onFinish={onFinish}
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
