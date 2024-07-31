import { queryTransferCard } from "@/api";
import { SUCCESS_CODE } from "@/constants";
import {
  EditAbleInput,
  EditAbleTextArea,
  ReadOnlyInput,
  RenderSelect,
} from "@/utils";
import { FormInstance, Spin, message } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { debounce } from "lodash";
import { useEffect } from "react";

interface IProps {
  dataString: string;
  form: FormInstance<any>;
  options: AnyObject;
  setOptions: React.Dispatch<React.SetStateAction<AnyObject>>;
}
const CommonForm = (props: IProps) => {
  const { dataString, form, options, setOptions } = props;
  useEffect(() => {
    form.setFieldValue("reworkTransferCardCode", dataString);
    form.setFieldValue("productType", "老料");
    form.setFieldValue("reworkType", "返工");
  }, [dataString]);
  // 防抖
  // 检验员
  const debounceGetTransferCard = debounce(async function (e) {
    try {
      setOptions({ ...options, transferCardOptionsLoading: true });
      const res = await queryTransferCard({ transfCardNo: e });
      if (res?.data?.code === SUCCESS_CODE) {
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
  }, 500);
  return (
    <tbody>
      <tr>
        <RenderSelect
          title="物料类型"
          name="productType"
          options={[
            { value: "老料", label: "老料" },
            { value: "新料", label: "新料" },
          ]}
        ></RenderSelect>
        <RenderSelect
          title="返工类型"
          name="reworkType"
          options={[
            { value: "返工", label: "返工" },
            { value: "改制", label: "改制" },
          ]}
        ></RenderSelect>
        <RenderSelect
          title="流转卡编号"
          name="transferCardCode"
          placeholder="请输入流转卡编号进行搜索"
          options={
            options?.transferCardOptions?.map((item: any) => {
              return {
                value: item?.transfCardNo,
                label: item?.transfCardNo,
                partNumber: item?.partNumber,
                traceabilityNumber: item?.traceabilityNumber,
                name: item?.name,
                specs: item?.specs,
                materialTexture: item?.materialTexture,
                trademark: item?.trademark,
              };
            }) || []
          }
          titleStyle={{ color: "red" }}
          colSpan={3}
          showSearch
          loading={options?.transferCardOptionsLoading}
          onSearch={debounceGetTransferCard}
          onSelect={(e: any, record: any) => {
            const {
              partNumber,
              specs,
              traceabilityNumber,
              name,
              materialTexture,
              trademark,
            } = record;
            form.setFieldValue("partNumber", partNumber);
            form.setFieldValue("specs", specs);
            form.setFieldValue("traceabilityNumber", traceabilityNumber);
            form.setFieldValue("name", name);
            form.setFieldValue("material", materialTexture);
            form.setFieldValue("trademark", trademark);
          }}
          notFoundContent={
            options?.transferCardOptionsLoading ? <Spin size="small" /> : null
          }
        ></RenderSelect>
      </tr>
      <tr>
        <EditAbleInput
          title="料号"
          name="partNumber"
          // onBlur={(e) => {
          //     const currentId = e.target.value;
          //     if (currentId === mItmID) {
          //       return;
          //     }
          //     setMItemId(currentId);
          //     queryMaterialByItemid({ itemid: currentId }).then((res) => {
          //       const data = res?.data?.data?.[0];
          //       if (res?.data?.code !== SUCCESS_CODE || !data) {
          //         message.error(GET_MATERIAL_ERROR);
          //         form.setFieldValue("mName", "");
          //         form.setFieldValue("mspec", "");
          //         form.setFieldValue("mItmTDID", "");
          //         return;
          //       }

          //       form.setFieldValue("mName", data.mName);
          //       form.setFieldValue("mspec", data.mformat);
          //       form.setFieldValue("mItmTDID", data.mtexture);
          //       message.success(GET_MATERIAL_SUCCESS);
          //     });
          //   }}
        />
        <EditAbleInput title="追溯单号" name="traceabilityNumber" />
        <EditAbleInput title="评审单号" name="reworkNumber" />
        <ReadOnlyInput title="品名" name="name" />
      </tr>
      <tr>
        <ReadOnlyInput title="规格" name="spec" />
        <ReadOnlyInput title="材质" name="material" />
        <ReadOnlyInput title="商标" name="trademark" colSpan={3} />
      </tr>
      <tr>
        <EditAbleTextArea
          title="返工流程"
          name="reworkFlow"
          colSpan={8}
          maxLength={100}
        />
      </tr>
      <tr>
        <EditAbleInput title="开单人" name="drawer" />
        <EditAbleInput title="返工数量" name="reworkQuantity" isNumber />
        <RenderSelect
          title="单位"
          name="reworkUnit"
          options={[
            { value: "kg", label: "kg" },
            { value: "pcs", label: "pcs" },
          ]}
          colSpan={3}
        ></RenderSelect>
      </tr>
    </tbody>
  );
};
export default CommonForm;
