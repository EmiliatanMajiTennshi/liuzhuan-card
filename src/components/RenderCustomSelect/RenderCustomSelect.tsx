import { validateField } from "@/utils";
import { Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { cloneDeep, isArray } from "lodash";
import React, { useEffect, useMemo } from "react";
interface IRenderCustomSelectProps {
  // 当前单元格的数据
  text: any;
  value?: any;
  // 第几行数据
  index: number;
  // 检验信息
  errors?: any;
  setErrors?: React.Dispatch<any>;
  // 当前行的数据
  record: any;
  // table数据
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
  // option数据
  dataList: any[] | undefined;
  // 转对象
  dataListObject: {
    [key: string]: any;
  };
  // 转对象 name当key
  dataListObjectName: {
    [key: string]: any;
  };
  // 员工类型
  themeTitle: string;
  // 配置
  config: {
    name: string;
    barcode: string;
    departmentName?: string;
    // 被同步的字段
    syncName?: string;
    syncBarcode?: string;
  };
  // name||barcode
  type: string;
  required?: boolean;
  columns: any[];
  processList?: string[];
  isAddNewCard?: boolean;
  mode?: string;
  extendData?: AnyObject;
}
const RenderCustomSelect = (props: IRenderCustomSelectProps) => {
  const {
    text,
    index,
    errors,
    setErrors,
    record,
    tableData,
    setTableData,
    dataList,
    dataListObject,
    dataListObjectName,
    themeTitle,
    config,
    type,
    columns,
    processList,
    isAddNewCard,
    mode,
    extendData,
  } = props;
  const { name, barcode, departmentName, syncBarcode, syncName } = config;

  const needSync = useMemo(
    () => processList && processList?.indexOf(record?.processName) !== -1,
    [processList, record?.processName]
  );
  if (!errors || !setErrors) return <></>;
  // 转对象
  const columnsObj: { [key: string]: AnyObject } = {};
  columns?.forEach((item: { key: string }) => {
    columnsObj[item?.key] = item;
  });
  // 多选
  const isMuti = !needSync && mode !== "single";
  return (
    <>
      {isAddNewCard ? (
        <Select
          placeholder={type === "barcode" ? "查询条码" : "查询名称"}
          disabled
          style={{ width: "100%" }}
        ></Select>
      ) : (
        <Select
          placeholder={type === "barcode" ? "查询条码" : "查询名称"}
          allowClear
          style={{ width: "100%" }}
          value={text}
          mode={isMuti ? "tags" : undefined}
          onClear={() => {
            // 清空选项
            record[barcode] = "";
            record[name] = "";
            // 有些不需要部门
            if (departmentName && name === "operateName") {
              delete record?.[departmentName];
            }

            // 用来记录错误
            const cloneErrors = cloneDeep(errors);
            if (
              !columnsObj[barcode].needValidate &&
              !columnsObj[name].needValidate
            ) {
              setErrors(cloneErrors);
              return;
            }

            if (!cloneErrors[index]) {
              cloneErrors[index] = {};
            }
            if (columnsObj[barcode].needValidate) {
              cloneErrors[index][barcode] = validateField(
                `${themeTitle}条码`,
                ""
              );
            }
            if (columnsObj[name].needValidate) {
              cloneErrors[index][name] = validateField(`${themeTitle}`, "");
            }
            setErrors(cloneErrors);
          }}
          onSelect={(e: string) => {
            // 设置条码
            if (type === "name") {
              // 先前的姓名列表
              const prevNameList = record?.[name];
              // 当前姓名为e
              record[name] =
                isArray(record?.[name]) && isMuti ? [...prevNameList, e] : [e];

              // 当前选择的数据
              const currentData =
                dataListObjectName[e] || extendData?.dataListObjectName[e];
              console.log(currentData, 12311, dataListObjectName, e);

              // 先前的条码列表
              const prevBarcodeList = record?.[barcode];
              // 当前选择的条码

              const currentBarcode = currentData?.barcode;
              record[barcode] =
                isArray(prevBarcodeList) && isMuti
                  ? [...prevBarcodeList, currentBarcode]
                  : [currentBarcode];

              if (!isMuti && syncName && syncBarcode) {
                record[syncName] = [e];
                record[syncBarcode] = [currentBarcode];
              }
              if (departmentName && name === "operateName") {
                // 先前的部门列表
                const prevDepartmentList = record?.[departmentName];
                // 当前选择的部门
                const currentDepartment = currentData?.[departmentName];
                record[departmentName] = isArray(prevDepartmentList)
                  ? [...prevDepartmentList, currentDepartment]
                  : [currentDepartment];
              }

              // 校验
              const cloneErrors = cloneDeep(errors);
              if (
                !columnsObj[barcode].needValidate &&
                !columnsObj[name].needValidate
              ) {
                setErrors(cloneErrors);
                return;
              }

              if (!cloneErrors[index]) {
                cloneErrors[index] = {};
              }

              if (columnsObj[name].needValidate) {
                cloneErrors[index][name] = validateField(
                  `${themeTitle}`,
                  record[name]
                );
              }

              if (columnsObj[barcode].needValidate) {
                cloneErrors[index][barcode] = validateField(
                  `${themeTitle}条码`,
                  record[barcode]
                );
              }

              setErrors(cloneErrors);
            }
            if (type === "barcode") {
              // 先前的条码列表
              const prevBarcodeList = record?.[barcode];
              // 当前选择的条码为e
              record[barcode] =
                isArray(prevBarcodeList) && isMuti
                  ? [...prevBarcodeList, e]
                  : [e];

              // 当前选择的数据
              const currentData =
                dataListObject[e] || extendData?.dataListObject[e];
              console.log(currentData, 124214);

              // 先前的姓名列表
              const prevNameList = record?.[name];
              // 当前选择的姓名
              const currentName = currentData?.name;
              record[name] =
                isArray(prevNameList) && isMuti
                  ? [...prevNameList, currentName]
                  : [currentName];

              if (!isMuti && syncName && syncBarcode) {
                record[syncName] = [currentName];
                record[syncBarcode] = [e];
              }
              if (departmentName && name === "operateName") {
                // 先前的部门列表
                const prevDepartmentList = record?.[departmentName];
                // 当前选择的部门
                const currentDepartment = currentData?.[departmentName];
                record[departmentName] = isArray(prevDepartmentList)
                  ? [...prevDepartmentList, currentDepartment]
                  : [currentDepartment];
              }
              const cloneErrors = cloneDeep(errors);
              if (
                !columnsObj[barcode].needValidate &&
                !columnsObj[name].needValidate
              ) {
                setErrors(cloneErrors);
                return;
              }
              // 用来校验

              if (!cloneErrors[index]) {
                cloneErrors[index] = {};
              }
              // 校验条码 校验姓名
              if (columnsObj[name].needValidate) {
                cloneErrors[index][name] = validateField(
                  `${themeTitle}`,
                  record[name]
                );
              }
              if (columnsObj[barcode].needValidate) {
                cloneErrors[index][barcode] = validateField(
                  `${themeTitle}条码`,
                  record[barcode]
                );
              }
              setErrors(cloneErrors);
            }
          }}
          onDeselect={(e) => {
            // 删除某个标签
            const prevBarcodeList = isArray(record?.[barcode])
              ? record?.[barcode]
              : [record?.[barcode]];
            const prevNameList = isArray(record?.[name])
              ? record?.[name]
              : [record?.[name]];

            const deleteIndex =
              type === "barcode"
                ? prevBarcodeList?.findIndex((item: string) => {
                    return item === e;
                  })
                : prevNameList?.findIndex((item: string) => {
                    return item === e;
                  });

            // 删除对应条码
            record[barcode] = prevBarcodeList?.filter(
              (item: string, index: number) => index !== deleteIndex
            );
            // 删除对应姓名
            record[name] = prevNameList?.filter(
              (item: string, index: number) => index !== deleteIndex
            );
            // 删除对应部门
            if (departmentName && name === "operateName") {
              record[departmentName] = record?.[departmentName]?.filter(
                (item: string, index: number) => index !== deleteIndex
              );
            }
            // 更新视图

            setTableData(cloneDeep(tableData));
            // 用来校验
            const cloneErrors = cloneDeep(errors);
            if (
              !columnsObj[barcode].needValidate &&
              !columnsObj[name].needValidate
            ) {
              setErrors(cloneErrors);
              return;
            }

            if (!cloneErrors[index]) {
              cloneErrors[index] = {};
            }
            // 校验条码 校验姓名
            if (columnsObj[name].needValidate) {
              cloneErrors[index][name] = validateField(
                `${themeTitle}`,
                record[name]
              );
            }
            if (columnsObj[barcode].needValidate) {
              cloneErrors[index][barcode] = validateField(
                `${themeTitle}条码`,
                record[barcode]
              );
            }
            setErrors(cloneErrors);
          }}
          showSearch
        >
          {type === "barcode"
            ? dataList?.map((item: any) => {
                return (
                  <Select.Option
                    value={item?.barcode}
                    key={item?.barcode + item?.name}
                  >
                    {item?.barcode}
                  </Select.Option>
                );
              })
            : dataList?.map((item: any) => {
                return (
                  <Select.Option
                    value={item?.name}
                    key={item?.barcode + item?.name}
                  >
                    {item?.name}
                  </Select.Option>
                );
              })}
        </Select>
      )}
      {type === "barcode"
        ? errors[index]?.[barcode] && (
            <span style={{ color: "red" }}>{errors[index]?.[barcode]}</span>
          )
        : errors[index]?.[name] && (
            <span style={{ color: "red" }}>{errors[index]?.[name]}</span>
          )}
    </>
  );
};

export default RenderCustomSelect;
