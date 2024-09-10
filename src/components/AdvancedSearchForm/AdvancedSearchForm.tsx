import { Button, Col, Form, Modal, Row, Space } from "antd";
import { IAdvancedSearchForm, IButtons } from "./AdvancedSearchFormType";
import { useState } from "react";
import { SearchOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
import { transformDateToString } from "@/utils";
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

  // 控制按钮是否加载
  const [buttonLoading, setButtonLoading] = useState({ insertButton: false });

  // 需要远程获取的选项
  const [options, setOptions] = useState({});

  // 添加返工流转卡modal
  const [reworkModalOpen, setReworkModalOpen] = useState(false);
  // 可能是函数
  const _formConfig =
    typeof formConfig === "function" ? formConfig(form) : formConfig;
  const {
    formItems: _formItems,
    span: _span,
    buttons,
    handleDate,
    name,
  } = _formConfig;

  // 列数
  const colNumber = gutter / (_span || span);
  // 控制每一列宽度相同
  let labelWidths: number[] = [];
  let requiredArr: number[] | undefined[] = [];

  const formItems =
    typeof _formItems === "function"
      ? _formItems({ options, setOptions })
      : _formItems;

  formItems?.forEach((item, index) => {
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
    if (handleDate) {
      const handledData = transformDateToString(values);
      setSearchParams(handledData);
    } else {
      setSearchParams(values);
    }
  };

  /**
   * 按钮属性
   */
  const buttonsProps: IButtons = {
    selectedRowKeys,
    setRefreshFlag,
    buttonLoading,
    setButtonLoading,
    loading,
  };

  const handleReset = () => {
    setSearchParams([]);
    form.resetFields();
  };
  return (
    <>
      <Form form={form} name="advanced_search" onFinish={onFinish}>
        <Row gutter={gutter}>
          {formItems?.map((item, index) => {
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
                <SearchOutlined />
                查询
              </Button>
              <Button onClick={handleReset} disabled={loading}>
                <RedoOutlined />
                重置
              </Button>
              {name === "ReworkTransferCard" && (
                <Button
                  type="dashed"
                  onClick={() => {
                    setReworkModalOpen(true);
                  }}
                >
                  <PlusOutlined />
                  新增返工流转卡
                </Button>
              )}
            </Space>
          </div>
        )}
      </Form>
      {reworkModalOpen && (
        <Modal
          open={reworkModalOpen}
          onCancel={() => setReworkModalOpen(false)}
          footer={null}
          width={1600}
          maskClosable={false}
        >
          <ProductionProcessFlowCardAndDispatchList
            flowCardType="rework"
            queryFlowCardApi="queryQR"
            setRefreshFlag={setRefreshFlag}
            setReworkModalOpen={setReworkModalOpen}
          />
        </Modal>
      )}
    </>
  );
};

export default AdvancedSearchForm;
