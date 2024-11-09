import { Button } from "antd";
import { TApi } from "@/api";
import { Rule } from "antd/es/form";
import { AnyObject } from "antd/es/_util/type";
import { MessageInstance } from "antd/es/message/interface";
import { HookAPI } from "antd/es/modal/useModal";
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
  loading?: boolean;
  message: MessageInstance;
  setAppealModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: HookAPI;
}

interface IOptions {
  type?: any[];
  heatTreatmentFurnacePlatforms?: any[];
}
export interface IFormItemProps {
  options: IOptions;
  setOptions: React.Dispatch<React.SetStateAction<IOptions>>;
}

/**
 * 表单配置
 */
export interface IFormConfig {
  span?: number;
  formItems: IFormItem[] | ((props: IFormItemProps) => IFormItem[]);
  formTitle?: string;
  buttons?: Button[] | ((props: IButtons) => Button[]);
  formExtend?: boolean;
  /** 处理时间数据*/
  handleDate?: boolean;
  name?: string;
  initValues?: AnyObject;
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
  initValues?: AnyObject;
}
