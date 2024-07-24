import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    // 二维码不手动设置值会出现奇怪的bug
    form.setFieldValue("orderQRcode", data.orderid);
    form.setFieldValue("traceabilityNumberQRcode", data.traceabilityNumber);
    form.setFieldValue("rukuQRcode", data.itmid);
    form.setFieldValue("lingliaoQRcode", data.mItmID);
    form.setFieldValue(
      "huancount",
      data?.newsupcount && data?.parseWeight
        ? isKg
          ? transFormToPcs(data?.newsupcount, data?.parseWeight)
          : transFormToKg(data?.newsupcount, data?.parseWeight)
        : ""
    );
    form.setFieldValue("transferCardCode", data.transferCardCode);

    // 给流转数量初始值 产量-已使用
    if (isKg) {
      if (data?.newsupcount && data?.parseWeight) {
        const liucount = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumKG || "0")
        ).toFixed(2);
        const liuhuancount = (
          parseFloat(data?.newsupcount) / parseFloat(data?.parseWeight) -
          parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
        ).toFixed(2);

        form.setFieldValue("liucount", liucount);
        setLiuMaxKg(parseFloat(liucount));
        setLiuMaxPCS(parseFloat(liuhuancount));
        form.setFieldValue("liuhuancount", liuhuancount);
      }
    } else {
      if (data?.newsupcount && data?.parseWeight) {
        const liucount = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
        ).toFixed(2);
        const liuhuancount = (
          parseFloat(data?.newsupcount) * parseFloat(data?.parseWeight) -
          parseFloat(data?.alreadySend?.alreaySendNumKG || "0")
        ).toFixed(2);

        setLiuMaxKg(parseFloat(liuhuancount));
        setLiuMaxPCS(parseFloat(liucount));
        form.setFieldValue("liucount", liucount);
        form.setFieldValue("liuhuancount", liuhuancount);
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
        />
        <ReadOnlyInput title="料号" name="itmid" />
        <ReadOnlyInput title="品名" name="name" />
        <ReadOnlyInput title="规格" name="spec" />
      </tr>
      <tr>
        <ReadOnlyInput title="材质" name="itmtdid" />
        <ReadOnlyInput
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
        <ReadOnlyInput title="追溯单号" name="traceabilityNumber" />
        <ReadOnlyInput title="完成日期" name="ljFinDate" />
      </tr>
      <tr>
        <ReadOnlyInput
          title="生产数量（公斤）"
          name={isKg ? "newsupcount" : "huancount"}
        />
        <EditAbleInput
          title="流转数量（公斤）"
          isNumber
          name={isKg ? "liucount" : "liuhuancount"}
          max={liuMaxKg}
          onChange={(e: number) => {
            const valueKg = e;
            const valuePCS =
              data?.parseWeight && valueKg
                ? transFormToPcs(valueKg, data?.parseWeight)
                : "";
            if (isKg) {
              form.setFieldValue("liuhuancount", valuePCS.toString());
            } else {
              form.setFieldValue("liucount", valuePCS.toString());
            }
          }}
        />
        <ReadOnlyInput
          title="生产数量（PCS）"
          name={isKg ? "huancount" : "newsupcount"}
        />
        <EditAbleInput
          title="流转数量（PCS）"
          isNumber
          max={liuMaxPCS}
          name={isKg ? "liuhuancount" : "liucount"}
          onChange={(e: number) => {
            const valuePCS = e;
            const valueKg =
              data?.parseWeight && valuePCS
                ? transFormToKg(valuePCS, data?.parseWeight)
                : "";
            if (!isKg) {
              form.setFieldValue("liuhuancount", valueKg.toString());
            } else {
              form.setFieldValue("liucount", valuePCS.toString());
            }
          }}
        />
      </tr>
      <tr>
        <ReadOnlyInput title="行号" name="u9LineNo" />
        <ReadOnlyInput title="图号" name="itmTEID" colSpan={5} />
      </tr>
      <tr>
        <ReadOnlyInput
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
          title={mainsize?.project1 || ""}
          name={mainsize?.project1 || ""}
          defaultValue={mainsize?.projectitem1 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
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
            />
            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              rowSpan={3}
              value={data.traceabilityNumber || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={data.itmid || "没有数据"}
              noTd
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput
          title={mainsize?.project3 || ""}
          name={mainsize?.project3 || ""}
          defaultValue={mainsize?.projectitem3 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          title={mainsize?.project4 || ""}
          name={mainsize?.project4 || ""}
          defaultValue={mainsize?.projectitem4 || ""}
          colSpan={1}
          form={form}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          title={mainsize?.project5 || ""}
          name={mainsize?.project5 || ""}
          defaultValue={mainsize?.projectitem5 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
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
