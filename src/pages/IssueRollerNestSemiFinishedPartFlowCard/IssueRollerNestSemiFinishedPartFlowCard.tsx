// 下发套滚销半品零件流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueRollerNestSemiFinishedPartFlowCard = () => {
  return (
    <>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
        title="套滚销-半品订单列表"
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueRollerNestSemiFinishedPartFlowCard;
