// 下发链板半品零件流转卡
import React from "react";
import { formConfig, tableConfig } from "./config";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";

const IssueChainBoardSemiFinishedPartFlowCard = () => {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>链板-半品订单列表</h2>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueChainBoardSemiFinishedPartFlowCard;
