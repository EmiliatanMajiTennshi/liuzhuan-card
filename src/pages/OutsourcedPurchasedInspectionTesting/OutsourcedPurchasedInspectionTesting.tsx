import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**外协外购报检及检查 */
const OutsourcedPurchasedInspectionTesting = () => {
  return (
    <ContentRender title="外协外购报检及检查">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default OutsourcedPurchasedInspectionTesting;