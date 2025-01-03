import React from "react";
import { ContentRender } from "@/components/ContentRender";
import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { formConfig, tableConfig } from "./config";

/**用户管理 */
const UserManage = () => {
  console.log(21314214);

  return (
    <ContentRender title="用户管理">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default UserManage;
