// 热处理炉台作业查询
import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**热处理炉台作业查询 */
const HeatTreatmentFurnaceOperationQuery = () => {
  return (
    <ContentRender title="热处理炉台作业查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default HeatTreatmentFurnaceOperationQuery;
