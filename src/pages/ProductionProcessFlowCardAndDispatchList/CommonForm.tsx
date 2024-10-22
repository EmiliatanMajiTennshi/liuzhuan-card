import {
  getHeatTreatmentFurnacePlatformsList,
  queryMaterialByItemid,
} from "@/api";
import {
  EditAbleInput,
  getSecondDashSubstring,
  ReadOnlyInput,
  RenderDatePicker,
  RenderQRCode,
  RenderSelect,
  transFormToKg,
  transFormToPcs,
  validateNotZero,
} from "@/utils";
import { App, FormInstance } from "antd";
import { IData } from "./indexType";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FINISHED_CODE, GET_FURNACE_ERROR } from "@/constants";

import {
  DEFAULT_RED,
  NO_OPTIONS_DATA,
  SUCCESS_CODE,
} from "@/constants/constants";
import { AnyObject } from "antd/es/_util/type";
import { debounce } from "lodash";
import { normalStyle, normalStyle18 } from "./styles";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;

  mainsize: any;
  needIssueFinished?: boolean;
  notSelfIssue?: boolean;
  setFinishedData32to31?: React.Dispatch<React.SetStateAction<AnyObject>>;
  finishedData32to31?: AnyObject;
}
const CommonForm = (props: IProps) => {
  const {
    data,
    isKg,
    form,

    mainsize,
    needIssueFinished,
    notSelfIssue,
  } = props;
  const itmid = data?.itmid;
  // 半成品
  const isSemiFinished = itmid?.startsWith("32");
  // 32下发31 32半品
  const isUnfinished32to31 = needIssueFinished;
  // 32下发31 31成品
  const isFinished32to31 = notSelfIssue;
  const { message } = App.useApp();
  // 热处理炉台
  const [heatTreatmentFurnaces, setHeatTreatmentFurnaces] = useState<any[]>([]);
  // 最大流转数量
  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const [pNum, setPNum] = useState<string>();
  const [mItmID, setMItemId] = useState<string>();

  // const [materialItemId,setMItemId]

  const isFinished =
    data?.itmid?.substring(0, 2) === FINISHED_CODE || isFinished32to31;
  useEffect(() => {
    if (isFinished && heatTreatmentFurnaces.length === 0) {
      getHeatTreatmentFurnacePlatformsList()
        .then((res: any) => {
          if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
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
    // 料号是否有小尾巴
    const pCode = getSecondDashSubstring(data?.itmid || "");
    if (pCode) {
      const currentTrademark = data?.trademarkList?.find(
        (item) => item?.pnumber === pCode
      );
      if (currentTrademark) {
        form?.setFieldValue("trademark", currentTrademark?.trademark);
        setPNum(pCode);
      }
      // console.log(CurrentTrademark, 12422214);
    }
  }, [data]);

  useEffect(() => {
    form.setFieldValue("transferCardCode", data.transferCardCode);

    // if (isKg) {
    if (data?.productKg && data?.weight) {
      const transferKgMax =
        parseFloat(data?.productKg) -
        parseFloat(
          isKg
            ? data?.transferNumber || "0"
            : transFormToKg(data?.transferNumber || "0", data?.weight)
        );
      const transferPcsMax = transFormToPcs(transferKgMax, data?.weight);

      // 推荐流转数量KG
      const transferKg =
        data?.transferNumberKG &&
        parseFloat(data?.transferNumberKG) <= transferKgMax
          ? data?.transferNumberKG
          : transferKgMax.toFixed(4);

      const transferNumberPCS = data?.weight
        ? transFormToPcs(data?.transferNumberKG || "0", data?.weight)
        : "没有单重，无法计算";

      // 推荐流转数量PCS
      const transferPcs =
        data?.transferNumberKG &&
        parseFloat(transferNumberPCS) <= parseFloat(transferPcsMax)
          ? transferNumberPCS
          : transferPcsMax;

      setLiuMaxKg(parseFloat(transferKgMax.toFixed(4)));
      setLiuMaxPCS(parseFloat(transferPcsMax));
      if (!notSelfIssue) {
        if (data?.transferNumberKG) {
          form.setFieldValue("transferKg", transferKg);
          form.setFieldValue("transferPcs", transferPcs);
        } else {
          form.setFieldValue("transferKg", 0);
          form.setFieldValue("transferPcs", 0);
        }
      }
    }
  }, [data]);
  useEffect(() => {
    setMItemId(data?.mItmID);
  }, [data]);
  const debounceGetPartNumber = debounce(async function (e) {
    try {
      // setPartNumberOPtions({ options: [], loading: true });
      const res = await queryMaterialByItemid({ itemid: e?.target?.value });

      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1 && res?.data?.data) {
        const partNumberData = res?.data?.data;
        form.setFieldValue("mName", partNumberData?.mName);
        form.setFieldValue("mspec", partNumberData?.mspec);
        form.setFieldValue("mItmTDID", partNumberData?.mItmTDID);
        setMItemId(partNumberData?.mItmID);
        message?.success("材料更新成功！");
      } else {
        message?.error("没有找到对应材料");
      }
    } catch (err) {
      message?.error("没有找到对应材料");
    }
  }, 1000);
  return (
    <tbody className={styles.normalForm}>
      <tr>
        <EditAbleInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产订单条码"
          name="orderid"
          titleStyle={{ color: "red", ...normalStyle }}
          required
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
        {isFinished32to31 ? (
          <ReadOnlyInput
            title="商标"
            name="trademark"
            style={{ lineHeight: "24px", ...normalStyle18 }}
            titleStyle={normalStyle}
          ></ReadOnlyInput>
        ) : (
          <RenderSelect
            title="商标"
            name="trademark"
            empty
            form={form}
            data={data}
            remark={data?.trademark}
            titleStyle={normalStyle}
            options={[
              ...(data?.trademarkList1?.map((item) => ({
                value: item.trademark,
                label: item.trademark,
                pnumber: item?.pnumber,
              })) || []),
              ...(data?.trademarkList?.map((item) => ({
                value: item.trademark,
                label: item.trademark,
                pnumber: item?.pnumber,
              })) || []),
            ]}
            optionKey="pnumber"
            placeholder={
              !data?.trademarkList || data?.trademarkList?.length === 0
                ? NO_OPTIONS_DATA
                : "请选择商标"
            }
            onSelect={(e: any, record: any) => {
              // debugger;
              const pnumber = record?.pnumber;
              if (pnumber) {
                setPNum(pnumber);
                form.setFieldValue("pnumber", pnumber);
              }
            }}
            showSearch
          />
        )}
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
          />
        )}
      </tr>
      <tr>
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="客户订单号"
          name="ordernum"
        />
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="表面处理"
          name="itmtcid"
        />
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="图号"
          name="goodsItmTEID"
        />
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="完成日期"
          name="ljFinDate"
        />
      </tr>
      <tr>
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产数量(公斤)"
          name={"productKg"}
        />
        {isFinished32to31 ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            title="流转数量(公斤)"
            isNumber
            name={"transferKg"}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            addonAfter={
              <span style={{ color: DEFAULT_RED, fontSize: 14 }}>
                剩余：{liuMaxKg}
              </span>
            }
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="流转数量(公斤)"
            isNumber
            name={"transferKg"}
            dependencies={["transferPcs"]}
            max={liuMaxKg}
            addonAfter={
              <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxKg}</span>
            }
            onChange={(e: number) => {
              const valueKg = e;
              const valuePCS =
                data?.weight && valueKg
                  ? transFormToPcs(valueKg, data?.weight)
                  : "";

              form.setFieldValue("transferPcs", valuePCS);
              form.validateFields(["transferPcs"]);
            }}
            rules={[{ validator: validateNotZero }]}
          />
        )}
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="生产数量(PCS)"
          name={"productPcs"}
        />
        {isFinished32to31 ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            title="流转数量(PCS)"
            style={{ lineHeight: "24px", ...normalStyle18 }}
            isNumber
            name={"transferPcs"}
            addonAfter={
              <span style={{ color: DEFAULT_RED, fontSize: 14 }}>
                剩余：{liuMaxPCS}
              </span>
            }
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="流转数量(PCS)"
            isNumber
            max={liuMaxPCS}
            name={"transferPcs"}
            dependencies={["transferKg"]}
            addonAfter={
              <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxPCS}</span>
            }
            onChange={(e: number) => {
              const valuePCS = e;
              const valueKg =
                data?.weight && valuePCS
                  ? transFormToKg(valuePCS, data?.weight)
                  : "";
              // if (
              //   isUnfinished32to31 &&
              //   setFinishedData32to31 &&
              //   finishedData32to31
              // ) {
              //   const cloneData = cloneDeep(finishedData32to31);
              //   setFinishedData32to31({
              //     ...cloneData,
              //     transferKg: valueKg,
              //     transferPcs: e,
              //   });
              // }
              form.setFieldValue("transferKg", valueKg);
              form.validateFields(["transferKg"]);
            }}
            rules={[{ validator: validateNotZero }]}
            precision={0}
          />
        )}
      </tr>
      <tr>
        <EditAbleInput
          titleStyle={normalStyle}
          title="材料料号"
          name="mItmID"
          // options={partNumberOptions.options?.map((item: any) => {
          //   return {
          //     value: item?.mItmID,
          //     label: item?.mItmID,
          //     mName: item?.mName,
          //     mformat: item?.mspec,
          //     mtexture: item?.mItmTDID,
          //   };
          // })}
          // loading={partNumberOptions.loading}
          onChange={debounceGetPartNumber}
          // onSelect={(e: string, record: any) => {
          //   const { mName, mformat, mtexture } = record || {};
          //   form.setFieldValue("mName", mName);
          //   form.setFieldValue("mspec", mformat);
          //   form.setFieldValue("mItmTDID", mtexture);
          //   setMItemId(e);
          //   // form.setFieldValue("lingliaoQRcode", e);
          // }}
          // showSearch={true}
          // onBlur={(e) => {
          //   const currentId = e.target.value;
          //   if (currentId === mItmID) {
          //     return;
          //   }
          //   setMItemId(currentId);
          //   queryMaterialByItemid({ itemid: currentId }).then((res) => {
          //     const data = res?.data?.data?.[0];
          //     if (res?.data?.code !== SUCCESS_CODE || !data) {
          //       message.error(GET_MATERIAL_ERROR);
          //       form.setFieldValue("mName", "");
          //       form.setFieldValue("mspec", "");
          //       form.setFieldValue("mItmTDID", "");
          //       return;
          //     }

          //     form.setFieldValue("mName", data.mName);
          //     form.setFieldValue("mspec", data.mformat);
          //     form.setFieldValue("mItmTDID", data.mtexture);
          //     message.success(GET_MATERIAL_SUCCESS);
          //   });
          // }}
        />
        <EditAbleInput
          titleStyle={normalStyle}
          title="材料品名"
          name="mName"
          style={{ lineHeight: "24px", ...normalStyle18 }}
        />
        <EditAbleInput
          titleStyle={normalStyle}
          title="材料规格"
          name="mspec"
          style={{ lineHeight: "24px", ...normalStyle18 }}
        />
        <EditAbleInput
          titleStyle={normalStyle}
          title="材料材质"
          name="mItmTDID"
          style={{ lineHeight: "24px", ...normalStyle18 }}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="供方/炉批号"
          name="furnaceNo_del"
          colSpan={4}
          titleStyle={{ color: "red", ...normalStyle }}
          // defaultValue={data?.furnaceNo || mainsize?.allID || ""}
          form={form}
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
          titleStyle={normalStyle}
          title={mainsize?.project1 || ""}
          name={mainsize?.project1 || ""}
          defaultValue={mainsize?.projectitem1 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
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
              value={data?.traceabilityNumber || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="入库二维码"
              name="rukuQRcode"
              rowSpan={3}
              value={`${data.parseitmid}${pNum || ""}` || "没有数据"}
              noTd
              form={form}
            />
            <RenderQRCode
              title="领料二维码"
              name="lingliaoQRcode"
              rowSpan={3}
              value={mItmID || "没有数据"}
              noTd
              form={form}
            />
          </div>
        </td>
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
          title={mainsize?.project3 || ""}
          name={mainsize?.project3 || ""}
          defaultValue={mainsize?.projectitem3 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
          title={mainsize?.project4 || ""}
          name={mainsize?.project4 || ""}
          defaultValue={mainsize?.projectitem4 || ""}
          colSpan={1}
          form={form}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
          title={mainsize?.project5 || ""}
          name={mainsize?.project5 || ""}
          defaultValue={mainsize?.projectitem5 || ""}
          colSpan={1}
          form={form}
        />
        <ReadOnlyInput
          style={{ lineHeight: "24px", ...normalStyle18 }}
          titleStyle={normalStyle}
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
            titleStyle={{ color: "red", ...normalStyle }}
            colSpan={1}
            labelColSpan={2}
            placeholder="请选择炉台"
            disabled={isFinished32to31}
          />
          <RenderSelect
            title="优先顺序"
            name="priority"
            titleStyle={normalStyle}
            options={Array.from({ length: 50 }, (item, index) => ({
              value: index + 1,
              label: index + 1,
            }))}
            placeholder="请选择优先顺序"
            disabled={isFinished32to31}
          />
          <RenderDatePicker
            title="流转时间"
            name="transferTime"
            colSpan={2}
            titleStyle={normalStyle}
            showTime
            disabled={isFinished32to31}
          />
        </tr>
      )}
    </tbody>
  );
};
export default CommonForm;
