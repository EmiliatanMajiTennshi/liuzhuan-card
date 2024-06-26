// 生产工序流转卡暨派工单
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, ConfigProvider, Form, Input, Spin, Table } from "antd";
import { getLZCardNumber, getTrackingNumber, requestLz } from "@/utils";
import QRCode from "qrcode.react";
import logo from "@/assets/images/logo.png";

interface IMaterialInfo {
  caiitmid: string;
  cainame: string;
  caiformat: string;
  caitexture: string;
}
const ProductionProcessFlowCardAndDispatchList = () => {
  const { record } = useLocation().state || {};
  const [form] = Form.useForm();

  // 材料信息
  const [materialInfo, setMaterialInfo] = useState<IMaterialInfo>({
    caiitmid: "",
    cainame: "",
    caiformat: "",
    caitexture: "",
  });

  const lzCardNumber = useMemo(() => {
    return getLZCardNumber();
  }, []);

  useEffect(() => {
    requestLz
      .get(`/selectLjByItmid?itmid=${record?.itmid}`)
      .then((res) => {
        setMaterialInfo(res?.data[0]);
      })
      .catch((err) => {
        console.log("请求材料数据发生错误", err);
      });
  }, [record]);

  useEffect(() => {
    form.setFieldValue("orderQRcode", record?.orderid);
    form.setFieldValue("rukuQRcode", record?.itmid);
    form.setFieldValue("lingliaoQRcode", materialInfo.caiitmid);
    form.setFieldValue("lzCardNumber", lzCardNumber);
  }, [materialInfo]);

  const trackingNumber = getTrackingNumber();
  const unit: string = record?.uomname;
  console.log(record, 11, unit);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const RenderQRCode = ({
    title,
    name,
    value,
    rowSpan,
    noTd,
    size,
  }: {
    title?: string;
    name: string;
    value: string;
    rowSpan?: number;
    noTd?: boolean;
    size?: number;
  }) => {
    // form.setFieldValue(name, value);
    const qrcode = (
      <span style={{ textAlign: "center" }} title={value}>
        {title && <div>{title}</div>}
        <Form.Item name={name}>
          {value && <QRCode value={value} size={size || 72} />}
          {!value && (
            <Spin>
              <QRCode value="二维码努力生成中~" size={size || 72} />
            </Spin>
          )}
        </Form.Item>
      </span>
    );
    return (
      <>
        {noTd && qrcode}
        {!noTd && (
          <td rowSpan={rowSpan} className={styles["form-qrcode"]}>
            {qrcode}
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
  }: {
    title: string;
    name: string;
    defaultValue?: string;
    colSpan?: number;
    titleStyle?: React.CSSProperties;
  }) => {
    if (defaultValue) {
      form.setFieldValue(name, defaultValue);
    }
    return (
      <>
        <th style={titleStyle}>{title}</th>
        <td
          className={[
            styles["input-container-locked"],
            styles["input-container"],
          ].join(" ")}
          colSpan={colSpan}
        >
          <Form.Item name={name}>
            <Input
              className={styles.input}
              style={{ border: "none" }}
              autoComplete="off"
              readOnly
            ></Input>
          </Form.Item>
        </td>
      </>
    );
  };
  const EditAbleInput = ({
    title,
    name,
    defaultValue,
    titleStyle,
  }: {
    title: string;
    name: string;
    defaultValue?: string;
    titleStyle?: React.CSSProperties;
  }) => {
    if (defaultValue) {
      form.setFieldValue(name, defaultValue);
    }
    return (
      <>
        <th style={titleStyle}>{title}</th>
        <td className={styles["input-container"]}>
          <Form.Item name={name}>
            <Input
              className={styles.input}
              style={{ border: "none" }}
              autoComplete="off"
            ></Input>
          </Form.Item>
        </td>
      </>
    );
  };
  const columns = [
    {
      title: "零件类型",
      dataIndex: "type1",
      key: "type1",
    },

    {
      title: "生产订单条码",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "零件料号",
      dataIndex: "itmid",
      key: "itmid",
    },
    {
      title: "品名",
      dataIndex: "goodsname",
      key: "goodsname",
    },
    {
      title: "规格",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "商标",
      dataIndex: "Pcode",
      key: "Pcode",
    },
    {
      title: "完成时间",
      dataIndex: "ljFinDate",
      key: "ljFinDate",
    },
    {
      title: "单位",
      dataIndex: "uomname",
      key: "uomname",
    },
    {
      title: "数量",
      dataIndex: "supcount",
      key: "supcount",
    },
    {
      title: "流转数量累积",
      dataIndex: "sumcount",
      key: "sumcount",
    },
    {
      title: "第一道工艺",
      dataIndex: "processname1",
      key: "processname1",
    },
    {
      title: "第二道工艺",
      dataIndex: "processname2",
      key: "processname2",
    },
  ];
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
              headerBorderRadius: 0,
              headerBg: "#accbe9",
              borderColor: "#000",
            },
          },
        }}
      >
        <Form
          initialValues={record}
          onFinish={onFinish}
          form={form}
          className={styles["form"]}
        >
          <div className={styles["form-title"]}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={logo} width={128}></img>
            <h2>生产工序流转卡暨派工单</h2>
            <RenderQRCode
              title="流转卡编号"
              name="lzCardNumber"
              value={lzCardNumber}
              noTd={true}
              size={88}
            ></RenderQRCode>
          </div>
          <table>
            <tbody>
              <tr>
                <EditAbleInput
                  title="生产订单条码"
                  name="orderid"
                  titleStyle={{ color: "red" }}
                ></EditAbleInput>
                <ReadOnlyInput title="料号" name="itmid"></ReadOnlyInput>
                <ReadOnlyInput title="品名" name="goodsname"></ReadOnlyInput>
                <ReadOnlyInput title="规格" name="format"></ReadOnlyInput>
              </tr>
              <tr>
                <ReadOnlyInput title="材质" name="texture"></ReadOnlyInput>
                <ReadOnlyInput title="商标" name="Pcode"></ReadOnlyInput>
                <ReadOnlyInput
                  title="追溯单号"
                  name="ReviewNo"
                  defaultValue={trackingNumber}
                ></ReadOnlyInput>
                <ReadOnlyInput
                  title="完成日期"
                  name="ljFinDate"
                ></ReadOnlyInput>
              </tr>
              <tr>
                <ReadOnlyInput
                  title="客户订单号"
                  name="lblKHOrder"
                ></ReadOnlyInput>
                <ReadOnlyInput title="表面处理" name="surface"></ReadOnlyInput>
                <ReadOnlyInput
                  title="图号"
                  name="itmteid"
                  colSpan={3}
                ></ReadOnlyInput>
              </tr>
              <tr>
                <ReadOnlyInput
                  title="生产数量（公斤）"
                  name={unit === "公斤" ? "supcount" : "huancount"}
                ></ReadOnlyInput>
                <EditAbleInput
                  title="流转数量（公斤）"
                  name={unit === "公斤" ? "liucount" : "liuhuancount"}
                ></EditAbleInput>
                <ReadOnlyInput
                  title="生产数量（PCS）"
                  name={unit === "公斤" ? "huancount" : "supcount"}
                ></ReadOnlyInput>
                <EditAbleInput
                  title="流转数量（PCS）"
                  name={unit === "公斤" ? "liuhuancount" : "liucount"}
                ></EditAbleInput>
              </tr>
              <tr>
                <EditAbleInput
                  title="材料料号"
                  name="caiitmid"
                  defaultValue={materialInfo.caiitmid}
                ></EditAbleInput>
                <EditAbleInput
                  title="材料品名"
                  name="cainame"
                  defaultValue={materialInfo.cainame}
                ></EditAbleInput>
                <EditAbleInput
                  title="材料规格"
                  name="caiformat"
                  defaultValue={materialInfo.caiformat}
                ></EditAbleInput>
                <EditAbleInput
                  title="材料材质"
                  name="caitexture"
                  defaultValue={materialInfo.caitexture}
                ></EditAbleInput>
              </tr>
              <tr>
                <ReadOnlyInput
                  title="供应/炉批号"
                  name="furnaceNum"
                  colSpan={4}
                  titleStyle={{ color: "red" }}
                ></ReadOnlyInput>

                <th colSpan={3} style={{ textAlign: "center" }}>
                  生产入库扫描条码
                </th>
              </tr>
              <tr>
                <th rowSpan={3} style={{ color: "red" }}>
                  主要尺寸
                </th>
                <th>节距</th>
                <td></td>
                <th>片厚</th>
                <td></td>

                <RenderQRCode
                  title="订单号/追溯单号"
                  name="orderQRcode"
                  rowSpan={3}
                  value={record?.orderid}
                ></RenderQRCode>
                <RenderQRCode
                  title="入库二维码"
                  name="rukuQRcode"
                  rowSpan={3}
                  value={record?.itmid}
                ></RenderQRCode>
                <RenderQRCode
                  title="领料二维码"
                  name="lingliaoQRcode"
                  rowSpan={3}
                  value={materialInfo.caiitmid}
                ></RenderQRCode>
              </tr>
              <tr>
                <th>孔径</th>
                <td></td>
                <th>头宽</th>
                <td></td>
              </tr>
              <tr>
                <th>腰宽</th>
                <td colSpan={3}></td>
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
        ></Table>
        <Button type="primary" size="large">
          保存
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default ProductionProcessFlowCardAndDispatchList;
