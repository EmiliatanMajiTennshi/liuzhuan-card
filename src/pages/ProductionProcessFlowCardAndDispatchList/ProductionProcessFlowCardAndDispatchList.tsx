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
  Input,
  App,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.png";
import getApi, {
  TApi,
  insertPrintTransferCardNew,
  insertReworkTransferCardNew,
  insertRollChain,
  insertfinishedProductsNew,
  insertoutsourcingPurchasingNew,
  printReworkTransferCardNew,
  queryEquipmentInfo,
  queryOperationInfo,
  queryTestInfo,
  updateFTransferCardInfoByCardId,
  updateOTransferCardInfoByCardId,
  updateReworkTransferCardById,
  updateTransferCardInfoByCardId,
} from "@/api";
import {
  convertArraysToString,
  convertStringToArray,
  message,
  RenderQRCode,
  validateField,
} from "@/utils";
import {
  IData,
  IEquipmentItem,
  IFormFields,
  IOperationItem,
  IVerifierItem,
} from "./indexType";
import CommonForm from "./CommonForm";
import OutsourcingForm from "./OutsourcingForm";
import {
  IIssueID,
  ITableConfig,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  ERROR_MESSAGE,
  SAVE_FAILED,
  SUCCESS_CODE,
  VALIDATION_FAILED,
  kgArr,
} from "@/constants";
import { getParams, useTableColumns } from "./config";
import FlowCardForm from "./FlowCardForm";
import { AnyObject } from "antd/es/_util/type";
import PrintFlowCardForm from "./PrintFlowCardForm";
import { useReactToPrint } from "react-to-print";
import PrintFlowCardFormOutsourcing from "./PrintFlowCardFormOutsourcing";
import FlowCardFormOutsourcing from "./FlowCardFormOutsourcing";
import ReworkCardForm from "./ReworkCardForm";
import { cloneDeep } from "lodash";
import PrintFlowCardFormRework from "./PrintFlowCardFormRework";
import axios, { CancelTokenSource } from "axios";
import { insertUnfinishedProductsNew } from "@/api/insertUnfinishedProductsNew";
import { useThrottleFn } from "ahooks";
import PrintFlowCardFormRollChain from "./PrintFlowCardFormRollChain";
import FlowCardFormRollChain from "./FlowCardFormRollChain";
import classNames from "classnames";

