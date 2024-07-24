import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import styles from "./renderTableItems.module.scss";
import { limitDecimals } from "./common";
import { MyTooltip } from "@/components/MyTooltip";
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
    <div style={{ textAlign: "center", margin: "0 5px" }} title={value}>
      {title && <div>{title}</div>}
      <Form.Item name={name} style={{ marginBottom: 0 }}>
        {value ? (
          <QRCode value={value} size={size || 72} />
        ) : (
          <Spin>
            <QRCode value="二维码努力生成中~" size={size || 72} />
          </Spin>
        )}
      </Form.Item>
    </div>
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
  tdStyle,
  labelColSpan,
  form,
  style,
}: {
  title: string;
  name: string;
  defaultValue?: string; //穿了defaultValue 必须传form
  colSpan?: number;
  labelColSpan?: number;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  tdStyle?: React.CSSProperties;
  form?: any;
}) => {
  useEffect(() => {
    if (form && defaultValue) {
      form.setFieldValue(name, defaultValue);
    }
  }, [defaultValue]);
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
        style={tdStyle}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          <MyTooltip>
            <Input
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              readOnly
            ></Input>
          </MyTooltip>
        </Form.Item>
      </td>
    </>
  );
};
const EditAbleInput = ({
  title,
  name,
  titleStyle,
  onChange,
  onBlur,
  isNumber,
  colSpan,
  max,
  step,
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
  step?: number;
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
              step={step}
              formatter={limitDecimals}
              parser={limitDecimals as any}
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
  onSelect,
}: {
  title: string;
  name: string;
  options: { value: any; label: any }[];
  titleStyle?: React.CSSProperties;
  colSpan?: number;
  labelColSpan?: number;
  placeholder?: string;
  onSelect?: any;
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
          <Select
            placeholder={placeholder}
            options={options}
            onSelect={onSelect}
          ></Select>
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
