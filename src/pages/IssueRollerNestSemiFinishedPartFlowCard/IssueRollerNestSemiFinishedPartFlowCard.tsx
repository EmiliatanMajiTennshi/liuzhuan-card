// 下发套滚销半品零件流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueRollerNestSemiFinishedPartFlowCard = () => {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>套滚销-半品订单列表</h2>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueRollerNestSemiFinishedPartFlowCard;
