import { Rule } from "antd/es/form";

/**
 * 表单item
 */
export interface IFormItem {
  key: string;
  name: string;
  children: JSX.Element;
  rules?: Rule[];
}

/**
 * 表单配置
 */
export interface IFormConfig {
  api: string;
  span?: number;
  formItems: IFormItem[];
}

/**
 * 搜索表单
 */
export interface IAdvancedSearchForm {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  setSearchParams: React.Dispatch<React.SetStateAction<object>>;
  loading: boolean;
}
