import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 成品流转卡下发
 * @returns
 */
const FinishedProductsTransferCard = () => {
  return (
    <ContentRender title="成品流转卡下发">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default FinishedProductsTransferCard;
