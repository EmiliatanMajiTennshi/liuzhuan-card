import {
  insertSaveTransferCard,
  insertSaveTransferCardDetail,
  queryProcessByItemId,
  updateReworkDetailById,
} from "@/api";
import { SUCCESS_CODE, VALIDATION_FAILED } from "@/constants";
import { UPDATE_FAILED } from "@/constants";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import { cloneDeep, sortBy } from "lodash";
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
  return (
    parseFloat(number.toString()) / parseFloat(weight.toString())
  ).toFixed(2);
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
  if (!value && value !== 0) {
    return `请输入${field}`;
  }
  return "";
};
// 保存时手动校验
const handleSave = ({
  flowCardType,
  record,
  columns,
  index,
  errors,
  setErrors,
  data,
}: any) => {
  const cloneErrors = cloneDeep(errors);
  if (!cloneErrors[index]) {
    cloneErrors[index] = {};
  }
  columns.forEach((item: any) => {
    if (item.needValidate) {
      const error = validateField(item.title, record[item.key]);

      if (!error) {
        delete cloneErrors[index][item.key];
      } else {
        cloneErrors[index][item.key] = error;
      }
    }
  });
  setErrors(cloneErrors);
  if (Object.keys(cloneErrors[index]).length === 0) {
    console.log("Record saved:", record);
    if (flowCardType === "rework") {
      updateReworkDetailById(record).then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          message.success(res?.data?.data);
        } else {
          message.error(res?.data?.data || UPDATE_FAILED);
        }
      });
    } else {
      insertSaveTransferCardDetail({
        ...record,
        hunit: "公斤",
        id: data?.id,
      }).then((res) => {
        if (res?.data?.code === SUCCESS_CODE) {
          message.success(res?.data?.data);
        } else {
          message.error(res?.data?.data || UPDATE_FAILED);
        }
      });
    }
  } else {
    message.error(VALIDATION_FAILED);
  }
};

/**非0必输校验 */
const validateNotZero = (_: any, value: string | number) => {
  if (value === "0" || Number(value) === 0 || value === 0) {
    return Promise.reject(new Error("该字段必输且不可以为0"));
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
};
