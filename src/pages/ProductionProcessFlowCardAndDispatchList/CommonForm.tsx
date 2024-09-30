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
  uniqueArray,
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
import { AnyObject } from "antd/es/_util/type";
import { debounce } from "lodash";

interface IProps {
  data: IData;
  isKg: boolean;
  form: FormInstance<any>;

  mItmID: string;
  setMItemId: React.Dispatch<React.SetStateAction<string>>;
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
    mItmID,
    setMItemId,
    mainsize,
    needIssueFinished,
    notSelfIssue,
    setFinishedData32to31,
    finishedData32to31,
  } = props;
  const itmid = data?.itmid;
  // 半成品
  const isSemiFinished = itmid?.startsWith("32");
  // 32下发31 32半品
  const isUnfinished32to31 = needIssueFinished;
  // 32下发31 31成品
  const isFinished32to31 = notSelfIssue;
  // 热处理炉台
  const [heatTreatmentFurnaces, setHeatTreatmentFurnaces] = useState<any[]>([]);
  // 最大流转数量
  const [liuMaxKg, setLiuMaxKg] = useState(0);
  const [liuMaxPCS, setLiuMaxPCS] = useState(0);

  const [pNum, setPNum] = useState();
  const [partNumberOptions, setPartNumberOPtions] = useState({
    options: [],
    loading: false,
  });
  const isFinished = data?.itmid?.substring(0, 2) === FINISHED_CODE;
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
  }, [data]);

  useEffect(() => {
    // form.setFieldValue(
    //   "huancount",
    //   data?.newsupcount && data?.weight
    //     ? isKg
    //       ? transFormToPcs(data?.newsupcount, data?.weight)
    //       : transFormToKg(data?.newsupcount, data?.weight)
    //     : ""
    // );
    form.setFieldValue("transferCardCode", data.transferCardCode);
    // form.setFieldValue("trademark", data?.pCodeList?.[0]?.pCode);

    // if (isKg) {
    if (data?.productKg && data?.weight) {
      const transferKgMax = (
        parseFloat(data?.productKg) -
        parseFloat(
          isKg
            ? data?.transferNumber || "0"
            : transFormToKg(data?.transferNumber || "0", data?.weight)
        )
      ).toFixed(2);
      const transferPcsMax = transFormToPcs(transferKgMax, data?.weight);

      // 推荐流转数量KG
      const transferKg =
        data?.transferNumberKG &&
        parseFloat(data?.transferNumberKG) <= parseFloat(transferKgMax)
          ? data?.transferNumberKG
          : transferKgMax;

      const transferNumberPCS = data?.weight
        ? transFormToPcs(data?.transferNumberKG || "0", data?.weight)
        : "没有单重，无法计算";

      // 推荐流转数量PCS
      const transferPcs =
        data?.transferNumberKG &&
        parseFloat(transferNumberPCS) <= parseFloat(transferPcsMax)
          ? transferNumberPCS
          : transferPcsMax;

      setLiuMaxKg(parseFloat(transferKgMax));
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
      // }
      // } else {
      //   if (data?.newsupcount && data?.parseWeight) {
      //     const liucountMax = (
      //       parseFloat(data?.newsupcount) -
      //       parseFloat(data?.alreadySend?.alreaySendNumPCS || "0")
      //     ).toFixed(0);
      //     const liuhuancountMax = transFormToKg(liucountMax, data?.parseWeight);
      //     // 推荐流转数量KG
      //     const liucountKG =
      //       data?.transferNumberKG &&
      //       parseFloat(data?.transferNumberKG) <= parseFloat(liuhuancountMax)
      //         ? data?.transferNumberKG
      //         : liuhuancountMax;

      //     const transferNumberPCS = transFormToPcs(
      //       data?.transferNumberKG || 0,
      //       data?.parseWeight
      //     );
      //     const liucountPCS =
      //       data?.transferNumberKG &&
      //       parseFloat(transferNumberPCS) <= parseFloat(liucountMax)
      //         ? transferNumberPCS
      //         : liucountMax;

      //     setLiuMaxKg(parseFloat(liuhuancountMax));
      //     setLiuMaxPCS(parseFloat(liucountMax));
      //     if (data?.transferNumberKG) {
      //       form.setFieldValue("liucount", liucountPCS);
      //       form.setFieldValue("liuhuancount", liucountKG);
      //     } else {
      //       form.setFieldValue("liucount", 0);
      //       form.setFieldValue("liuhuancount", 0);
      //     }
      //   }
    }
  }, [data]);

  const debounceGetPartNumber = debounce(async function (e) {
    try {
      setPartNumberOPtions({ options: [], loading: true });
      const res = await queryMaterialByItemid({ itemid: e });

      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const partNumberData = res?.data?.data;

        setPartNumberOPtions({ options: partNumberData, loading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }, 500);
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
        {isFinished32to31 ? (
          <ReadOnlyInput
            title="商标"
            name="trademark"
            style={{ lineHeight: "24px" }}
          ></ReadOnlyInput>
        ) : (
          <RenderSelect
            title="商标"
            name="trademark"
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
            placeholder={
              !data?.trademarkList || data?.trademarkList?.length === 0
                ? NO_OPTIONS_DATA
                : "请选择商标"
            }
            onSelect={(e: any, record: any) => {
              const pnumber = record?.pnumber;
              if (pnumber) {
                setPNum(pnumber);
                form.setFieldValue("pnumber", pnumber);
              }
            }}
          />
        )}
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
          title="追溯单号"
          name="traceabilityNumber"
          colSpan={isSemiFinished ? 3 : 1}
        />
        {!isSemiFinished && (
          <EditAbleInput title="追溯单号（半品）" name="orderCatchHalf" />
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
          title="图号"
          name="itmTEID"
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
          title="生产数量（公斤）"
          name={"productKg"}
        />
        {isFinished32to31 ? (
          <ReadOnlyInput
            title="流转数量（公斤）"
            isNumber
            name={"transferKg"}
            style={{ lineHeight: "24px" }}
            addonAfter={
              <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxKg}</span>
            }
          />
        ) : (
          <EditAbleInput
            title="流转数量（公斤）"
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
          style={{ lineHeight: "24px" }}
          title="生产数量（PCS）"
          name={"productPcs"}
        />
        {isFinished32to31 ? (
          <ReadOnlyInput
            title="流转数量（PCS）"
            style={{ lineHeight: "24px" }}
            isNumber
            name={"transferPcs"}
            addonAfter={
              <span style={{ color: DEFAULT_RED }}>剩余：{liuMaxPCS}</span>
            }
          />
        ) : (
          <EditAbleInput
            title="流转数量（PCS）"
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
        <RenderSelect
          title="材料料号"
          name="mItmID"
          options={uniqueArray(partNumberOptions.options, "mcode")?.map(
            (item: any) => {
              return {
                value: item?.mcode,
                label: item?.mcode,
                mName: item?.mName,
                mformat: item?.mformat,
                mtexture: item?.mtexture,
              };
            }
          )}
          loading={partNumberOptions.loading}
          onSearch={debounceGetPartNumber}
          onSelect={(e: string, record: any) => {
            const { mName, mformat, mtexture } = record || {};
            form.setFieldValue("mName", mName);
            form.setFieldValue("mspec", mformat);
            form.setFieldValue("mItmTDID", mtexture);
          }}
          showSearch={true}
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
        <EditAbleInput title="材料品名" name="mName" />
        <EditAbleInput title="材料规格" name="mspec" />
        <EditAbleInput title="材料材质" name="mItmTDID" />
      </tr>
      <tr>
        <ReadOnlyInput
          style={{ lineHeight: "24px" }}
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
            required
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
