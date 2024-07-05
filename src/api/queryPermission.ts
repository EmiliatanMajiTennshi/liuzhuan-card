import { request } from "@/utils";
interface IQueryPermission {
  pageNum?: number;
  pageSize?: number;
}
export const queryPermission = async (params?: IQueryPermission) => {
  try {
    const res = await request.get("permission/queryPermission", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
