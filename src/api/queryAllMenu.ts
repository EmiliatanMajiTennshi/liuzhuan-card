import { request } from "@/utils";
interface IQueryAllMenu {
  pageNum?: number;
  pageSize?: number;
}
export const queryAllMenu = async (params?: IQueryAllMenu) => {
  try {
    const res = await request.get("menu/queryAllMenu", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
