import { request } from "@/utils";

interface IUpdateMenuById {
  id: number;
  key: string;
  icon: string;
  label: string;
}

/**
 * 更新菜单
 * @param params
 * @returns
 */
export const updateMenuById = async (params: IUpdateMenuById) => {
  try {
    const res = await request.post("menu/updateMenuById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
