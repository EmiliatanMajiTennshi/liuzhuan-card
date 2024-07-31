import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";
/** 物流-热处理配料查询*/
const LogisticsHeatTreatmentIngredients = () => {
  return (
    <ContentRender title="物流-热处理配料查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default LogisticsHeatTreatmentIngredients;
