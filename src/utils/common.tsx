import { queryProcessByItemId } from "@/api";
import { Modal } from "antd";
import dayjs from "dayjs";
import { sortBy } from "lodash";
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
const formatTime = (time: any) => {
  return dayjs(time).format("YYYY-MM-DD");
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
export {
  getTrackingNumber,
  getLZCardNumber,
  formatTime,
  transFormToKg,
  transFormToPcs,
  limitDecimals,
  checkProcess,
};
