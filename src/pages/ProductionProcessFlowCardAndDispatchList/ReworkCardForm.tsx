import {
  queryInfoByTransferCard,
  queryPartNumberInfo,
  queryReformInfoByItemId,
  queryReviewFormNumber,
  queryTransferCard,
  queryTransferCardNew,
} from "@/api";
import { SUCCESS_CODE } from "@/constants";
import {
  EditAbleInput,
  EditAbleTextArea,
  ReadOnlyInput,
  RenderSelect,
  uniqueArray,
} from "@/utils";
import { FormInstance, Spin } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { normalStyle, normalStyle18 } from "./styles";
import styles from "./index.module.scss";
interface IProps {
  form: FormInstance<any>;
  options: AnyObject;
  setOptions: React.Dispatch<React.SetStateAction<AnyObject>>;
  data: any;
}
const ReworkCardForm = (props: IProps) => {
  const { form, options, setOptions, data } = props;

  const [transferCardRequired, setTransferCardRequired] = useState(false);

  // 是否是改制 改制要多一些字段
  const [isGaizhi, setIsGaizhi] = useState(false);
  useEffect(() => {
    form.setFieldValue("productType", data?.transferCardCode ? "新料" : "老料");
    form.setFieldValue("reworkType", data?.reformPartNumber ? "改制" : "返工");
    // 有流转卡号
    setTransferCardRequired(data?.transferCardCode);
    // 有改制料号
    setIsGaizhi(data?.reformPartNumber);
  }, [data]);

  // 防抖
  // 流转卡
  const debounceGetTransferCard = debounce(async function (e) {
    try {
      setOptions({ ...options, transferCardOptionsLoading: true });
      const res = await queryInfoByTransferCard({ transferCardCode: e });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const transferCardData = res?.data?.data || [];
        const _options = {
          ...options,
          transferCardOptions: transferCardData,
          transferCardOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
  const debounceGetReworkNumber = debounce(async function (e) {
    try {
      setOptions({ ...options, reworkNumberOptionsLoading: true });
      const res = await queryReviewFormNumber({ number: e });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const reworkNumberData = res?.data?.data || [];
        const _options = {
          ...options,
          reworkNumberOptions: reworkNumberData,
          reworkNumberOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
  const debounceGetReformPartNumber = debounce(async function (e) {
    try {
      setOptions({ ...options, reformPartNumberOptionsLoading: true });
      const res = await queryReformInfoByItemId({ itemId: e });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const reformPartNumberData = res?.data?.data || [];
        const _options = {
          ...options,
          reformPartNumberOptions: reformPartNumberData,
          reformPartNumberOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
  const debounceGetPartNumber = debounce(async function (e) {
    try {
      setOptions({ ...options, partNumberOptionsLoading: true });
      if (e === "") return;
      const res = await queryPartNumberInfo({ partNumber: e });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const partNumberData = [res?.data?.data] || [];

        const _options = {
          ...options,
          partNumberOptions: partNumberData,
          partNumberOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
  const debounceGetTraceabilityNumber = debounce(async function (e) {
    try {
      setOptions({ ...options, traceabilityNumberOptionsLoading: true });
      if (e === "") return;
      const res = await queryInfoByTransferCard({ traceabilityNumber: e });
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        const traceabilityNumberData = res?.data?.data || [];

        const _options = {
          ...options,
          traceabilityNumberOptions: traceabilityNumberData,
          traceabilityNumberOptionsLoading: false,
        };
        setOptions(_options);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000);
  return (
    <tbody className={styles.normalForm}>
      <tr>
        <RenderSelect
          titleStyle={normalStyle}
          title="物料类型"
          name="productType"
          options={[
            { value: "老料", label: "老料" },
            { value: "新料", label: "新料" },
          ]}
          required
          onSelect={(e: string) => {
            setTransferCardRequired(e === "新料");

            form.setFieldValue("transferCardCode", undefined);
            form.setFieldValue("partNumber", undefined);
            form.setFieldValue("traceabilityNumber", undefined);
            form.setFieldValue("name", undefined);
            form.setFieldValue("spec", undefined);
            form.setFieldValue("material", undefined);
            form.setFieldValue("trademark", undefined);
            // if (e === "老料") {
            //   form.setFieldValue(
            //     "traceabilityNumber",
            //     data?.traceabilityNumber
            //   );
            // }
          }}
        ></RenderSelect>
        <RenderSelect
          titleStyle={normalStyle}
          title="返工类型"
          name="reworkType"
          options={[
            { value: "返工", label: "返工" },
            { value: "改制", label: "改制" },
          ]}
          required
          onSelect={(e: string) => {
            setIsGaizhi(e === "改制");
          }}
        ></RenderSelect>
        {transferCardRequired ? (
          <RenderSelect
            title="流转卡编号"
            name="transferCardCode"
            placeholder="请输入流转卡编号进行搜索"
            required={true}
            options={
              options?.transferCardOptions?.map((item: any) => {
                return {
                  value: item?.transferCardCode,
                  label: item?.transferCardCode,
                  partNumber: item?.itmid,
                  traceabilityNumber: item?.traceabilityNumber,
                  name: item?.name,
                  spec: item?.spec,
                  materialTexture: item?.itmtdid,
                  trademark: item?.trademark,
                };
              }) || []
            }
            titleStyle={{ color: "red", ...normalStyle }}
            colSpan={3}
            showSearch
            loading={options?.transferCardOptionsLoading}
            onSearch={debounceGetTransferCard}
            onSelect={(e: any, record: any) => {
              const {
                partNumber,
                spec,
                traceabilityNumber,
                name,
                materialTexture,
                trademark,
              } = record;
              form.setFieldValue("partNumber", partNumber);
              form.setFieldValue("spec", spec);
              form.setFieldValue("traceabilityNumber", traceabilityNumber);
              form.setFieldValue("name", name);
              form.setFieldValue("material", materialTexture);
              form.setFieldValue("trademark", trademark || "");
            }}
            notFoundContent={
              options?.transferCardOptionsLoading ? <Spin size="small" /> : null
            }
          ></RenderSelect>
        ) : (
          <ReadOnlyInput
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="流转卡编号"
            name="transferCardCode"
            titleStyle={{ color: "red", ...normalStyle }}
            colSpan={3}
            placeholder="选择老料时无法选择流转卡编号"
          />
        )}
      </tr>
      <tr>
        {transferCardRequired ? (
          <ReadOnlyInput
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="料号"
            name="partNumber"
            placeholder="输入流转卡号自动填写"
            titleStyle={normalStyle}
          />
        ) : (
          <RenderSelect
            title="料号"
            name="partNumber"
            placeholder="请输入料号搜索"
            style={{ lineHeight: "24px", ...normalStyle18 }}
            required
            options={
              options?.partNumberOptions?.map((item: any) => {
                return {
                  value: item?.itmid,
                  label: item?.itmid,
                  // traceabilityNumber: item?.traceabilityNumber,
                  name: item?.name,
                  spec: item?.spec,
                  materialTexture: item?.itmtdid,
                  trademark: item?.trademark,
                };
              }) || []
            }
            titleStyle={{ color: "red", ...normalStyle }}
            showSearch
            loading={options?.partNumberOptionsLoading}
            onSearch={debounceGetPartNumber}
            onSelect={(e: any, record: any) => {
              const {
                spec,
                // traceabilityNumber,
                name,
                materialTexture,
                trademark,
              } = record;
              form.setFieldValue("spec", spec);
              // form.setFieldValue("traceabilityNumber", traceabilityNumber);
              form.setFieldValue("name", name);
              form.setFieldValue("material", materialTexture);
              form.setFieldValue("trademark", trademark || "");
            }}
            notFoundContent={
              options?.partNumberOptionsLoading ? <Spin size="small" /> : null
            }
          />
        )}
        {transferCardRequired ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="追溯单号"
            name="traceabilityNumber"
            placeholder="输入流转卡号自动填写"
          />
        ) : (
          <EditAbleInput
            titleStyle={{ color: "red", ...normalStyle }}
            title="追溯单号"
            name="traceabilityNumber"
            required
            // autoComplete
            style={{ lineHeight: "24px", ...normalStyle18 }}
            placeholder="请输入追溯单号"
            // onSearch={debounceGetTraceabilityNumber}
            // loading={options?.traceabilityNumberOptionsLoading}
            // showSearch
            // options={
            //   options?.traceabilityNumberOptions?.map((item: any) => {
            //     return {
            //       value: item?.traceabilityNumber,
            //       label: item?.traceabilityNumber,
            //       // traceabilityNumber: item?.traceabilityNumber,
            //       partNumber: item?.itmid,
            //       name: item?.name,
            //       spec: item?.spec,
            //       materialTexture: item?.itmtdid,
            //       trademark: item?.trademark,
            //     };
            //   }) || []
            // }
            // onSelect={(e: any, record: any) => {
            //   const {
            //     spec,
            //     // traceabilityNumber,
            //     partNumber,
            //     name,
            //     materialTexture,
            //     trademark,
            //   } = record;

            //   form.setFieldValue("spec", spec);
            //   form.setFieldValue("partNumber", partNumber);
            //   // form.setFieldValue("traceabilityNumber", traceabilityNumber);
            //   form.setFieldValue("name", name);
            //   form.setFieldValue("material", materialTexture);
            //   form.setFieldValue("trademark", trademark || "");
            // }}
            // onClear={() => {
            //   form.setFieldValue("partNumber", undefined);
            //   form.setFieldValue("name", undefined);
            //   form.setFieldValue("spec", undefined);
            //   form.setFieldValue("material", undefined);
            //   form.setFieldValue("trademark", undefined);
            // }}
            // notFoundContent={
            //   options?.partNumberOptionsLoading ? <Spin size="small" /> : null
            // }
          />
        )}

        <RenderSelect
          title="评审单号"
          name="reworkNumber"
          placeholder="请输入评审单号进行搜索"
          required
          options={
            options?.reworkNumberOptions?.map((item: any) => {
              return {
                value: item?.number,
                label: item?.number,
                useName: item?.userName,
              };
            }) || []
          }
          colSpan={3}
          titleStyle={{ color: "red", ...normalStyle }}
          showSearch
          loading={options?.reworkNumberOptionsLoading}
          onSearch={debounceGetReworkNumber}
          onSelect={(e: any, record: any) => {
            const { useName } = record;
            form.setFieldValue("drawer", useName);
          }}
          notFoundContent={
            options?.reworkNumberOptionsLoading ? <Spin size="small" /> : null
          }
        ></RenderSelect>
      </tr>
      <tr>
        {transferCardRequired ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="品名"
            name="name"
            placeholder="输入流转卡号自动填写"
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="品名"
            name="name"
            placeholder="输入料号后自动填写"
          />
        )}
        {transferCardRequired ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="规格"
            name="spec"
            placeholder="输入流转卡号自动填写"
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="规格"
            name="spec"
            placeholder="输入料号后自动填写"
          />
        )}
        {transferCardRequired ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="材质"
            name="material"
            placeholder="输入流转卡号自动填写"
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="材质"
            name="material"
            placeholder="输入料号后自动填写"
          />
        )}
        {transferCardRequired ? (
          <ReadOnlyInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="商标"
            name="trademark"
            placeholder="输入流转卡号自动填写"
          />
        ) : (
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="商标"
            name="trademark"
            placeholder="输入料号后自动填写"
          />
        )}
      </tr>
      <tr>
        <EditAbleTextArea
          titleStyle={normalStyle}
          style={normalStyle18}
          title="返工流程"
          name="reworkFlow"
          colSpan={7}
          maxLength={100}
        />
      </tr>
      <tr>
        <ReadOnlyInput
          titleStyle={normalStyle}
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="开单人"
          name="drawer"
          placeholder="输入评审单号自动填写"
        />
        <EditAbleInput
          titleStyle={normalStyle}
          title="返工数量"
          name="reworkQuantity"
          isNumber
          required
        />
        <RenderSelect
          titleStyle={normalStyle}
          title="单位"
          name="reworkUnit"
          options={[
            { value: "kg", label: "kg" },
            { value: "pcs", label: "pcs" },
          ]}
          colSpan={3}
          required
        ></RenderSelect>
      </tr>
      {isGaizhi && (
        <tr>
          <RenderSelect
            title="改制料号"
            name="reformPartNumber"
            placeholder="请输入改制料号进行搜索"
            required
            options={
              options?.reformPartNumberOptions?.map((item: any) => {
                return {
                  value: item?.partNumber,
                  label: item?.partNumber,
                  name: item?.name,
                  spec: item?.specs,
                  material: item?.material,
                };
              }) || []
            }
            style={{ lineHeight: "24px", ...normalStyle18 }}
            titleStyle={{ color: "red", ...normalStyle }}
            showSearch
            autoComplete
            loading={options?.reformPartNumberOptionsLoading}
            onSearch={debounceGetReformPartNumber}
            onSelect={(e: any, record: any) => {
              const { name, spec, material } = record;
              form.setFieldValue("reformName", name);
              form.setFieldValue("reformSpec", spec);
              form.setFieldValue("reformMaterial", material);
            }}
            notFoundContent={
              options?.reformPartNumberOptionsLoading ? (
                <Spin size="small" />
              ) : null
            }
            onClear={() => {
              form.setFieldValue("reformName", undefined);
              form.setFieldValue("reformSpec", undefined);
              form.setFieldValue("reformMaterial", undefined);
            }}
          ></RenderSelect>

          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="品名"
            name="reformName"
            placeholder="输入改制料号后自动填写"
          />
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="规格"
            name="reformSpec"
            placeholder="输入改制料号后自动填写"
          ></EditAbleInput>
          <EditAbleInput
            titleStyle={normalStyle}
            style={{ lineHeight: "24px", ...normalStyle18 }}
            title="材质"
            name="reformMaterial"
            placeholder="输入改制料号后自动填写"
          ></EditAbleInput>
        </tr>
      )}
      <tr>
        <td colSpan={8}>
          <span style={{ ...normalStyle18, color: "red", lineHeight: "40px" }}>
            *
            外发工艺名称：电泳、电泳涂装、交美特、零件交美特、达克罗、零件达克罗、镀镍、化学镀镍、镀硬铬、镀锌、镀铜、
            发黑、磷化发黑、外协、热处理（外协）
          </span>
        </td>
      </tr>
    </tbody>
  );
};
export default ReworkCardForm;
