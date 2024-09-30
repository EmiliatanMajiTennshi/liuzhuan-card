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
import {
  bold24,
  bold32,
  boldValue,
  fontSize22,
  normalStyle,
  redLabel,
} from "./styles";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
}

const PrintFlowCardFormOutsourcing = (props: IProps) => {
  const { data, isKg, form } = props;

  return (
    <tbody className={styles.printForm}>
      <tr>
        <ReadOnlyInput
          title="订单号"
          name="barCode"
          titleStyle={redLabel}
          style={fontSize22}
          labelColSpan={4}
          colSpan={18}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="料号"
          name="partNumber"
          labelColSpan={4}
          colSpan={7}
          titleStyle={{ ...normalStyle }}
          style={fontSize22}
        />
        <ReadOnlyInput
          title="行号"
          name="lineNumber"
          labelColSpan={4}
          colSpan={7}
          titleStyle={{ ...normalStyle }}
          style={fontSize22}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="品名"
          name="name"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="规格"
          name="specs"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={boldValue}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="材质"
          name="material"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="商标"
          name="trademark"
          labelColSpan={4}
          colSpan={7}
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
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="供方"
          name="supplierName"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="追溯单号"
          name="traceabilityNumber"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="完成日期"
          name="finishTime"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={
            isKg ? (
              <>
                生产数量<div>(公斤)</div>
              </>
            ) : (
              <>
                生产数量<div>(PCS)</div>
              </>
            )
          }
          name={isKg ? "productionKg" : "productionPcs"}
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
        <ReadOnlyInput
          title={
            isKg ? (
              <>
                流转数量<div>(公斤)</div>
              </>
            ) : (
              <>
                流转数量<div>(PCS)</div>
              </>
            )
          }
          name={isKg ? "transferKg" : "transferPcs"}
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
      </tr>
      <tr></tr>

      <tr>
        {/* <ReadOnlyInput title="行号" name="u9LineNo" colSpan={2} /> */}
        <th colSpan={22} style={{ textAlign: "center", ...boldValue }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <td colSpan={22}>
          <div className={styles.QRcodes} style={{ padding: "10px 0" }}>
            <RenderQRCode
              title="订单号"
              name="orderQRcode"
              colSpan={7}
              value={data?.barCode || "没有数据"}
              size={96}
              noTd
            />

            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              colSpan={8}
              size={96}
              value={data?.traceabilityNumber || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              colSpan={7}
              size={96}
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
          size={96}
          value={data.mItmID || "没有数据"}
        />
      </tr> */}
      <tr>
        <th rowSpan={3} style={{ ...redLabel, height: 90 }} colSpan={2}>
          主要尺寸
        </th>
        <ReadOnlyInput
          title={data?.project1Name || ""}
          name="project1Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={{ ...normalStyle, width: "12.5%" }}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project2Name || ""}
          name="project1Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={{ ...normalStyle, width: "12.5%" }}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={data?.project3Name || ""}
          name="project3Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project4Name || ""}
          name="project4Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={data?.project5Name || ""}
          name="project5Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project6Name || ""}
          name="project6Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <td colSpan={22} className={styles.noPadding}>
          <table style={{ border: "none" }}>
            <thead>
              <tr>
                <th
                  style={{ ...boldValue, padding: "5px 5px", width: "50%" }}
                  colSpan={11}
                >
                  工序
                </th>
                <th style={boldValue} colSpan={11}>
                  检验员盖章
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.detailProcessesList?.map((item) => {
                if (!item.processName) {
                  return <></>;
                }
                return (
                  <tr>
                    <th
                      style={{ ...normalStyle, padding: "5px 5px" }}
                      colSpan={11}
                    >
                      {item.processName}
                    </th>
                    <td colSpan={11}></td>
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
export default PrintFlowCardFormOutsourcing;
