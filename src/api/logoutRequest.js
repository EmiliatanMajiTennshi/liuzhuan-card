import { request } from "@/utils";
export const logoutRequest = async () => {
  try {
    const res = await request.post("/api/user/logout");
    localStorage.removeItem("token_key");
    localStorage.removeItem("menuList");
    return res;
  } catch (err) {
    localStorage.removeItem("token_key");
    localStorage.removeItem("menuList");
    return err;
  }
};
