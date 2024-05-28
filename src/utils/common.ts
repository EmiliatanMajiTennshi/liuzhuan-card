// 追溯单号 年月日+时间戳后八位
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
export { getTrackingNumber, getLZCardNumber };
