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
  validateNotZero,
} from "@/utils";
import { FormInstance, message } from "antd";
import { IData } from "./indexType";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FINISHED_CODE, GET_FURNACE_ERROR } from "@/constants";
import { GET_MATERIAL_ERROR, GET_MATERIAL_SUCCESS } from "@/constants";
import {
  DEFAULT_RED,
  NO_OPTIONS_DATA,
  SUCCESS_CODE,
} from "@/constants/constants";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;

  mItmID: string;
  setMItemId: React.Dispatch<React.SetStateAction<string>>;
  mainsize: any;
}
const CommonForm = (props: IProps) => {
  const { data, isKg, form, mItmID, setMItemId, mainsize } = props;

  // 热处理炉台
  const [heatTreatmentFurnaces, setHeatTreatmentFurnaces] = useState<any[]>([]);
  // 最大流转数量
  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const isFinished = data?.itmid?.substring(0, 2) === FINISHED_CODE;
  useEffect(() => {
    if (isFinished && heatTreatmentFurnaces.length === 0) {
      getHeatTreatmentFurnacePlatformsList()
        .then((res: any) => {
          if (res?.data?.code === SUCCESS_CODE) {
            setHeatTreatmentFurnaces(
              res?.data?.data.map((item: any) => ({
                value: item.name,
                label: item.name,
              }))
            );
          }
        })
        .catch((err) => {
          message.error(GET_FURNACE_ERROR);
          console.log(err);
        });
    }
  }, [data]);

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

    if (isKg) {
      if (data?.newsupcount && data?.parseWeight) {
        const liucountMax = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumKG || "0")
        ).toFixed(2);
        const liuhuancountMax = transFormToPcs(liucountMax, data?.parseWeight);

        // 推荐流转数量KG
        const liucountKG =
          data?.transferNumberKG &&
          parseFloat(data?.transferNumberKG) <= parseFloat(liucountMax)
            ? data?.transferNumberKG
            : liucountMax;

        const transferNumberPCS =
          parseFloat(data?.transferNumberKG || "0") /
          parseFloat(data?.parseWeight);
        // 推荐流转数量PCS
        const liucountPCS =
          data?.transferNumberKG &&
          transferNumberPCS <= parseFloat(liuhuancountMax)
            ? transferNumberPCS
            : liuhuancountMax;

        setLiuMaxKg(parseFloat(liucountMax));
        setLiuMaxPCS(parseFloat(liuhuancountMax));
        form.setFieldValue("liucount", liucountKG);
        form.setFieldValue("liuhuancount", liucountPCS);
      }
    } else {
      if (data?.newsupcount && data?.parseWeight) {
        const liucountMax = (
          parseFloat(data?.newsupcount) -
          parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
        ).toFixed(2);
        const liuhuancountMax = transFormToKg(liucountMax, data?.parseWeight);
        // 推荐流转数量KG
        const liucountKG =
          data?.transferNumberKG &&
          parseFloat(data?.transferNumberKG) <= parseFloat(liuhuancountMax)
            ? data?.transferNumberKG
            : liuhuancountMax;

        const transferNumberPCS =
          parseFloat(data?.transferNumberKG || "0") /
          parseFloat(data?.parseWeight);
        // 推荐流转数量PCS
        const liucountPCS =
          data?.transferNumberKG && transferNumberPCS <= parseFloat(liucountMax)
            ? transferNumberPCS
            : liucountMax;

        setLiuMaxKg(parseFloat(liuhuancountMax));
        setLiuMaxPCS(parseFloat(liucountMax));
        form.setFieldValue("liucount", liucountPCS);
        form.setFieldValue("liuhuancount", liucountKG);
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
              pnumber: item?.pnumber,
            })) || []
          }
          placeholder={
            !data?.trademarkList || data?.trademarkList?.length === 0
              ? NO_OPTIONS_DATA
              : "请选择商标"
          }
          onSelect={(e: any, record: any) => {
            const pnumber = record?.pnumber;

            if (pnumber) {
              form.setFieldValue("pnumber", pnumber);
            }
          }}
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
          addonAfter={
            <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxKg}</span>
          }
          onChange={(e: number) => {
            const valueKg = e;
            const valuePCS =
              data?.parseWeight && valueKg
                ? transFormToPcs(valueKg, data?.parseWeight)
                : "";
            if (isKg) {
              form.setFieldValue("liuhuancount", valuePCS.toString());
              form.validateFields(["liuhuancount"]);
            } else {
              form.setFieldValue("liucount", valuePCS.toString());
              form.validateFields(["liucount"]);
            }
          }}
          rules={[{ validator: validateNotZero }]}
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
          dependencies={isKg ? ["liucount"] : ["liuhuancount"]}
          addonAfter={
            <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxPCS}</span>
          }
          onChange={(e: number) => {
            const valuePCS = e;
            const valueKg =
              data?.parseWeight && valuePCS
                ? transFormToKg(valuePCS, data?.parseWeight)
                : "";
            if (!isKg) {
              form.setFieldValue("liuhuancount", valueKg.toString());
              form.validateFields(["liuhuancount"]);
            } else {
              form.setFieldValue("liucount", valueKg.toString());
              form.validateFields(["liucount"]);
            }
          }}
          rules={[{ validator: validateNotZero }]}
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
              const data = res?.data?.data?.[0];
              if (res?.data?.code !== SUCCESS_CODE || !data) {
                message.error(GET_MATERIAL_ERROR);
                form.setFieldValue("mName", "");
                form.setFieldValue("mspec", "");
                form.setFieldValue("mItmTDID", "");
                return;
              }

              form.setFieldValue("mName", data.mName);
              form.setFieldValue("mspec", data.mformat);
              form.setFieldValue("mItmTDID", data.mtexture);
              message.success(GET_MATERIAL_SUCCESS);
            });
          }}
        />
        <EditAbleInput title="材料品名" name="mName" />
        <EditAbleInput title="材料规格" name="mspec" />
        <EditAbleInput title="材料材质" name="mItmTDID" />
      </tr>
      <tr>
        <ReadOnlyInput
          title="供方/炉批号"
          name="furnaceNo"
          colSpan={4}
          titleStyle={{ color: "red" }}
          defaultValue={mainsize?.allID || ""}
          form={form}
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
              value={data?.traceabilityNumber || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={data?.itmid || "没有数据"}
              noTd
            />
            <RenderQRCode
              title="领料二维码"
              name="lingliaoQRcode"
              rowSpan={3}
              value={data?.mItmID || "没有数据"}
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
      {isFinished && (
        <tr>
          <RenderSelect
            title="热处理炉台"
            name="heatTreatmentFurnace"
            options={heatTreatmentFurnaces}
            titleStyle={{ color: "red" }}
            colSpan={1}
            labelColSpan={2}
            placeholder="请选择炉台"
            required
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
          <RenderDatePicker
            title="流转时间"
            name="transferTime"
            colSpan={2}
            required
            showTime
          />
        </tr>
      )}
    </tbody>
  );
};
export default CommonForm;
