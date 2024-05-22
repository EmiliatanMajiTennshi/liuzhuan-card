// 下发外协外购流转卡
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import React from "react";
import { formConfig, tableConfig } from "./config";

const IssueOutsourcingFlowCard = () => {
  return (
    <>
      <h2 style={{ marginTop: 0 }}>外协外购-订单列表</h2>
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </>
  );
};

export default IssueOutsourcingFlowCard;
