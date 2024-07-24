import {
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

const PrintFlowCardFormOutsourcing = (props: IProps) => {
  const { data, isKg, form } = props;

  //   const isFinished = data?.partNumber?.substring(0, 2) === "31";

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
    form.setFieldValue("transferCardCode", data?.transferCard);
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
          title="订单号"
          name="barCode"
          titleStyle={{ ...redLabel, width: "18%" }}
          tdStyle={{ width: "82%" }}
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
          title="行号"
          name="lineNumber"
          labelColSpan={2}
          colSpan={2}
          titleStyle={{ ...normalStyle, width: "18%" }}
          style={fontSize18}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="品名"
          name="name"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="规格"
          name="specs"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="材质"
          name="material"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
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
      </tr>
      <tr>
        <ReadOnlyInput
          title="图号"
          name="drawingNumber"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="供方"
          name="supplierName"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="追溯单号"
          name="traceabilityNumber"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="完成日期"
          name="finishTime"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="生产数量(kg)"
          name="productionKg"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="生产数量(pcs)"
          name="productionPcs"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="流转数量(kg)"
          name="transferKg"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="流转数量(pcs)"
          name="transferPcs"
          labelColSpan={2}
          colSpan={2}
          titleStyle={normalStyle}
          style={boldValue}
        />
      </tr>

      <tr>
        {/* <ReadOnlyInput
          title="热处理炉台"
          name="heatTreatmentFurnacePlatform"
          labelColSpan={2}
          colSpan={6}
          style={boldValue}
          titleStyle={redLabel}
        /> */}
      </tr>
      <tr>
        {/* <ReadOnlyInput title="行号" name="u9LineNo" colSpan={2} /> */}
        <th colSpan={8} style={{ textAlign: "center", ...boldValue }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <td colSpan={8}>
          <div className={styles.QRcodes} style={{ padding: "10px 0" }}>
            <RenderQRCode
              title="订单号"
              name="orderQRcode"
              colSpan={3}
              value={data?.barCode || "没有数据"}
              size={88}
              noTd
            />

            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              colSpan={2}
              size={88}
              value={data?.traceabilityNumber || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              colSpan={3}
              size={88}
              value={data.partNumber || "没有数据"}
              noTd
            />
          </div>
        </td>
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
        <th rowSpan={3} style={redLabel} colSpan={2}>
          主要尺寸
        </th>
        <ReadOnlyInput
          title={data?.project1Name || ""}
          name="project1Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={{ ...normalStyle, width: "12.5%" }}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project2Name || ""}
          name="project1Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={{ ...normalStyle, width: "12.5%" }}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={data?.project3Name || ""}
          name="project3Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project4Name || ""}
          name="project4Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={data?.project5Name || ""}
          name="project5Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project6Name || ""}
          name="project6Item"
          labelColSpan={1}
          colSpan={2}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <td colSpan={8} className={styles.noPadding}>
          <table>
            <thead>
              <th style={{ ...boldValue, padding: "5px 5px" }} colSpan={4}>
                工序
              </th>
              <th style={boldValue} colSpan={4}>
                检验员盖章
              </th>
            </thead>
            <tbody>
              {data?.detailProcessesList?.map((item) => {
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
      {/* {isFinished && (
          <tr>
            <ReadOnlyInput
              title="热处理炉台"
              name="heatTreatmentFurnacePlatform"
              titleStyle={{ color: "red" }}
              colSpan={1}
              labelColSpan={2}
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
            <ReadOnlyInput title="流转时间" name="tranferTime" colSpan={2} />
          </tr>
        )} */}
    </tbody>
  );
};
export default PrintFlowCardFormOutsourcing;
