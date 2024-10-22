import getApi from "@/api";
import { kgArr, SUCCESS_CODE } from "@/constants";
import { RenderQRCode } from "@/utils";
import { App, Form, Tabs } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import styles from "./index.module.scss";
import CommonForm from "../ProductionProcessFlowCardAndDispatchList/CommonForm";
import { unit } from "@ant-design/cssinjs";
import { Spin } from "antd/lib";
const UnfinishedIssueFinishedModal = (props: any) => {
  const {
    issueID,
    queryFlowCardApi,
    flowCardType,
    setRefreshFlag,
    beIssuedID,
    issuedFlowCardApi,
  } = props;
  console.log(props, beIssuedID, 11111224);

  const [loading, setLoading] = useState(false);
  const [unfinishedData, setUnfinishedData] = useState<AnyObject>({});
  const [finishedData, setFinishedData] = useState<AnyObject>({});
  const { message } = App.useApp();

  const [unfinishedForm] = Form.useForm();
  const [finishedForm] = Form.useForm();

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

      if (SUCCESS_CODE.indexOf(res1?.data?.code) !== -1 && res1?.data?.data) {
        const _data = res1?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        // form.setFieldsValue(formData);
        setUnfinishedData(formData);
        unfinishedForm.setFieldsValue(formData);
      } else {
        throw new Error("请求32数据时发生错误");
      }

      if (SUCCESS_CODE.indexOf(res2?.data?.code) !== -1 && res2?.data?.data) {
        const _data = res2?.data?.data;
        const isArray = Array.isArray(_data);
        const formData = isArray ? _data[0] : _data;
        // form.setFieldsValue(formData);
        setFinishedData(formData);
        finishedForm.setFieldsValue(formData);
      } else {
        throw new Error("请求31数据时发生错误");
      }
    } catch (error: any) {
      message.error(error.message);
      console.error("请求数据时发生错误", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [issuedFlowCardApi]);
  const commonFormProps = {
    data: unfinishedData,
    isKg: kgArr.indexOf(unfinishedData?.unit || "") !== -1,
    form: unfinishedForm,
    mainsize: unfinishedData?.mainsizeList?.[0] || {},
  };
  const commonFormPropsFinished = {
    data: finishedData,
    isKg: kgArr.indexOf(finishedData?.unit || "") !== -1,
    form: finishedForm,
    mainsize: finishedData?.mainsizeList?.[0] || {},
  };
  const UnfinishedPage = (props: any) => {
    return (
      <div className={styles["flow-card"]}>
        <Form form={props?.form} className={styles["form"]}>
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
      </div>
    );
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
              children: <UnfinishedPage {...commonFormProps} />,
            },
            {
              label: "成品下发",
              key: "2",
              children: <UnfinishedPage {...commonFormPropsFinished} />,
            },
          ]}
        ></Tabs>
      </Spin>
    </div>
  );
};

export default UnfinishedIssueFinishedModal;
