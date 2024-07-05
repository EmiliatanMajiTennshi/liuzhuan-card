export interface IRole {
  id: number;
  name?: string;
}

export interface IRoleItem {
  name: string;
  menu: string[];
  permissionDto: string[];
  id?: number;
}

export interface IProcessedMenuItem {
  value: string;
  title: string;
  children: IProcessedMenuItem[];
}
