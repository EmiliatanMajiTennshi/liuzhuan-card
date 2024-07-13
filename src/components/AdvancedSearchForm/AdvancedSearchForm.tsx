import { Button, Col, Form, Row, Space } from "antd";
import { IAdvancedSearchForm, IButtons } from "./AdvancedSearchFormType";
import { useState } from "react";

const gutter = 24;
const span = 6;

const AdvancedSearchForm = (props: IAdvancedSearchForm) => {
  const {
    formConfig,
    setSearchParams,
    loading,
    selectedRowKeys,
    setRefreshFlag,
  } = props;
  const [form] = Form.useForm();
  const [buttonLoading, setButtonLoading] = useState({ insertButton: false });
  // 可能是函数
  const _formConfig =
    typeof formConfig === "function" ? formConfig(form) : formConfig;
  const { formItems, span: _span, buttons } = _formConfig;

  // 列数
  const colNumber = gutter / (_span || span);
  // 控制每一列宽度相同
  let labelWidths: number[] = [];
  let requiredArr: number[] | undefined[] = [];
  formItems.forEach((item, index) => {
    // 第几列
    const columnNum = index % colNumber;
    if (
      // 对比字数
      labelWidths?.[columnNum] < item.name.length ||
      !labelWidths?.[columnNum]
    )
      labelWidths[columnNum] = item.name.length;
    const isRequired = item.rules?.findIndex((subItem) => {
      return typeof subItem === "object" && subItem.required === true;
    });
    if (!requiredArr[columnNum]) {
      // 计算必输符号宽度
      requiredArr[columnNum] = isRequired;
    }
  });

  /**
   * 表单提交的回调
   * @param values 表单数据
   */
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setSearchParams(values);
  };

  /**
   * 按钮属性
   */
  const buttonsProps: IButtons = {
    selectedRowKeys,
    setRefreshFlag,
    buttonLoading,
    setButtonLoading,
  };
  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={gutter}>
        {formItems.map((item, index) => {
          // 第几列
          const columnNum = index % colNumber;
          return (
            <Col span={_span || span} key={item.key}>
              <Form.Item
                name={item.key}
                label={item.name}
                rules={item.rules}
                key={item.key}
                labelCol={{
                  style: {
                    display: "inline-block",
                    width:
                      14 * labelWidths[columnNum] +
                      (requiredArr[columnNum] !== -1 ? 30 : 16),
                  },
                }}
              >
                {item.children}
              </Form.Item>
            </Col>
          );
        })}
        {buttons && typeof buttons !== "function" && (
          <Form.Item>{buttons}</Form.Item>
        )}
        {buttons && typeof buttons === "function" && (
          <Form.Item>{buttons(buttonsProps)}</Form.Item>
        )}
      </Row>
      {!buttons && (
        <div style={{ textAlign: "right" }}>
          <Space size="small">
            <Button type="primary" htmlType="submit" loading={loading}>
              查询
            </Button>
            <Button
              onClick={() => {
                setSearchParams([]);
                form.resetFields();
              }}
              disabled={loading}
            >
              重置
            </Button>
          </Space>
        </div>
      )}
    </Form>
  );
};

export default AdvancedSearchForm;
