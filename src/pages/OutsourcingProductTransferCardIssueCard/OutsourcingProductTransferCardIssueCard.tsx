// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useState } from "react";

import { Button, ConfigProvider, Form, Spin, Table, message } from "antd";
import logo from "@/assets/images/logo.png";
import getApi, { TApi, getHeatTreatmentFurnacePlatformsList } from "@/api";
import { insertSaveCard } from "@/api/insertSaveCard";
import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import styles from "./index.module.scss";
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
  alreadySend?: {
    alreaySendNumKG?: string;
    alreaySendNumPCS?: string;
  };
  parseWeight?: string;
}
const kgArr = ["公斤", "千克", "KG", "kg"];
const pcsArr = ["pcs", "PCS", "条", "根"];

const OutsourcingProductTransferCardIssueCard = (props: {
  issueID: number;
  queryFlowCardApi?: TApi;
}) => {
  const { issueID, queryFlowCardApi } = props;
  const [data, setData] = useState<IData>({});
  const [loading, setLoading] = useState(false);
  const [mItmID, setMItemId] = useState<string>("");
  const [form] = Form.useForm();

  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);
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
      data?.newsupcount && data?.parseWeight
        ? (isKg
            ? parseFloat(data?.newsupcount) / parseFloat(data?.parseWeight)
            : parseFloat(data?.newsupcount) * parseFloat(data?.parseWeight)
          ).toFixed(2)
        : ""
    );
    if (isKg) {
      if (data?.newsupcount && data?.parseWeight) {
        const liucount =
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumKG || "0");
        const liuhuancount = liucount / parseFloat(data?.parseWeight);

        form.setFieldValue("liucount", liucount.toFixed(2));
        setLiuMaxKg(liucount);
        setLiuMaxPCS(liuhuancount);
        form.setFieldValue("liuhuancount", liuhuancount.toFixed(2));
      }
    } else {
      if (data?.newsupcount && data?.parseWeight) {
        const liucount =
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumPCS || "0");
        const liuhuancount = liucount * parseFloat(data?.parseWeight);

        setLiuMaxKg(liuhuancount);
        setLiuMaxPCS(liucount);
        form.setFieldValue("liucount", liucount.toFixed(2));
        form.setFieldValue("liuhuancount", liuhuancount.toFixed(2));
      }
    }
    form.setFieldValue("transferCardCode", data.transferCardCode);
    // form.setFieldValue('liucount',isKg?parseFloat(data?.newsupcount)-parseFloat)

    if (data?.itmid?.substring(0, 2) === "31") {
      getHeatTreatmentFurnacePlatformsList()
        .then((res: any) => {
          if (res?.data?.code === 20000) {
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
    U9LineNo?: string;
  }

  const onFinish = (values: IFormFields) => {
    const params = {
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

      //流转卡编号
      transferCardCode: data?.transferCardCode,
      //追溯单号
      traceabilityNumber: values?.traceabilityNumber,

      //图号
      drawingNumber: values?.itmTEID,
      //生产公斤数
      productionKg: isKg ? values?.newsupcount : values?.huancount,
      //流转公斤数
      transferKg: (isKg ? values?.liucount : values?.liuhuancount).toString(),
      //生产PCS数
      productionPcs: !isKg ? values?.newsupcount : values?.huancount,
      //流转PCS数
      transferPcs: (!isKg ? values?.liucount : values?.liuhuancount).toString(),

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

      //工艺
      process: data?.processList,
      //行号
      U9LineNo: values?.U9LineNo,
    };
    insertSaveCard(params).then((res) => {
      if (res?.data?.code === 20000) {
        message.success(res?.data?.data);
      } else {
        message.error("插入失败");
      }
    });
    console.log("Received values of form: ", values, params);
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
                  <ReadOnlyInput
                    title="商标"
                    name="trademark"
                    // options={
                    //   data?.trademarkList?.map((item) => ({
                    //     value: item.trademark,
                    //     label: item.trademark,
                    //   })) || []
                    // }
                    // placeholder="请选择商标"
                  />
                  <ReadOnlyInput title="追溯单号" name="traceabilityNumber" />
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
                    max={liuMaxKg}
                    onChange={(e: number) => {
                      const valueKg = e;
                      const valuePCS =
                        data?.parseWeight && valueKg
                          ? transFormToPcs(valueKg, data?.parseWeight)
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
                    max={liuMaxPCS}
                    name={isKg ? "liuhuancount" : "liucount"}
                    onChange={(e: number) => {
                      const valuePCS = e;
                      const valueKg =
                        data?.parseWeight && valuePCS
                          ? transFormToKg(valuePCS, data?.parseWeight)
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
                  <ReadOnlyInput title="行号" name="u9LineNo" />
                  <ReadOnlyInput title="图号" name="itmTEID" colSpan={5} />
                </tr>
                <tr>
                  <ReadOnlyInput
                    title="供方/炉批号"
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

export default OutsourcingProductTransferCardIssueCard;
