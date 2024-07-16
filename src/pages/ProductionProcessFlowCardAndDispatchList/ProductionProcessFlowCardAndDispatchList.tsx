// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useState } from "react";

import styles from "./index.module.scss";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import { getLZCardNumber, getTrackingNumber, request } from "@/utils";
import QRCode from "qrcode.react";
import logo from "@/assets/images/logo.png";
import getApi, {
  TApi,
  getHeatTreatmentFurnacePlatformsList,
  queryFlowCardInfoById,
  queryMaterialByItemid,
} from "@/api";
import { insertSaveCard } from "@/api/insertSaveCard";
import {
  EditAbleInput,
  ReadOnlyInput,
  RenderDatePicker,
  RenderQRCode,
  RenderSelect,
} from "@/utils";

interface IData {
  orderid?: string;
  itmid?: string;
  name?: string;
  spec?: string;
  itmtdid?: string;
  ljFinDate?: string;
  newsupcount?: string;
  uomname?: string;
  weight?: string;
  unit?: string;
  mItmID?: string;
  mName?: string;
  mspec?: string;
  mItmTDID?: string;
  mainsizeList?: {
    project1?: string;
    projectitem1?: string;
    project2?: string;
    projectitem2?: string;
    project3?: string;
    projectitem3?: string;
    project4?: string;
    projectitem4?: string;
    allID?: string;
  }[];
  processList?: {
    seq?: number;
    processName?: string;
  }[];
  transferCardCode?: string;
  orderCode?: string;
  storeCode?: string;
  pickingCode?: string;
  traceabilityNumber?: string;
  trademarkList?: any[];
  type?: string;
}
const kgArr = ["公斤", "千克", "KG", "kg"];
const pcsArr = ["pcs", "PCS", "条", "根"];

