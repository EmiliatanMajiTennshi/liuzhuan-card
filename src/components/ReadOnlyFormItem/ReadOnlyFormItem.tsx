import React from "react";

const ReadOnlyFormItem = (props: {
  value?: string;
  style: any;
  placeholder?: string;
  addonAfter?: string | React.ReactNode;
  isNumber?: boolean;
}) => {
  const { value, style, placeholder, addonAfter, isNumber } = props;
  const breakWordArr = [" ", "-", "(", "[", "{", ";", ",", "/"];
  let breakWord = false;
  try {
    breakWordArr.forEach((item) => {
      if (value?.indexOf(item) !== -1) {
        breakWord = true;
        throw new Error("中止循环，并非错误");
      }
    });
  } catch (err) {}
  return value ? (
    <span
      style={{
        ...style,
        wordWrap: "break-word",
        whiteSpace: "normal",
        lineHeight: style?.lineHeight || "110%",
        wordBreak: breakWord ? "break-word" : "break-all",
        display: "flex",
        justifyContent: "space-between",
        minHeight: "24px",
      }}
    >
      <span> {isNumber && value ? parseFloat(value) : value}</span>
      <span>{addonAfter}</span>
    </span>
  ) : (
    <span
      style={{
        color: "#ddd",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{placeholder || " "}</span>
      <span>{addonAfter}</span>
    </span>
  );
};

export default ReadOnlyFormItem;
