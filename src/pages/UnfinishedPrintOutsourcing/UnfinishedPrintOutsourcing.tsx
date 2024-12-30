import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 成品同时打印外购半品
 * @returns
 */
const UnfinishedPrintOutsourcing = () => {
  return (
    <ContentRender title="成品同时打印外购半品">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default UnfinishedPrintOutsourcing;
