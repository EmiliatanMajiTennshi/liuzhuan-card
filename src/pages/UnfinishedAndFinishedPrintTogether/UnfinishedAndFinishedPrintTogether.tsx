import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 半品成品同时打印
 * @returns
 */
const UnfinishedAndFinishedPrintTogether = () => {
  return (
    <ContentRender title="半品成品同时打印">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default UnfinishedAndFinishedPrintTogether;
