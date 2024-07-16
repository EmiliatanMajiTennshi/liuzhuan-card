import { TApi } from "@/api";
import { ColumnsType } from "antd/es/table";

export interface ITableItem {
  title: string;
  dataIndex: string;
  key: string;
}

/**
 * tableConfig的参数
 */
export interface ITableConfig {
  api: TApi;
  rowKey?: string;
  columns: ColumnsType<RecordType>;
  selectAble?: boolean;
  queryFlowCardApi?: TApi;
  flowCardType?: "common" | "outsourcing";
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
  setIssueID: React.Dispatch<React.SetStateAction<number>>;
}
