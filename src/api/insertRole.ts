import { request } from "@/utils";

interface IInsertRole {
  name: string;
  menus: string[];
  permission?: string[];
}

export const insertRole = async (params: IInsertRole) => {
  try {
    const res = await request.post("role/insertRole", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
