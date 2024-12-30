import { message } from "antd";
import { TApi } from "@/api";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { MessageInstance } from "antd/es/message/interface";
import { HookAPI } from "antd/es/modal/useModal";
export interface ITableItem {
  title: string;
  dataIndex: string;
  key: string;
}

export type TFlowCardType =
  | "common"
  | "outsourcing"
  | "flowCard"
  | "print"
  | "rework"
  | "unfinished"
  | "finished"
  | "rollChain";
/**
 * tableConfig的参数
 */
export interface ITableConfig {
  name?: string;
  api: TApi;
  rowKey?: string;
  columns: ColumnsType<RecordType>;
  // 是否可选
  selectAble?: boolean;
  // 下发 编辑的页面的api
  queryFlowCardApi?: TApi;
  // 流转卡类型
  flowCardType?: TFlowCardType;

  optionList?: TApi[];
  // 默认参数
  defaultParam?: { [key: string]: string };
  // 是否下发成品
  needIssueFinished?: boolean;
  // 首次加载禁用
  disableFirstLoading?: boolean;
  // 不分页
  noPaging?: boolean;
  // 只读
  readonly?: boolean;
  // 被下发的api
  issuedFlowCardApi?: string;
  // 默认页面大小
  defaultPageSize?: number;
  // 不显示总数量
  hideCountView?: boolean;
}

/**
 * 传给table的参数
 */
export interface IAdvancedSearchTable {
  // table配置
  tableConfig: ITableConfig | ((props?: any) => ITableConfig);
  // 查询参数
  searchParams: object;
  // loading
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // 当前选中的行
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  selectedRowKeys: any[];
  // 用来主动控制列表刷新
  refreshFlag: boolean;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TTableRes = {
  data: {
    code: number;
    data: {}[];
    page: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
  status: number;
  statusText: string;
  config: {};
  request: {};
};

export type TTableErr = {
  message: string;
  name: string;
  stack: string;
  config: {};
  code: string;
  status: number;
};

/**
 * 传给tableConfig的参数
 */
export interface ITableConfigProps {
  searchedData: any[];
  setSearchedData: React.Dispatch<React.SetStateAction<any[]>>;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIssueID: React.Dispatch<React.SetStateAction<IIssueID>>;
  setPrintModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tableOptions: AnyObject;
  setTableOptions: React.Dispatch<React.SetStateAction<AnyObject>>;
  setFinishedParams: React.Dispatch<React.SetStateAction<AnyObject>>;
  setMultiDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modal: HookAPI;
  setSplitCardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IIssueID {
  orderid?: string;
  itmid?: string;
  transferCardCode?: string;
  U9LineNo?: string;
  CardID?: string;
  noQuery?: boolean;
  id?: string;
}
