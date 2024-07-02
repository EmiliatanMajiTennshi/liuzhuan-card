import { Button, Col, Form, Row, Space } from "antd";
import { IAdvancedSearchForm } from "./AdvancedSearchFormType";

const gutter = 24;
const span = 6;

const AdvancedSearchForm = (props: IAdvancedSearchForm) => {
  const { formConfig, setSearchParams, loading } = props;
  const [form] = Form.useForm();
  const _formConfig =
    typeof formConfig === "function" ? formConfig(form) : formConfig;
  const { formItems, span: _span } = _formConfig;

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

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setSearchParams(values);
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
      </Row>
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
    </Form>
  );
};

export default AdvancedSearchForm;
