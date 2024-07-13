import { request } from "@/utils";
interface IQueryAllMenu {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 查询所有菜单
 * @param params
 * @returns
 */
export const queryAllMenu = async (params?: IQueryAllMenu) => {
  try {
    const res = await request.get("menu/queryAllMenu", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
