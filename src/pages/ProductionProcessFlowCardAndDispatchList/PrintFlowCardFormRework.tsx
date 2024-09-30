import {
  EditAbleTextArea,
  ReadOnlyInput,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { boldValue, fontSize22, normalStyle, redLabel } from "./styles";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
  reworkUnit?: string;
}

const PrintFlowCardFormRework = (props: IProps) => {
  const { data, reworkUnit } = props;
  //   const isFinished = data?.partNumber?.substring(0, 2) === FINISHED_CODE;
  // 是否是改制 改制要多一些字段
  const [isGaizhi, setIsGaizhi] = useState(false);
  useEffect(() => {
    // 有改制料号
    setIsGaizhi(Boolean(data?.reformPartNumber));
  }, [data]);
  return (
    <tbody className={styles.printForm}>
      <tr>
        <ReadOnlyInput
          title="追溯单号"
          name="traceabilityNumber"
          titleStyle={{ ...redLabel }}
          style={fontSize22}
          labelColSpan={2}
          colSpan={8}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="流转卡号"
          name="transferCardCode"
          titleStyle={normalStyle}
          style={fontSize22}
          labelColSpan={2}
          colSpan={8}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="料号"
          name="partNumber"
          labelColSpan={2}
          colSpan={3}
          titleStyle={{ ...normalStyle, width: "18%" }}
          tdStyle={{ width: "32%" }}
          style={fontSize22}
        />
        <ReadOnlyInput
          title="品名"
          name="name"
          labelColSpan={2}
          colSpan={3}
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
          colSpan={3}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="材质"
          name="material"
          labelColSpan={2}
          colSpan={3}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="商标"
          name="trademark"
          labelColSpan={2}
          colSpan={3}
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
          colSpan={3}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="返工流程"
          name="reworkFlow"
          labelColSpan={2}
          colSpan={8}
          titleStyle={normalStyle}
          style={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title="开单人"
          name="drawer"
          labelColSpan={2}
          colSpan={3}
          titleStyle={normalStyle}
          style={normalStyle}
        />
        <ReadOnlyInput
          title="返工数量"
          name="reworkQuantity"
          labelColSpan={2}
          colSpan={3}
          titleStyle={normalStyle}
          style={normalStyle}
          addonAfter={reworkUnit}
        />
      </tr>
      {isGaizhi && (
        <tr>
          <ReadOnlyInput
            title="改制料号"
            name="reformPartNumber"
            labelColSpan={2}
            colSpan={3}
            titleStyle={normalStyle}
            style={normalStyle}
          />
          <ReadOnlyInput
            title="改制品名"
            name="reformName"
            labelColSpan={2}
            colSpan={3}
            titleStyle={normalStyle}
            style={normalStyle}
            addonAfter={reworkUnit}
          />
        </tr>
      )}
      {isGaizhi && (
        <tr>
          <ReadOnlyInput
            title="改制规格"
            name="reformSpec"
            labelColSpan={2}
            colSpan={3}
            titleStyle={normalStyle}
            style={normalStyle}
          />
          <ReadOnlyInput
            title="改制材质"
            name="reformMaterial"
            labelColSpan={2}
            colSpan={3}
            titleStyle={normalStyle}
            style={normalStyle}
            addonAfter={reworkUnit}
          />
        </tr>
      )}
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
        <td colSpan={10} className={styles.noPadding}>
          <table>
            <thead>
              <tr>
                <th
                  style={{ ...boldValue, padding: "5px 5px", width: "50%" }}
                  colSpan={5}
                >
                  工序
                </th>
                <th style={boldValue} colSpan={5}>
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
                      colSpan={5}
                    >
                      {item.processName}
                    </th>
                    <td colSpan={5}></td>
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
