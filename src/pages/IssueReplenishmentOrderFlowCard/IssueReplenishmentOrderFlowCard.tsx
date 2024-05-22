// 下发补单流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueReplenishmentOrderFlowCard = () => {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>补单订单列表</h2>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueReplenishmentOrderFlowCard;
