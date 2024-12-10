import { App, Button, Col, Form, Modal, Row, Space } from "antd";
import { IAdvancedSearchForm, IButtons } from "./AdvancedSearchFormType";
import { useState } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  RedoOutlined,
  ExceptionOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
import { transformDateToString } from "@/utils";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import QRCodeScanner from "../QRCodeScanner/QRCodeScanner";
const defaultSpan = 6;

const AdvancedSearchForm = (props: IAdvancedSearchForm) => {
  const {
    formConfig,
    setSearchParams,
    loading,
    selectedRowKeys,
    setRefreshFlag,
    initValues,
  } = props;
  const [form] = Form.useForm();
  // 控制按钮是否加载
  const [buttonLoading, setButtonLoading] = useState({ insertButton: false });

  // 需要远程获取的选项
  const [options, setOptions] = useState({});

  // 添加返工流转卡modal
  const [reworkModalOpen, setReworkModalOpen] = useState(false);

  // 添加车间卷装链条
  const [rollChainModalOpen, setRollChainModalOpen] = useState(false);

  // 跳转
  const navigate = useNavigate();

  const [modal, contextHolder] = Modal.useModal();

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
            {name === "TransferCardUnfinishToStore" && (
              <>
                <Button
                  color="primary"
                  onClick={() => {
                    navigate("/statistical_details");
                  }}
                >
                  <BarChartOutlined />
                  统计明细
                </Button>
                <Button
                  type="dashed"
                  danger
                  onClick={() => {
                    navigate("/appeal_info_page");
                  }}
                >
                  <ExceptionOutlined />
                  申诉
                </Button>
              </>
            )}
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
