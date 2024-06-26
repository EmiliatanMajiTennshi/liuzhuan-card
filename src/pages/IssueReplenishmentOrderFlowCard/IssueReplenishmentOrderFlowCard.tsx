// 下发补单流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueReplenishmentOrderFlowCard = () => {
  return (
    <>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
        title="补单订单列表"
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueReplenishmentOrderFlowCard;
