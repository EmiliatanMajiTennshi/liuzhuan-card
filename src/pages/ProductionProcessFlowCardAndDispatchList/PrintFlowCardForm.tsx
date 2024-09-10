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
  const { data, isKg, form } = props;

  const partNumber = data?.partNumber;
  // 32没有热处理炉台
  const isSemiFinished = partNumber?.startsWith("32");
  useEffect(() => {
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
          title="生产订单条码"
          name="barCode"
          titleStyle={redLabel}
          style={fontSize22}
          labelColSpan={4}
          colSpan={7}
        />
        <ReadOnlyInput
          title="料号"
          name="partNumber"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
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
          title="表面处理"
          name="surfaceTreatment"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="图号"
          name="drawingNumber"
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
            <>
              生产数量<div>(公斤)</div>
            </>
          }
          name="productionKg"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
        <ReadOnlyInput
          title={
            <>
              生产数量<div>(PCS)</div>
            </>
          }
          name="productionPcs"
          labelColSpan={4}
          colSpan={7}
          titleStyle={normalStyle}
          style={bold32}
          isNumber
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={
            <>
              流转数量<div>(公斤)</div>
            </>
          }
          name="transferKg"
          labelColSpan={4}
          colSpan={7}
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
          name="transferPcs"
          labelColSpan={4}
          colSpan={7}
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
          labelColSpan={4}
          colSpan={18}
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
            name="heatTreatmentFurnacePlatform"
            labelColSpan={4}
            colSpan={18}
            style={boldValue}
            titleStyle={redLabel}
          />
        </tr>
      )}
      <tr>
        {/* <ReadOnlyInput title="行号" name="u9LineNo" colSpan={2} /> */}
        <th colSpan={22} style={{ textAlign: "center", ...boldValue }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <RenderQRCode
          title="订单号"
          name="orderQRcode"
          colSpan={11}
          value={data?.barCode || "没有数据"}
          size={96}
          form={form}
        />

        <RenderQRCode
          title="追溯单号"
          name="traceabilityNumberQRCode"
          colSpan={11}
          size={96}
          value={data?.traceabilityNumber || "没有数据"}
          form={form}
        />
      </tr>
      <tr>
        <RenderQRCode
          title="入库二维码"
          name="rukuQRcode"
          colSpan={11}
          size={96}
          value={`${data.parsePartNumber}${data.pNumber || ""}` || "没有数据"}
          form={form}
        />
        <RenderQRCode
          title="领料二维码"
          name="lingliaoQRcode"
          colSpan={11}
          size={96}
          value={data.materialPartNumber || "没有数据"}
          form={form}
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
          colSpan={2}
        >
          主要尺寸
        </th>
        <ReadOnlyInput
          title={data?.project1Name || ""}
          name="project1Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={{ ...normalStyle }}
          style={normalStyle}
        />
        <ReadOnlyInput
          title={data?.project2Name || ""}
          name="project1Item"
          labelColSpan={3}
          colSpan={7}
          titleStyle={{ ...normalStyle }}
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
          <table>
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
export default PrintFlowCardForm;
