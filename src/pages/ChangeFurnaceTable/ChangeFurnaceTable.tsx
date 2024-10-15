import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**热处理派工 */
const ChangeFurnaceTable = () => {
  return (
    <ContentRender title="热处理派工">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default ChangeFurnaceTable;
