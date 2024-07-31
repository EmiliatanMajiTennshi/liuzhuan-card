import React from "react";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**甩毛刺-甩圆角-炉台变更 */
const ChangeFurnaceTable = () => {
  return (
    <ContentRender title="甩毛刺-甩圆角-炉台变更">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default ChangeFurnaceTable;
