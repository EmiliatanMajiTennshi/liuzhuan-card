import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  transFormToKg,
  transFormToPcs,
  validateNotZero,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { DEFAULT_RED } from "@/constants/constants";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
  mainsize: any;
}
const OutsourcingForm = (props: IProps) => {
  const { data, isKg, form, mainsize } = props;
  // 最大流转数量
  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);
  // const hasWeight = data?.parseWeight && parseFloat(data?.parseWeight || "0");
  useEffect(() => {
    // 给流转数量初始值 产量-已使用
    if (isKg) {
      if (data?.newsupcount) {
        const transferKgMax = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.transferNumber || "0")
        ).toFixed(2);

        setLiuMaxKg(parseFloat(transferKgMax));
      }
    } else {
      if (data?.newsupcount) {
        const transferPcsMax = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.transferNumber || "0")
        ).toFixed(2);

        setLiuMaxPCS(parseFloat(transferPcsMax));
      }
    }
  }, [data]);
  return (
    <tbody>
      <tr>
        <EditAbleInput
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red" }}
          required
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="料号"
          name="itmid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="品名"
          name="name"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="规格"
          name="spec"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="材质"
          name="itmtdid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="商标"
          name="trademark"
          // options={
          //   data?.trademarkList?.map((item) => ({
          //     value: item.trademark,
          //     label: item.trademark,
          //   })) || []
          // }
          // placeholder="请选择商标"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="追溯单号"
          name="traceabilityNumber"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="完成日期"
          name="ljFinDate"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={`生产数量${data?.unit ? `（${data?.unit}）` : ""}`}
          name="newsupcount"
        />
        <EditAbleInput
          title={`流转数量${data?.unit ? `（${data?.unit}）` : ""}`}
          isNumber
          name="liucount"
          precision={isKg ? 2 : 0}
          max={isKg ? liuMaxKg : liuMaxPCS}
          addonAfter={
            <span style={{ color: DEFAULT_RED }}>
              剩余：{isKg ? liuMaxKg : liuMaxPCS}
            </span>
          }
          onChange={(e: number) => {
            const value = e;
            const transferValue =
              data?.parseWeight && parseFloat(data?.parseWeight || "0") && value
                ? isKg
                  ? transFormToPcs(value, data?.parseWeight)
                  : transFormToKg(value, data?.parseWeight)
                : value;

            form.setFieldValue("liuhuancount", transferValue.toString());
          }}
          rules={[{ validator: validateNotZero }]}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="行号"
          name="u9LineNo"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="图号"
          name="itmTEID"
        />
      </tr>
      <tr></tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="供方/炉批号"
          name="furnaceNum"
          colSpan={4}
          titleStyle={{ color: "red" }}
        />

        <th colSpan={3} style={{ textAlign: "center" }}>
          生产入库扫描条码
        </th>
      </tr>
      <tr>
        <th rowSpan={3} style={{ color: "red" }}>
          主要尺寸
        </th>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project1 || ""}
          name={mainsize?.project1 || ""}
          defaultValue={mainsize?.projectitem1 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project2 || ""}
          name={mainsize?.project2 || ""}
          defaultValue={mainsize?.projectitem2 || ""}
          colSpan={1}
          form={form}
        />

        <td rowSpan={3} colSpan={3}>
          <div className={styles.QRcodes}>
            <RenderQRCode
              title="订单号"
              name="orderQRcode"
              rowSpan={3}
              value={data.orderid || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              rowSpan={3}
              value={data.traceabilityNumber || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={data.itmid || "没有数据"}
              noTd
              form={form}
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project3 || ""}
          name={mainsize?.project3 || ""}
          defaultValue={mainsize?.projectitem3 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project4 || ""}
          name={mainsize?.project4 || ""}
          defaultValue={mainsize?.projectitem4 || ""}
          colSpan={1}
          form={form}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project5 || ""}
          name={mainsize?.project5 || ""}
          defaultValue={mainsize?.projectitem5 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project6 || ""}
          name={mainsize?.project6 || ""}
          defaultValue={mainsize?.projectitem6 || ""}
          colSpan={1}
          form={form}
        />
      </tr>
    </tbody>
  );
};
export default OutsourcingForm;
