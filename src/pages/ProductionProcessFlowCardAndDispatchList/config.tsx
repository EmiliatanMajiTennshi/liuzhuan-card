import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { IData } from "./indexType";
import {
  Button,
  DatePicker,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Select,
} from "antd";
import {
  TApi,
  queryEquipmentInfo,
  queryOperationInfo,
  queryTestInfo,
} from "@/api";
import { debounce } from "lodash";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";

import { formatTime, handleSave, validateField } from "@/utils";
import { SUCCESS_CODE } from "@/constants";

export const getTableColumns = ({
  flowCardType,
  options,
  setOptions,
  errors,
  setErrors,
  tableData,
  setTableData,
  queryFlowCardApi,
  data,
}: {
  flowCardType: ITableConfig["flowCardType"];
  options: AnyObject;
  setOptions: React.Dispatch<React.SetStateAction<AnyObject>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
  queryFlowCardApi?: TApi;
  data?: IData;
}) => {
  // 防抖
  // 检验员
  const debounceGetInspector = debounce(async function (e) {
    try {
      setOptions({ ...options, inspectorOptionsLoading: true });
      const res = await queryTestInfo({ id: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const inspectorData = res?.data?.data || [];
        const _options = {
          ...options,
          inspectorOptions: inspectorData,
          inspectorOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
  const debounceGetInspectorByName = debounce(async function (e) {
    try {
      setOptions({ ...options, inspectorOptionsLoading: true });
      const res = await queryTestInfo({ name: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const inspectorData = res?.data?.data || [];
        const _options = {
          ...options,
          inspectorOptions: inspectorData,
          inspectorOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
  // 操作工
  const debounceGetOperator = debounce(async function (e) {
    try {
      setOptions({ ...options, operatorOptionsLoading: true });
      const res = await queryOperationInfo({ id: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const operatorData = res?.data?.data || [];
        const _options = {
          ...options,
          operatorOptions: operatorData,
          operatorOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
  const debounceGetOperatorByName = debounce(async function (e) {
    try {
      setOptions({ ...options, operatorOptionsLoading: true });
      const res = await queryOperationInfo({ name: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const operatorData = res?.data?.data || [];
        const _options = {
          ...options,
          operatorOptions: operatorData,
          operatorOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
  // 设备
  const debounceGetEquipment = debounce(async function (e) {
    try {
      setOptions({ ...options, equipmentOptionsLoading: true });
      const res = await queryEquipmentInfo({ id: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const equipmentData = res?.data?.data || [];
        const _options = {
          ...options,
          equipmentOptions: equipmentData,
          equipmentOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
  const debounceGetEquipmentByName = debounce(async function (e) {
    try {
      setOptions({ ...options, equipmentOptionsLoading: true });
      const res = await queryEquipmentInfo({ name: e });
      if (res?.data?.code === SUCCESS_CODE) {
        const equipmentData = res?.data?.data || [];
        const _options = {
          ...options,
          equipmentOptions: equipmentData,
          equipmentOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);

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
        width: 120,
      },

      {
        title: "检验等级",
        dataIndex: "inspectionLevel",
        key: "inspectionLevel",
        width: 140,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="选择等级"
                allowClear
                style={{ width: "100%" }}
                defaultValue={text}
                onSelect={(e) => {
                  record.inspectionLevel = e;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].inspectionLevel = validateField(
                    "检验等级",
                    e
                  );
                  setErrors(cloneErrors);
                }}
                onClear={() => {
                  delete record.inspectionLevel;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].inspectionLevel = validateField(
                    "检验等级",
                    ""
                  );
                  setErrors(cloneErrors);
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
        dataIndex: "verifierBarcode",
        key: "verifierBarcode",
        width: 160,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.inspectorOptionsLoading}
                onClear={() => {
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    ""
                  );
                  cloneErrors[index].verifierName = validateField("检验员", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.verifierBarcode = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testId === e;
                    }
                  );
                  record.verifierName =
                    options?.inspectorOptions?.[itemIndex]?.testName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    e
                  );
                  if (itemIndex !== -1) {
                    cloneErrors[index].verifierName = validateField(
                      "检验员",
                      record.verifierName
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetInspector(e);
                }}
              >
                {options?.inspectorOptions?.map(
                  (item: { testId: string; testName: string }) => {
                    return (
                      <Select.Option value={item?.testId} key={item?.testId}>
                        {item?.testId}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.verifierBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.verifierBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "检验员",
        dataIndex: "verifierName",
        key: "verifierName",
        width: 120,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                allowClear
                placeholder="查询姓名"
                value={text}
                style={{ width: "100%" }}
                onClear={() => {
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    ""
                  );
                  cloneErrors[index].verifierName = validateField("检验员", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e, a) => {
                  record.verifierName = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testName === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierName = validateField("检验员", e);
                  if (itemIndex !== -1) {
                    record.verifierBarcode =
                      options?.inspectorOptions[itemIndex].testId;

                    cloneErrors[index].verifierBarcode = validateField(
                      "检验员条码",
                      record.verifierBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetInspectorByName(e);
                }}
              >
                {options?.inspectorOptions?.map(
                  (item: { testId: string; testName: string }) => {
                    return (
                      <Select.Option value={item?.testName} key={item?.testId}>
                        {item.testName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.verifierName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.verifierName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "操作工条码",
        dataIndex: "operatorBarcode",
        key: "operatorBarcode",
        width: 150,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  delete record.operatorBarcode;
                  delete record.operatorName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    ""
                  );
                  cloneErrors[index].operatorName = validateField("操作工", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.operatorBarcode = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationId === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    e
                  );

                  if (itemIndex !== -1) {
                    record.operatorName =
                      options?.operatorOptions[itemIndex].operationName;
                    cloneErrors[index].operatorName = validateField(
                      "操作工",
                      e
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetOperator(e);
                }}
              >
                {options?.operatorOptions?.map(
                  (item: { operationId: string; operationName: string }) => {
                    return (
                      <Select.Option
                        value={item.operationId}
                        key={item?.operationId}
                      >
                        {item.operationId}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.operatorBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.operatorBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "操作工",
        dataIndex: "operatorName",
        key: "operatorName",
        width: 120,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询姓名"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  delete record.operatorName;
                  delete record.operatorBarcode;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    ""
                  );
                  cloneErrors[index].operatorName = validateField("操作工", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.operatorName = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationName === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].operatorName = validateField("操作工", e);

                  if (itemIndex !== -1) {
                    record.operatorBarcode =
                      options?.operatorOptions[itemIndex].operationId;
                    cloneErrors[index].operatorBarcode = validateField(
                      "操作工条码",
                      record.operatorBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetOperatorByName(e);
                }}
              >
                {options?.operatorOptions?.map(
                  (item: { operationId: string; operationName: string }) => {
                    return (
                      <Select.Option
                        value={item.operationName}
                        key={item?.operationId}
                      >
                        {item.operationName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.operatorName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.operatorName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "完成日期",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 220,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <DatePicker
                showTime
                value={text ? dayjs(text) : null}
                onChange={(e, date) => {
                  record.finishTime = date;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].finishTime = validateField(
                    "完成日期",
                    date as string
                  );

                  setErrors(cloneErrors);
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
        dataIndex: "equipmentBarcode",
        key: "equipmentBarcode",
        width: 150,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  delete record.equipmentBarcode;
                  delete record.equipmentName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    ""
                  );
                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    ""
                  );
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.equipmentBarcode = e;
                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    e
                  );

                  if (itemIndex !== -1) {
                    record.equipmentName =
                      options?.equipmentOptions[itemIndex]?.equipmentName;
                    cloneErrors[index].equipmentName = validateField(
                      "设备名称",
                      record.equipmentName
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetEquipment(e);
                }}
              >
                {options?.equipmentOptions?.map(
                  (item: { equipmentId: string; equipmentName: string }) => {
                    return (
                      <Select.Option
                        value={item?.equipmentId || item?.equipmentName}
                        key={item?.equipmentId || item?.equipmentName}
                      >
                        {item?.equipmentId || item?.equipmentName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.equipmentBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.equipmentBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "设备名称",
        dataIndex: "equipmentName",
        key: "equipmentName",
        needValidate: true,
        width: 150,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询名称"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  delete record.equipmentBarcode;
                  delete record.equipmentName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    ""
                  );
                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    ""
                  );
                  setErrors(cloneErrors);
                }}
                onSelect={(e: string, _record: any) => {
                  record.equipmentName = e;
                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === _record?.key;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    e
                  );
                  setErrors(cloneErrors);
                  if (itemIndex !== -1) {
                    record.equipmentBarcode =
                      options?.equipmentOptions[itemIndex]?.equipmentId;
                    cloneErrors[index].equipmentBarcode = validateField(
                      "设备条码",
                      record.equipmentBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetEquipmentByName(e);
                }}
              >
                {options?.equipmentOptions?.map(
                  (item: { equipmentId: string; equipmentName: string }) => {
                    return (
                      <Select.Option
                        value={item.equipmentName + "#" + item?.equipmentId}
                        key={item?.equipmentId}
                      >
                        {item.equipmentName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.equipmentName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.equipmentName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "产量(公斤)",
        dataIndex: "produceNumber",
        key: "produceNumber",
        width: 120,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <InputNumber
                placeholder="请输入产量"
                value={text}
                controls={false}
                onChange={(e) => {
                  record.produceNumber = e;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].produceNumber = validateField("产量", e);
                  setErrors(cloneErrors);
                }}
              ></InputNumber>
              {errors[index]?.produceNumber && (
                <span style={{ color: "red" }}>
                  {errors[index]?.produceNumber}
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
        width: 50,
        render: (text: string, record: any, index: number) => {
          return (
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                handleSave({
                  record,
                  columns: columns.flowCard,
                  index,
                  errors,
                  setErrors,
                  data,
                });
              }}
            >
              保存
            </Button>
          );
        },
      },
    ],
    print: [],
    rework: [
      {
        title: "工序",
        dataIndex: "processName",
        key: "processName",
        width: 140,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return queryFlowCardApi === "queryQR" ? (
            <>
              <Input
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
                  setErrors(cloneErrors);
                }}
              ></Input>
              {errors[index]?.processName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.processName}
                </span>
              )}
            </>
          ) : (
            text
          );
        },
      },

      {
        title: "检验等级",
        dataIndex: "inspectionLevel",
        key: "inspectionLevel",
        width: 140,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="选择等级"
                allowClear
                style={{ width: "100%" }}
                value={text}
                onSelect={(e) => {
                  record.inspectionLevel = e;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].inspectionLevel = validateField(
                    "检验等级",
                    e
                  );
                  setErrors(cloneErrors);
                }}
                onClear={() => {
                  delete record.inspectionLevel;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].inspectionLevel = validateField(
                    "检验等级",
                    ""
                  );
                  setErrors(cloneErrors);
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
        dataIndex: "verifierBarcode",
        key: "verifierBarcode",
        width: 160,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.inspectorOptionsLoading}
                onClear={() => {
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    ""
                  );
                  cloneErrors[index].verifierName = validateField("检验员", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.verifierBarcode = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testId === e;
                    }
                  );
                  record.verifierName =
                    options?.inspectorOptions?.[itemIndex]?.testName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    e
                  );
                  if (itemIndex !== -1) {
                    cloneErrors[index].verifierName = validateField(
                      "检验员",
                      record.verifierName
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetInspector(e);
                }}
              >
                {options?.inspectorOptions?.map(
                  (item: { testId: string; testName: string }) => {
                    return (
                      <Select.Option value={item?.testId} key={item?.testId}>
                        {item?.testId}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.verifierBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.verifierBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "检验员",
        dataIndex: "verifierName",
        key: "verifierName",
        width: 120,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                allowClear
                placeholder="查询姓名"
                value={text}
                style={{ width: "100%" }}
                onClear={() => {
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierBarcode = validateField(
                    "检验员条码",
                    ""
                  );
                  cloneErrors[index].verifierName = validateField("检验员", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e, a) => {
                  record.verifierName = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testName === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].verifierName = validateField("检验员", e);
                  if (itemIndex !== -1) {
                    record.verifierBarcode =
                      options?.inspectorOptions[itemIndex].testId;

                    cloneErrors[index].verifierBarcode = validateField(
                      "检验员条码",
                      record.verifierBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetInspectorByName(e);
                }}
              >
                {options?.inspectorOptions?.map(
                  (item: { testId: string; testName: string }) => {
                    return (
                      <Select.Option value={item?.testName} key={item?.testId}>
                        {item.testName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.verifierName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.verifierName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "操作工条码",
        dataIndex: "operatorBarcode",
        key: "operatorBarcode",
        width: 150,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  delete record.operatorBarcode;
                  delete record.operatorName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    ""
                  );
                  cloneErrors[index].operatorName = validateField("操作工", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.operatorBarcode = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationId === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    e
                  );

                  if (itemIndex !== -1) {
                    record.operatorName =
                      options?.operatorOptions[itemIndex].operationName;
                    cloneErrors[index].operatorName = validateField(
                      "操作工",
                      e
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetOperator(e);
                }}
              >
                {options?.operatorOptions?.map(
                  (item: { operationId: string; operationName: string }) => {
                    return (
                      <Select.Option
                        value={item.operationId}
                        key={item?.operationId}
                      >
                        {item.operationId}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.operatorBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.operatorBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "操作工",
        dataIndex: "operatorName",
        key: "operatorName",
        width: 120,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询姓名"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  delete record.operatorName;
                  delete record.operatorBarcode;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].operatorBarcode = validateField(
                    "操作工条码",
                    ""
                  );
                  cloneErrors[index].operatorName = validateField("操作工", "");
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.operatorName = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationName === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].operatorName = validateField("操作工", e);

                  if (itemIndex !== -1) {
                    record.operatorBarcode =
                      options?.operatorOptions[itemIndex].operationId;
                    cloneErrors[index].operatorBarcode = validateField(
                      "操作工条码",
                      record.operatorBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetOperatorByName(e);
                }}
              >
                {options?.operatorOptions?.map(
                  (item: { operationId: string; operationName: string }) => {
                    return (
                      <Select.Option
                        value={item.operationName}
                        key={item?.operationId}
                      >
                        {item.operationName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.operatorName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.operatorName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "完成日期",
        dataIndex: "finishTime",
        key: "finishTime",
        width: 220,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <DatePicker
                showTime
                value={text ? dayjs(text) : null}
                onChange={(e, date) => {
                  record.finishTime = date;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].finishTime = validateField(
                    "完成日期",
                    date as string
                  );

                  setErrors(cloneErrors);
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
        dataIndex: "equipmentBarcode",
        key: "equipmentBarcode",
        width: 150,
        needValidate: true,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询条码"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  delete record.equipmentBarcode;
                  delete record.equipmentName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    ""
                  );
                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    ""
                  );
                  setErrors(cloneErrors);
                }}
                onSelect={(e) => {
                  record.equipmentBarcode = e;
                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === e;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    e
                  );

                  if (itemIndex !== -1) {
                    record.equipmentName =
                      options?.equipmentOptions[itemIndex]?.equipmentName;
                    cloneErrors[index].equipmentName = validateField(
                      "设备名称",
                      record.equipmentName
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetEquipment(e);
                }}
              >
                {options?.equipmentOptions?.map(
                  (item: { equipmentId: string; equipmentName: string }) => {
                    return (
                      <Select.Option
                        value={item?.equipmentId || item?.equipmentName}
                        key={item?.equipmentId || item?.equipmentName}
                      >
                        {item?.equipmentId || item?.equipmentName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.equipmentBarcode && (
                <span style={{ color: "red" }}>
                  {errors[index]?.equipmentBarcode}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "设备名称",
        dataIndex: "equipmentName",
        key: "equipmentName",
        needValidate: true,
        width: 150,
        render: (text: any, record: any, index: number) => {
          return (
            <>
              <Select
                placeholder="查询名称"
                allowClear
                style={{ width: "100%" }}
                value={text}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  delete record.equipmentBarcode;
                  delete record.equipmentName;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].equipmentBarcode = validateField(
                    "设备条码",
                    ""
                  );
                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    ""
                  );
                  setErrors(cloneErrors);
                }}
                onSelect={(e: string, _record: any) => {
                  record.equipmentName = e;
                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === _record?.key;
                    }
                  );
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }

                  cloneErrors[index].equipmentName = validateField(
                    "设备名称",
                    e
                  );
                  setErrors(cloneErrors);
                  if (itemIndex !== -1) {
                    record.equipmentBarcode =
                      options?.equipmentOptions[itemIndex]?.equipmentId;
                    cloneErrors[index].equipmentBarcode = validateField(
                      "设备条码",
                      record.equipmentBarcode
                    );
                  }
                  setErrors(cloneErrors);
                }}
                showSearch
                onSearch={(e) => {
                  debounceGetEquipmentByName(e);
                }}
              >
                {options?.equipmentOptions?.map(
                  (item: { equipmentId: string; equipmentName: string }) => {
                    return (
                      <Select.Option
                        value={item.equipmentName + "#" + item?.equipmentId}
                        key={item?.equipmentId}
                      >
                        {item.equipmentName}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
              {errors[index]?.equipmentName && (
                <span style={{ color: "red" }}>
                  {errors[index]?.equipmentName}
                </span>
              )}
            </>
          );
        },
      },
      {
        title: "产量(公斤)",
        dataIndex: "produceNumber",
        key: "produceNumber",
        width: 140,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <InputNumber
                placeholder="请输入产量"
                style={{ width: "100%" }}
                value={text}
                controls={false}
                onChange={(e) => {
                  record.produceNumber = e;
                  const cloneErrors = cloneDeep(errors);
                  if (!cloneErrors[index]) {
                    cloneErrors[index] = {};
                  }
                  cloneErrors[index].produceNumber = validateField("产量", e);
                  setErrors(cloneErrors);
                }}
              ></InputNumber>
              {errors[index]?.produceNumber && (
                <span style={{ color: "red" }}>
                  {errors[index]?.produceNumber}
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
        render: (text: string, record: any, index: number) => {
          return queryFlowCardApi === "queryQR" ? (
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
                setErrors(cloneErrors);
              }}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              <Button type="dashed" danger size="middle">
                移除
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                handleSave({
                  flowCardType,
                  record,
                  columns: columns.flowCard,
                  index,
                  errors,
                  setErrors,
                });
              }}
            >
              保存
            </Button>
          );
        },
      },
    ],
  };
  return columns[flowCardType || "common"];
};

interface IGetParams {
  form: FormInstance<any>;
  data: IData;
  values: any;
  mainsize: any;
  isKg: boolean;
  flowCardType: ITableConfig["flowCardType"];
  remark?: string;
  dataString?: string;
  tableData: any[];
}
export const getParams = ({
  form,
  data,
  values,
  mainsize,
  isKg,
  flowCardType,
  remark,
  dataString,
  tableData,
}: IGetParams) => {
  const params = {
    common: {
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values?.orderQRcode,
      //零件料号
      partNumber: values?.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values?.name,
      //规格
      specs: values?.spec,
      //完成时间
      finishTime: values?.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values?.itmtdid,
      //表面处理
      surfaceTreatment: values?.itmtcid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //客户订单号
      customerOrderNo: values?.ordernum,
      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: isKg ? values?.liucount : values?.liuhuancount,
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: !isKg ? values?.liucount : values?.liuhuancount,
      //供方/炉批号
      furnaceNo: values.furnaceNo,
      //材料料号
      materialPartNumber: values.mItmID,
      //材料品名
      materialName: values.mName,
      //材料规格
      materialSpec: values.mspec,
      //材料材质
      materialQuality: values.mItmTDID,
      //主要尺寸名字1
      project1Name: mainsize.project1,
      //主要尺寸名字1内容
      project1Item: mainsize.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize.project2,
      //主要尺寸名字2内容
      project2Item: mainsize.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize.project3,
      //主要尺寸名字3内容
      project3Item: mainsize.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize.project4,
      //主要尺寸名字4内容
      project4Item: mainsize.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize.project5,
      //主要尺寸名字5内容
      project5Item: mainsize.projectitem5,
      //商标
      trademark: values.trademark,
      //追溯单号(半品)
      orderCatchHalf: values.orderCatchHalf,
      //热处理炉台
      heatTreatmentFurnacePlatform: values.heatTreatmentFurnace,
      //优先顺序
      priorityOrder: values.priority,
      //零件流转时间
      tranferTime: formatTime(values.transferTime),
      //工艺
      process: data?.processList,
      // pNumber
      pNumber: form.getFieldValue("pnumber"),
      // parentID
      parentId: data?.id,
    },
    outsourcing: {
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values?.orderQRcode,
      //零件料号
      partNumber: values?.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values?.name,
      //规格
      specs: values?.spec,
      //完成时间
      finishTime: values?.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values?.itmtdid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: (isKg ? values?.liucount : values?.liuhuancount)?.toString(),
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: (!isKg
        ? values?.liucount
        : values?.liuhuancount
      )?.toString(),
      //主要尺寸名字1
      project1Name: mainsize.project1,
      //主要尺寸名字1内容
      project1Item: mainsize.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize.project2,
      //主要尺寸名字2内容
      project2Item: mainsize.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize.project3,
      //主要尺寸名字3内容
      project3Item: mainsize.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize.project4,
      //主要尺寸名字4内容
      project4Item: mainsize.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize.project5,
      //主要尺寸名字5内容
      project5Item: mainsize.projectitem5,
      //商标
      trademark: values.trademark,
      //工艺
      process: data?.processList,
      //行号
      lineNumber: values?.u9LineNo,
      // parentID
      parentId: data?.id,
    },
    flowCard: {
      // id
      id: data?.id,
      // 炉批号
      furnaceNo: values?.furnaceNo,
      // 供方
      supplierName: values?.supplierName,
      // 追溯单号(半品)
      orderCatchHalf: values?.orderCatchHalf,
      // 备注
      remark: values?.remark,
      // 优先顺序
      priorityOrder: values?.priorityOrderpriorityOrder,
    },
    print: {},
    rework: {
      //物料类型
      productType: values?.productType,
      //返工类型
      reworkType: values?.reworkType,
      //流转卡编号
      transferCardCode: values?.transferCardCode,
      //返工流转卡编号
      reworkTransferCardCode: dataString || data?.reworkTransferCardCode,
      // 追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //评审单号
      reworkNumber: values?.reworkNumber,
      //料号
      partNumber: values?.partNumber,
      // 品名
      name: values?.name,
      //规格
      spec: values?.spec,
      //返工流程
      reworkFlow: values?.reworkFlow,
      //开单人
      drawer: values?.drawer,
      //返工数量
      reworkQuantity: values?.reworkQuantity,
      //返工单位
      reworkUnit: values?.reworkUnit,
      //材质
      material: values?.material,
      //商标
      trademark: values?.trademark,
      //工序
      detailProcesses: tableData.map((item, index) => {
        return {
          ...item,
          processSeq: index + 1,
        };
      }),
    },
  };

  return params[flowCardType || "common"];
};
