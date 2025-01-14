import { queryProcessByItemId } from "@/api";
import { Modal } from "antd";
import { AnyObject } from "antd/es/_util/type";
import BigNumber from "bignumber.js";
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

/** 获取时间 */
const getTime = (time?: any) => {
  return dayjs(time);
};
/** 把时间格式化成YYYY-MM-DD */
const formatDate = (time?: any, format?: string) => {
  return dayjs(time).format(format || "YYYY-MM-DD");
};

/** 把时间格式化成YYYY-MM-DD HH:mm:ss*/
const formatTime = (time?: any) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

/**psc转kg */
const transformToKg = (
  number: number | string,
  weight: number | string,
  precision?: number
) => {
  // 保留小数
  const resultWithPrecision = mul(
    parseFloat(number.toString()),
    parseFloat(weight.toString())
  ).toFixed(precision);
  // 不保留小数
  const resultWithoutPrecision = mul(
    parseFloat(number.toString()),
    parseFloat(weight.toString())
  ).toString();
  const result = precision ? resultWithPrecision : resultWithoutPrecision;
  return result;
};
/**kg转psc */
const transFormToPcs = (number: number | string, weight: number | string) => {
  if (parseFloat(weight.toString()) === 0) {
    return "没有单重，无法计算";
  }
  return div(
    parseFloat(number.toString()),
    parseFloat(weight.toString())
  ).toFixed(0);
};
/**限制小数位数 */
const limitDecimals = (
  value: string | number | undefined,
  decimalPlaces?: number
): string => {
  if (!decimalPlaces || decimalPlaces < 0) return String(value);
  const reg = new RegExp(`^(\\-)*(\\d+)\\.(\\d{0,${decimalPlaces}}).*$`);
  if (typeof value === "string") {
    return !isNaN(Number(value)) ? value.replace(reg, `$1$2.$3`) : "";
  } else if (typeof value === "number") {
    return !isNaN(value) ? String(value).replace(reg, `$1$2.$3`) : "";
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
// const handleSave = async ({ flowCardType, record, data, index }: any) => {
//   // 没有错误
//   const verifierInfoList =
//     record?.verifyId?.map((item: string, index: number) => {
//       return {
//         verifyId: item,
//         verifyName: record?.verifyName?.[index],
//       };
//     }) || [];
//   const operationInfoList =
//     record?.operateId?.map((item: string, index: number) => {
//       return {
//         operationId: item,
//         operationName: record?.operateName?.[index],
//         operateDepartment: record?.operateDepartment?.[index],
//       };
//     }) || [];

//   const cloneRecord = cloneDeep(record);
//   delete cloneRecord?.verifyId;
//   delete cloneRecord?.verifyName;
//   delete cloneRecord?.operateId;
//   delete cloneRecord?.operateName;
//   delete cloneRecord?.operateDepartment;

//   const {
//     processName = "",
//     inspectionLevel = "",
//     hid = "",
//     finishTime = "",
//     equipmentBarcode = "",
//     equipmentName = "",
//     produceNumber = "",
//   } = cloneRecord;

//   try {
//     // 返工
//     if (flowCardType === "rework") {
//       const params = {
//         processName,
//         inspectionLevel,
//         hid,
//         finishTime,
//         equipmentBarcode,
//         equipmentName,
//         produceNumber,
//         verifierInfoList,
//         operationInfoList,
//       };
//       const res = await updateReworkDetailById(params);
//       if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
//       } else {
//         message.error(
//           `第${parseFloat(index) + 1}道工序 ${record.processName} 保存失败(${
//             res?.data?.data || UPDATE_FAILED
//           })`
//         );
//       }
//     } else {
//       const params = {
//         processName,
//         inspectionLevel,
//         hid,
//         finishTime,
//         equipmentBarcode,
//         equipmentName,
//         produceNumber,
//         verifierInfoList,
//         operationInfoList,
//         hunit: "公斤",
//         id: data?.id,
//       };

//       // 流转卡零件管理
//       const res = await insertSaveTransferCardDetail(params);
//       if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
//       } else {
//         const retryRes = await insertSaveTransferCardDetail(params);
//         if (retryRes?.data?.code === SUCCESS_CODE) {
//         } else {
//           message.error(
//             `第${parseFloat(index) + 1}道工序 ${record.processName} 保存失败(${
//               retryRes?.data?.data || UPDATE_FAILED
//             })`
//           );
//         }
//       }
//     }
//   } catch (err: any) {
//     message.error(`Error: ${err.message}`);
//   }
// };

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

/**最大值校验 */
const validateMax = (value: string | number, max: number | string) => {
  if (parseFloat(value as string) > parseFloat(max as string)) {
    return Promise.reject(new Error("流转数量超过最大限制"));
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
  if (values?.time1) {
    const _tempTime = formatDate(values?.time1);
    values.time1 = _tempTime;
  }
  if (values?.time2) {
    const _tempTime = formatDate(values?.time2);
    values.time2 = _tempTime;
  }
  if (values?.rollTime) {
    const _tempTime = formatDate(values?.rollTime);
    values.rollTime = _tempTime;
  }
  if (values.finishTime) {
    const _tempTime = formatDate(values?.finishTime);
    values.finishTime = _tempTime;
  }
  if (values?.transferTimeStart) {
    const _tempTime = formatDate(values?.transferTimeStart);
    values.transferTimeStart = _tempTime;
  }
  if (values.transferTimeEnd) {
    const _tempTime = formatDate(values?.transferTimeEnd);
    values.transferTimeEnd = _tempTime;
  }
  if (values.pftime) {
    const _tempTime = formatDate(values?.pftime);
    values.pftime = _tempTime;
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

/**用来获取有小尾巴的料号的商标 */
function getSecondDashSubstring(value: string) {
  const parts = value.split("-");
  if (parts.length > 2) {
    return "-" + parts.slice(2).join("-");
  }
  return false;
}
/**数组填充数据 */
function padArray(arr: any[], targetLength: number) {
  let maxSeq = arr.reduce((max, item) => {
    return item.seq > max ? item.seq : max;
  }, -Infinity);

  while (arr.length < targetLength) {
    arr.push({ seq: maxSeq + 1 });
    maxSeq++;
  }
  return arr;
}
/**sleep */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**加 */
const plus = (a: BigNumber.Value, b: BigNumber.Value) => {
  const newPlus = new BigNumber(a);
  return newPlus.plus(b).toNumber();
};

/**减 */
const minus = (a: BigNumber.Value, b: BigNumber.Value) => {
  const newMinus = new BigNumber(a);
  return newMinus.minus(b).toNumber();
};

/**乘 */
function mul(a: BigNumber.Value, b: BigNumber.Value) {
  const newTimes = new BigNumber(a);
  return newTimes.times(b).toNumber();
}

/**除 */
const div = (a: BigNumber.Value, b: BigNumber.Value) => {
  const newDiv = new BigNumber(a);
  return newDiv.div(b).toNumber();
};
function downloadFile(content: string, fileName: string) {
  let mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  if (fileName.endsWith(".docx")) {
    mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (fileName.endsWith(".pdf")) {
    mimeType = "application/pdf";
  } else if (fileName.endsWith(".doc")) {
    mimeType = "application/msword";
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

export {
  getTrackingNumber,
  getLZCardNumber,
  formatDate,
  formatTime,
  transformToKg,
  transFormToPcs,
  limitDecimals,
  checkProcess,
  validateField,
  // handleSave,
  validateNotZero,
  validateMax,
  transformDateToString,
  percentage,
  getErrorMessage,
  uniqueArray,
  handleValidate,
  convertArraysToString,
  convertStringToArray,
  getSecondDashSubstring,
  getTime,
  padArray,
  sleep,
  plus,
  minus,
  mul,
  div,
  downloadFile,
};
