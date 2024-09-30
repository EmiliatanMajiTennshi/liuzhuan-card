import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  RenderSelect,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { FINISHED_CODE } from "@/constants";

// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  form: FormInstance<any>;
  mainsize: any;
}
const FlowCardForm = (props: IProps) => {
  const { data, form, mainsize } = props;

  const isSemiFinished = data?.itmid?.startsWith("32");
  // 需要同步操作工和检验员的工艺列表

  // // 最大流转数量
  // const [liuMaxKg, setLiuMaxKg] = useState(0);
  // const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const isFinished = data?.partNumber?.substring(0, 2) === FINISHED_CODE;

  useEffect(() => {
    // form.setFieldValue(
    //   "huancount",
    //   data?.newsupcount && data?.parseWeight
    //     ? isKg
    //       ? transFormToPcs(data?.newsupcount, data?.parseWeight)
    //       : transFormToKg(data?.newsupcount, data?.parseWeight)
    //     : ""
    // );
    // form.setFieldValue("transferCardCode", data?.transferCard);
    // 给流转数量初始值 产量-已使用
    // if (isKg) {
    //   if (data?.productionKg) {
    //     // 流转数量
    //     const transferKg = (
    //       parseFloat(data?.productionKg) -
    //       parseFloat(data?.alreadySend?.alreaySendNumKG || "0")
    //     ).toFixed(2);
    //     form.setFieldValue("transferKg", transferKg);
    //     setLiuMaxKg(parseFloat(transferKg));
    //   }
    // } else {
    //   if (data?.productionPcs) {
    //     const transferPcs = (
    //       parseFloat(data?.productionPcs) -
    //       parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
    //     ).toFixed(2);
    //     setLiuMaxPCS(parseFloat(transferPcs));
    //     form.setFieldValue("transferPcs", transferPcs);
    //   }
    // }
  }, [data]);
  useEffect(() => {
    // if(isKg){
    //     form
    // }
  }, [data]);
  return (
    <tbody>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red" }}
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
          colSpan={isSemiFinished ? 3 : 1}
        />
        {!isSemiFinished && (
          <EditAbleInput title="追溯单号(半品)" name="orderCatchHalf" />
        )}
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="客户订单号"
          name="ordernum"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="表面处理"
          name="itmtcid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="生产数量(KG)"
          name="productKg"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="生产数量(PCS)"
          name="productPcs"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="图号"
          name="itmTEID"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="完成日期"
          name="ljFinDate"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="流转数量(KG)"
          name="transferNumberKG"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="流转数量(PCS)"
          name="transferNumberPCS"
        />
      </tr>
      <tr>
        <EditAbleInput
          title="供方"
          name="supplierName"
          titleStyle={{ color: "red" }}
        />
        <EditAbleInput
          title="炉批号"
          name="furnaceNo"
          titleStyle={{ color: "red" }}
          colSpan={2}
          form={form}
          defaultValue={mainsize?.allID || ""}
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
              value={data?.orderid || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="追溯单号"
              name="traceabilityNumberQRCode"
              rowSpan={3}
              value={data?.traceabilityNumber || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={`${data.parseitmid}` || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="领料二维码"
              name="lingliaoQRcode"
              rowSpan={3}
              value={data?.pickingCode || data?.mItmID || "没有数据"}
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
      {isFinished && (
        <tr>
          <ReadOnlyInput
            style={{ lineHeight: "24px" }}
            title="热处理炉台"
            name="heatTreatmentFurnacePlatform"
            titleStyle={{ color: "red" }}
            colSpan={1}
            labelColSpan={2}
          />
          <RenderSelect
            title="优先顺序"
            required
            name="priorityOrder"
            options={Array.from({ length: 50 }, (item, index) => ({
              value: index + 1,
              label: index + 1,
            }))}
            placeholder="请选择优先顺序"
          />
          <ReadOnlyInput
            style={{ lineHeight: "24px" }}
            title="流转时间"
            name="tranferTime"
            colSpan={2}
          />
        </tr>
      )}
    </tbody>
  );
};
export default FlowCardForm;
