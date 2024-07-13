import { ITableConfig } from "../AdvancedSearchTable/AdvancedSearchTableType";
import { IFormConfig } from "../AdvancedSearchForm/AdvancedSearchFormType";

/**
 * 传给serchCom的参数
 */
export interface IAdvancedSearchCom {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  tableConfig: ITableConfig | ((props?: any) => ITableConfig);
  title?: string;
}
