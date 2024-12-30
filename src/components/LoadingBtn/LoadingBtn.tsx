/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import React from "react";

const LoadingBtn = (props: any) => {
  const [loading, setLoading] = React.useState(false);
  const { asyncClick, ...buttonProps } = props;

  return (
    <Button
      loading={loading}
      {...buttonProps}
      onClick={
        asyncClick
          ? async () => {
              setLoading(true);
              await asyncClick();
              setLoading(false);
            }
          : props?.onClick
      }
    >
      {props.children}
    </Button>
  );
};

export default LoadingBtn;
