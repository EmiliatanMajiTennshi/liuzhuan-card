import { Button, Input } from "antd";
import React, { useRef } from "react";
import QRCodeScanner from "../QRCodeScanner/QRCodeScanner";
import styles from "./index.module.scss";
interface CustomInputProps extends React.ComponentProps<typeof Input> {
  allowScanner?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const inputRef = useRef(null);
  const { allowScanner } = props;
  const addonAfter = <QRCodeScanner inputRef={inputRef}></QRCodeScanner>;
  return (
    <Input
      {...props}
      // addonAfter={allowScanner ? addonAfter : props?.addonAfter}
      ref={inputRef}
      className={styles.customInput}
    ></Input>
  );
};

export default CustomInput;
