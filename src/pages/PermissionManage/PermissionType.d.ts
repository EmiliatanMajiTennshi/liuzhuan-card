export interface IRole {
  id: number;
  name?: string;
}
export interface ITableConfigProps {
  setSearchedData: React.Dispatch<React.SetStateAction<any[]>>;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInsertUser {
  account: string;
  password: string;
  confirmPassword?: string;
  username: string;
  role: string[];
}
