import {
  ITableConfig,
  TFlowCardType,
} from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import {
  IData,
  IEquipmentItem,
  IOperationItem,
  IVerifierItem,
} from "./indexType";
import {
  Button,
  DatePicker,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Select,
} from "antd";
import { TApi, queryProcess } from "@/api";
import { isEmpty } from "lodash";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";

import { formatDate, formatTime, padArray, validateField } from "@/utils";
import { SELF_CHECK_LIST, SUCCESS_CODE } from "@/constants";
import { RenderCustomSelect } from "@/components/RenderCustomSelect";
import { useEffect, useState } from "react";
import { OnlyNumberInput } from "@/components/OnlyNumberInput";
const getRealType = (flowCardType?: TFlowCardType) => {
  switch (flowCardType) {
    case "unfinished":
    case "finished":
      return "common";
    default:
      return flowCardType;
  }
};
export const useTableColumns = ({
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
}: {
  flowCardType: ITableConfig["flowCardType"];
  errors?: any;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
  queryFlowCardApi?: TApi;
  data?: IData;
  operatorList?: IOperationItem[];
  verifierList?: IVerifierItem[];
  equipmentList?: IEquipmentItem[];
}) => {
  const [processList, setProcessList] = useState<string[]>([]);
  useEffect(() => {
    if (SELF_CHECK_LIST.indexOf(flowCardType || "") !== -1) {
      queryProcess().then((res) => {
        if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
          setProcessList([...res?.data?.data]);
        }
      });
    }
  }, []);

  // const debounceGetEquipment = debounce(async function (e) {
  //   try {
  //     setOptions({ ...options, equipmentOptionsLoading: true });
  //     const res = await queryEquipmentInfo({ id: e });
  //     if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
  //       const equipmentData = res?.data?.data || [];
  //       const _options = {
  //         ...options,
  //         equipmentOptions: equipmentData,
  //         equipmentOptionsLoading: false,
  //       };
  //       setOptions(_options);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, 500);
  // const debounceGetEquipmentByName = debounce(async function (e) {
  //   try {
  //     setOptions({ ...options, equipmentOptionsLoading: true });
  //     const res = await queryEquipmentInfo({ name: e });
  //     if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
  //       const equipmentData = res?.data?.data || [];
  //       const _options = {
  //         ...options,
  //         equipmentOptions: equipmentData,
  //         equipmentOptionsLoading: false,
  //       };
  //       setOptions(_options);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, 500);
  // 将数组转成对象
  const operatorListObject: { [key: string]: IOperationItem } = {};
  const operatorListObjectName: { [key: string]: IOperationItem } = {};
  const verifierListObject: { [key: string]: IVerifierItem } = {};
  const verifierListObjectName: { [key: string]: IVerifierItem } = {};
  const equipmentListObject: { [key: string]: IEquipmentItem } = {};
  const equipmentListObjectName: { [key: string]: IEquipmentItem } = {};

  if (operatorList) {
    operatorList.forEach((item) => {
      operatorListObject[item.barcode] = item; // 假设每个item有唯一的id
      operatorListObjectName[item.name] = item;
    });
  }
  if (verifierList) {
    verifierList.forEach((item) => {
      verifierListObject[item.barcode] = item; // 假设每个item有唯一的id
      verifierListObjectName[item.name] = item;
    });
  }
  if (equipmentList) {
    equipmentList.forEach((item) => {
      equipmentListObject[item.barcode] = item;
      equipmentListObjectName[item.name] = item;
    });
  }

  const isAddNewCard = isEmpty(data);
  const columns = {
    common: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
      },

      {
        title: "检验等级",
        dataIndex: "orderid",
        key: "orderid",
      },
      {
        title: "检验员条码",
        dataIndex: "itmid",
        key: "itmid",
      },
      {
        title: "检验员",
        dataIndex: "goodsname",
        key: "goodsname",
      },
      {
        title: "操作工条码",
        dataIndex: "format",
        key: "format",
      },
      {
        title: "操作工",
        dataIndex: "Pcode",
        key: "Pcode",
      },
      {
        title: "完成日期",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
      },
      {
        title: "设备条码",
        dataIndex: "uomname",
        key: "uomname",
      },
      {
        title: "设备名称",
        dataIndex: "supcount",
        key: "supcount",
      },
      {
        title: "产量",
        dataIndex: "sumcount",
        key: "sumcount",
      },
    ],
    outsourcing: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
      },

      {
        title: "检验等级",
        dataIndex: "orderid",
        key: "orderid",
      },
      {
        title: "检验员条码",
        dataIndex: "itmid",
        key: "itmid",
      },
      {
        title: "检验员",
        dataIndex: "goodsname",
        key: "goodsname",
      },
      {
        title: "操作工条码",
        dataIndex: "format",
        key: "format",
      },
      {
        title: "操作工",
        dataIndex: "Pcode",
        key: "Pcode",
      },
      {
        title: "完成日期",
        dataIndex: "ljFinDate",
        key: "ljFinDate",
      },
      {
        title: "设备条码",
        dataIndex: "uomname",
        key: "uomname",
      },
      {
        title: "设备名称",
        dataIndex: "supcount",
        key: "supcount",
      },
      {
        title: "产量(公斤)",
        dataIndex: "sumcount",
        key: "sumcount",
      },
    ],
    flowCard: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
        width: 160,
        render: (text: string) => {
          const needSync = processList?.indexOf(text) !== -1;
          return (
            <>
              {text}
              {needSync ? <span style={{ color: "red" }}>(自检)</span> : <></>}
            </>
          );
        },
      },

      {
        title: "检验等级",
        dataIndex: "inspectionLevel",
        key: "inspectionLevel",
        width: 140,
        needValidate: false,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                allowClear
                style={{ width: "100%" }}
                defaultValue={text}
                size="large"
                onSelect={(e) => {
                  record.inspectionLevel = e;
                  // const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }

                  // cloneErrors[index].inspectionLevel = validateField(
                  //   "检验等级",
                  //   e
                  // );
                  // setErrors(cloneErrors);
                }}
                onClear={() => {
                  delete record.inspectionLevel;
                  // const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].inspectionLevel = validateField(
                  //   "检验等级",
                  //   ""
                  // );
                  // setErrors(cloneErrors);
                }}
                options={[
                  { value: "A+", label: "A+", key: "A+" },
                  { value: "A", label: "A", key: "A" },
                  { value: "B", label: "B", key: "B" },
                  { value: "C", label: "C", key: "C" },
                  { value: "D", label: "D", key: "D" },
                ]}
              ></Select>
              {errors[index]?.inspectionLevel && (
                <span style={{ color: "red" }}>
                  {errors[index]?.inspectionLevel}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "检验员条码",
        dataIndex: "verifyId",
        key: "verifyId",
        width: 160,
        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: verifierList,
            dataListObject: verifierListObject,
            dataListObjectName: verifierListObjectName,
            extendData: {
              dataList: operatorList,
              dataListObject: operatorListObject,
              dataListObjectName: operatorListObjectName,
            },
            themeTitle: "检验员",
            config: {
              name: "verifyName",
              barcode: "verifyId",
            },
            type: "barcode",
            processList,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "检验员",
        dataIndex: "verifyName",
        key: "verifyName",
        width: 130,
        render: (text: any, record: any, index: number) => {
          console.log(text, record, tableData, 1241424);

          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: verifierList,
            extendData: {
              dataList: operatorList,
              dataListObject: operatorListObject,
              dataListObjectName: operatorListObjectName,
            },
            dataListObject: verifierListObject,
            dataListObjectName: verifierListObjectName,
            themeTitle: "检验员",
            config: {
              name: "verifyName",
              barcode: "verifyId",
            },
            type: "name",
            processList,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      // 操作工
      {
        title: "操作工条码",
        dataIndex: "operateId",
        key: "operateId",
        width: 150,
        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: operatorList,
            dataListObject: operatorListObject,
            dataListObjectName: operatorListObjectName,
            themeTitle: "操作工",
            config: {
              name: "operateName",
              barcode: "operateId",
              departmentName: "department",
              syncName: "verifyName",
              syncBarcode: "verifyId",
            },
            type: "barcode",
            processList,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "操作工",
        dataIndex: "operateName",
        key: "operateName",
        width: 130,
        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: operatorList,
            dataListObject: operatorListObject,
            dataListObjectName: operatorListObjectName,
            themeTitle: "操作工",
            config: {
              name: "operateName",
              barcode: "operateId",
              departmentName: "operateDepartment",
              syncName: "verifyName",
              syncBarcode: "verifyId",
            },
            type: "name",
            processList,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "完成日期",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 220,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <DatePicker
                size="large"
                placeholder={""}
                showTime
                value={text ? dayjs(text) : null}
                onChange={(e, date) => {
                  record.finishTime = date || "";
                  const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].finishTime = validateField(
                  //   "完成日期",
                  //   date as string
                  // );

                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              />
              {errors[index]?.finishTime && (
                <span style={{ color: "red" }}>
                  {errors[index]?.finishTime}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "设备条码",
        dataIndex: "equipmentId",
        key: "equipmentId",
        width: 150,
        render: (text: any, record: any, index: number) => {
          //
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: equipmentList,
            dataListObject: equipmentListObject,
            dataListObjectName: equipmentListObjectName,
            themeTitle: "设备条码",
            config: {
              name: "equipmentName",
              barcode: "equipmentId",

              // departmentName: "operateDepartment",
              // syncName: "verifyName",
              // syncBarcode: "verifyId",
            },
            type: "barcode",
            processList,
            mode: "single",
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "设备名称",
        dataIndex: "equipmentName",
        key: "equipmentName",
        width: 150,
        render: (text: any, record: any, index: number) => {
          // return (
          //   <>
          //     <Select
          //       placeholder="查询名称"
          //       allowClear
          //       style={{ width: "100%" }}
          //       value={text}
          //       loading={options?.equipmentOptionsLoading}
          //       onClear={() => {
          //         delete record.equipmentId;
          //         delete record.equipmentName;
          //         const cloneErrors = cloneDeep(errors);
          //         // if (!cloneErrors[index]) {
          //         //   cloneErrors[index] = {};
          //         // }
          //         // cloneErrors[index].equipmentId = validateField(
          //         //   "设备条码",
          //         //   ""
          //         // );
          //         // cloneErrors[index].equipmentName = validateField(
          //         //   "设备名称",
          //         //   ""
          //         // );
          //         setErrors(cloneErrors);
          //       }}
          //       onSelect={(e: string, _record: any) => {
          //         record.equipmentName = e;
          //         const itemIndex = options?.equipmentOptions?.findIndex(
          //           (item: { equipmentId: string; equipmentName: string }) => {
          //             return item.equipmentId === _record?.key;
          //           }
          //         );
          //         const cloneErrors = cloneDeep(errors);
          //         // if (!cloneErrors[index]) {
          //         //   cloneErrors[index] = {};
          //         // }

          //         // cloneErrors[index].equipmentName = validateField(
          //         //   "设备名称",
          //         //   e
          //         // );

          //         if (itemIndex !== -1) {
          //           record.equipmentId =
          //             options?.equipmentOptions[itemIndex]?.equipmentId;
          //           // cloneErrors[index].equipmentId = validateField(
          //           //   "设备条码",
          //           //   record.equipmentId
          //           // );
          //         }
          //         setErrors(cloneErrors);
          //       }}
          //       showSearch
          //     >
          //       {options?.equipmentOptions?.map(
          //         (item: { equipmentId: string; equipmentName: string }) => {
          //           return (
          //             <Select.Option
          //               value={item.equipmentName + "#" + item?.equipmentId}
          //               key={item?.equipmentId}
          //             >
          //               {item.equipmentName}
          //             </Select.Option>
          //           );
          //         }
          //       )}
          //     </Select>
          //     {errors[index]?.equipmentName && (
          //       <span style={{ color: "red" }}>
          //         {errors[index]?.equipmentName}
          //       </span>
          //     )}
          //   </>
          // );
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: equipmentList,
            dataListObject: equipmentListObject,
            dataListObjectName: equipmentListObjectName,
            themeTitle: "设备名称",
            config: {
              name: "equipmentName",
              barcode: "equipmentId",

              // departmentName: "operateDepartment",
              // syncName: "verifyName",
              // syncBarcode: "verifyId",
            },
            type: "name",
            processList,
            mode: "single",
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "产量",
        dataIndex: "productNumber",
        key: "productNumber",
        width: 150,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <OnlyNumberInput
                size="large"
                value={text}
                onChange={(e) => {
                  record.productNumber = e || "";
                  const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].produceNumber = validateField("产量", e);
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></OnlyNumberInput>
              {errors[index]?.productNumber && (
                <span style={{ color: "red" }}>
                  {errors[index]?.productNumber}
                </span>
              )}
            </>
          );
        },
      },
      // {
      //   title: "操作",
      //   dataIndex: "operate",
      //   key: "operate",
      //   width: 50,
      //   render: (text: string, record: any, index: number) => {
      //     return (
      //       <Button
      //         type="primary"
      //         size="middle"
      //         onClick={() => {
      //           console.log(123);
      //         }}
      //       >
      //         保存
      //       </Button>
      //     );
      //   },
      // },
    ],
    print: [],
    rework: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
        width: isAddNewCard ? 100 : 160,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          const needSync = processList?.indexOf(text) !== -1;
          return queryFlowCardApi === "queryReworkBySign" ? (
            <>
              <Input
                size="large"
                style={{ width: "100%" }}
                value={text}
                placeholder="请输入工序"
                onChange={(e) => {
                  record.processName = e?.target?.value;

                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].processName = validateField(
                    "工序",
                    e?.target?.value
                  );
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></Input>
              {errors[index]?.processName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.processName}
                </span>
              )}
            </>
          ) : (
            <>
              {text}
              {needSync ? <span style={{ color: "red" }}>(自检)</span> : <></>}
            </>
          );
        },
      },

      {
        title: "检验等级",
        dataIndex: "inspectionLevel",
        key: "inspectionLevel",
        width: isAddNewCard ? 100 : 140,
        needValidate: false,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                allowClear
                style={{ width: "100%" }}
                value={text}
                disabled={isAddNewCard}
                size="large"
                onSelect={(e) => {
                  record.inspectionLevel = e;
                  // const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }

                  // cloneErrors[index].inspectionLevel = validateField(
                  //   "检验等级",
                  //   e
                  // );
                  // setErrors(cloneErrors);
                }}
                onClear={() => {
                  delete record.inspectionLevel;
                  // const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].inspectionLevel = validateField(
                  //   "检验等级",
                  //   ""
                  // );
                  // setErrors(cloneErrors);
                }}
                options={[
                  { value: "A+", label: "A+", key: "A+" },
                  { value: "A", label: "A", key: "A" },
                  { value: "B", label: "B", key: "B" },
                  { value: "C", label: "C", key: "C" },
                  { value: "D", label: "D", key: "D" },
                ]}
              ></Select>
              {errors[index]?.inspectionLevel && (
                <span style={{ color: "red" }}>
                  {errors[index]?.inspectionLevel}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "检验员条码",
        dataIndex: "verifyId",
        key: "verifyId",
        width: isAddNewCard ? 100 : 160,

        render: (text: any, record: any, index: number) => {
          const props = {
            value: record?.verifierInfoList,
            text,
            columns: columns.rework,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: verifierList,
            dataListObject: verifierListObject,
            dataListObjectName: verifierListObjectName,
            themeTitle: "检验员",
            config: {
              name: "verifyName",
              barcode: "verifyId",
            },
            type: "barcode",
            required: false,
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },

      {
        title: "检验员",
        dataIndex: "verifyName",
        key: "verifyName",
        width: isAddNewCard ? 80 : 130,

        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.rework,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: verifierList,
            dataListObject: verifierListObject,
            dataListObjectName: verifierListObjectName,
            themeTitle: "检验员",
            config: {
              name: "verifyName",
              barcode: "verifyId",
            },
            type: "name",
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "操作工条码",
        dataIndex: "operateId",
        key: "operateId",
        width: isAddNewCard ? 100 : 160,

        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.rework,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: operatorList,
            dataListObject: operatorListObject,
            dataListObjectName: operatorListObjectName,
            themeTitle: "操作工",
            config: {
              name: "operateName",
              barcode: "operateId",
              departmentName: "department",
            },
            type: "barcode",
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "操作工",
        dataIndex: "operateName",
        key: "operateName",
        width: isAddNewCard ? 80 : 130,

        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.rework,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: operatorList,
            dataListObject: operatorListObject,
            dataListObjectName: operatorListObjectName,
            themeTitle: "操作工",
            config: {
              name: "operateName",
              barcode: "operateId",
              departmentName: "department",
            },
            type: "name",
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "完成日期",
        dataIndex: "finishTime",
        key: "finishTime",
        width: isAddNewCard ? 100 : 220,

        render: (text: string, record: any, index: number) => {
          return (
            <>
              <DatePicker
                size="large"
                disabled={isAddNewCard}
                placeholder={""}
                showTime
                value={text ? dayjs(text) : null}
                onChange={(e, date) => {
                  console.log(e, date, 1244122);
                  record.finishTime = date || "";
                  const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].finishTime = validateField(
                  //   "完成日期",
                  //   date as string
                  // );

                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              />
              {errors[index]?.finishTime && (
                <span style={{ color: "red" }}>
                  {errors[index]?.finishTime}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "设备条码",
        dataIndex: "equipmentId",
        key: "equipmentId",
        width: isAddNewCard ? 100 : 150,

        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: equipmentList,
            dataListObject: equipmentListObject,
            dataListObjectName: equipmentListObjectName,
            themeTitle: "设备条码",
            config: {
              name: "equipmentName",
              barcode: "equipmentId",
              // departmentName: "operateDepartment",
              // syncName: "verifyName",
              // syncBarcode: "verifyId",
            },
            type: "barcode",
            processList,
            mode: "single",
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "设备名称",
        dataIndex: "equipmentName",
        key: "equipmentName",
        width: isAddNewCard ? 100 : 150,
        render: (text: any, record: any, index: number) => {
          const props = {
            text,
            columns: columns.flowCard,
            index,
            errors,
            setErrors,
            record,
            tableData,
            setTableData,
            dataList: equipmentList,
            dataListObject: equipmentListObject,
            dataListObjectName: equipmentListObjectName,
            themeTitle: "设备名称",
            config: {
              name: "equipmentName",
              barcode: "equipmentId",

              // departmentName: "operateDepartment",
              // syncName: "verifyName",
              // syncBarcode: "verifyId",
            },
            type: "name",
            processList,
            mode: "single",
            isAddNewCard,
          };
          return <RenderCustomSelect {...props} />;
        },
      },
      {
        title: "产量",
        dataIndex: "productNumber",
        key: "productNumber",
        width: isAddNewCard ? 100 : 140,
        render: (text: string, record: any, index: number) => {
          console.log(text, 1112);
          return (
            <>
              <OnlyNumberInput
                size="large"
                disabled={isAddNewCard}
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => {
                  record.productNumber = e || "";
                  const cloneErrors = cloneDeep(errors);
                  // if (!cloneErrors[index]) {
                  //   cloneErrors[index] = {};
                  // }
                  // cloneErrors[index].produceNumber = validateField("产量", e);
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></OnlyNumberInput>
              {errors[index]?.productNumber && (
                <span style={{ color: "red" }}>
                  {errors[index]?.productNumber}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: 70,
        hidden: queryFlowCardApi !== "queryReworkBySign",
        render: (text: string, record: any, index: number) => {
          return (
            <Popconfirm
              title="确认移除"
              description="你确定要移除这条记录吗？"
              onConfirm={() => {
                // 清除这行的数据和报错
                const cloneData = cloneDeep(tableData);
                cloneData.splice(index, 1);
                setTableData(cloneData);
                const cloneErrors = cloneDeep(errors);
                cloneErrors.splice(index, 1);
                if (setErrors) {
                  setErrors(cloneErrors);
                }
              }}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              <Button type="dashed" danger size="middle">
                移除
              </Button>
            </Popconfirm>
          );
        },
      },
    ],
    rollChain: [
      {
        title: "序号",
        dataIndex: "seq",
        key: "seq",
        width: 120,
        render: (text: string, record: any, index: number) => (
          <span style={{ paddingLeft: 20 }}>{index + 1}</span>
        ),
      },
      {
        title: "品名",
        dataIndex: "name",
        key: "name",
        needValidate: true,
        width: "30%",
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <Input
                size="large"
                placeholder="请输入品名"
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => {
                  record.name = e?.target?.value || "";
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].name = validateField(
                    "品名",
                    e?.target?.value
                  );
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></Input>
              {errors[index]?.name && (
                <span style={{ color: "red" }}>{errors[index]?.name}</span>
              )}
            </>
          );
        },
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        needValidate: true,
        width: "30%",
        render: (text: string, record: any, index: number) => {
          console.log(text, 1112);
          return (
            <>
              <Input
                size="large"
                placeholder="请输入规格"
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => {
                  record.spec = e?.target?.value || "";
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].spec = validateField(
                    "规格",
                    e?.target?.value
                  );
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></Input>
              {errors[index]?.spec && (
                <span style={{ color: "red" }}>{errors[index]?.spec}</span>
              )}
            </>
          );
        },
      },
      {
        title: "字样",
        dataIndex: "trademark",
        key: "trademark",
        width: "30%",
        render: (text: string, record: any, index: number) => {
          console.log(text, 1112);
          return (
            <>
              <Input
                size="large"
                placeholder="请输入字样"
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => {
                  record.trademark = e?.target?.value || "";
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  // cloneErrors[index].trademark = validateField(
                  //   "字样",
                  //   e?.target?.value
                  // );
                  if (setErrors) {
                    setErrors(cloneErrors);
                  }
                }}
              ></Input>
              {errors[index]?.trademark && (
                <span style={{ color: "red" }}>{errors[index]?.trademark}</span>
              )}
            </>
          );
        },
      },
    ],
  };
  return columns[getRealType(flowCardType) || "common"];
};

interface IGetParams {
  form: FormInstance<any>;
  data: IData;
  values: any;
  mainsize: any;
  flowCardType: ITableConfig["flowCardType"];
}

export const getParams = ({
  form,
  data,
  values,
  mainsize,

  flowCardType,
}: IGetParams) => {
  if (!values) {
    return {};
  }

  const params = {
    common: {
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values.orderid,
      //零件料号
      partNumber: values.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values.name,
      //规格
      specs: values.spec,
      //完成时间
      finishTime: values.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values.itmtdid,
      //表面处理
      surfaceTreatment: values.itmtcid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values.traceabilityNumber,
      //客户订单号
      customerOrderNo: values.ordernum,
      //图号
      drawingNumber: values.goodsItmTEID || values.itmTEID,
      //生产公斤数
      productionKg: values.productKg,
      //流转公斤数
      transferKg: values.transferKg,
      //生产PCS数
      productionPcs: values.productPcs,
      //流转PCS数
      transferPcs: Math.floor(values?.transferPcs || 0),
      //供方/炉批号
      // furnaceNo: values.furnaceNo,
      //材料料号
      materialPartNumber: values.mItmID,
      //材料品名
      materialName: values.mName,
      //材料规格
      materialSpec: values.mspec,
      //材料材质
      materialQuality: values.mItmTDID,
      //主要尺寸名字1
      project1Name: mainsize?.project1,
      //主要尺寸名字1内容
      project1Item: mainsize?.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize?.project2,
      //主要尺寸名字2内容
      project2Item: mainsize?.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize?.project3,
      //主要尺寸名字3内容
      project3Item: mainsize?.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize?.project4,
      //主要尺寸名字4内容
      project4Item: mainsize?.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize?.project5,
      //主要尺寸名字5内容
      project5Item: mainsize?.projectitem5,
      //商标
      trademark: values.trademark,
      //追溯单号(半品)
      orderCatchHalf:
        values.orderCatchHalf || values.associationTraceabilityNumber,
      //热处理炉台
      heatTreatmentFurnacePlatform:
        values.heatTreatmentFurnace || values.heatTreatmentFurnacePlatforms,
      //优先顺序
      priorityOrder: values.priority,
      //零件流转时间
      tranferTime:
        (values.transferTime ? formatTime(values.transferTime) : undefined) ||
        values.tranferTime,
      //工艺
      process:
        (data?.processList || [])?.length >= 5
          ? data?.processList
          : padArray(data?.processList || [], 5),

      // pNumber
      pNumber: (form?.getFieldValue("pnumber") as string)?.startsWith("-")
        ? form?.getFieldValue("pnumber")?.slice(1)
        : form?.getFieldValue("pnumber"),
      // parentID
      parentId: data?.id,
      relation: data?.relation,
    },
    outsourcing: {
      //零件类型
      type: data.type,
      //生产订单条码
      barCode: values.orderQRcode,
      //零件料号
      partNumber: values.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values.name,
      //规格
      specs: values.spec,
      //完成时间
      finishTime: values.ljFinDate,
      //单位
      unit: data.unit,
      //材质
      material: values.itmtdid,
      //流转卡编号
      transferCardCode: data.transferCardCode,
      //追溯单号
      traceabilityNumber: values.traceabilityNumber,
      //图号
      drawingNumber: values.goodsItmTEID,
      //生产公斤数(实际pcs也传这个)
      productionKg: values.newsupcount,
      //流转公斤数(实际pcs也传这个)
      transferKg: values.liucount,
      // //生产PCS数
      // productionPcs: !isKg ? values.newsupcount : values.huancount,
      // //流转PCS数
      // transferPcs: (!isKg
      //   ? values.liucount
      //   : form.getFieldValue("liuhuancount")
      // )?.toString(),
      //主要尺寸名字1
      project1Name: mainsize?.project1,
      //主要尺寸名字1内容
      project1Item: mainsize?.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize?.project2,
      //主要尺寸名字2内容
      project2Item: mainsize?.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize?.project3,
      //主要尺寸名字3内容
      project3Item: mainsize?.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize?.project4,
      //主要尺寸名字4内容
      project4Item: mainsize?.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize?.project5,
      //主要尺寸名字5内容
      project5Item: mainsize?.projectitem5,
      //商标
      trademark: values.trademark,
      //工艺
      process: data?.processList?.map((item, index) => ({
        ...item,
        seq: index + 1,
      })),
      //行号
      lineNumber: values.u9LineNo,
      // parentID
      parentId: data.id,
    },
    flowCard: {
      // orderid: values?.orderid,
      // id
      // id: data.id,
      // barCode: values.barCode,
      // 炉批号
      furnaceNo: values.furnaceNo || "",
      // 供方
      supplierName: values.supplierName,
      // 追溯单号(半品)
      // orderCatchHalf: values.orderCatchHalf,
      // 备注
      remark: values.remark,
      // 优先顺序
      // priorityOrder: values.priorityOrderpriorityOrder,
      transferCardCode: data?.transferCardCode,
      // 追溯单号（半品）
      orderCatchHalf: values.orderCatchHalf,
      // 追溯单号
      traceabilityNumber: values.traceabilityNumber,
      orderid: values?.orderid,
      itmid: values.itmid,
      U9LineNo: data.u9LineNo,
    },
    print: {},
    rework: {
      //物料类型
      productType: values.productType,
      //返工类型
      reworkType: values.reworkType,
      //流转卡编号
      transferCardCode: values.transferCardCode,
      //返工流转卡编号
      reworkTransferCardCode: data?.reworkTransferCardCode,
      // 追溯单号
      traceabilityNumber: values.traceabilityNumber,
      //评审单号
      reworkNumber: values.reworkNumber,
      //料号
      partNumber: values.partNumber,
      // 品名
      name: values.name,
      //规格
      spec: values.spec,
      //返工流程
      reworkFlow: values.reworkFlow,
      //开单人
      drawer: values.drawer,
      //返工数量
      reworkQuantity: values.reworkQuantity,
      //返工单位
      reworkUnit: values.reworkUnit,
      //材质
      material: values.material,
      //商标
      trademark: values.trademark,
      //改制
      reformMaterial: values.reformMaterial || "",
      reformName: values.reformName || "",
      reformPartNumber: values.reformPartNumber || "",
      reformSpec: values.reformSpec || "",
      // //工序
      // detailProcesses: tableData.map((item, index) => {
      //   const {
      //     processName = "",
      //     inspectionLevel = "",
      //     verifyId = [],
      //     verifyName = [],
      //     operateId = [],
      //     operateName = [],
      //     finishTime = "",
      //     equipmentId = "",
      //     equipmentName = "",
      //     produceNumber = "",
      //     operateDepartment = [],
      //     unit = "",
      //   } = item || {};
      //   const verifierInfoList =
      //     verifyId?.map((item: string, index: number) => {
      //       return {
      //         verifyId: item,
      //         verifyName: verifyName?.[index],
      //       };
      //     }) || [];
      //   const operationInfoList =
      //     operateId?.map((item: string, index: number) => {
      //       return {
      //         operationId: item,
      //         operationName: operateName?.[index],
      //         operateDepartment: operateDepartment?.[index],
      //       };
      //     }) || [];

      //   return {
      //     processName,
      //     inspectionLevel,
      //     verifierInfoList,
      //     operationInfoList,
      //     finishTime,
      //     equipmentId,
      //     equipmentName,
      //     produceNumber,
      //     unit,
      //     processSeq: index + 1,
      //   };
      // }),
    },
    rollChain: {
      drawer: values?.drawer,
      drawerId: values?.drawerId,
      rollTime: formatDate(values?.rollTime),
    },
  };

  return params[getRealType(flowCardType) || "common"];
};
