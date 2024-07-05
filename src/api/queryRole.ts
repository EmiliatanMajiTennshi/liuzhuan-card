import { request } from "@/utils";
interface IQueryRole {
  pageNum?: number;
  pageSize?: number;
  role?: string;
}
export const queryRole = async (params?: IQueryRole) => {
  try {
    const res = await request.get("role/queryRole", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