const ProductionProcessFlowCardAndDispatchList = (props: {
  issueID?: IIssueID;
  queryFlowCardApi?: TApi;
  flowCardType: ITableConfig["flowCardType"];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  setPrintModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // 被下发的成品
  finishedPrintProps?: {
    issueID: {
      orderid?: string;
      itmid?: string;
      transferCardCode?: string;
    };
    queryFlowCardApi: TApi;
  };
}) => {
  const {
    issueID,
    queryFlowCardApi,
    flowCardType,
    setRefreshFlag,
    name: pageName,
    // setReworkModalOpen,
    setPrintModalOpen,
    finishedPrintProps,
  } = props;
  console.log(flowCardType, "flowCardType1");

  // 数据
  const [data, setData] = useState<IData>({});
  // loading
  const [loading, setLoading] = useState(false);

  // table Data
  const [tableData, setTableData] = useState<any[]>([]);
  // 选项合集
  const [options, setOptions] = useState<AnyObject>({});
  // 校验
  const [errors, setErrors] = useState<any>([]);

  const [form] = Form.useForm();
  const [formFinished] = Form.useForm();
  // const [formFooter] = Form.useForm();
  // 用来打印
  const printRef = useRef<HTMLDivElement>(null);

  // 操作员列表
  const [operatorList, setOperatorList] = useState<IOperationItem[]>([]);
  // 检验员列表
  const [verifierList, setVerifierList] = useState<IVerifierItem[]>([]);
  // 设备列表
  const [equipmentList, setEquipmentList] = useState<IEquipmentItem[]>([]);
  // 用来存放半品同时打印成品时的成品数据
  const [printFinishedData, setPrintFinishedData] = useState<IData>({});
  // 下发 保存按钮的loading
  const [saveLoading, setSaveLoading] = useState(false);

  const cancelTokenSource = useRef<CancelTokenSource>();

  const handleSuccess = (res: any) => {
    if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
      message.success(res?.data?.data);
      // 添加完刷新数据
      fetchData();
      // setRefreshFlag((flag) => !flag);
    } else {
      setSaveLoading(false);
      message.error(SAVE_FAILED);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => {
      if (isRework) {
        printReworkTransferCardNew({
          transferCardCode: data?.reworkTransferCardCode,
        }).then((res) => {
          setRefreshFlag((flag) => !flag);
        });
      } else if (isRollChian) {
        insertPrintTransferCardNew({
          transferCardCode: data?.rollChainTraceabilityNumber,
        }).then(() => {
          setRefreshFlag((flag) => !flag);
        });
      } else {
        insertPrintTransferCardNew({
          transferCardCode: data?.transferCardCode,
        }).then(() => {
          if (printFinishedData?.transferCardCode) {
            insertPrintTransferCardNew({
              transferCardCode: printFinishedData?.transferCardCode,
            });
          }
          setRefreshFlag((flag) => !flag);
        });
      }
      // if (pageName === "HeatTreatmentFurnaceOperationQuery") {
      //   insertPrintTransferCardNew({
      //     transferCardCode: data?.transferCardCode,
      //   }).then((res) => {
      //     setRefreshFlag((flag) => !flag);
      //   });
      // } else if (isRework) {
      //   updatePrintStatus({ id: data?.id }).then((res) => {
      //     setRefreshFlag((flag) => !flag);
      //   });
      // } else {
      //   printSaveCard({ id: data?.id }).then((res) => {
      //     setRefreshFlag((flag) => !flag);
      //   });
      // }
      setPrintModalOpen?.(false);
    },
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
    // 需要加工数据格式
    switch (flowCardType) {
      case "flowCard":
        const cloneProcessesFlowCard = cloneDeep(data?.processList);
        cloneProcessesFlowCard?.forEach((item) => {
          item.verifyId = convertStringToArray(item.verifyId);
          item.verifyName = convertStringToArray(item.verifyName);
          item.operateId = convertStringToArray(item.operateId);
          item.operateName = convertStringToArray(item.operateName);
          item.operateDepartment = convertStringToArray(item.operateDepartment);
          // item.verifyId = convertStringToArray(item.verifyId);
          // const { operationInfoList = [], verifierInfoList = [] } = item || {};
          // item.verifyId = [];
          // item.verifyName = [];
          // item.operateName = [];
          // item.operateId = [];
          // item.operateDepartment = [];
          // operationInfoList.forEach((subItem: IOperationItem) => {
          //   item.operateName.push(subItem?.operationName);
          //   item.operateId.push(subItem?.operationId);
          //   item.operateDepartment.push(subItem?.operateDepartment);
          // });
          // verifierInfoList.forEach((subItem: any) => {
          //   item.verifyId.push(subItem?.verifyId);
          //   item.verifyName.push(subItem?.verifyName);
          // });
        });
        return cloneProcessesFlowCard;
      case "rework":
        const cloneProcessesRework = cloneDeep(data?.detailProcesses);
        cloneProcessesRework?.forEach((item) => {
          //   const { operationInfoList = [], verifierInfoList = [] } = item || {};
          //   item.verifyId = [];
          //   item.verifyName = [];
          //   item.operateName = [];
          //   item.operateId = [];
          //   item.operateDepartment = [];
          //   operationInfoList.forEach((subItem: IOperationItem) => {
          //     item.operateName.push(subItem?.operationName);
          //     item.operateId.push(subItem?.operationId);
          //     item.operateDepartment.push(subItem?.operateDepartment);
          //   });
          //   verifierInfoList.forEach((subItem: any) => {
          //     item.verifyId.push(subItem?.verifyId);
          //     item.verifyName.push(subItem?.verifyName);
          //   });
          item.verifyId = convertStringToArray(item.verifyId);
          item.verifyName = convertStringToArray(item.verifyName);
          item.operateId = convertStringToArray(item.operateId);
          item.operateName = convertStringToArray(item.operateName);
          item.operateDepartment = convertStringToArray(item.operateDepartment);
        });

        return cloneProcessesRework;
      default:
        return data?.processList || data?.detailProcesses;
    }
  };

  // 请求数据
  const fetchData = async () => {
    try {
      setLoading(true);

      if (!queryFlowCardApi) return;
      cancelTokenSource.current = axios.CancelToken.source();
      const currentRequest: any = getApi(queryFlowCardApi);
      const res: any = await currentRequest(issueID, {
        cancelToken: cancelTokenSource.current.token,
      });
      if (finishedPrintProps && finishedPrintProps?.issueID?.transferCardCode) {
        // 同时打印
        const finishedRequest = getApi(finishedPrintProps?.queryFlowCardApi);
        const resFinished: any = await finishedRequest(
          finishedPrintProps?.issueID
        );
        if (
          SUCCESS_CODE.indexOf(resFinished?.data?.code) !== -1 &&
          resFinished?.data?.data
        ) {
          const _data = resFinished?.data?.data;
          const isArray = Array.isArray(_data);
          const formData = isArray ? _data[0] : _data;
          formFinished.setFieldsValue(formData);
          setPrintFinishedData(formData);
        } else {
          throw new Error("请求数据时发生错误");
        }
      }
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && res?.data?.data) {
        const _data = res?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        form.setFieldsValue(formData);
        setData(formData);
        const _tableData = getProcessesList(flowCardType, formData);
        setTableData(_tableData || []);
      } else {
        throw new Error("请求数据时发生错误");
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        message.error(error.message);
        console.error("请求数据时发生错误", error);
      }
    } finally {
      setLoading(false);

      setSaveLoading(false);
    }
  };
  // 请求table选项数据
  const fetchOperatorData = async () => {
    try {
      const res = await queryOperationInfo();
      const operationInfo = res?.data?.data;
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && operationInfo) {
        if (Array.isArray(operationInfo)) {
          console.log(operationInfo, 1241214);
          setOperatorList(
            operationInfo?.map((item) => {
              return {
                name: item?.operationName,
                barcode: item?.operationId,
                department: item?.operateDepartment,
              };
            })
          );
        }
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("获取操作员列表时发生错误", error);
    }
  };
  const fetchVerifierData = async () => {
    try {
      const res = await queryTestInfo();
      const verifierInfo = res?.data?.data;
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && verifierInfo) {
        if (Array.isArray(verifierInfo)) {
          console.log(verifierInfo, 124421);
          setVerifierList(
            verifierInfo?.map((item) => {
              return {
                name: item?.testName,
                barcode: item?.testId,
              };
            })
          );
        }
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("获取检验员列表时发生错误", error);
    }
  };
  const fetchEquipmentData = async () => {
    try {
      const res = await queryEquipmentInfo();
      const equipmentInfo = res?.data?.data;
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && equipmentInfo) {
        if (Array.isArray(equipmentInfo)) {
          console.log(equipmentInfo, 12411);

          setEquipmentList(
            equipmentInfo?.map((item) => {
              return {
                barcode: item?.equipmentId,
                name: item?.equipmentName,
              };
            })
          );
        }
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("获取设备列表时发生错误", error);
    }
  };
  useEffect(() => {
    /**加载数据 */
    if (issueID || queryFlowCardApi) {
      fetchData();
    }
    if (issueID?.noQuery) {
      form.setFieldsValue(issueID);
      setData(issueID);
    }
    if (flowCardType === "flowCard" || flowCardType === "rework") {
      fetchOperatorData();
      fetchVerifierData();
      fetchEquipmentData();
    }
  }, []);

  useEffect(() => {
    if (flowCardType === "rework" && tableData.length === 0) {
      setTableData([...tableData, {}]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel(
          "Operation canceled by the component unmount."
        );
      }
    };
  }, []);

  // useEffect(() => {
  //   formFooter.setFieldValue("remark", data?.remark);
  // }, [data]);
  const isOutsourcing = useMemo(() => {
    return (
      data?.orderid?.startsWith("2PO") ||
      data?.orderid?.startsWith("240") ||
      data?.type === "苏州采购"
    );
  }, [data]);

  // const isOnly32 = data?.orderid?.endsWith("BL");

  const isRework = useMemo(() => {
    return (
      queryFlowCardApi === "queryReworkBySign" ||
      queryFlowCardApi === "queryReworkTransferCardByIdNew"
    );
  }, []);

  const isViewRework = queryFlowCardApi === "queryReworkTransferCardByIdNew";

  /** 主要尺寸(孔径,片厚等)*/
  const mainsize: any = useMemo(() => {
    if (data?.mainsizeList) {
      return data?.mainsizeList[0];
    }
    return {};
  }, [data]);

  const unit = data?.unit || "";
  const isKg = kgArr.indexOf(unit) !== -1;

  // 卷装链
  const isRollChian =
    Boolean(data?.rollChainTraceabilityNumber) || flowCardType === "rollChain";

  const is2MO = data?.orderid?.startsWith("2MO");
  console.log(flowCardType, is2MO, 124141);

  const onFinish = async (values: IFormFields) => {
    setSaveLoading(true);
    const params: any = getParams({
      form,
      data,
      values,
      mainsize,
      flowCardType,
    });
    const isSemiFinished = data?.itmid?.startsWith("32");
    const isFinished = data?.itmid?.startsWith("31");
    // 非自制
    const isSelf =
      data?.type &&
      (data?.type?.indexOf("自制") !== -1 ||
        data?.type?.indexOf("补单") !== -1 ||
        data?.type?.indexOf("盘点") !== -1);

    if (flowCardType === "rework") {
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
      }
      if (isViewRework) {
        // 查看页面
        // if (params?.detailProcesses) delete params?.detailProcesses;
        // params.id = data?.id;
        // params.type = data?.type;

        const processList = tableData?.map((item) => {
          const formatItem = convertArraysToString(item);

          return {
            inspectionLevel: "",
            ...formatItem,
            verifierBarcode: formatItem?.verifyId,
            transferCardCode: data?.reworkTransferCardCode,
          };
        });

        updateReworkTransferCardById({
          ...params,
          detailProcesses: processList,
        })
          .then((res) => handleSuccess(res))
          .catch(() => {
            setSaveLoading(false);
          });
        // updateReworkInfoById(params).then(async (res) => {
        //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        //     message.success(res?.data?.data);
        //   } else {
        //     message.error(SAVE_FAILED);
        //   }
        //   for (const index in tableData) {
        //     await handleSave({
        //       flowCardType,
        //       record: tableData[index],
        //       data,
        //       index,
        //     });
        //   }
        //   fetchData();
        //   setRefreshFlag((flag) => !flag);
        // });
      }
      if (!isViewRework) {
        // 添加页面
        // insertReworkTransferCardNew(params as any).then((res) => {
        //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        //     message.success(res?.data?.data);
        //     setRefreshFlag((flag) => !flag);
        //   } else {
        //     message.error(getErrorMessage(res, SAVE_FAILED));
        //   }
        //   fetchData();
        //   setRefreshFlag((flag) => !flag);
        // });
        const processList = tableData?.map((item, index) => {
          const formatItem = convertArraysToString(item);
          return {
            processSeq: index + 1,
            inspectionLevel: "",
            ...formatItem,
            verifierBarcode: formatItem?.verifyId,
            transferCardCode: data?.reworkTransferCardCode,
          };
        });
        insertReworkTransferCardNew({
          ...params,
          reworkTransferCardCode: data?.reworkTransferCardCode,
          detailProcesses: processList,
        })
          .then((res) => handleSuccess(res))
          .catch(() => {
            setSaveLoading(false);
          });
      }
    }

    if (flowCardType === "flowCard") {
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
        const processList = tableData?.map((item) => {
          return {
            inspectionLevel: "",
            ...convertArraysToString(item),
            transferCardCode: data?.transferCardCode,
          };
        });

        // 页面大保存
        const finialSave = async () => {
          // 非自制
          console.log(params, 11231);

          if (!isSelf) {
            updateOTransferCardInfoByCardId({
              ...{ transferNumber: values?.transferNumberKG || "", ...params },
              processList,
            }).then((res) => handleSuccess(res));
          } else if (isSemiFinished) {
            updateTransferCardInfoByCardId({
              ...params,
              relation: data?.relation,
              processList,
            }).then((res) => handleSuccess(res));
          } else if (isFinished) {
            updateFTransferCardInfoByCardId({
              ...params,
              processList,
            }).then((res) => handleSuccess(res));
          } else {
          }

          // insertSaveTransferCard(params).then((res) => {
          //   if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
          //     message.success(res?.data?.data);
          //   } else {
          //     message.error(res?.data?.data || SAVE_FAILED);
          //   }
          // });
          // for (const index in tableData) {
          //   await handleSave({
          //     flowCardType,
          //     record: tableData[index],
          //     data,
          //     index,
          //   });
          // }
          // fetchData();
          // setRefreshFlag((flag) => !flag);
        };
        finialSave();
      }
    }
    if (flowCardType === "rollChain") {
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
        setSaveLoading(false);
        return;
      } else {
        console.log(params, tableData, 12313, values);
        const insertRollChainFn = async () => {
          try {
            const res = await insertRollChain({
              ...params,
              rollChainViews: tableData,
            });
            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
              message.success(res?.data?.data);
            } else {
              message.error(res?.data?.data);
            }
          } catch {
            message.error(ERROR_MESSAGE);
          } finally {
            setSaveLoading(false);
          }
        };
        insertRollChainFn();
      }
    }

    if (
      flowCardType === "common" ||
      flowCardType === "finished" ||
      flowCardType === "unfinished" ||
      flowCardType === "outsourcing"
    ) {
      // 未完成
      if (isSelf && (flowCardType === "unfinished" || isSemiFinished)) {
        insertUnfinishedProductsNew(params)
          .then((res) => {
            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
              message.success(res?.data?.data);
              // 添加完刷新数据
              fetchData();
              setRefreshFlag((flag) => !flag);
            } else {
              message.error(SAVE_FAILED);
            }
          })
          .catch(() => {
            setSaveLoading(false);
          });
      }
      // 完成
      if (isSelf && (flowCardType === "finished" || !isSemiFinished)) {
        insertfinishedProductsNew(params)
          .then((res) => {
            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
              message.success(res?.data?.data);
              // 添加完刷新数据
              fetchData();
              setRefreshFlag((flag) => !flag);
            } else {
              message.error(SAVE_FAILED);
            }
          })
          .catch(() => {
            setSaveLoading(false);
          });
      }
      if (!isSelf && flowCardType === "outsourcing") {
        insertoutsourcingPurchasingNew(params)
          .then((res) => {
            if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
              message.success(res?.data?.data);
              // 添加完刷新数据
              fetchData();
              setRefreshFlag((flag) => !flag);
            } else {
              message.error(SAVE_FAILED);
            }
          })
          .catch(() => {
            setSaveLoading(false);
          });
      }
    }
  };

  // common 表单
  const commonFormProps = {
    data,
    isKg,
    form,
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
    reworkUnit: data?.reworkUnit,
    mainsize,
  };
  const flowCardFormPropsPrintFinished = {
    data: printFinishedData,
    isKg: kgArr.indexOf(printFinishedData?.unit || "") !== -1,
    form: formFinished,
    reworkUnit: printFinishedData?.reworkUnit,
    mainsize: printFinishedData?.mainsizeList?.[0],
  };
  // 流转卡
  const reworkCardFormProps = {
    form,
    options,
    setOptions,
    data,
  };

  // 列
  const columns = useTableColumns({
    flowCardType,
    errors,
    setErrors,
    tableData,
    setTableData,
    queryFlowCardApi,
    data,
    operatorList,
    verifierList,
    equipmentList,
  });
  return (
    <>
      <div
        className={styles["flow-card"]}
        ref={printRef}
        style={flowCardType === "print" ? { marginRight: 2 } : {}}
      >
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
                <img src={logo} width={136}></img>
                {(flowCardType === "rework" || isRework) && (
                  <>
                    <h2 style={{ textAlign: "center" }}>物料返工流程卡</h2>
                    <RenderQRCode
                      title="返工卡编号"
                      name="reworkTransferCardCode"
                      value={data?.reworkTransferCardCode || ""}
                      noTd={true}
                      size={120}
                      form={form}
                    />
                  </>
                )}

                {flowCardType !== "rework" && !isRework && !isRollChian && (
                  <>
                    <h2 style={{ textAlign: "center" }}>
                      生产工序流转卡暨派工单
                    </h2>
                    <RenderQRCode
                      title="流转卡编号"
                      name="transferCardCode"
                      value={data?.transferCardCode || data?.transferCard || ""}
                      noTd={true}
                      size={120}
                      form={form}
                    />
                  </>
                )}
                {flowCardType === "print" && isRollChian && (
                  <>
                    <h2 style={{ textAlign: "center" }}>车间卷装链条</h2>
                    <RenderQRCode
                      title="追溯号"
                      name="rollChainTraceabilityNumber"
                      value={data?.rollChainTraceabilityNumber || ""}
                      noTd={true}
                      size={120}
                      form={form}
                    />
                  </>
                )}
                {flowCardType === "rollChain" && (
                  <>
                    <h2 style={{ textAlign: "center" }}>车间卷装链条添加</h2>
                    <span style={{ width: 20 }}></span>
                  </>
                )}
              </div>
              <table style={{ overflow: "hidden", tableLayout: "fixed" }}>
                {/* 标品/非标 */}
                {(flowCardType === "common" ||
                  flowCardType === "finished" ||
                  flowCardType === "unfinished") && (
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
                {/* 打印 自制*/}
                {flowCardType === "print" &&
                  isOutsourcing === false &&
                  !isRework &&
                  !isRollChian && <PrintFlowCardForm {...flowCardFormProps} />}
                {/* 打印 外协外购/苏州/五金*/}
                {flowCardType === "print" && isOutsourcing && (
                  <PrintFlowCardFormOutsourcing {...flowCardFormProps} />
                )}
                {/* 打印 返工*/}
                {flowCardType === "print" && isRework && (
                  <PrintFlowCardFormRework {...flowCardFormProps} />
                )}
                {/* 打印 卷装链*/}
                {flowCardType === "print" && isRollChian && (
                  <PrintFlowCardFormRollChain {...flowCardFormProps} />
                )}
                {/** 添加返工流转卡 */}
                {flowCardType === "rework" && (
                  <ReworkCardForm {...reworkCardFormProps} />
                )}
                {flowCardType === "rollChain" && (
                  <FlowCardFormRollChain {...reworkCardFormProps} />
                )}
              </table>
            </Form>
            {finishedPrintProps && printFinishedData?.itmid && (
              <Form
                form={formFinished}
                className={styles["form"]}
                style={{ marginTop: 60 }}
              >
                <div className={styles["form-title"]}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img src={logo} width={128}></img>
                  <>
                    <h2 style={{ textAlign: "center" }}>
                      生产工序流转卡暨派工单
                    </h2>
                    <RenderQRCode
                      title="流转卡编号"
                      name="transferCardCode"
                      value={
                        printFinishedData?.transferCardCode ||
                        printFinishedData?.transferCard ||
                        ""
                      }
                      noTd={true}
                      size={120}
                      form={formFinished}
                    />
                  </>
                </div>
                <table style={{ overflow: "hidden", tableLayout: "fixed" }}>
                  {/* 打印 骨架图*/}
                  {/* {flowCardType === "print" && (
                    <Skeleton active style={{ height: 500 }} />
                  )} */}
                  {/* 打印 标品/非标*/}
                  {flowCardType === "print" && (
                    <PrintFlowCardForm {...flowCardFormPropsPrintFinished} />
                  )}
                </table>
              </Form>
            )}
            {flowCardType !== "print" && (
              <>
                <ConfigProvider
                  theme={{
                    components: {
                      Table: {
                        cellFontSize: 18,
                      },
                    },
                  }}
                >
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
                    className={classNames([
                      styles.flowCardTable,
                      { [styles["flowCardTableRollChain"]]: isRollChian },
                    ])}
                  ></Table>
                  {flowCardType === "flowCard" && data?.materialInfos && (
                    <Table
                      // rowKey={tableData?.[0]?.id ? "id" : "hid"}

                      columns={[
                        { key: "mItmID", dataIndex: "mItmID", title: "料号" },
                        { key: "mName", dataIndex: "mName", title: "品名" },
                        { key: "mspec", dataIndex: "mspec", title: "规格" },
                        {
                          key: "mItmTDID",
                          dataIndex: "mItmTDID",
                          title: "材质",
                        },
                        {
                          key: "storeNumber",
                          dataIndex: "storeNumber",
                          title: "库存数量",
                        },
                        {
                          key: "storeName",
                          dataIndex: "storeName",
                          title: "仓库 - 库位",
                        },
                        // { key: "munit", dataIndex: "munit", title: "规格" },
                      ]}
                      style={{
                        borderRight: "1px solid #000",
                        borderLeft: "1px solid #000",
                        borderTop: "1px solid #000",
                        marginBottom: 10,
                      }}
                      pagination={false}
                      dataSource={data?.materialInfos}
                      className={classNames([
                        styles.flowCardTable,
                        { [styles["flowCardTableRollChain"]]: true },
                      ])}
                    ></Table>
                  )}
                </ConfigProvider>

                {((flowCardType === "rework" &&
                  queryFlowCardApi === "queryReworkBySign") ||
                  flowCardType === "rollChain") && (
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
                  loading={saveLoading}
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
            loading={loading}
          >
            打印
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductionProcessFlowCardAndDispatchList;
