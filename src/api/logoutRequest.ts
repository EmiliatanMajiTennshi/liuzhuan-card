import { TOKENKEY } from "@/constants";
import { MENULIST } from "@/constants/constants";
import { request } from "@/utils";
export const logoutRequest = async () => {
  try {
    const res = await request.post("/user/logout");
    localStorage.removeItem(TOKENKEY);
    localStorage.removeItem(MENULIST);
    return res;
  } catch (err: any) {
    localStorage.removeItem(TOKENKEY);
    localStorage.removeItem(MENULIST);
    return err;
  }
};
