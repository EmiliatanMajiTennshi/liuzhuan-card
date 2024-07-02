export interface ITableItem {
  title: string;
  dataIndex: string;
}

export interface ITableConfig {
  columns: ITableItem[];
}

export interface IAdvancedSearchTable {
  tableConfig: ITableConfig;
  api: string;
  searchParams: object;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
