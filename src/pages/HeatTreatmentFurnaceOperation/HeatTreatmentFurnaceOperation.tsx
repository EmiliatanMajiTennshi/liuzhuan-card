// 热处理炉台作业查询del
import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**热处理炉台作业查询del */
const HeatTreatmentFurnaceOperation = () => {
  return (
    <ContentRender title="热处理炉台作业查询del">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default HeatTreatmentFurnaceOperation;
