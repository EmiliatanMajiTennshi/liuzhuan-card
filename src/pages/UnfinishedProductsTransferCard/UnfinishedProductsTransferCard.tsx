import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 半品流转卡下发
 * @returns
 */
const UnfinishedProductsTransferCard = () => {
  return (
    <ContentRender title="半品流转卡下发">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default UnfinishedProductsTransferCard;
