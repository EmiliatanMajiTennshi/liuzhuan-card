import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";
/**外协外购流转卡下发*/
const OutsourcingProductTransferCard = () => {
  return (
    <ContentRender title="外协外购流转卡下发">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default OutsourcingProductTransferCard;
