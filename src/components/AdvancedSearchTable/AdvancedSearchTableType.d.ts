import { TApi } from "@/api";
import { ColumnsType } from "antd/es/table";

export interface ITableItem {
  title: string;
  dataIndex: string;
  key: string;
}

export interface ITableConfig {
  api: TApi;
  rowKey?: string;
  columns: ColumnsType<RecordType>;
  selectAble?: boolean;
}

export interface IAdvancedSearchTable {
  tableConfig: ITableConfig | ((props?: any) => ITableConfig);
  searchParams: object;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<any[]>>;
  selectedRowKeys: any[];
  refreshFlag: boolean;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TTableRes = {
  data: {
    code: number;
    msg: string;
    data:
      | {
          code: number;
          data: never[];
          page: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
          };
        } & any[];
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

export interface ITableConfigProps {
  setSearchedData: React.Dispatch<React.SetStateAction<any[]>>;
  searchedData: any[];
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}
