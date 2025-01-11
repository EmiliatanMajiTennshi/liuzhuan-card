import { AdvancedSearchCom } from "@/components/AdvancedSearchCom";
import { ContentRender } from "@/components/ContentRender";
import { formConfig, tableConfig } from "./config";

/**生料配发库存 */
const RawMaterialDistributionInventory = () => {
  return (
    <ContentRender title="生料配发库存">
      <AdvancedSearchCom
        formConfig={formConfig}
        tableConfig={tableConfig}
      ></AdvancedSearchCom>
    </ContentRender>
  );
};
export default RawMaterialDistributionInventory;
