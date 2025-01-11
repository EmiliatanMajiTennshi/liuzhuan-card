import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**生料库存已完成配发查询 */
const QueryPfInfo = () => {
  return (
    <ContentRender title="生料库存已完成配发查询">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};

export default QueryPfInfo;
