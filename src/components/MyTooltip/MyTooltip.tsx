import { Tooltip } from "antd";
import React, { ReactElement, cloneElement } from "react";

const MyTooltip = (props: any) => {
  const { children, id, value } = props;

  return (
    <Tooltip title={value} placement="topLeft">
      {cloneElement(children as ReactElement, { id, value })}
    </Tooltip>
  );
};
export default MyTooltip;
