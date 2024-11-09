import {
  ReadOnlyInput,
  RenderQRCode,
  transformToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect } from "react";
import {
  bold24,
  bold26,
  bold28,
  bold32,
  boldValue,
  fontSize22,
  fontSize24,
  normalStyle,
  redLabel,
} from "./styles";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
}

const PrintFlowCardForm = (props: IProps) => {
  const { data, form } = props;
  const mainsizeList = data?.mainsizeList?.[0];
  console.log(data, 124211);

  const partNumber = data?.partNumber || data?.itmid;
  // 32没有热处理炉台
  const isSemiFinished = partNumber?.startsWith("32");

  const is2MO = data?.orderid?.startsWith("2MO");
  return (
    <tbody className={styles.printForm}>
      <tr>
        <ReadOnlyInput
          title="生产订单条码"
          name="orderid"
          titleStyle={redLabel}
          style={fontSize22}
          labelColSpan={9}
          colSpan={14}
        />
        <ReadOnlyInput
          title="料号"
          name="itmid"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={fontSize22}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="品名"
          name="name"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={boldValue}
        />
        <ReadOnlyInput
          title="规格"
          name="spec"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={boldValue}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="材质"
          name="itmtdid"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="商标"
          name="trademark"
          labelColSpan={9}
          colSpan={14}
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
          title="表面处理"
          name="itmtcid"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="图号"
          name="itmTEID"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="追溯单号"
          name="traceabilityNumber"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={{ ...bold24, margin: "4px 0" }}
        />
        <ReadOnlyInput
          title="完成日期"
          name="ljFinDate"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={
            <>
              生产数量<div>(公斤)</div>
            </>
          }
          name="productKg"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
        <ReadOnlyInput
          title={
            <>
              流转数量<div>(公斤)</div>
            </>
          }
          name="transferNumberKG"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={
            <>
              生产数量<div>(PCS)</div>
            </>
          }
          name="productPcs"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
        <ReadOnlyInput
          title={
            <>
              流转数量<div>(PCS)</div>
            </>
          }
          name="transferNumberPCS"
          labelColSpan={9}
          colSpan={14}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={
            <>
              <div>供方/</div>
              <div>炉批号</div>
            </>
          }
          name="furnaceNo"
          labelColSpan={9}
          colSpan={37}
          titleStyle={redLabel}
          style={bold24}
          // 要求打印出来的的供方/炉批号显示为空。
          render={<></>}
        />
      </tr>
      {!isSemiFinished && (
        <tr>
          <ReadOnlyInput
            title={
              <>
                <div>热处理</div>
                <div>炉台</div>
              </>
            }
            name="heatTreatmentFurnacePlatforms"
            labelColSpan={9}
            colSpan={37}
            style={boldValue}
            titleStyle={redLabel}
          />
        </tr>
      )}
      <tr>
        {/* <ReadOnlyInput title="行号" name="u9LineNo" colSpan={2} /> */}
        <th colSpan={46} style={{ textAlign: "center", ...boldValue }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <RenderQRCode
          title="订单号"
          name="orderQRcode"
          colSpan={23}
          value={data?.orderid || "没有数据"}
          size={120}
          form={form}
        />

        <RenderQRCode
          title="追溯单号"
          name="traceabilityNumberQRCode"
          colSpan={23}
          size={120}
          value={data?.traceabilityNumber || "没有数据"}
          form={form}
        />
      </tr>
      <tr>
        <RenderQRCode
          title="入库二维码"
          name="rukuQRcode"
          colSpan={23}
          size={120}
          value={`${data.parseitmid}${data.pNumber || ""}` || "没有数据"}
          form={form}
        />
        <RenderQRCode
          title="领料二维码"
          name="lingliaoQRcode"
          colSpan={23}
          size={120}
          value={data?.pickingCode || data?.mItmID || "没有数据"}
          form={form}
          footer={
            <span style={{ fontSize: 24 }}>
              {data?.materialInfos?.[0]?.mspec}
            </span>
          }
        />
      </tr>
      <tr>
        <th
          rowSpan={3}
          style={{
            ...redLabel,
            ...fontSize24,
            padding: "0px 8px",
            lineHeight: "110%",
          }}
          colSpan={4}
        >
          主要尺寸
        </th>
        <ReadOnlyInput
          title={mainsizeList?.project1 || ""}
          name="projectitem1"
          labelColSpan={7}
          colSpan={14}
          titleStyle={{ ...normalStyle }}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem1}
          form={form}
        />
        <ReadOnlyInput
          title={mainsizeList?.project2 || ""}
          name="projectitem2"
          labelColSpan={7}
          colSpan={14}
          titleStyle={{ ...normalStyle }}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem2}
          form={form}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={mainsizeList?.project3 || ""}
          name="projectitem3"
          labelColSpan={7}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem3}
          form={form}
        />
        <ReadOnlyInput
          title={mainsizeList?.project4 || ""}
          name="projectitem4"
          labelColSpan={7}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem4}
          form={form}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={mainsizeList?.project5 || ""}
          name="projectitem5"
          labelColSpan={7}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem5}
          form={form}
        />
        <ReadOnlyInput
          title={mainsizeList?.project6 || ""}
          name="projectitem6"
          labelColSpan={7}
          colSpan={14}
          titleStyle={normalStyle}
          style={normalStyle}
          defaultValue={mainsizeList?.projectitem6}
          form={form}
        />
      </tr>
      <tr>
        {!is2MO && (
          <td colSpan={46} className={styles.noPadding}>
            <table>
              <thead>
                <tr>
                  <th
                    style={{ ...boldValue, padding: "5px 5px", width: "50%" }}
                    colSpan={23}
                  >
                    工序
                  </th>
                  <th style={boldValue} colSpan={23}>
                    检验员盖章
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.processList?.map((item) => {
                  return (
                    <tr>
                      <th
                        style={{ ...normalStyle, padding: "5px 5px" }}
                        colSpan={23}
                      >
                        {item.processName}
                      </th>
                      <td colSpan={23}></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        )}
      </tr>
    </tbody>
  );
};
export default PrintFlowCardForm;
