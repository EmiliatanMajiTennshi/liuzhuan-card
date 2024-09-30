import {
  insertSaveTransferCard,
  insertSaveTransferCardDetail,
  queryProcessByItemId,
  updateReworkDetailById,
} from "@/api";
import { SUCCESS_CODE, VALIDATION_FAILED } from "@/constants";
import { UPDATE_FAILED } from "@/constants";
import { Modal, message } from "antd";
import { AnyObject } from "antd/es/_util/type";
import dayjs from "dayjs";
import { cloneDeep, isArray, sortBy } from "lodash";
/**
 * 追溯单号 年月日+时间戳后八位
 * @returns
 */
const getTrackingNumber = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const timeStamp = newDate.getTime();
  const trackingNumber =
    year.toString().slice(-2) +
    (month < 10 ? "0" + month : month) +
    (date < 10 ? "0" + date : date) +
    timeStamp.toString().slice(-8);
  return trackingNumber;
};

/**
 * 流转卡编号 Lz-xxxx(年)xx(月)xx(日)xx(时)xx(分)xxxxx(时间戳后五位)-xxxxxxxx(随机八位数)
 * @returns
 */
const getLZCardNumber = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const timeStamp = newDate.getTime();
  const randomEight = Math.floor(
    Math.random() * (99999999 - 10000000) + 10000000
  );
  const lzCardNumber =
    "LZ-" +
    year.toString() +
    (month < 10 ? "0" + month : month) +
    (date < 10 ? "0" + date : date) +
    (hour < 10 ? "0" + hour : hour) +
    (minute < 10 ? "0" + minute : minute) +
    timeStamp.toString().slice(-5) +
    "-" +
    randomEight;
  return lzCardNumber;
};

/** 把时间格式化成YYYY-MM-DD */
const formatDate = (time: any) => {
  return dayjs(time).format("YYYY-MM-DD");
};

/** 把时间格式化成YYYY-MM-DD HH:mm:ss*/
const formatTime = (time: any) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

/**psc转kg */
const transFormToKg = (number: number | string, weight: number | string) => {
  return (
    parseFloat(number.toString()) * parseFloat(weight.toString())
  ).toFixed(2);
};
/**kg转psc */
const transFormToPcs = (number: number | string, weight: number | string) => {
  if (parseFloat(weight.toString()) === 0) {
    return "没有单重，无法计算";
  }
  return (
    parseFloat(number.toString()) / parseFloat(weight.toString())
  ).toFixed(0);
};
/**限制小数位数 */
const limitDecimals = (value: string | number | undefined): string => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(\-)*(\d+)\.(\d\d).*$/;

  if (typeof value === "string") {
    return !isNaN(Number(value)) ? value.replace(reg, "$1$2.$3") : "";
  } else if (typeof value === "number") {
    return !isNaN(value) ? String(value).replace(reg, "$1$2.$3") : "";
  } else {
    return "";
  }
};
/** 查看工艺 */
const checkProcess = async (partNumber: string) => {
  try {
    const res = await queryProcessByItemId({
      itemid: partNumber,
    });
    const processList = res?.data?.data;

    Modal.info({
      title: "工艺详情",
      footer: null,
      width: 400,
      closable: true,
      icon: null,

      content: (
        <div>
          {sortBy(processList, "seq")?.map((item) => {
            return <p>{`第${item?.seq}道工艺：${item?.processName}`}</p>;
          })}
        </div>
      ),
    });
  } catch (err) {
    console.log("error", err);
  }
};

// 校验
const validateField = (field: string, value: string | number | null) => {
  if ((!value && value !== 0) || (isArray(value) && value?.length === 0)) {
    return `请输入${field}`;
  }
  return "";
};

// 校验
const handleValidate = async ({
  record,
  columns,
  errors,
  setErrors,
  index,
}: any) => {
  const cloneErrors = cloneDeep(errors);
  if (!cloneErrors?.[index]) {
    cloneErrors[index] = {};
  }
  columns.forEach((item: any) => {
    if (item.needValidate) {
      const error = validateField(item.title, record[item.key]);
      if (!error) {
        delete cloneErrors?.[index][item.key];
      } else {
        cloneErrors[index][item.key] = error;
      }
    }
  });
  setErrors((prevErrors: any) => ({
    ...prevErrors,
    [index]: cloneErrors[index],
  }));

  if (Object.keys(cloneErrors?.[index]).length !== 0) {
    return "error";
  }

  return "done";
};

