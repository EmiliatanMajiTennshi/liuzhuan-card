import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import styles from "./renderTableItems.module.scss";
const RenderQRCode = ({
  title,
  name,
  value,
  rowSpan,
  colSpan,
  noTd,
  size,
}: {
  title?: string;
  name: string;
  value: string;
  rowSpan?: number;
  colSpan?: number;
  noTd?: boolean;
  size?: number;
}) => {
  // form.setFieldValue(name, value);
  const qrcode = (
    <span style={{ textAlign: "center", margin: "0 5px" }} title={value}>
      {title && <div>{title}</div>}
      <Form.Item name={name} style={{ marginBottom: 0 }}>
        {value && <QRCode value={value} size={size || 72} />}
        {!value && (
          <Spin>
            <QRCode value="二维码努力生成中~" size={size || 72} />
          </Spin>
        )}
      </Form.Item>
    </span>
  );
  return (
    <>
      {noTd && qrcode}
      {!noTd && (
        <td
          rowSpan={rowSpan}
          colSpan={colSpan}
          className={styles["form-qrcode"]}
        >
          {qrcode}
        </td>
      )}
    </>
  );
};
const ReadOnlyInput = ({
  title,
  name,
  defaultValue,
  colSpan,
  titleStyle,
  labelColSpan,
  form,
}: {
  title: string;
  name: string;
  defaultValue?: string;
  colSpan?: number;
  labelColSpan?: number;
  titleStyle?: React.CSSProperties;
  form?: any;
}) => {
  useEffect(() => {
    if (form && defaultValue) {
      form.setFieldValue(name, defaultValue);
    }
  }, [name]);
  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title}
      </th>
      <td
        className={[
          styles["input-container-locked"],
          styles["input-container"],
        ].join(" ")}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          <Input
            className={styles.input}
            style={{ border: "none" }}
            autoComplete="off"
            readOnly
          ></Input>
        </Form.Item>
      </td>
    </>
  );
};
const EditAbleInput = ({
  title,
  name,
  defaultValue,
  titleStyle,
  onChange,
  onBlur,
  isNumber,
  colSpan,
  max,
}: {
  title: string;
  name: string;
  defaultValue?: string;
  titleStyle?: React.CSSProperties;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  isNumber?: boolean;
  colSpan?: number;
  max?: number;
}) => {
  return (
    <>
      <th style={titleStyle}>{title}</th>
      <td className={styles["input-container"]} colSpan={colSpan}>
        <Form.Item name={name}>
          {isNumber ? (
            <InputNumber
              className={styles.input}
              style={{ border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              controls={false}
              max={max}
            ></InputNumber>
          ) : (
            <Input
              className={styles.input}
              style={{ border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
            ></Input>
          )}
        </Form.Item>
      </td>
    </>
  );
};
const RenderSelect = ({
  title,
  name,
  options,
  titleStyle,
  labelColSpan,
  colSpan,
  placeholder,
}: {
  title: string;
  name: string;
  options: { value: any; label: any }[];
  titleStyle?: React.CSSProperties;
  colSpan?: number;
  labelColSpan?: number;
  placeholder?: string;
}) => {
  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title}
      </th>
      <td
        colSpan={colSpan}
        className={`${styles["input-container"]} ${styles["select-container"]}`}
      >
        <Form.Item name={name}>
          <Select placeholder={placeholder} options={options}></Select>
        </Form.Item>
      </td>
    </>
  );
};
const RenderDatePicker = ({
  title,
  name,
  colSpan,
}: {
  title: string;
  name: string;
  colSpan: number;
}) => {
  return (
    <>
      <th>{title}</th>
      <td
        colSpan={colSpan}
        className={`${styles["input-container"]} ${styles["date-container"]}`}
      >
        <Form.Item name={name}>
          <DatePicker></DatePicker>
        </Form.Item>
      </td>
    </>
  );
};

export {
  ReadOnlyInput,
  EditAbleInput,
  RenderDatePicker,
  RenderQRCode,
  RenderSelect,
};
