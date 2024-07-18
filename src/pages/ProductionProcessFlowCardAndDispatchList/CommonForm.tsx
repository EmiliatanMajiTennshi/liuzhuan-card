import {
  getHeatTreatmentFurnacePlatformsList,
  queryMaterialByItemid,
} from "@/api";
import {
  EditAbleInput,
  ReadOnlyInput,
  RenderDatePicker,
  RenderQRCode,
  RenderSelect,
  transFormToKg,
  transFormToPcs,
} from "@/utils";
import { FormInstance, message } from "antd";
import { IData } from "./indexType";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;
  liuMaxKg: number;
  liuMaxPCS: number;
  mItmID: string;
  setMItemId: React.Dispatch<React.SetStateAction<string>>;
  mainsize: any;
}
const CommonForm = (props: IProps) => {
  const {
    data,
    isKg,
    form,
    liuMaxKg,
    liuMaxPCS,
    mItmID,
    setMItemId,
    mainsize,
  } = props;

  // 热处理炉台
  const [heatTreatmentFurnaces, setHeatTreatmentFurnaces] = useState<any[]>([]);
  useEffect(() => {
    if (
      data?.itmid?.substring(0, 2) === "31" &&
      heatTreatmentFurnaces.length === 0
    ) {
      getHeatTreatmentFurnacePlatformsList()
        .then((res: any) => {
          if (res?.data?.code === 20000) {
            setHeatTreatmentFurnaces(
              res?.data?.data.map((item: any) => ({
                value: item.name,
                label: item.name,
              }))
            );
          }
        })
        .catch((err) => {
          message.error("请求热处理炉台数据失败");
          console.log(err);
        });
    }
  });
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
        <RenderSelect
          title="商标"
          name="trademark"
          options={
            data?.trademarkList?.map((item) => ({
              value: item.trademark,
              label: item.trademark,
            })) || []
          }
          placeholder="请选择商标"
        />
        <ReadOnlyInput title="追溯单号" name="traceabilityNumber" />
        <EditAbleInput title="追溯单号（半品）" name="orderCatchHalf" />
      </tr>
      <tr>
        <ReadOnlyInput title="客户订单号" name="ordernum" />
        <ReadOnlyInput title="表面处理" name="itmtcid" />
        <ReadOnlyInput title="图号" name="itmTEID" />
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
              form.setFieldValue("liucount", valueKg.toString());
            }
          }}
        />
      </tr>
      <tr>
        <EditAbleInput
          title="材料料号"
          name="mItmID"
          onBlur={(e) => {
            const currentId = e.target.value;
            if (currentId === mItmID) {
              return;
            }
            setMItemId(currentId);
            queryMaterialByItemid({ itemid: currentId }).then((res) => {
              console.log(res, 123111);

              const data = res?.data?.data?.[0];
              if (res?.data?.code !== 20000 || !data) {
                message.error("获取材料数据失败");
                form.setFieldValue("mName", "");
                form.setFieldValue("mspec", "");
                form.setFieldValue("mItmTDID", "");
                return;
              }

              form.setFieldValue("mName", data.mName);
              form.setFieldValue("mspec", data.mformat);
              form.setFieldValue("mItmTDID", data.mtexture);
              message.success("材料数据更新成功");
            });
          }}
        />
        <EditAbleInput title="材料品名" name="mName" />
        <EditAbleInput title="材料规格" name="mspec" />
        <EditAbleInput title="材料材质" name="mItmTDID" />
      </tr>
      <tr>
        <ReadOnlyInput
          title="供应/炉批号"
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
            <RenderQRCode
              title="领料二维码"
              name="lingliaoQRcode"
              rowSpan={3}
              value={data.mItmID || "没有数据"}
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
      {data?.itmid?.substring(0, 2) === "31" && (
        <tr>
          <RenderSelect
            title="热处理炉台"
            name="heatTreatmentFurnace"
            options={heatTreatmentFurnaces}
            titleStyle={{ color: "red" }}
            colSpan={1}
            labelColSpan={2}
            placeholder="请选择炉台"
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
          <RenderDatePicker title="流转时间" name="transferTime" colSpan={2} />
        </tr>
      )}
    </tbody>
  );
};
export default CommonForm;
