import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import React from "react";
import { formConfig, tableConfig } from "./config";
/**菜单管理 */
const MenuManage = () => {
  return (
    <ContentRender title="菜单管理">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default MenuManage;
