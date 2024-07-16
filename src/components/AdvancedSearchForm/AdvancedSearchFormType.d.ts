import { Button } from "antd";
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
 * 按钮属性
 */
interface IButtonLoadingChildren {
  insertButton: boolean;
}
export interface IButtons {
  selectedRowKeys: any[];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLoading: IButtonLoadingChildren;
  setButtonLoading: React.Dispatch<
    React.SetStateAction<IButtonLoadingChildren>
  >;
}

/**
 * 表单配置
 */
export interface IFormConfig {
  span?: number;
  formItems: IFormItem[];
  formTitle?: string;
  buttons?: Button[] | ((props: IButtons) => Button[]);
  formExtend?: boolean;
  handleData?: (value) => any;
}

/**
 * 搜索表单
 */
export interface IAdvancedSearchForm {
  formConfig: IFormConfig | ((form?: any) => IFormConfig);
  setSearchParams: React.Dispatch<React.SetStateAction<object>>;
  loading: boolean;
  selectedRowKeys: any[];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}
