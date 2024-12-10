import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";

/**
 * 半品下发成品 同时下发
 * @returns
 */
const UnfinishedIssueFinished = () => {
  return (
    <ContentRender title="半品下发成品">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default UnfinishedIssueFinished;
