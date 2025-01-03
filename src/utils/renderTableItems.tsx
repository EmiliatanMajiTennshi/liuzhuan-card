import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode.react";
import styles from "./renderTableItems.module.scss";
import { limitDecimals, uniqueArray } from "./common";
import { MyTooltip } from "@/components/MyTooltip";
import TextArea from "antd/es/input/TextArea";
import ReadOnlyFormItem from "@/components/ReadOnlyFormItem/ReadOnlyFormItem";
import { FormInstance, Rule } from "antd/es/form";
import classNames from "classnames";
import { isEmpty } from "lodash";
const RequiredDot = () => {
  return <span style={{ color: "red" }}>{" *"}</span>;
};
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
  form,
}: {
  title?: string;
  footer?: string | React.ReactNode;
  name: string;
  value?: string;
  rowSpan?: number;
  colSpan?: number;
  noTd?: boolean;
  size?: number;
  notInForm?: boolean;
  form?: FormInstance<any>;
}) => {
  if (form) {
    form.setFieldValue(name, value);
  }

  const qrCode = useMemo(() => {
    return value ? (
      <QRCode value={value} size={size || 72} />
    ) : (
      <Spin>
        <QRCode value="二维码努力生成中~" size={size || 72} />
      </Spin>
    );
  }, [value]);

  const renderQRcode = !notInForm ? (
    <div style={{ textAlign: "center", margin: "0 5px" }} title={value}>
      {title && <div style={{ fontSize: 16 }}>{title}</div>}
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
  placeholder,
  addonAfter,
  isNumber,
  render,
  empty,
  data,
  unit,
}: {
  title: string | React.ReactNode;
  name: string;
  defaultValue?: string; //穿了defaultValue 必须传form
  colSpan?: number;
  labelColSpan?: number;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  tdStyle?: React.CSSProperties;
  form?: any;
  placeholder?: string;
  addonAfter?: string | React.ReactNode;
  isNumber?: boolean;
  render?: React.ReactNode | (() => React.ReactNode);
  empty?: boolean;
  data?: any;
  unit?: string;
}) => {
  useEffect(() => {
    if (form && (defaultValue || empty)) {
      form.setFieldValue(name, defaultValue);
    }
  }, [data, defaultValue]);
  const customRender = typeof render === "function" ? render() : render;
  return (
    <>
      <th style={{ ...titleStyle, lineHeight: "110%" }} colSpan={labelColSpan}>
        {title}
      </th>
      <td
        className={[
          styles["input-container-locked"],
          styles["input-container"],
        ].join(" ")}
        style={{
          ...tdStyle,
          minWidth: 150,
          minHeight: 24,
          fontSize: 24,
        }}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          {render ? (
            customRender
          ) : (
            <MyTooltip>
              {/* <Input
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              readOnly
            ></Input> */}

              <ReadOnlyFormItem
                style={style}
                placeholder={placeholder}
                addonAfter={addonAfter}
                isNumber={isNumber}
                unit={unit}
              ></ReadOnlyFormItem>
            </MyTooltip>
          )}
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
  labelColSpan,
  max,
  step,
  style,
  rules,
  required,
  dependencies,
  addonAfter,
  precision,
  placeholder,
  defaultValue,
  form,
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
  labelColSpan?: number;
  max?: number;
  precision?: number;
  step?: number;
  rules?: Rule[];
  required?: boolean;
  dependencies?: string[];
  addonAfter?: React.ReactNode;
  placeholder?: string;
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
        {title} {required && <RequiredDot />}
      </th>
      <td
        className={classNames([styles["input-container"]])}
        colSpan={colSpan}
        style={{ lineHeight: 1.2 }}
      >
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
              className={classNames([
                styles.input,
                { [styles.hasAddonAfter]: addonAfter },
              ])}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              controls={false}
              max={max}
              step={step}
              precision={precision}
              formatter={(value) => limitDecimals(value, precision)}
              parser={(value) => limitDecimals(value, precision) as any}
              addonAfter={addonAfter}
              placeholder={placeholder}
            ></InputNumber>
          ) : (
            <Input
              className={styles.input}
              style={{ ...style, border: "none" }}
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              addonAfter={addonAfter}
              placeholder={placeholder}
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
  const [textLen, setTextLen] = useState(0);
  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title}
      </th>
      <td
        className={`${styles["input-container"]} ${
          readOnly ? styles["input-container-locked"] : ""
        }`}
        style={{ ...tdStyle, position: "relative" }}
        colSpan={colSpan}
      >
        <Form.Item name={name}>
          <TextArea
            maxLength={maxLength}
            className={styles.input}
            style={{ ...style, border: "none" }}
            autoComplete="off"
            readOnly={readOnly}
            onChange={(e) => {
              setTextLen(e?.target?.value.length);
            }}
          ></TextArea>
        </Form.Item>
        {maxLength && (
          <span
            style={{
              position: "absolute",
              right: 30,
              bottom: 2,
              color: "#666",
            }}
          >
            {textLen}/{maxLength}
          </span>
        )}
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
  disabled,
  remark,
  form,
  optionKey,
  data,
  empty,
  onClear,
  autoComplete,
  style,
  disableCopy,
}: {
  title: string;
  name: string;
  options: { value: any; label: any }[];
  titleStyle?: React.CSSProperties;
  style?: React.CSSProperties;
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
  disabled?: boolean;
  remark?: string;
  form?: any;
  optionKey?: string;
  data?: any;
  empty?: boolean;
  onClear?: (() => void) | undefined;
  autoComplete?: boolean;
  disableCopy?: boolean;
}) => {
  useEffect(() => {
    if (form && (defaultValue || empty)) {
      form.setFieldValue(name, defaultValue);
    }
  }, [data, defaultValue]);
  console.log(required, name, 12445);

  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title} {required && <RequiredDot />}
      </th>
      <td
        colSpan={colSpan}
        className={`${styles["input-container"]} ${styles["select-container"]}`}
      >
        <Form.Item
          name={name}
          rules={[{ required: required, message: `请输入${title}` }]}
        >
          {!autoComplete ? (
            <Select
              placeholder={placeholder}
              // options={options}
              onSelect={onSelect}
              showSearch={showSearch}
              onSearch={onSearch}
              onClear={onClear}
              notFoundContent={notFoundContent}
              className={styles?.optionItem}
              loading={loading}
              allowClear
              disabled={disabled}
              labelRender={(record) => {
                return (
                  <span>
                    <span>{record?.value}</span>
                    <Button
                      type="link"
                      className={styles?.copyBtn}
                      style={{
                        position: "absolute",
                        right: 20,
                        bottom: "-1px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // navigator.clipboard
                        //   ?.writeText(record?.value as any)
                        //   .then(() => {
                        //     message.success("复制成功");
                        //   })
                        //   .catch((err) => {
                        //     message.error("复制失败");
                        //   });
                        const textArea = document.createElement("textarea");
                        textArea.value = record?.value as any;
                        // 使text area不在viewport，同时设置不可见
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        return new Promise((res, rej) => {
                          // 执行复制命令并移除文本框
                          document.execCommand("copy") ? res("success") : rej();
                          textArea.remove();
                        })
                          .then((res) => {
                            message.success("复制成功");
                          })
                          .catch((err) => {
                            message.error("复制失败");
                          });
                      }}
                    >
                      复制
                    </Button>
                  </span>
                );
              }}
            >
              {options?.map((item) => {
                return (
                  <Select.Option
                    title={item?.label}
                    {...item}
                    key={optionKey ? item?.[optionKey as "value"] : item.value}
                    className={styles?.optionItem}
                  >
                    {item?.label}
                    {!disableCopy && (
                      <Button
                        type="link"
                        className={styles?.copyBtn}
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: "-1px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // navigator.clipboard
                          //   ?.writeText(item?.label)
                          //   .then(() => {
                          //     message.success("复制成功");
                          //   })
                          //   .catch((err) => {
                          //     message.error("复制失败");
                          //   });
                          const textArea = document.createElement("textarea");
                          textArea.value = item?.label;
                          // 使text area不在viewport，同时设置不可见
                          document.body.appendChild(textArea);
                          textArea.focus();
                          textArea.select();
                          return new Promise((res, rej) => {
                            // 执行复制命令并移除文本框
                            document.execCommand("copy")
                              ? res("success")
                              : rej();
                            textArea.remove();
                          })
                            .then((res) => {
                              message.success("复制成功");
                            })
                            .catch((err) => {
                              message.error("复制失败");
                            });
                        }}
                      >
                        复制
                      </Button>
                    )}
                  </Select.Option>
                );
              })}
            </Select>
          ) : (
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              options={uniqueArray(options, "value")}
              size="large"
              onSelect={onSelect}
              showSearch={showSearch}
              onSearch={onSearch}
              onClear={onClear}
              allowClear
            >
              <Input size="large" placeholder={placeholder} style={style} />
            </AutoComplete>
          )}
        </Form.Item>

        <span style={{ color: "red" }}>{remark && <>提示：{remark}</>}</span>
      </td>
    </>
  );
};
const RenderDatePicker = ({
  title,
  name,
  colSpan,
  labelColSpan,
  required,
  showTime,
  titleStyle,
  disabled,
}: {
  title: string;
  name: string;
  colSpan?: number;
  labelColSpan?: number;
  required?: boolean;
  showTime?: boolean;
  titleStyle?: React.CSSProperties;
  disabled?: boolean;
}) => {
  return (
    <>
      <th style={titleStyle} colSpan={labelColSpan}>
        {title}
        {required && " *"}
      </th>
      <td
        colSpan={colSpan}
        className={`${styles["input-container"]} ${styles["date-container"]}`}
      >
        <Form.Item
          name={name}
          rules={[{ required: required, message: `请输入${title}` }]}
        >
          <DatePicker
            showTime={showTime}
            size="large"
            disabled={disabled}
          ></DatePicker>
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
