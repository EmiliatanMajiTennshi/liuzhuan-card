import React from "react";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";

/**
 * 标准品流转卡下发
 * @returns
 */
const StandardProductTransferCard = () => {
  return (
    <ContentRender title="标准品流转卡下发">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default StandardProductTransferCard;
