import {
  EditAbleInput,
  ReadOnlyInput,
  RenderQRCode,
  RenderSelect,
} from "@/utils";
import { App, FormInstance } from "antd";
import { IData } from "./indexType";

import styles from "./index.module.scss";
import { useEffect } from "react";
import { FINISHED_CODE, SUCCESS_CODE } from "@/constants";
import { normalStyle, normalStyle18 } from "./styles";
import { debounce } from "lodash";
import { queryFurnaceByTraceabilityHalf } from "@/api";

// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  form: FormInstance<any>;
  mainsize: any;
}
const FlowCardForm = (props: IProps) => {
  const { data, form, mainsize } = props;
  const { message } = App.useApp();
  const isSemiFinished = data?.itmid?.startsWith("32");
  // 需要同步操作工和检验员的工艺列表

  // // 最大流转数量
  // const [liuMaxKg, setLiuMaxKg] = useState(0);
  // const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const isFinished =
    data?.partNumber?.substring(0, 2) === FINISHED_CODE ||
    data?.itmid?.substring(0, 2) === FINISHED_CODE;

  const debounceGetFurnaceNum = debounce(async function (e, flag?: boolean) {
    if (flag && mainsize?.allID) {
      return;
    }
    try {
      const res = await queryFurnaceByTraceabilityHalf({
        traceabilityHalf: e?.target?.value,
      });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const furnaceNumData = res?.data?.data || {};
        if (furnaceNumData?.furnaceNo) {
          form?.setFieldValue("furnaceNo", furnaceNumData?.furnaceNo);
          message.success("炉批号更新成功！");
        } else {
          message.error("此追溯单号未找到对应炉批号，请重试");
        }
      } else {
        message.error("此追溯单号未找到对应炉批号，请重试");
      }
    } catch (err) {
      message.error("此追溯单号未找到对应炉批号，请重试");
      console.log(err);
    }
  }, 500);
  useEffect(() => {
    if (isFinished && data?.associationTraceabilityNumber) {
      debounceGetFurnaceNum(
        {
          target: { value: data?.associationTraceabilityNumber },
        },
        true
      );
      console.log(data, 124);
    }
  }, [data]);
  useEffect(() => {
    // if(isKg){
    //     form
    // }
  }, [data]);
  return (
    <tbody className={styles.normalForm}>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red", ...normalStyle }}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="料号"
          name="itmid"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="品名"
          name="name"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="规格"
          name="spec"
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="材质"
          name="itmtdid"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="商标"
          name="trademark"
          titleStyle={normalStyle}
          // options={
          //   data?.trademarkList?.map((item) => ({
          //     value: item.trademark,
          //     label: item.trademark,
          //   })) || []
          // }
          // placeholder="请选择商标"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="追溯单号"
          name="traceabilityNumber"
          colSpan={isSemiFinished ? 3 : 1}
          titleStyle={normalStyle}
        />
        {!isSemiFinished && (
          <EditAbleInput
            title="追溯单号(半品)"
            name="orderCatchHalf"
            titleStyle={normalStyle}
            onChange={debounceGetFurnaceNum}
            form={form}
            defaultValue={
              data?.associationTraceabilityNumber || data?.orderCatchHalf || ""
            }
          />
        )}
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="客户订单号"
          name="ordernum"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
          title="表面处理"
          name="itmtcid"
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产数量(KG)"
          name="productKg"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产数量(PCS)"
          name="productPcs"
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="图号"
          name="itmTEID"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="完成日期"
          name="ljFinDate"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="流转数量(KG)"
          name="transferNumberKG"
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="流转数量(PCS)"
          name="transferNumberPCS"
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <EditAbleInput
          title="供方"
          name="supplierName"
          titleStyle={{ color: "red", ...normalStyle }}
          style={{ lineHeight: "120%", ...normalStyle18 }}
        />
        <EditAbleInput
          title="炉批号"
          name="furnaceNo"
          titleStyle={{ color: "red", ...normalStyle }}
          colSpan={2}
          form={form}
          style={{ lineHeight: "120%", ...normalStyle18 }}
        />
        <th colSpan={3} style={{ textAlign: "center", ...normalStyle }}>
          生产入库扫描条码
        </th>
      </tr>

      <tr>
        <th rowSpan={3} style={{ color: "red", ...normalStyle }}>
          主要尺寸
        </th>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={mainsize?.project1 || ""}
          name={mainsize?.project1 || ""}
          defaultValue={mainsize?.projectitem1 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={mainsize?.project2 || ""}
          name={mainsize?.project2 || ""}
          defaultValue={mainsize?.projectitem2 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
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
              value={`${data.itmid}` || "没有数据"}
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
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={mainsize?.project3 || ""}
          name={mainsize?.project3 || ""}
          defaultValue={mainsize?.projectitem3 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={mainsize?.project4 || ""}
          name={mainsize?.project4 || ""}
          defaultValue={mainsize?.projectitem4 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title={mainsize?.project5 || ""}
          name={mainsize?.project5 || ""}
          defaultValue={mainsize?.projectitem5 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title={mainsize?.project6 || ""}
          name={mainsize?.project6 || ""}
          defaultValue={mainsize?.projectitem6 || ""}
          colSpan={1}
          form={form}
          titleStyle={normalStyle}
        />
      </tr>
      {isFinished && (
        <tr>
          <ReadOnlyInput
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="热处理炉台"
            name="heatTreatmentFurnacePlatform"
            titleStyle={{ color: "red", ...normalStyle }}
            colSpan={1}
            labelColSpan={2}
          />
          <RenderSelect
            title="优先顺序"
            name="priorityOrder"
            options={Array.from({ length: 50 }, (item, index) => ({
              value: index + 1,
              label: index + 1,
            }))}
            placeholder="请选择优先顺序"
            titleStyle={normalStyle}
          />
          <ReadOnlyInput
            style={{ lineHeight: "24px" }}
            title="流转时间"
            name="tranferTime"
            colSpan={2}
            titleStyle={normalStyle}
          />
        </tr>
      )}
    </tbody>
  );
};
export default FlowCardForm;
