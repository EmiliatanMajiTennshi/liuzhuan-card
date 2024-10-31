import { EditAbleInput, RenderDatePicker, RenderSelect } from "@/utils";
import { FormInstance } from "antd";
import { IData } from "./indexType";

import { normalStyle, normalStyle18 } from "./styles";
import { useEffect, useState } from "react";
import { queryOperationInfo } from "@/api";
import { SUCCESS_CODE } from "@/constants";
import { AnyObject } from "antd/es/_util/type";
// import { getHeatTreatmentFurnacePlatformsList } from "@/api";

interface IProps {
  data: IData;
  form: FormInstance<any>;
}
const FlowCardFormRollChain = (props: IProps) => {
  const { form } = props;
  const [operationList, setOperationList] = useState<any[]>([]);

  useEffect(() => {
    queryOperationInfo().then((res) => {
      if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
        setOperationList(res?.data?.data);
      }
    });
  }, []);

  // 最大流转数量
  return (
    <tbody>
      <tr>
        <RenderSelect
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="开单人"
          name="drawer"
          colSpan={2}
          labelColSpan={1}
          titleStyle={{ color: "red", ...normalStyle }}
          required
          options={operationList?.map((item) => {
            return {
              value: item?.operationName,
              label: item?.operationName,
              operationId: item?.operationId,
            };
          })}
          showSearch
          onSelect={(e: string, record: any) => {
            form.setFieldValue("drawerId", record?.operationId);
          }}
        />
      </tr>
      <tr>
        <RenderSelect
          style={{ lineHeight: "24px", ...normalStyle18 }}
          title="开单人条码"
          name="drawerId"
          colSpan={2}
          labelColSpan={1}
          titleStyle={{ color: "red", ...normalStyle }}
          required
          showSearch
          options={operationList?.map((item) => {
            return {
              value: item?.operationId,
              label: item?.operationId,
              operationName: item?.operationName,
            };
          })}
          onSelect={(e: string, record: any) => {
            form.setFieldValue("drawer", record?.operationName);
          }}
        />
      </tr>
      <tr>
        <RenderDatePicker
          title="卷装日期"
          name="rollTime"
          colSpan={2}
          labelColSpan={1}
          titleStyle={{ color: "red", ...normalStyle }}
          required
        />
      </tr>
    </tbody>
  );
};
export default FlowCardFormRollChain;
