import React from "react";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";

/**
 * 流转卡工序未完成(已入库)
 * @returns
 */
const TransferCardUnfinishToStore = () => {
  return (
    <ContentRender title="流转卡工序未完成(已入库)">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default TransferCardUnfinishToStore;
