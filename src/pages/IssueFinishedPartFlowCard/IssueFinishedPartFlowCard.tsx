// 下发成品零件流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueFinishedPartFlowCard = () => {
  return (
    <>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
        title="成品订单列表"
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueFinishedPartFlowCard;
