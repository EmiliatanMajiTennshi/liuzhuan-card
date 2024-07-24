import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**流转卡入库信息查询 */
const QueryStoreTransferCard = () => {
  return (
    <ContentRender title="流转卡入库信息查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default QueryStoreTransferCard;
