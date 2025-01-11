import { Button, Col, Form, Modal, Row } from "antd";
import { IAdvancedSearchForm, IButtons } from "./AdvancedSearchFormType";
import { useState } from "react";
import { SearchOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
import { transformDateToString } from "@/utils";
import styles from "./index.module.scss";
const defaultSpan = 6;

const AdvancedSearchForm = (props: IAdvancedSearchForm) => {
  const {
    formConfig,
    setSearchParams,
    loading,
    selectedRowKeys,
    setRefreshFlag,
    initValues,
    form,
    reworkModalOpen,
    setReworkModalOpen,
    rollChainModalOpen,
    setRollChainModalOpen,
  } = props;

  // 控制按钮是否加载
  const [buttonLoading, setButtonLoading] = useState({ insertButton: false });

  // 需要远程获取的选项
  const [options, setOptions] = useState({});

  const [modal, contextHolder] = Modal.useModal();

  const {
    formItems: _formItems,
    span: _span,
    buttons,
    handleDate,
    name,
    extraButtons,
  } = formConfig;

  const span = _span || defaultSpan;

  // 列数
  const colNumber = 24 / span;

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
    modal,
  };

  const handleReset = () => {
    setSearchParams([]);
    form.resetFields();
  };
  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        initialValues={initValues}
        onFinish={onFinish}
      >
        <Row gutter={8}>
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
          <div className={styles.customBtns}>
            {buttons && typeof buttons !== "function" && (
              <Form.Item>{buttons}</Form.Item>
            )}
            {buttons && typeof buttons === "function" && (
              <Form.Item>{buttons(buttonsProps)}</Form.Item>
            )}
          </div>
        </Row>
        {!buttons && (
          <div className={styles.formButtons}>
            {extraButtons && typeof extraButtons !== "function" && extraButtons}
            {extraButtons &&
              typeof extraButtons === "function" &&
              extraButtons()}

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SearchOutlined />}
            >
              查询
            </Button>
            <Button
              onClick={handleReset}
              disabled={loading}
              icon={<RedoOutlined />}
            >
              重置
            </Button>

            {name === "QueryRollChain" && (
              <Button
                type="dashed"
                onClick={() => {
                  setRollChainModalOpen(true);
                }}
              >
                <PlusOutlined />
                新增车间卷装链条
              </Button>
            )}
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
            queryFlowCardApi="queryReworkBySign"
            setRefreshFlag={setRefreshFlag}
          />
        </Modal>
      )}
      {rollChainModalOpen && (
        <Modal
          open={rollChainModalOpen}
          onCancel={() => setRollChainModalOpen(false)}
          footer={null}
          width={640}
          maskClosable={false}
        >
          <ProductionProcessFlowCardAndDispatchList
            flowCardType="rollChain"
            setRefreshFlag={setRefreshFlag}
          />
        </Modal>
      )}

      {contextHolder}
    </>
  );
};

export default AdvancedSearchForm;
