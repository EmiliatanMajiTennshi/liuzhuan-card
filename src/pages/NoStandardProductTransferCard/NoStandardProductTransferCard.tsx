import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 非标准品流转卡下发
 * @returns
 */
const NoStandardProductTransferCard = () => {
  return (
    <ContentRender title="非标准品流转卡下发">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default NoStandardProductTransferCard;
