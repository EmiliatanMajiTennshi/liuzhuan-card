import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**品检-外购外协报检查询 */
const OutsourcedPurchasedInspectionTesting = () => {
  return (
    <ContentRender title="品检-外购外协报检查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default OutsourcedPurchasedInspectionTesting;
