import React from "react";

const ReadOnlyFormItem = (props: {
  value?: string;
  style: any;
  placeholder?: string;
  addonAfter?: string | React.ReactNode;
  isNumber?: boolean;
  unit?: string;
}) => {
  const { value, style, placeholder, addonAfter, isNumber, unit } = props;
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
        flexDirection: "column",
        minHeight: "24px",
      }}
    >
      <span>
        {isNumber && value ? parseFloat(value) : value}
        {unit}
      </span>
      <span>{addonAfter}</span>
    </span>
  ) : (
    <span
      style={{
        color: "#ddd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span style={{ fontSize: style?.fontSize }}>{placeholder || " "}</span>
      <span>{addonAfter}</span>
    </span>
  );
};

export default ReadOnlyFormItem;