const ProductionProcessFlowCardAndDispatchList = (props: {
  issueID: number;
  queryFlowCardApi?: TApi;
}) => {
  const { issueID, queryFlowCardApi } = props;
  const [data, setData] = useState<IData>({});
  const [loading, setLoading] = useState(false);
  const [mItmID, setMItemId] = useState<string>("");
  const [form] = Form.useForm();

  // 热处理炉台
  const [heatTreatmentFurnaces, setHeatTreatmentFurnaces] = useState<any[]>([]);

  useEffect(() => {
    /**加载数据 */
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
      data?.newsupcount && data?.weight
        ? Math.round(
            isKg
              ? parseFloat(data?.newsupcount) / parseFloat(data?.weight)
              : parseFloat(data?.newsupcount) * parseFloat(data?.weight)
          ).toString()
        : ""
    );
    form.setFieldValue("transferCardCode", data.transferCardCode);

    if (data?.itmid?.substring(0, 2) === "31") {
      getHeatTreatmentFurnacePlatformsList()
        .then((res: any) => {
          if (res?.data?.code === 20000) {
            setHeatTreatmentFurnaces(
              res?.data?.data.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))
            );
          }
        })
        .catch((err) => {
          message.error("请求热处理炉台数据失败");
          console.log(err);
        });
    }
  }, [data]);

  /** 主要尺寸(孔径,片厚等)*/
  const mainsize: any = useMemo(() => {
    if (data?.mainsizeList) {
      return data?.mainsizeList[0];
    }
    return {};
  }, [data]);

  const trackingNumber = getTrackingNumber();

  const unit = data.uomname || "";
  const isKg = kgArr.indexOf(unit) !== -1;

  interface IFormFields {
    orderCatchHalf: string;
    lzCardNumber: string;
    orderid: string;
    itmid: string;
    name: string;
    spec: string;
    traceabilityNumber: string;
    itmtcid: string;
    itmTEID: string;
    ljFinDate: string;
    newsupcount: string;
    huancount: number;
    mItmID: string;
    mName: string;
    mspec: string;
    mItmTDID: string;
    itmtdid: string;
    orderQRcode: string;
    rukuQRcode: string;
    lingliaoQRcode: string;
    ordernum: string;
    liucount: string;
    liuhuancount: string;
    furnaceNum: string;
    trademark: string;
    heatTreatmentFurnace: string;
    priority: string;
    transferTime: string;
  }

  const onFinish = (values: IFormFields) => {
    const a = {
      // id: "",
      //零件类型
      type: data?.type,
      //生产订单条码
      barCode: values?.orderQRcode,
      //零件料号
      partNumber: values?.itmid,
      // //入库料号
      // storePartNumber: "",
      //品名
      name: values?.name,
      //规格
      specs: values?.spec,
      //完成时间
      finishTime: values?.ljFinDate,
      //单位
      unit: data?.unit,
      //材质
      material: values?.itmtdid,
      //表面处理
      surfaceTreatment: values?.itmtcid,
      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,
      //客户订单号
      customerOrderNo: values?.ordernum,
      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: isKg ? values?.liucount : values?.liuhuancount,
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: !isKg ? values?.liucount : values?.liuhuancount,
      //供方/炉批号
      furnaceNo: values.furnaceNum,
      //材料料号
      materialPartNumber: values.mItmID,
      //材料品名
      materialName: values.mName,
      //材料规格
      materialSpec: values.mspec,
      //材料材质
      materialQuality: values.mItmTDID,
      //主要尺寸名字1
      project1Name: mainsize.project1,
      //主要尺寸名字1内容
      project1Item: mainsize.projectitem1,
      //主要尺寸名字2
      project2Name: mainsize.project2,
      //主要尺寸名字2内容
      project2Item: mainsize.projectitem2,
      //主要尺寸名字3
      project3Name: mainsize.project3,
      //主要尺寸名字3内容
      project3Item: mainsize.projectitem3,
      //主要尺寸名字4
      project4Name: mainsize.project4,
      //主要尺寸名字4内容
      project4Item: mainsize.projectitem4,
      //主要尺寸名字5
      project5Name: mainsize.project5,
      //主要尺寸名字5内容
      project5Item: mainsize.projectitem5,
      //商标
      trademark: values.trademark,
      //追溯单号(半品)
      orderCatchHalf: values.orderCatchHalf,
      //热处理炉台
      heatTreatmentFurnacePlatform: values.heatTreatmentFurnace,
      //优先顺序
      priorityOrder: values.priority,
      //零件流转时间
      tranferTime: values.transferTime,
      //工艺
      process: data?.processList,
    };
    insertSaveCard(a).then((res) => {
      console.log(res, 1123);
    });
    console.log("Received values of form: ", values, a);
  };

  const columns = [
    {
      title: "工序",
      dataIndex: "processName",
      key: "processName",
    },

    {
      title: "检验等级",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "检验员条码",
      dataIndex: "itmid",
      key: "itmid",
    },
    {
      title: "检验员",
      dataIndex: "goodsname",
      key: "goodsname",
    },
    {
      title: "操作工条码",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "操作工",
      dataIndex: "Pcode",
      key: "Pcode",
    },
    {
      title: "完成日期",
      dataIndex: "ljFinDate",
      key: "ljFinDate",
    },
    {
      title: "设备条码",
      dataIndex: "uomname",
      key: "uomname",
    },
    {
      title: "设备名称",
      dataIndex: "supcount",
      key: "supcount",
    },
    {
      title: "产量",
      dataIndex: "sumcount",
      key: "sumcount",
    },
  ];

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
              <tbody>
                <tr>
                  <EditAbleInput
                    title="生产订单条码"
                    name="orderid"
                    titleStyle={{ color: "red" }}
                  />
                  <ReadOnlyInput title="料号" name="itmid" />
                  <ReadOnlyInput title="品名" name="name" />
                  <ReadOnlyInput title="规格" name="spec" />
                </tr>
                <tr>
                  <ReadOnlyInput title="材质" name="itmtdid" />
                  <RenderSelect
                    title="商标"
                    name="trademark"
                    options={
                      data?.trademarkList?.map((item) => ({
                        value: item.trademark,
                        label: item.trademark,
                      })) || []
                    }
                    placeholder="请选择商标"
                  />
                  <ReadOnlyInput title="追溯单号" name="traceabilityNumber" />
                  <EditAbleInput
                    title="追溯单号（半品）"
                    name="orderCatchHalf"
                  />
                </tr>
                <tr>
                  <ReadOnlyInput title="客户订单号" name="ordernum" />
                  <ReadOnlyInput title="表面处理" name="itmtcid" />
                  <ReadOnlyInput title="图号" name="itmTEID" />
                  <ReadOnlyInput title="完成日期" name="ljFinDate" />
                </tr>
                <tr>
                  <ReadOnlyInput
                    title="生产数量（公斤）"
                    name={isKg ? "newsupcount" : "huancount"}
                  />
                  <EditAbleInput
                    title="流转数量（公斤）"
                    isNumber
                    name={isKg ? "liucount" : "liuhuancount"}
                    onChange={(e: number) => {
                      const valueKg = e;
                      const valuePCS =
                        data?.weight && valueKg
                          ? Math.round(valueKg / parseFloat(data?.weight))
                          : "";
                      if (isKg) {
                        form.setFieldValue("liuhuancount", valuePCS.toString());
                      } else {
                        form.setFieldValue("liucount", valuePCS.toString());
                      }
                    }}
                  />
                  <ReadOnlyInput
                    title="生产数量（PCS）"
                    name={isKg ? "huancount" : "newsupcount"}
                  />
                  <EditAbleInput
                    title="流转数量（PCS）"
                    isNumber
                    name={isKg ? "liuhuancount" : "liucount"}
                    onChange={(e: number) => {
                      const valuePCS = e;
                      const valueKg =
                        data?.weight && valuePCS
                          ? (valuePCS * parseFloat(data?.weight)).toFixed(2)
                          : "";
                      if (!isKg) {
                        form.setFieldValue("liuhuancount", valueKg.toString());
                      } else {
                        form.setFieldValue("liucount", valuePCS.toString());
                      }
                    }}
                  />
                </tr>
                <tr>
                  <EditAbleInput
                    title="材料料号"
                    name="mItmID"
                    onBlur={(e) => {
                      const currentId = e.target.value;
                      if (currentId === mItmID) {
                        return;
                      }
                      setMItemId(currentId);
                      queryMaterialByItemid({ itemid: currentId }).then(
                        (res) => {
                          console.log(res, 123111);

                          const data = res?.data?.data?.[0];
                          if (res?.data?.code !== 20000 || !data) {
                            message.error("获取材料数据失败");
                            form.setFieldValue("mName", "");
                            form.setFieldValue("mspec", "");
                            form.setFieldValue("mItmTDID", "");
                            return;
                          }

                          form.setFieldValue("mName", data.mName);
                          form.setFieldValue("mspec", data.mformat);
                          form.setFieldValue("mItmTDID", data.mtexture);
                          message.success("材料数据更新成功");
                        }
                      );
                    }}
                  />
                  <EditAbleInput title="材料品名" name="mName" />
                  <EditAbleInput title="材料规格" name="mspec" />
                  <EditAbleInput title="材料材质" name="mItmTDID" />
                </tr>
                <tr>
                  <ReadOnlyInput
                    title="供应/炉批号"
                    name="furnaceNum"
                    colSpan={4}
                    titleStyle={{ color: "red" }}
                  />

                  <th colSpan={3} style={{ textAlign: "center" }}>
                    生产入库扫描条码
                  </th>
                </tr>
                <tr>
                  <th rowSpan={3} style={{ color: "red" }}>
                    主要尺寸
                  </th>
                  <ReadOnlyInput
                    title={mainsize?.project1 || ""}
                    name={mainsize?.project1 || ""}
                    defaultValue={mainsize?.projectitem1 || ""}
                    colSpan={1}
                    form={form}
                  />
                  <ReadOnlyInput
                    title={mainsize?.project2 || ""}
                    name={mainsize?.project2 || ""}
                    defaultValue={mainsize?.projectitem2 || ""}
                    colSpan={1}
                    form={form}
                  />

                  <td rowSpan={3} colSpan={3}>
                    <div className={styles.QRcodes}>
                      <RenderQRCode
                        title="订单号"
                        name="orderQRcode"
                        rowSpan={3}
                        value={data.orderid || "没有数据"}
                        noTd
                      />
                      <RenderQRCode
                        title="追溯单号"
                        name="traceabilityNumberQRCode"
                        rowSpan={3}
                        value={data.traceabilityNumber || "没有数据"}
                        noTd
                      />
                      <RenderQRCode
                        title="入库二维码"
                        name="rukuQRcode"
                        rowSpan={3}
                        value={data.itmid || "没有数据"}
                        noTd
                      />
                      <RenderQRCode
                        title="领料二维码"
                        name="lingliaoQRcode"
                        rowSpan={3}
                        value={data.mItmID || "没有数据"}
                        noTd
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <ReadOnlyInput
                    title={mainsize?.project3 || ""}
                    name={mainsize?.project3 || ""}
                    defaultValue={mainsize?.projectitem3 || ""}
                    colSpan={1}
                    form={form}
                  />
                  <ReadOnlyInput
                    title={mainsize?.project4 || ""}
                    name={mainsize?.project4 || ""}
                    defaultValue={mainsize?.projectitem4 || ""}
                    colSpan={1}
                    form={form}
                  />
                </tr>
                <tr>
                  <ReadOnlyInput
                    title={mainsize?.project5 || ""}
                    name={mainsize?.project5 || ""}
                    defaultValue={mainsize?.projectitem5 || ""}
                    colSpan={1}
                    form={form}
                  />
                  <ReadOnlyInput
                    title={mainsize?.project6 || ""}
                    name={mainsize?.project6 || ""}
                    defaultValue={mainsize?.projectitem6 || ""}
                    colSpan={1}
                    form={form}
                  />
                </tr>
                {data?.itmid?.substring(0, 2) === "31" && (
                  <tr>
                    <RenderSelect
                      title="热处理炉台"
                      name="heatTreatmentFurnace"
                      options={heatTreatmentFurnaces}
                      titleStyle={{ color: "red" }}
                      colSpan={1}
                      labelColSpan={2}
                      placeholder="请选择炉台"
                    />
                    <RenderSelect
                      title="优先顺序"
                      name="priority"
                      options={Array.from({ length: 50 }, (item, index) => ({
                        value: index + 1,
                        label: index + 1,
                      }))}
                      placeholder="请选择优先顺序"
                    />
                    <RenderDatePicker
                      title="流转时间"
                      name="transferTime"
                      colSpan={2}
                    />
                  </tr>
                )}
              </tbody>
            </table>
          </Form>
          <Table
            columns={columns}
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
