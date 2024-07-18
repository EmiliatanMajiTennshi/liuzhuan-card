// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useState } from "react";

import styles from "./index.module.scss";
import { Button, ConfigProvider, Form, Spin, Table, message } from "antd";
import { transFormToKg, transFormToPcs } from "@/utils";

import logo from "@/assets/images/logo.png";
import getApi, { TApi } from "@/api";
import { insertSaveCard } from "@/api/insertSaveCard";
import { RenderQRCode } from "@/utils";
import { IData, IFormFields } from "./indexType";
import CommonForm from "./CommonForm";
import OutsourcingForm from "./OutsourcingForm";
import { ITableConfig } from "@/components/AdvancedSearchTable/AdvancedSearchTableType";
import { kgArr } from "@/constants";
import { getParams, getTableColumns } from "./config";

const ProductionProcessFlowCardAndDispatchList = (props: {
  issueID: number;
  queryFlowCardApi?: TApi;
  flowCardType: ITableConfig["flowCardType"];
}) => {
  const { issueID, queryFlowCardApi, flowCardType } = props;
  // 数据
  const [data, setData] = useState<IData>({});
  // loading
  const [loading, setLoading] = useState(false);
  // 材料id
  const [mItmID, setMItemId] = useState<string>("");
  // 最大流转数量
  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const [form] = Form.useForm();
  // 请求数据
  const fetchData = async () => {
    try {
      setLoading(true);
      if (!queryFlowCardApi) return;
      const currentRequest = getApi(queryFlowCardApi);
      const res: any = await currentRequest({ id: issueID });
      if (res?.status === 200 && res?.data?.data) {
        const formData = res?.data?.data[0];
        form.setFieldsValue(formData);
        setData(formData);
        setMItemId(formData?.mItemId);
      } else {
        throw new Error("请求数据时发生错误");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("请求数据时发生错误", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    /**加载数据 */

    if (issueID) {
      fetchData();
    }
  }, [issueID]);

  useEffect(() => {
    // 二维码不手动设置值会出现奇怪的bug
    form.setFieldValue("orderQRcode", data.orderid);
    form.setFieldValue("traceabilityNumberQRcode", data.traceabilityNumber);
    form.setFieldValue("rukuQRcode", data.itmid);
    form.setFieldValue("lingliaoQRcode", data.mItmID);
    form.setFieldValue(
      "huancount",
      data?.newsupcount && data?.parseWeight
        ? isKg
          ? transFormToPcs(data?.newsupcount, data?.parseWeight)
          : transFormToKg(data?.newsupcount, data?.parseWeight)
        : ""
    );
    form.setFieldValue("transferCardCode", data.transferCardCode);

    // 给流转数量初始值 产量-已使用
    if (isKg) {
      if (data?.newsupcount && data?.parseWeight) {
        // 流转数量
        const liucount =
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumKG || "0");
        const liuhuancount = parseFloat(
          transFormToPcs(liucount, data?.parseWeight)
        );
        form.setFieldValue("liucount", liucount);
        setLiuMaxKg(liucount);
        setLiuMaxPCS(liuhuancount);
        form.setFieldValue("liuhuancount", liuhuancount);
      }
    } else {
      if (data?.newsupcount && data?.parseWeight) {
        const liucount =
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumPCS || "0");
        const liuhuancount = parseFloat(
          transFormToKg(liucount, data?.parseWeight)
        );

        setLiuMaxKg(liuhuancount);
        setLiuMaxPCS(liucount);
        form.setFieldValue("liucount", liucount);
        form.setFieldValue("liuhuancount", liuhuancount);
      }
    }
  }, [data]);

  /** 主要尺寸(孔径,片厚等)*/
  const mainsize: any = useMemo(() => {
    if (data?.mainsizeList) {
      return data?.mainsizeList[0];
    }
    return {};
  }, [data]);

  const unit = data.uomname || "";
  const isKg = kgArr.indexOf(unit) !== -1;

  const onFinish = (values: IFormFields) => {
    const params = getParams({ data, values, mainsize, isKg, flowCardType });
    insertSaveCard(params).then((res) => {
      if (res?.data?.code === 20000) {
        message.success(res?.data?.data);
        fetchData();
      } else {
        message.error("插入失败");
      }
    });
    console.log("Received values of form: ", values, params);
  };

  // common 表单
  const commonFormProps = {
    data,
    isKg,
    form,
    liuMaxKg,
    liuMaxPCS,
    mItmID,
    setMItemId,
    mainsize,
  };
  // 外协外购
  const outsourcingFormProps = {
    data,
    isKg,
    form,
    liuMaxKg,
    liuMaxPCS,
    mainsize,
  };
  return (
    <div className={styles["flow-card"]}>
      <Spin spinning={loading}>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* 这里是你的组件 token */
                activeShadow: "0 0 0 0px rgba(5, 145, 255, 0.1)",
              },
              Table: {
                headerBorderRadius: 0,
                headerBg: "#accbe9",
                borderColor: "#000",
              },
            },
          }}
        >
          <Form onFinish={onFinish} form={form} className={styles["form"]}>
            <div className={styles["form-title"]}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={logo} width={128}></img>
              <h2>生产工序流转卡暨派工单</h2>
              <RenderQRCode
                title="流转卡编号"
                name="transferCardCode"
                value={data?.transferCardCode || ""}
                noTd={true}
                size={88}
              />
            </div>
            <table>
              {flowCardType === "common" && <CommonForm {...commonFormProps} />}
              {flowCardType === "outsourcing" && (
                <OutsourcingForm {...outsourcingFormProps} />
              )}
            </table>
          </Form>
          <Table
            columns={getTableColumns({ flowCardType })}
            style={{
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              marginBottom: 10,
            }}
            pagination={false}
            dataSource={data?.processList}
          ></Table>
          <Button type="primary" size="large" onClick={() => form.submit()}>
            保存
          </Button>
        </ConfigProvider>
      </Spin>
    </div>
  );
};

export default ProductionProcessFlowCardAndDispatchList;
