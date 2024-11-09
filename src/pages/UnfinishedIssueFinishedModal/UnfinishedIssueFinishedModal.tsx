import getApi, {
  insertfinishedProductsNew,
  insertUnfinishedProductsNew,
} from "@/api";
import { kgArr, SUCCESS_CODE } from "@/constants";
import { RenderQRCode } from "@/utils";
import { App, Button, ConfigProvider, Form, Table, Tabs } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import styles from "./index.module.scss";
import CommonForm from "../ProductionProcessFlowCardAndDispatchList/CommonForm";
import { Spin } from "antd/lib";
import {
  getParams,
  useTableColumns,
} from "../ProductionProcessFlowCardAndDispatchList/config";
import _ from "lodash";

const UnfinishedPage = (props: any) => {
  return (
    <div className={styles["flow-card"]}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              /* 这里是你的组件 token */
              activeShadow: "0 0 0 0px rgba(5, 145, 255, 0.1)",
            },
            Table: {
              cellFontSize: 18,
              headerBorderRadius: 0,
              headerBg: "#accbe9",
              borderColor: "#000",
            },
          },
        }}
      >
        <Form
          form={props?.form}
          onFinish={props?.onFinish}
          className={styles["form"]}
        >
          <div className={styles["form-title"]}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={logo} width={136}></img>
            <>
              <h2 style={{ textAlign: "center" }}>生产工序流转卡暨派工单</h2>
              <RenderQRCode
                title="流转卡编号"
                name="transferCardCode"
                value={
                  props?.data?.transferCardCode ||
                  props?.data?.transferCard ||
                  ""
                }
                noTd={true}
                size={120}
                form={props?.form}
              />
            </>
          </div>
          <table style={{ overflow: "hidden", tableLayout: "fixed" }}>
            <CommonForm {...props} />
          </table>
        </Form>
        <>
          <Table
            rowKey={props?.tableData?.[0]?.id ? "id" : "hid"}
            columns={useTableColumns({
              flowCardType: "common",
              tableData: props?.tableData,
              setTableData: props?.setTableData,
            })}
            style={{
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              marginBottom: 10,
            }}
            pagination={false}
            dataSource={props?.tableData}
            className={styles.flowCardTable}
          ></Table>
        </>
      </ConfigProvider>
    </div>
  );
};
const UnfinishedIssueFinishedModal = (props: any) => {
  const { issueID, queryFlowCardApi, beIssuedID, issuedFlowCardApi } = props;

  const [loading, setLoading] = useState(false);
  const [unfinishedData, setUnfinishedData] = useState<AnyObject>({});
  const [finishedData, setFinishedData] = useState<AnyObject>({});
  // table数据
  const [tableDataUnfinished, setTableDataUnfinished] = useState<any[]>([]);
  const [tableDataFinished, setTableDataFinished] = useState<any[]>([]);
  // 被下发的pCode
  const [beIssuedPCode, setBeIssuedPCode] = useState("");
  const [activeKey, setActiveKey] = useState("1");
  // 保存按钮的loading
  const [saveLoading, setSaveLoading] = useState(false);
  const { message } = App.useApp();
  const [unfinishedForm] = Form.useForm();
  const [finishedForm] = Form.useForm();
  // 数据重新请求后不需要更新的数据
  const [uncoverData32, setUncoverData32] = useState<AnyObject>({});
  const [uncoverData31, setUncoverData31] = useState<AnyObject>({});
  // 流转数量
  const [transferNum32, setTransferNum32] = useState<number>();
  const [transferNum31, setTransferNum31] = useState<number>();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!queryFlowCardApi || !issuedFlowCardApi) return;
      const currentRequest: any = getApi(queryFlowCardApi);
      const issuedRequest: any = getApi(issuedFlowCardApi);
      const [res1, res2] = await Promise.all([
        currentRequest(issueID),
        issuedRequest(beIssuedID),
      ]);
      console.log(res1, res2, 11111224, beIssuedID);
      // 半品
      if (SUCCESS_CODE.indexOf(res1?.data?.code) !== -1 && res1?.data?.data) {
        const _data = res1?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        // form.setFieldsValue(formData);
        setUnfinishedData(formData);
        unfinishedForm.setFieldsValue(formData);
        const _tableData = formData?.processList || formData?.detailProcesses;
        setTableDataUnfinished(_tableData || []);
        setTransferNum32(formData?.transferNumber);
      } else {
        throw new Error("请求32数据时发生错误");
      }
      // 成品
      if (SUCCESS_CODE.indexOf(res2?.data?.code) !== -1 && res2?.data?.data) {
        const _data = res2?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        // form.setFieldsValue(formData);
        setFinishedData(formData);
        finishedForm.setFieldsValue(formData);
        const _tableData = formData?.processList || formData?.detailProcesses;
        setTableDataFinished(_tableData || []);
        setTransferNum31(formData?.transferNumber);
      } else {
        throw new Error("请求31数据时发生错误");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("请求数据时发生错误", error);
    } finally {
      setLoading(false);
      setSaveLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [issuedFlowCardApi]);

  // 下发
  const onFinish32 = (values: any) => {
    setSaveLoading(true);
    const value32 = values;
    const value31 = finishedForm.getFieldsValue();
    const params32: any = getParams({
      form: unfinishedForm,
      data: unfinishedData || {},
      values: value32,
      mainsize: unfinishedData?.mainsizeList?.[0] || {},
      isKg: kgArr.indexOf(unfinishedData?.unit) !== -1,
      flowCardType: "unfinished",
      tableData: unfinishedData?.processList || unfinishedData?.detailProcesses,
    });
    const params31: any = getParams({
      form: finishedForm,
      data: finishedData || {},
      values: value31,
      mainsize: finishedData?.mainsizeList?.[0] || {},
      isKg: kgArr.indexOf(finishedData?.unit) !== -1,
      flowCardType: "finished",
      tableData: finishedData?.processList || finishedData?.detailProcesses,
    });

    const now = new Date().getTime();
    const requiredTrademark = params31?.name?.indexOf("外链板") !== -1;
    // 扶梯链不需要商标
    const isFuti =
      unfinishedData?.department === "扶梯链" ||
      finishedData?.department === "扶梯链";
    const request32to31 = async () => {
      if (params31?.trademark && !params32?.trademark && !isFuti) {
        // 半品有商标，成品没有无法下发
        message?.error("成品（31）零件没有选择商标，请选择商标后再保存");
        setSaveLoading(false);
        return;
      }
      if (requiredTrademark && !params31?.trademark && !isFuti) {
        // 零件品名包含 “外链板” 必须选择商标
        message?.error("该零件成品（31）必须选择商标！");
        setSaveLoading(false);
        return;
      }
      if (requiredTrademark && !params32?.trademark && !isFuti) {
        // 零件品名包含 “外链板” 必须选择商标
        message?.error("该零件必须选择商标！");
        setSaveLoading(false);
        return;
      }
      if (!params32?.process || params32?.process?.length === 0) {
        message?.error("半品（32）没有工序，无法下发！");
        setSaveLoading(false);
        return;
      }
      if (!params31?.process || params31?.process?.length === 0) {
        message?.error("成品（31）没有工序，无法下发！");
        setSaveLoading(false);
        return;
      }

      try {
        const [resUnfinished, resFinished] = await Promise.all([
          insertUnfinishedProductsNew({ ...params32, relation: now }),
          insertfinishedProductsNew({
            ...params31,
            relation: now,
          }),
        ]);
        if (SUCCESS_CODE.indexOf(resUnfinished?.data?.code) !== -1) {
          message.success("半品（32）下发成功");
          setUncoverData32({
            transferKg: params32?.transferKg,
            transferPcs: params32?.transferPcs,
            trademark: params32?.trademark,
            mItmID: params32?.materialPartNumber,
            mName: params32?.materialName,
            mspec: params32?.materialSpec,
            mItmTDID: params32?.materialQuality,
            orderid: params32?.barCode,
          });
          // 添加完刷新数据
        } else {
          message.error("半品（32）下发失败");
        }
        if (SUCCESS_CODE.indexOf(resFinished?.data?.code) !== -1) {
          message.success("成品（31）下发成功");
          setUncoverData31({
            transferKg: params31?.transferKg,
            transferPcs: params31?.transferPcs,
            trademark: params31?.trademark,
            mItmID: params31?.materialPartNumber,
            mName: params31?.materialName,
            mspec: params31?.materialSpec,
            mItmTDID: params31?.materialQuality,
            orderid: params31?.barCode,
          });

          // 添加完刷新数据
          fetchData();
        } else {
          message.error("成品（31）下发失败");
        }
      } catch {
        message.error("下发失败");
      } finally {
        setSaveLoading(false);
      }
    };

    // setSaveLoading(false);
    request32to31();
  };
  const commonFormProps = {
    data: unfinishedData,
    isKg: kgArr.indexOf(unfinishedData?.unit || "") !== -1,
    form: unfinishedForm,
    mainsize: unfinishedData?.mainsizeList?.[0] || {},
    tableData: tableDataUnfinished,
    setTableData: setTableDataUnfinished,
    beIssuedForm: finishedForm,
    beIssuedData: finishedData,
    needIssueFinished: true,
    setBeIssuedPCode,
    onFinish: onFinish32,
    transferNum: transferNum32,
    uncoverData: uncoverData32,
  };
  // 成品
  const commonFormPropsFinished = {
    data: finishedData,
    isKg: kgArr.indexOf(finishedData?.unit || "") !== -1,
    form: finishedForm,
    mainsize: finishedData?.mainsizeList?.[0] || {},
    tableData: tableDataFinished,
    setTableData: setTableDataFinished,
    notSelfIssue: true,
    beIssuedPCode,
    setBeIssuedPCode,
    transferNum: transferNum31,
    uncoverData: uncoverData31,
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Tabs
          size="large"
          items={[
            {
              label: "半品下发",
              key: "1",
            },
            {
              label: "成品下发",
              key: "2",
            },
          ]}
          activeKey={activeKey}
          onChange={(e) => setActiveKey(e)}
        ></Tabs>
        <span style={activeKey === "1" ? {} : { display: "none" }}>
          <UnfinishedPage {...commonFormProps} />
        </span>
        <span style={activeKey === "2" ? {} : { display: "none" }}>
          <UnfinishedPage {...commonFormPropsFinished} />
        </span>
        <div className={styles.footer}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              unfinishedForm?.submit();
            }}
            loading={saveLoading}
            className={styles.footerSaveBtn}
          >
            同时下发
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default UnfinishedIssueFinishedModal;
