import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**生料库存查询 */
const QueryRawMaterial = () => {
  return (
    <ContentRender title="生料库存查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default QueryRawMaterial;
