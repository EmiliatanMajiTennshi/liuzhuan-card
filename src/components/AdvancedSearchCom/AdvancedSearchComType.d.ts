import { ITableConfig } from "../AdvancedSearchTable/AdvancedSearchTableType";
import { IFormConfig } from "../AdvancedSearchForm/AdvancedSearchFormType";

export interface IAdvancedSearchCom {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  tableConfig: ITableConfig;
  title?: string;
}
