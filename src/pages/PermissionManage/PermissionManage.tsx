import React from "react";
import { ContentRender } from "@/components/ContentRender";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { formConfig, tableConfig } from "./config";

/**权限管理 */
const PermissionManage = () => {
  return (
    <ContentRender title="权限管理">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default PermissionManage;
