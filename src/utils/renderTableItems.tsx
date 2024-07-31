import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import styles from "./renderTableItems.module.scss";
import { limitDecimals } from "./common";
import { MyTooltip } from "@/components/MyTooltip";
import TextArea from "antd/es/input/TextArea";
import ReadOnlyFormItem from "@/components/ReadOnlyFormItem/ReadOnlyFormItem";
import { Rule } from "antd/es/form";
const RenderQRCode = ({
  title,
  footer,
  name,
  value,
  rowSpan,
  colSpan,
  noTd,
  size,
  notInForm,
}: {
  title?: string;
  footer?: string | React.ReactNode;
  name: string;
  value: string;
  rowSpan?: number;
  colSpan?: number;
  noTd?: boolean;
  size?: number;
  notInForm?: boolean;
}) => {
  // form.setFieldValue(name, value);

  console.log(value);
  const qrCode = value ? (
    <QRCode value={value} size={size || 72} />
  ) : (
    <Spin>
      <QRCode value="二维码努力生成中~" size={size || 72} />
    </Spin>
  );
  const renderQRcode = !notInForm ? (
    <div style={{ textAlign: "center", margin: "0 5px" }} title={value}>
      {title && <div>{title}</div>}
      <Form.Item name={name} style={{ marginBottom: 0 }}>
        {qrCode}
      </Form.Item>
      {footer && <div>{footer}</div>}
    </div>
  ) : (
    <div style={{ textAlign: "center", margin: "0 5px" }} title={value}>
      {title && <div>{title}</div>}
      {qrCode}
      {footer && <div>{footer}</div>}
    </div>
  );

  return (
    <>
      {noTd && renderQRcode}
      {!noTd && (
        <td
          rowSpan={rowSpan}
          colSpan={colSpan}
          className={styles["form-qrcode"]}
        >
          {renderQRcode}
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
        style={{ ...tdStyle, minWidth: 150 }}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          <MyTooltip>
            {/* <Input
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              readOnly
            ></Input> */}
            <ReadOnlyFormItem style={style}></ReadOnlyFormItem>
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
  style,
  rules,
  required,
  dependencies,
  addonAfter,
}: {
  title: string;
  name: string;
  defaultValue?: string;
  titleStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  isNumber?: boolean;
  colSpan?: number;
  max?: number;
  step?: number;
  rules?: Rule[];
  required?: boolean;
  dependencies?: string[];
  addonAfter?: React.ReactNode;
}) => {
  return (
    <>
      <th style={titleStyle}>{title}</th>
      <td className={styles["input-container"]} colSpan={colSpan}>
        <Form.Item
          name={name}
          dependencies={dependencies}
          rules={[
            { required: required, message: `请输入${title}` },
            ...(rules || []),
          ]}
        >
          {isNumber ? (
            <InputNumber
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              controls={false}
              max={max}
              step={step}
              formatter={limitDecimals}
              parser={limitDecimals as any}
              addonAfter={addonAfter}
            ></InputNumber>
          ) : (
            <Input
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              addonAfter={addonAfter}
            ></Input>
          )}
        </Form.Item>
      </td>
    </>
  );
};
const EditAbleTextArea = ({
  title,
  name,
  colSpan,
  titleStyle,
  tdStyle,
  labelColSpan,
  style,
  maxLength,
  readOnly,
}: {
  title: string;
  name: string;
  maxLength?: number;
  colSpan?: number;
  labelColSpan?: number;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  tdStyle?: React.CSSProperties;
  readOnly?: boolean;
}) => {
  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title}
      </th>
      <td
        className={`${styles["input-container"]} ${
          readOnly ? styles["input-container-locked"] : ""
        }`}
        style={tdStyle}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          <TextArea
            maxLength={maxLength}
            className={styles.input}
            style={{ ...style, border: "none" }}
            autoComplete="off"
            readOnly={readOnly}
          ></TextArea>
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
  defaultValue,
  showSearch,
  onSearch,
  notFoundContent,
  loading,
  required,
}: {
  title: string;
  name: string;
  options: { value: any; label: any }[];
  titleStyle?: React.CSSProperties;
  colSpan?: number;
  labelColSpan?: number;
  placeholder?: string;
  onSelect?: any;
  defaultValue?: string;
  showSearch?: boolean;
  onSearch?: ((value: string) => void) | undefined;
  notFoundContent?: React.ReactNode;
  loading?: boolean;
  required?: boolean;
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
        <Form.Item
          name={name}
          rules={[{ required: required, message: `请输入${title}` }]}
        >
          <Select
            placeholder={placeholder}
            options={options}
            onSelect={onSelect}
            defaultValue={defaultValue}
            showSearch={showSearch}
            onSearch={onSearch}
            notFoundContent={notFoundContent}
            loading={loading}
            allowClear
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
  required,
  showTime,
}: {
  title: string;
  name: string;
  colSpan: number;
  required?: boolean;
  showTime?: boolean;
}) => {
  return (
    <>
      <th>{title}</th>
      <td
        colSpan={colSpan}
        className={`${styles["input-container"]} ${styles["date-container"]}`}
      >
        <Form.Item
          name={name}
          rules={[{ required: required, message: `请输入${title}` }]}
        >
          <DatePicker showTime={showTime}></DatePicker>
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
  EditAbleTextArea,
};
