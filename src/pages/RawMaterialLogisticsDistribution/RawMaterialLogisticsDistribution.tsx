import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";
/** 生料物流配送*/
const RawMaterialLogisticsDistribution = () => {
  return (
    <ContentRender title="生料物流配送">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default RawMaterialLogisticsDistribution;
