import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { IData } from "./indexType";
import {
  Button,
  DatePicker,
  FormInstance,
  InputNumber,
  Select,
  message,
} from "antd";
import {
  insertSaveTransferCard,
  queryEquipmentInfo,
  queryOperationInfo,
  queryTestInfo,
} from "@/api";
import { debounce } from "lodash";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";

export const getTableColumns = ({
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
}: {
  flowCardType: ITableConfig["flowCardType"];
  options: AnyObject;
  setOptions: React.Dispatch<React.SetStateAction<AnyObject>>;
  currentInspector: AnyObject[];
  setCurrentInspector: React.Dispatch<React.SetStateAction<AnyObject[]>>;
  currentOperator: AnyObject[];
  setCurrentOperator: React.Dispatch<React.SetStateAction<AnyObject[]>>;
  currentEquipment: AnyObject[];
  setCurrentEquipment: React.Dispatch<React.SetStateAction<AnyObject[]>>;
  errors: AnyObject;
  setErrors: React.Dispatch<React.SetStateAction<AnyObject>>;
}) => {
  // 防抖
  // 检验员
  const debounceGetInspector = debounce(async function (e) {
    try {
      setOptions({ ...options, inspectorOptionsLoading: true });
      const res = await queryTestInfo({ id: e });
      if (res?.data?.code === 20000) {
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
      if (res?.data?.code === 20000) {
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
      if (res?.data?.code === 20000) {
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
      if (res?.data?.code === 20000) {
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
      if (res?.data?.code === 20000) {
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
      if (res?.data?.code === 20000) {
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
  // 校验
  const validateField = (field: string, value: string | number | null) => {
    if (!value && value !== 0) {
      return `请输入${field}`;
    }
    return "";
  };
  // 保存时手动校验
  const handleSave = ({ record, columns, index }: any) => {
    const newErrors: AnyObject = {};

    columns.forEach((item: any) => {
      if (item.needValidate) {
        const error = validateField(item.title, record[item.key]);
        if (error) {
          newErrors[item.key] = {
            ...errors?.[item.key],
            [index]: error,
          };
        }
      }
    });

    setErrors({ ...errors, ...newErrors });
    if (Object.keys(newErrors).length === 0) {
      console.log("Record saved:", record);
      insertSaveTransferCard({ ...record, hunit: "公斤" }).then((res) => {
        if (res?.data?.code === 20000) {
          message.success(res?.data?.data);
        }
      });
    } else {
      message.error("请修正表单中的错误");
    }
  };
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
                  setErrors({
                    ...errors,

                    inspectionLevel: {
                      ...errors?.inspectionLevel,
                      [index]: validateField("检验等级", e),
                    },
                  });
                }}
                onClear={() => {
                  delete record.inspectionLevel;
                  setErrors({
                    ...errors,
                    inspectionLevel: {
                      ...errors?.inspectionLevel,
                      [index]: validateField("检验等级", ""),
                    },
                  });
                }}
                options={[
                  { value: "A+", label: "A+", key: "A+" },
                  { value: "A", label: "A", key: "A" },
                  { value: "B", label: "B", key: "B" },
                  { value: "C", label: "C", key: "C" },
                  { value: "D", label: "D", key: "D" },
                ]}
              ></Select>
              {errors["inspectionLevel"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["inspectionLevel"]?.[index]}
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
                defaultValue={text}
                value={currentInspector?.[index]?.testId}
                loading={options?.inspectorOptionsLoading}
                onClear={() => {
                  const _currentInspector = cloneDeep(currentInspector);
                  _currentInspector[index] = {
                    testName: "",
                    testId: "",
                  };
                  setCurrentInspector(_currentInspector);
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  setErrors({
                    ...errors,
                    verifierName: {
                      ...errors?.verifierName,
                      [index]: validateField("检验员", ""),
                    },
                    verifierBarcode: {
                      ...errors?.verifierBarcode,
                      [index]: validateField("检验员条码", ""),
                    },
                  });
                }}
                onSelect={(e) => {
                  record.verifierBarcode = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testId === e;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentInspector = cloneDeep(currentInspector);
                    _currentInspector[index] =
                      options?.inspectorOptions[itemIndex];
                    record.verifierName = _currentInspector?.[index]?.testName;
                    setCurrentInspector(_currentInspector);
                    setErrors({
                      ...errors,
                      verifierName: {
                        ...errors?.verifierName,
                        [index]: validateField("检验员", record.verifierName),
                      },
                      verifierBarcode: {
                        ...errors?.verifierBarcode,
                        [index]: validateField("检验员条码", e),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      verifierBarcode: {
                        ...errors?.verifierBarcode,
                        [index]: validateField("检验员条码", e),
                      },
                    });
                  }
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
              {errors["verifierBarcode"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["verifierBarcode"]?.[index]}
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
                defaultValue={text}
                style={{ width: "100%" }}
                onClear={() => {
                  const _currentInspector = cloneDeep(currentInspector);
                  _currentInspector[index] = {
                    testName: "",
                    testId: "",
                  };
                  setCurrentInspector(_currentInspector);
                  delete record.verifierBarcode;
                  delete record.verifierName;
                  setErrors({
                    ...errors,
                    verifierName: {
                      ...errors?.verifierName,
                      [index]: validateField("检验员", ""),
                    },
                    verifierBarcode: {
                      ...errors?.verifierBarcode,
                      [index]: validateField("检验员条码", ""),
                    },
                  });
                }}
                value={currentInspector?.[index]?.testName}
                onSelect={(e, a) => {
                  record.verifierName = e;
                  const itemIndex = options?.inspectorOptions?.findIndex(
                    (item: { testId: string; testName: string }) => {
                      return item.testName === e;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentInspector = cloneDeep(currentInspector);
                    _currentInspector[index] =
                      options?.inspectorOptions[itemIndex];
                    record.verifierBarcode = _currentInspector?.[index]?.testId;
                    setCurrentInspector(_currentInspector);
                    setErrors({
                      ...errors,
                      verifierName: {
                        ...errors?.verifierName,
                        [index]: validateField("检验员", e),
                      },
                      verifierBarcode: {
                        ...errors?.verifierBarcode,
                        [index]: validateField(
                          "检验员条码",
                          record.verifierBarcode
                        ),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      verifierName: {
                        ...errors?.verifierName,
                        [index]: validateField("检验员", e),
                      },
                    });
                  }
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
              {errors["verifierName"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["verifierName"]?.[index]}
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
                defaultValue={text}
                style={{ width: "100%" }}
                value={currentOperator?.[index]?.operationId}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  const _currentOperator = cloneDeep(currentOperator);
                  _currentOperator[index] = {
                    operationName: "",
                    operationId: "",
                  };
                  setCurrentOperator(_currentOperator);
                  delete record.operatorBarcode;
                  delete record.operatorName;
                  setErrors({
                    ...errors,
                    operatorName: {
                      ...errors?.operatorName,
                      [index]: validateField("操作工", ""),
                    },
                    operatorBarcode: {
                      ...errors?.Barcode,
                      [index]: validateField("操作工条码", ""),
                    },
                  });
                }}
                onSelect={(e) => {
                  record.operatorBarcode = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationId === e;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentOperator = cloneDeep(currentOperator);
                    _currentOperator[index] =
                      options?.operatorOptions[itemIndex];
                    record.operatorName =
                      _currentOperator?.[index]?.operationName;
                    setCurrentOperator(_currentOperator);
                    setErrors({
                      ...errors,
                      operatorName: {
                        ...errors?.operatorName,
                        [index]: validateField("操作工", record.operatorName),
                      },
                      operatorBarcode: {
                        ...errors?.Barcode,
                        [index]: validateField("操作工条码", e),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      operatorBarcode: {
                        ...errors?.Barcode,
                        [index]: validateField("操作工条码", e),
                      },
                    });
                  }
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
              {errors["operatorBarcode"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["operatorBarcode"]?.[index]}
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
                defaultValue={text}
                placeholder="查询姓名"
                allowClear
                style={{ width: "100%" }}
                value={currentOperator?.[index]?.operationName}
                loading={options?.operatorOptionsLoading}
                onClear={() => {
                  const _currentOperator = cloneDeep(currentOperator);
                  _currentOperator[index] = {
                    operatorName: "",
                    operationId: "",
                  };
                  setCurrentOperator(_currentOperator);
                  delete record.operatorName;
                  delete record.operatorBarcode;
                  setErrors({
                    ...errors,
                    operatorName: {
                      ...errors?.operatorName,
                      [index]: validateField("操作工", ""),
                    },
                    operatorBarcode: {
                      ...errors?.Barcode,
                      [index]: validateField("操作工条码", ""),
                    },
                  });
                }}
                onSelect={(e) => {
                  record.operatorName = e;
                  const itemIndex = options?.operatorOptions?.findIndex(
                    (item: { operationId: string; operationName: string }) => {
                      return item.operationName === e;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentOperator = cloneDeep(currentOperator);
                    _currentOperator[index] =
                      options?.operatorOptions[itemIndex];
                    record.operatorBarcode =
                      _currentOperator?.[index]?.operationId;
                    setCurrentOperator(_currentOperator);
                    setErrors({
                      ...errors,
                      operatorName: {
                        ...errors?.operatorName,
                        [index]: validateField("操作工", e),
                      },
                      operatorBarcode: {
                        ...errors?.Barcode,
                        [index]: validateField(
                          "操作工条码",
                          record.operatorBarcode
                        ),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      operatorName: {
                        ...errors?.operatorName,
                        [index]: validateField("操作工", e),
                      },
                    });
                  }
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
              {errors["operatorName"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["operatorName"]?.[index]}
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
                defaultValue={text ? dayjs(text) : null}
                showTime
                onChange={(e, date) => {
                  setErrors({
                    ...errors,
                    finishTime: {
                      ...errors?.finishTime,
                      [index]: validateField("完成日期", date as string),
                    },
                  });
                  if (date === "") {
                    delete record.finishTime;
                    return;
                  }
                  record.finishTime = date;
                }}
              />
              {errors["finishTime"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["finishTime"]?.[index]}
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
                defaultValue={text}
                value={currentEquipment?.[index]?.equipmentId}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  const _currentEquipment = cloneDeep(currentEquipment);
                  _currentEquipment[index] = {
                    equipmentName: "",
                    equipmentId: "",
                  };
                  setCurrentEquipment(_currentEquipment);
                  delete record.equipmentBarcode;
                  delete record.equipmentName;
                  setErrors({
                    ...errors,
                    equipmentBarcode: {
                      ...errors?.equipmentBarcode,
                      [index]: validateField("设备条码", ""),
                    },
                    equipmentName: {
                      ...errors.equipmentName,
                      [index]: validateField("设备名称", ""),
                    },
                  });
                }}
                onSelect={(e) => {
                  record.equipmentBarcode = e;
                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === e;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentEquipment = cloneDeep(currentEquipment);
                    _currentEquipment[index] =
                      options?.equipmentOptions[itemIndex];
                    record.equipmentName =
                      _currentEquipment?.[index]?.equipmentName;
                    setCurrentEquipment(_currentEquipment);
                    setErrors({
                      ...errors,
                      equipmentBarcode: {
                        ...errors?.equipmentBarcode,
                        [index]: validateField("设备条码", e),
                      },
                      equipmentName: {
                        ...errors.equipmentName,
                        [index]: validateField(
                          "设备名称",
                          record.equipmentName
                        ),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      equipmentBarcode: {
                        ...errors?.equipmentBarcode,
                        [index]: validateField("设备条码", e),
                      },
                    });
                  }
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
              {errors["equipmentBarcode"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["equipmentBarcode"]?.[index]}
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
                defaultValue={text}
                value={currentEquipment?.[index]?.equipmentName}
                loading={options?.equipmentOptionsLoading}
                onClear={() => {
                  const _currentEquipment = cloneDeep(currentEquipment);
                  _currentEquipment[index] = {
                    equipmentName: "",
                    equipmentId: "",
                  };
                  setCurrentEquipment(_currentEquipment);
                  delete record.equipmentBarcode;
                  delete record.equipmentName;

                  setErrors({
                    ...errors,
                    equipmentName: {
                      ...errors.equipmentName,
                      [index]: validateField("设备名称", ""),
                    },
                    equipmentBarcode: {
                      ...errors?.equipmentBarcode,
                      [index]: validateField("设备条码", ""),
                    },
                  });
                }}
                onSelect={(e: string, _record: any) => {
                  record.equipmentName = _record.children;

                  const itemIndex = options?.equipmentOptions?.findIndex(
                    (item: { equipmentId: string; equipmentName: string }) => {
                      return item.equipmentId === _record?.key;
                    }
                  );
                  if (itemIndex !== -1) {
                    const _currentEquipment = cloneDeep(currentEquipment);
                    _currentEquipment[index] =
                      options?.equipmentOptions[itemIndex];
                    record.equipmentBarcode =
                      _currentEquipment?.[index]?.equipmentId;
                    setCurrentEquipment(_currentEquipment);
                    setErrors({
                      ...errors,
                      equipmentName: {
                        ...errors?.equipmentName,
                        [index]: validateField("设备名称", e),
                      },
                      equipmentBarcode: {
                        ...errors?.equipmentBarcode,
                        [index]: validateField(
                          "设备条码",
                          record.equipmentBarcode
                        ),
                      },
                    });
                  } else {
                    setErrors({
                      ...errors,
                      equipmentName: {
                        ...errors?.equipmentName,
                        [index]: validateField("设备名称", e),
                      },
                    });
                  }
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
              {errors["equipmentName"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors["equipmentName"]?.[index]}
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
        width: 80,
        needValidate: true,
        render: (text: string, record: any, index: number) => {
          return (
            <>
              <InputNumber
                defaultValue={text}
                controls={false}
                onChange={(e) => {
                  record.produceNumber = e;
                  setErrors({
                    ...errors,
                    produceNumber: {
                      ...errors?.produceNumber,
                      [index]: validateField("产量", e),
                    },
                  });
                }}
              ></InputNumber>
              {errors?.["produceNumber"]?.[index] && (
                <span style={{ color: "red" }}>
                  {errors?.["produceNumber"]?.[index]}
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
                handleSave({ record, columns: columns.flowCard, index });
              }}
            >
              保存
            </Button>
          );
        },
      },
    ],
    print: [],
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
}
export const getParams = ({
  form,
  data,
  values,
  mainsize,
  isKg,
  flowCardType,
  remark,
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
      tranferTime: values.transferTime,
      //工艺
      process: data?.processList,
      //
      pNumber: form.getFieldValue("pnumber"),
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
  };

  return params[flowCardType || "common"];
};
