import { getToken, request } from "../utils";
import { FieldType } from "@/components/RegisterCom/RegisterComType";
export const registerRequest = async (RegisterForm: FieldType) => {
  try {
    const res = request.post("/api/user/insertUser", RegisterForm, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
