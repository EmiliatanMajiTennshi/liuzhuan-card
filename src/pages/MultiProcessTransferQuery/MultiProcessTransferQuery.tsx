import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**多工序流转查询 */
const MutiProcessTransferQuery = () => {
  return (
    <ContentRender title="多工序流转查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default MutiProcessTransferQuery;
