import React from "react";

const ReadOnlyFormItem = (props: { value?: string; style: any }) => {
  const { value, style } = props;
  return <span style={style}>{value}</span>;
};

export default ReadOnlyFormItem;
