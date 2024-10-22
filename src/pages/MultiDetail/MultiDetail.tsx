import { getMultiCardDetail, UpdateWuliu } from "@/api";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import { App, Button, ConfigProvider, Form, Input, Spin, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { EditAbleInput, ReadOnlyInput } from "@/utils";
import {
  normalStyle,
  normalStyle18,
} from "../ProductionProcessFlowCardAndDispatchList/styles";

const MultiDetail = (props: {
  requestParams: AnyObject;
  readOnly?: boolean;
}) => {
  const { requestParams, readOnly } = props;
  console.log(requestParams, readOnly, 124124);
  const [formData, setFormData] = useState<AnyObject>({});
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const fetchData = () =>
    getMultiCardDetail(requestParams)
      .then((res) => {
        if (SUCCESS_CODE.indexOf(res?.status) !== -1) {
          console.log(res.list, 12412411, res);

          setFormData(res?.data?.detail);
          setTableData(res?.data?.list);
          form.setFieldsValue(res?.data?.detail);
        } else {
          message.error(ERROR_MESSAGE);
        }
      })
      .catch((err) => {
        message.error(ERROR_MESSAGE);
      })
      .finally(() => {
        setLoading(false);
      });
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [requestParams]);
  const columns = [
    {
      title: "序号",
      dataIndex: "Xuhao",
      key: "Xuhao",
      width: 40,
    },
    {
      title: "工艺",
      dataIndex: "Gongyi",
      key: "Gongyi",
      width: 80,
    },
    {
      title: "部门",
      dataIndex: "dept",
      key: "dept",
      width: 60,
    },
    {
      title: "操作工",
      dataIndex: "CaozuoName",
      key: "CaozuoName",
      width: 60,
    },
    {
      title: "流转卡编号",
      dataIndex: "CardID",
      key: "CardID",
      width: 100,
    },
    {
      title: "产量",
      dataIndex: "Chanliang",
      key: "Chanliang",
      width: 60,
    },
    {
      title: "物流数量",
      dataIndex: "WuliuNum",
      key: "WuliuNum",
      width: 60,
      render: (text: number | string, record?: any) => {
        return readOnly ? (
          text
        ) : (
          <Input
            disabled={record?.type === "1"}
            style={{ width: "100%" }}
            defaultValue={text}
            onChange={(e) => {
              record.WuliuNum = e?.target?.value;
            }}
          ></Input>
        );
      },
    },

    ...(readOnly
      ? []
      : [
          {
            title: "操作",
            dataIndex: "operate",
            key: "operate",
            width: 60,
            render: (text: string, record: any) => {
              return (
                <Button
                  disabled={record?.type === "1"}
                  type="primary"
                  onClick={() => {
                    console.log(record?.WuliuNum, 12414122);
                    UpdateWuliu({
                      CardID: record?.CardID,
                      uid: record?.uid,
                      WuliuNum: record?.WuliuNum,
                    })
                      .then((res) => {
                        if (res?.data?.state === "1") {
                          message.success(res?.data?.Msg);
                        } else {
                          message.error(res?.data?.Msg);
                        }
                        setLoading(true);
                        fetchData();
                      })
                      .catch((err) => {
                        message.error("请求错误");
                      });
                  }}
                >
                  修改
                </Button>
              );
            },
          },
        ]),
  ];
  console.log(tableData, 12414);

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
          <Form form={form} className={styles["form"]}>
            <div className={styles["form-title"]}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}

              <>
                <h2 style={{ textAlign: "center" }}>多工序流转卡详情</h2>
              </>
            </div>
            <table style={{ overflow: "hidden", tableLayout: "fixed" }}>
              <tbody className={styles.normalForm}>
                <tr>
                  <ReadOnlyInput
                    title="流转卡号"
                    name="CardID"
                    titleStyle={normalStyle}
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    colSpan={2}
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="品名"
                    name="SMAKTX"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="材质"
                    name="Texture"
                  />
                </tr>
                <tr>
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="订单号"
                    name="OrderNo"
                    colSpan={2}
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="规格"
                    name="Format"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="商标"
                    name="Shangbiao"
                  />
                </tr>
                <tr>
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="客户订单号"
                    name="KHOrder"
                    colSpan={2}
                  />

                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="表面处理"
                    name="Surface"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="图号"
                    name="TuNo"
                  />
                </tr>
                <tr>
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="料号"
                    colSpan={2}
                    name="Matnr"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="数量（KG）"
                    name="Num"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="数量（PCS）"
                    name="Numpcs"
                  />
                </tr>
                <tr>
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="完成时间"
                    colSpan={2}
                    name="ljFinDate"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="流转数量（KG）"
                    name="LZNum"
                  />
                  <ReadOnlyInput
                    style={{ lineHeight: "24px", ...normalStyle18 }}
                    titleStyle={normalStyle}
                    title="流转数量（PCS）"
                    name="LZNumpcs"
                  />
                </tr>
              </tbody>
            </table>
          </Form>
          <>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    cellFontSize: 18,
                  },
                },
              }}
            >
              <Table
                rowKey={tableData?.[0]?.id ? "id" : "hid"}
                columns={columns}
                style={{
                  borderRight: "1px solid #000",
                  borderLeft: "1px solid #000",
                  marginBottom: 10,
                }}
                pagination={false}
                dataSource={tableData}
                className={styles.flowCardTable}
              ></Table>
            </ConfigProvider>
          </>
        </ConfigProvider>
      </Spin>
    </div>
  );
};

export default MultiDetail;
