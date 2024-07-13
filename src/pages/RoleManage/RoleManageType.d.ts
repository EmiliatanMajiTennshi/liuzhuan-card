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

export type FieldType = {
  name: string;
  menu: IMenuItem[];
  permissionDto?: any[];
};

/**
 * 获取modal配置
 */
export interface IGetModalConfigProps {
  onCancel: (props: any) => void;
  onFinish: (props: any) => void;
  init?: IRoleItem;
  allPermission: { id: number; name: string }[];
  allMenu: IMenuItem[];
  isInsert?: boolean;
}
