import { kgArr } from "@/constants";

/**
 * 空值判断
 * @param value
 */
export const emptyRender = (value: unknown) => {
  return !value && !(value === 0 || value === false) ? "—" : value;
};

export const isEmptyField = (value: unknown) => {
  return value || value === 0;
};

export const sumTransferNumberRender = (data: any[], record: { unit: any }) => {
  const unit = record?.unit;
  if (kgArr.indexOf(unit) !== -1) {
    return data?.[0]?.sumTransferKg || "0";
  }
  return data?.[0]?.sumTransferPcs || "0";
};
