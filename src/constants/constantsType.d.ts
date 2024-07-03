export interface IMenuItem {
  key: string;
  label: string;
  parent?: string;
  children?: IMenuItem[];
  icon?: string | ReactNode;
}
