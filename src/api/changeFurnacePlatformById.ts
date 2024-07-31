import { request } from "@/utils";
interface IChangeFurnacePlatformById {
  id: number;
  name: string;
}

/**
 * 根据id变更炉台
 * @param params
 * @returns
 */
export const changeFurnacePlatformById = async (
  params?: IChangeFurnacePlatformById
) => {
  try {
    const res = await request.get("/furnacechange/changeFurnacePlatformById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