// 保存
const handleSave = async ({ flowCardType, record, data, index }: any) => {
  // 没有错误
  const verifierInfoList =
    record?.verifyId?.map((item: string, index: number) => {
      return {
        verifyId: item,
        verifyName: record?.verifyName?.[index],
      };
    }) || [];
  const operationInfoList =
    record?.operateId?.map((item: string, index: number) => {
      return {
        operationId: item,
        operationName: record?.operateName?.[index],
        operateDepartment: record?.operateDepartment?.[index],
      };
    }) || [];

  const cloneRecord = cloneDeep(record);
  delete cloneRecord?.verifyId;
  delete cloneRecord?.verifyName;
  delete cloneRecord?.operateId;
  delete cloneRecord?.operateName;
  delete cloneRecord?.operateDepartment;

  const {
    processName = "",
    inspectionLevel = "",
    hid = "",
    finishTime = "",
    equipmentBarcode = "",
    equipmentName = "",
    produceNumber = "",
  } = cloneRecord;

  try {
    // 返工
    if (flowCardType === "rework") {
      const params = {
        processName,
        inspectionLevel,
        hid,
        finishTime,
        equipmentBarcode,
        equipmentName,
        produceNumber,
        verifierInfoList,
        operationInfoList,
      };
      const res = await updateReworkDetailById(params);
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
      } else {
        message.error(
          `第${parseFloat(index) + 1}道工序 ${record.processName} 保存失败(${
            res?.data?.data || UPDATE_FAILED
          })`
        );
      }
    } else {
      const params = {
        processName,
        inspectionLevel,
        hid,
        finishTime,
        equipmentBarcode,
        equipmentName,
        produceNumber,
        verifierInfoList,
        operationInfoList,
        hunit: "公斤",
        id: data?.id,
      };

      // 流转卡零件管理
      const res = await insertSaveTransferCardDetail(params);
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
      } else {
        const retryRes = await insertSaveTransferCardDetail(params);
        if (retryRes?.data?.code === SUCCESS_CODE) {
        } else {
          message.error(
            `第${parseFloat(index) + 1}道工序 ${record.processName} 保存失败(${
              retryRes?.data?.data || UPDATE_FAILED
            })`
          );
        }
      }
    }
  } catch (err: any) {
    message.error(`Error: ${err.message}`);
  }
};

/**非0必输校验 */
const validateNotZero = (_: any, value: string | number) => {
  if (
    !value ||
    value === "0" ||
    Number(value) === 0 ||
    value === 0 ||
    Number(value) < 0
  ) {
    return Promise.reject(new Error("该字段必输且大于等于0"));
  }

  return Promise.resolve();
};

/** 日期格式转换 */
const transformDateToString = (values: any) => {
  if (values?.finishTimeEnd) {
    const _tempTime = formatDate(values?.finishTimeEnd);
    values.finishTimeEnd = _tempTime;
  }
  if (values?.finishTimeStart) {
    const _tempTime = formatDate(values?.finishTimeStart);
    values.finishTimeStart = _tempTime;
  }
  if (values?.createTimeEnd) {
    const _tempTime = formatDate(values?.createTimeEnd);
    values.createTimeEnd = _tempTime;
  }
  if (values?.createTimeStart) {
    const _tempTime = formatDate(values?.createTimeStart);
    values.createTimeStart = _tempTime;
  }
  return values;
};

//两数相除取百分比%并保留两位小数
function percentage(number1: number, number2: number) {
  // 小数点后两位百分比
  return Math.round((number1 / number2) * 10000) / 100.0;
}

const getErrorMessage = (res: any, errorMessage: string) => {
  return (
    res?.data?.msg ||
    res?.data?.message ||
    res?.response?.data?.msg ||
    res?.data?.data ||
    errorMessage
  );
};
/** 数组去重*/
const uniqueArray = (arr: any[], key: string) => {
  const map = new Map();
  arr?.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
};
/** 把对象里的数组转成字符串 */
function convertArraysToString(obj: AnyObject) {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (Array.isArray(newObj[key])) {
      newObj[key] = newObj[key].join(";");
    }
  }
  return newObj;
}
/**字符串通过分号转数组 */
function convertStringToArray(str: string) {
  // 去掉结尾的分号（如果有）
  if (str?.endsWith(";")) {
    str = str.slice(0, -1);
  }
  // 使用分号分隔字符串并转换为数组
  return str?.split(";");
}
export {
  getTrackingNumber,
  getLZCardNumber,
  formatDate,
  formatTime,
  transFormToKg,
  transFormToPcs,
  limitDecimals,
  checkProcess,
  validateField,
  handleSave,
  validateNotZero,
  transformDateToString,
  percentage,
  getErrorMessage,
  uniqueArray,
  handleValidate,
  convertArraysToString,
  convertStringToArray,
};
