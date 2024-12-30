import getApi, {
  insertfinishedProductsNew,
  queryTransferCardCode,
  reduceFinishPartNumberById,
} from "@/api";
import { SUCCESS_CODE } from "@/constants";
import { div, message, minus, mul } from "@/utils";
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getParams } from "../ProductionProcessFlowCardAndDispatchList/config";

const SplitCardModal = (props: any) => {
  const { issueID, queryFlowCardApi, setRefreshFlag } = props;
  const [loading, setLoading] = useState(false);
  const [oldData, setOldData] = useState<any>({});
  const singleWeight = oldData?.weight1;
  const [form] = Form.useForm();
  const [formNew] = Form.useForm();
  const fetchData = async () => {
    try {
      setLoading(true);

      if (!queryFlowCardApi) return;
      const currentRequest: any = getApi(queryFlowCardApi);
      const [res, res2] = await Promise.all([
        currentRequest(issueID),
        queryTransferCardCode({ code: 2 }),
      ]);

      console.log(res2, 2124);

      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && res?.data?.data) {
        const _data = res?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        form.setFieldsValue(formData);
        setOldData(formData);
      }
      if (SUCCESS_CODE.indexOf(res2?.data?.code) !== -1 && res2?.data?.data) {
        const _data = res2?.data?.data;
        formNew.setFieldsValue({ transferCardCode: _data });
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
  const handleSave = async ({ reduceNum, transferCardCode }: any) => {
    const params31 = getParams({
      form,
      data: oldData,
      values: oldData,
      mainsize: oldData?.mainsizeList?.[0] || {},
      flowCardType: "common",
    });
    const res1 = await insertfinishedProductsNew({
      ...params31,
      transferCardCode,
      transferKg: reduceNum?.transferNumberKG,
      transferPcs: reduceNum?.transferNumberPCS,
    });
    const res2 = await reduceFinishPartNumberById({
      transferCardCode: oldData?.transferCardCode,
      numberKg: reduceNum?.transferNumberKG,
      numberPcs: reduceNum?.transferNumberPCS,
    });
    if (
      SUCCESS_CODE.indexOf(res1?.data?.code) !== -1 &&
      SUCCESS_CODE.indexOf(res2?.data?.code) !== -1
    ) {
      message.success("操作成功");
      fetchData();
      setRefreshFlag((flag: boolean) => !flag);
    } else {
      message.error("操作失败");
    }
  };

  const onFinish = (values: any) => {
    const { transferCardCode, transferNumberKG, transferNumberPCS } = values;
    handleSave({
      reduceNum: { transferNumberKG, transferNumberPCS },
      transferCardCode,
    });
    console.log(1234, values);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2 style={{ marginTop: "0" }}>
        成品分卡
        {!loading && (
          <>
            {singleWeight ? (
              <span style={{ marginLeft: 20, fontSize: 14, fontWeight: 400 }}>
                单重：{singleWeight}
              </span>
            ) : (
              <span
                style={{
                  marginLeft: 20,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "red",
                }}
              >
                无单重，请联系技术
              </span>
            )}
          </>
        )}
      </h2>
      <Spin spinning={loading}>
        <div style={{ display: "flex" }}>
          <div
            style={{ flex: 1, borderRight: "1px solid #ccc", marginRight: 40 }}
          >
            <h3 style={{ margin: "0" }}>旧卡</h3>
            <Form form={form}>
              <Form.Item name="transferCardCode" label="流转卡号">
                <div>{form.getFieldValue("transferCardCode")}</div>
              </Form.Item>
              <Form.Item name="transferNumberKG" label="流转数量">
                <Input
                  style={{ width: "80%" }}
                  addonAfter={<div style={{ width: 20 }}>kg</div>}
                  readOnly
                />
              </Form.Item>
              <Form.Item name="transferNumberPCS" label="流转数量">
                <Input
                  style={{ width: "80%" }}
                  addonAfter={<div style={{ width: 20 }}>pcs</div>}
                  readOnly
                />
              </Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0" }}>新卡</h3>
            <Form form={formNew} labelAlign="right" onFinish={onFinish}>
              <Form.Item name="transferCardCode" label="流转卡号">
                <div>{formNew.getFieldValue("transferCardCode")}</div>
              </Form.Item>
              <Form.Item name="transferNumberKG" label="流转数量">
                <InputNumber
                  style={{ width: "80%" }}
                  addonAfter={<div style={{ width: 20 }}>kg</div>}
                  onChange={(e) => {
                    form.setFieldsValue({
                      transferNumberKG: minus(
                        oldData?.transferNumberKG,
                        e || 0
                      ),
                    });
                    const newNumber = Math.round(div(e, singleWeight));

                    form.setFieldsValue({
                      transferNumberPCS: minus(
                        oldData?.transferNumberPCS,
                        newNumber || 0
                      ),
                    });
                    formNew.setFieldsValue({
                      transferNumberPCS: newNumber || null,
                    });
                  }}
                  max={oldData?.transferNumberKG}
                />
              </Form.Item>
              <Form.Item name="transferNumberPCS" label="流转数量">
                <InputNumber
                  style={{ width: "80%" }}
                  addonAfter={<div style={{ width: 20 }}>pcs</div>}
                  onChange={(e) => {
                    form.setFieldsValue({
                      transferNumberPCS: minus(
                        oldData?.transferNumberPCS,
                        e || 0
                      ),
                    });
                    const newNumber = mul(e || 0, singleWeight);
                    console.log(newNumber, 1251, singleWeight);

                    form.setFieldsValue({
                      transferNumberKG: minus(
                        oldData?.transferNumberKG,
                        newNumber || 0
                      ),
                    });
                    formNew.setFieldsValue({
                      transferNumberKG: newNumber || null,
                    });
                  }}
                  max={oldData?.transferNumberPCS}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button
            style={{ width: 100 }}
            icon={<SaveOutlined />}
            type="primary"
            onClick={() => {
              formNew.submit();
            }}
            disabled={!singleWeight}
          >
            保存
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default SplitCardModal;
