import { request } from "@/utils";

export interface IInsertMenu {
  name: string;
  menus: string[];
  permission?: string[];
}

/**
 * 增加菜单
 * @param params
 * @returns
 */
export const insertMenu = async (params: IInsertMenu) => {
  try {
    const res = await request.post("menu/insertMenu", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
