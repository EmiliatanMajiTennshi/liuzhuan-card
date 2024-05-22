// 零件流转卡查询
import React from "react";
import { formConfig, tableConfig } from "./config";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";

const PartFlowCardQuery = () => {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>操作前查询</h2>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </>
  );
};

export default PartFlowCardQuery;
