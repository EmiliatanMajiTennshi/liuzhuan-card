import { TApi } from "@/api";
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
  api: TApi;
  span?: number;
  formItems: IFormItem[];
  formTitle?: string;
}

/**
 * 搜索表单
 */
export interface IAdvancedSearchForm {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  setSearchParams: React.Dispatch<React.SetStateAction<object>>;
  loading: boolean;
}
