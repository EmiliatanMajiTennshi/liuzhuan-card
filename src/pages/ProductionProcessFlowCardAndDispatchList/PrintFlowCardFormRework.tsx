import {
  EditAbleTextArea,
  ReadOnlyInput,
  RenderQRCode,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect } from "react";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
}
const normalWeight = {
  fontWeight: 400,
};
const boldWeight = {
  fontWeight: 700,
};
const fontSize18 = {
  fontSize: 18,
};

const fontColorRed = {
  color: "red",
};

const normalStyle = {
  ...normalWeight,
  ...fontSize18,
};
const boldValue = {
  ...fontSize18,
  ...boldWeight,
};

const redLabel = {
  ...normalWeight,
  ...fontColorRed,
  ...boldValue,
};

const PrintFlowCardFormRework = (props: IProps) => {
  const { data, isKg, form } = props;

  //   const isFinished = data?.partNumber?.substring(0, 2) === FINISHED_CODE;

  useEffect(() => {
    // 二维码不手动设置值会出现奇怪的bug
    form.setFieldValue("orderQRcode", data.barCode);
    form.setFieldValue("traceabilityNumberQRcode", data.traceabilityNumber);
    form.setFieldValue("rukuQRcode", data.partNumber);
    form.setFieldValue("lingliaoQRcode", data.mItmID);
    form.setFieldValue(
      "huancount",
      data?.newsupcount && data?.parseWeight
        ? isKg
          ? transFormToPcs(data?.newsupcount, data?.parseWeight)
          : transFormToKg(data?.newsupcount, data?.parseWeight)
        : ""
    );
  }, [data]);
  useEffect(() => {
    // if(isKg){
    //     form
    // }
  }, [data]);

  return (
    <tbody className={styles.printForm}>
      <tr>
        <ReadOnlyInput
          title="追溯单号"
          name="traceabilityNumber"
          titleStyle={{ ...redLabel, width: "18%" }}
          tdStyle={{ width: "82%" }}
          style={fontSize18}
          labelColSpan={2}
          colSpan={6}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="流转卡号"
          name="transferCardCode"
          titleStyle={normalStyle}
          style={fontSize18}
          labelColSpan={2}
          colSpan={6}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="料号"
          name="partNumber"
          labelColSpan={2}
          colSpan={2}
          titleStyle={{ ...normalStyle, width: "18%" }}
          tdStyle={{ width: "32%" }}
          style={fontSize18}
        />
        <ReadOnlyInput
          title="品名"
          name="name"
          labelColSpan={2}
          colSpan={2}
          titleStyle={{ ...normalStyle, width: "18%" }}
          tdStyle={{ width: "32%" }}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="规格"
          name="spec"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="材质"
          name="material"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="商标"
          name="trademark"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
          // options={
          //   data?.trademarkList?.map((item) => ({
          //     value: item.trademark,
          //     label: item.trademark,
          //   })) || []
          // }
          // placeholder="请选择商标"
        />
        <ReadOnlyInput
          title="评审单号"
          name="reworkNumber"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <EditAbleTextArea
          title="返工流程"
          name="reworkFlow"
          labelColSpan={2}
          colSpan={6}
          titleStyle={normalStyle}
          style={normalStyle}
          readOnly
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="开单人"
          name="drawer"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="返工数量"
          name="reworkQuantity"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>

      {/* <tr>
        <RenderQRCode
          title="领料二维码"
          name="lingliaoQRcode"
          colSpan={4}
          size={88}
          value={data.mItmID || "没有数据"}
        />
      </tr> */}

      <tr>
        <td colSpan={8} className={styles.noPadding}>
          <table>
            <thead>
              <tr>
                <th
                  style={{ ...boldValue, padding: "5px 5px", width: "50%" }}
                  colSpan={4}
                >
                  工序
                </th>
                <th style={boldValue} colSpan={4}>
                  检验员盖章
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.detailProcesses?.map((item) => {
                return (
                  <tr>
                    <th
                      style={{ ...normalStyle, padding: "5px 5px" }}
                      colSpan={4}
                    >
                      {item.processName}
                    </th>
                    <td colSpan={4}></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  );
};
export default PrintFlowCardFormRework;
