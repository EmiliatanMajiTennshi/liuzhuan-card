// 下发链板半品零件流转卡
import React from "react";
import { formConfig, tableConfig } from "./config";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";

const IssueChainBoardSemiFinishedPartFlowCard = () => {
  return (
    <>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
        title="链板-半品订单列表"
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueChainBoardSemiFinishedPartFlowCard;
